import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import { google } from 'googleapis';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Knowledge Base Logic ---
interface KnowledgeChunk {
  text: string;
  source: string;
}

let knowledgeCache: KnowledgeChunk[] = [];
let lastLoadedAt: string | null = null;
let fileList: any[] = [];
let driveStatus = "Not initialized";
let driveError: string | null = null;

function isFolderIdValid(id: string | undefined): boolean {
  if (!id) return false;
  // Google Drive IDs are usually ~33 chars, alpha-numeric, underscores, hyphens.
  // Folder names often have spaces or are shorter/simpler.
  const folderIdRegex = /^[a-zA-Z0-9_-]{25,50}$/;
  return folderIdRegex.test(id);
}

async function loadKnowledge() {
  console.log("--- Loading knowledge from Google Drive ---");
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  const diagnostics = {
    hasGoogleClientId: !!clientId,
    hasGoogleClientSecret: !!clientSecret,
    hasGoogleRefreshToken: !!refreshToken,
    hasGoogleDriveFolderId: !!folderId,
    folderIdLooksValid: isFolderIdValid(folderId)
  };

  if (!clientId || !clientSecret || !refreshToken || !folderId) {
    const msg = "Google Drive credentials missing in environment variables.";
    console.error(msg, diagnostics);
    driveStatus = msg;
    driveError = msg;
    return [];
  }

  if (!diagnostics.folderIdLooksValid) {
    const msg = `GOOGLE_DRIVE_FOLDER_ID appears to be a folder name ("${folderId}") instead of a Folder ID. Please use the unique ID string from the Drive URL.`;
    console.error(msg);
    driveStatus = "Invalid Folder ID";
    driveError = msg;
    return [];
  }

  console.log(`Folder ID: ${folderId}`);

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  try {
    const tokenResponse = await oauth2Client.getAccessToken();
    if (!tokenResponse.token) throw new Error("Could not retrieve access token.");
    console.log("Google Drive authentication successful.");
    driveStatus = "Connected";
    driveError = null;
  } catch (err: any) {
    let errorMsg = `Google Drive Authentication failed: ${err.message}`;
    
    if (err.message?.includes("unauthorized_client") || (err.response?.data?.error === "unauthorized_client")) {
      errorMsg = "OAuth client ID/secret and refresh token do not match, or the refresh token was generated with a different OAuth client. Regenerate refresh token using the same GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.";
    }

    console.error(errorMsg);
    if (err.response && err.response.data) {
      console.error("Detailed Error:", JSON.stringify(err.response.data, null, 2));
    }
    driveStatus = "Auth Failed";
    driveError = errorMsg;
    return [];
  }

  const drive = google.drive({ version: 'v3', auth: oauth2Client });
  const chunks: KnowledgeChunk[] = [];

  try {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, modifiedTime)',
    });

    const files = res.data.files || [];
    fileList = files;
    console.log(`Found ${files.length} files in folder.`);

    if (files.length === 0) {
      console.warn("No files found. Please check Folder ID and permissions.");
    }

    for (const file of files) {
      console.log(`Processing file: ${file.name} (${file.mimeType})`);
      let text = "";
      try {
        if (file.mimeType === 'application/vnd.google-apps.document') {
          const exportRes = await drive.files.export({
            fileId: file.id!,
            mimeType: 'text/plain',
          });
          text = exportRes.data as string;
        } else if (file.mimeType === 'text/plain') {
          const getRes = await drive.files.get({
            fileId: file.id!,
            alt: 'media',
          });
          text = getRes.data as string;
        } else {
          console.log(`Skipping: ${file.name} - Unsupported mimeType`);
          continue;
        }

        if (text) {
          console.log(`Read ${text.length} characters from ${file.name}`);
          const chunkSize = 1000;
          const overlap = 150;
          
          let fileChunks = 0;
          for (let i = 0; i < text.length; i += (chunkSize - overlap)) {
            const chunkText = text.substring(i, i + chunkSize);
            chunks.push({
              text: chunkText,
              source: file.name || "Unknown"
            });
            fileChunks++;
            if (i + chunkSize >= text.length) break;
          }
          console.log(`Created ${fileChunks} chunks from ${file.name}`);
        } else {
          console.warn(`File ${file.name} appears to be empty.`);
        }
      } catch (err: any) {
        console.error(`Error parsing file ${file.name}:`, err.message);
      }
    }
    
    lastLoadedAt = new Date().toISOString();
    console.log(`Total chunks created: ${chunks.length}`);
    return chunks;
  } catch (err: any) {
    console.error("Error listing files from Google Drive:", err.message);
    driveStatus = `Listing error: ${err.message}`;
    return [];
  }
}

function searchKnowledge(query: string, chunks: KnowledgeChunk[], limit = 5): KnowledgeChunk[] {
  if (!chunks.length) return [];
  
  const lowerQuery = query.toLowerCase();
  const keywords = lowerQuery.split(/\s+/).filter(k => k.length > 2);
  
  // Scoring logic
  const scored = chunks.map(chunk => {
    let score = 0;
    const lowerText = chunk.text.toLowerCase();
    
    // Exact match for the whole query (highest priority)
    if (lowerText.includes(lowerQuery)) score += 10;
    
    // Keyword matches
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        score += 2;
        // Bonus for non-alphanumeric keywords (like test codes)
        if (/[^a-zA-Z0-9]/.test(keyword)) score += 3;
      }
    });

    return { chunk, score };
  });

  const filtered = scored.filter(s => s.score > 0);
  console.log(`Knowledge search found ${filtered.length} potential matches for "${query}"`);

  const results = filtered
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.chunk);

  if (results.length > 0) {
    console.log(`Top match source: ${results[0].source}`);
  }

  return results;
}

// Initial load
loadKnowledge().then(chunks => {
  knowledgeCache = chunks;
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // CORS Configuration
  app.use(cors({
    origin: ['https://set.num.edu.mn', 'http://localhost:3000', /--num\.edu\.mn$/],
    methods: ['POST', 'GET', 'OPTIONS'],
    credentials: true
  }));

  // Reload Knowledge Endpoint
  app.get('/api/reload-knowledge', async (req, res) => {
    try {
      console.log("Manual knowledge reload requested...");
      knowledgeCache = await loadKnowledge();
      res.json({ 
        success: true, 
        chunkCount: knowledgeCache.length,
        fileCount: fileList.length,
        lastLoadedAt 
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Knowledge Status Endpoint
  app.get('/api/knowledge-status', (req, res) => {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    res.json({
      driveConnected: driveStatus === "Connected",
      status: driveStatus,
      folderId: folderId,
      fileCount: fileList.length,
      chunkCount: knowledgeCache.length,
      lastLoadedAt,
      files: fileList.map(f => ({
        name: f.name,
        mimeType: f.mimeType,
        modifiedTime: f.modifiedTime
      })),
      diagnostics: {
        hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
        hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
        hasGoogleRefreshToken: !!process.env.GOOGLE_REFRESH_TOKEN,
        hasGoogleDriveFolderId: !!folderId,
        folderIdLooksValid: isFolderIdValid(folderId)
      },
      error: driveError
    });
  });

  // AI Chatbot Endpoint
  app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message || message.trim() === "") {
        return res.status(400).json({ reply: "Мэдээлэл хоосон байна." });
    }

    const lowerMsg = message.toLowerCase().trim();
    
    // Greeting Intent detection
    const greetingKeywords = ['сайн уу', 'сайн байна уу', 'hi', 'hello', 'hey', 'мэнд', 'sain uu', 'sain baina uu'];
    if (greetingKeywords.some(keyword => lowerMsg === keyword || lowerMsg.startsWith(keyword + ' ') || lowerMsg.endsWith(' ' + keyword))) {
      return res.json({ 
        reply: "Сайн байна уу? Би MTRL хөтөлбөрийн AI туслах байна. Та элсэлт, сургалтын төлөвлөгөө, хичээл, лаборатори, тэтгэлэг, ажил мэргэжлийн боломжийн талаар асууж болно." 
      });
    }

    // Help Intent detection
    const helpKeywords = ['юу асууж болох вэ', 'тусламж', 'help', 'яаж ашиглах вэ'];
    if (helpKeywords.some(keyword => lowerMsg.includes(keyword))) {
      return res.json({ 
        reply: "Та MTRL хөтөлбөрийн талаар дараах чиглэлээр асууж болно: элсэлт, сургалтын төлөвлөгөө, судлах хичээлүүд, лаборатори, багш нар, тэтгэлэг, төрийн сангийн зээл, ажил мэргэжлийн боломж, AI-д суурилсан сургалт." 
      });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey || apiKey === "YOUR_OPENROUTER_API_KEY_HERE") {
      console.error("OPENROUTER_API_KEY is missing or not configured.");
      return res.status(500).json({ 
        reply: "Одоогоор AI туслахтай холбогдох боломжгүй байна. Та дараа дахин оролдоно уу." 
      });
    }

    try {
      console.log(`Chat request received: "${message.substring(0, 50)}${message.length > 50 ? '...' : ''}"`);
      
      const relevantChunks = searchKnowledge(message, knowledgeCache);
      console.log("Selected knowledge chunks:", JSON.stringify(relevantChunks.map(c => ({ source: c.source, preview: c.text.substring(0, 50) })), null, 2));

      let context = "";
      let sources: string[] = [];

      if (relevantChunks.length > 0) {
        context = relevantChunks.map(c => c.text).join("\n\n---\n\n");
        sources = Array.from(new Set(relevantChunks.map(c => c.source)));
      }

      const systemPrompt = `Та МУИС-ийн Инженер, технологийн сургуулийн Материал судлал, инженерчлэл (MTRL) хөтөлбөрийн албан ёсны AI туслах. Зөвхөн Монгол хэлээр, кирилл бичгээр, товч, үнэн зөв, элсэгч болон оюутанд ойлгомжтой хариул. Орос болон англи хэлээр хариулахгүй. Мэдэхгүй мэдээллийг зохиохгүй.

Өгөгдсөн context мэдээллийг ашиглан хариулна уу. Хэрэв мэдээлэл context дотор байхгүй бол: "Энэ мэдээлэл одоогоор MTRL-ийн албан ёсны мэдээллийн санд байхгүй байна. Баталгаажуулах шаардлагатай." гэж хариулаад бусад ерөнхий мэдээллийг өгч болно.

CONTEXT:
${context || "No specific database context available."}`;

      const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
        model: "openrouter/free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ]
      }, {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.APP_URL || "https://github.com/mtrl-num",
          "X-Title": "MTRL NUM Chatbot"
        },
        timeout: 25000 
      });

      let reply = response.data.choices[0]?.message?.content || "Уучлаарай, хариу авахад алдаа гарлаа.";
      
      if (sources.length > 0 && !reply.includes("Энэ мэдээлэл одоогоор MTRL-ийн албан ёсны мэдээллийн санд байхгүй байна")) {
        reply += `\n\nЭх сурвалж: ${sources.join(", ")}`;
      }

      console.log("Chatbot response sent successfully.");
      res.json({ reply });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const errorData = error.response?.data;
          console.error(`OpenRouter API Error [${status}]:`, JSON.stringify(errorData, null, 2) || error.message);
      } else {
          console.error("Chatbot server error:", error);
      }
      res.status(500).json({ reply: "Одоогоор AI туслахтай холбогдох боломжгүй байна. Та дараа дахин оролдоно уу." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
    
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let filename;
        if (url === '/' || url === '/index.html') {
          filename = 'index.html';
        } else {
          filename = url.substring(1).split('?')[0]; // strip query params
          if (!filename.endsWith('.html') && !filename.includes('.')) filename += '.html';
        }

        const template = path.resolve(__dirname, filename);
        res.status(200).set({ 'Content-Type': 'text/html' }).sendFile(template);
      } catch (e) {
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
