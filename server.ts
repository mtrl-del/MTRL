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

interface FileDiag {
  name: string;
  mimeType: string;
  textLength?: number;
  chunkCount?: number;
  reason?: string;
}

let knowledgeCache: KnowledgeChunk[] = [];
let lastLoadedAt: string | null = null;
let fileList: any[] = [];
let loadedFilesDiag: FileDiag[] = [];
let skippedFilesDiag: FileDiag[] = [];
let driveStatus = "Not initialized";
let driveError: string | null = null;

function isFolderIdValid(id: string | undefined): boolean {
  if (!id) return false;
  const folderIdRegex = /^[a-zA-Z0-9_-]{25,50}$/;
  return folderIdRegex.test(id);
}

async function loadKnowledge() {
  console.log("--- Loading knowledge from Google Drive ---");
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  const diagnosticsMap = {
    hasGoogleClientId: !!clientId,
    hasGoogleClientSecret: !!clientSecret,
    hasGoogleRefreshToken: !!refreshToken,
    hasGoogleDriveFolderId: !!folderId,
    folderIdLooksValid: isFolderIdValid(folderId)
  };

  loadedFilesDiag = [];
  skippedFilesDiag = [];

  if (!clientId || !clientSecret || !refreshToken || !folderId) {
    const msg = "Google Drive credentials missing in environment variables.";
    console.error(msg, diagnosticsMap);
    driveStatus = msg;
    driveError = msg;
    return [];
  }

  if (!diagnosticsMap.folderIdLooksValid) {
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

    for (const file of files) {
      console.log(`Processing file: ${file.name} (${file.mimeType})`);
      let text = "";
      try {
        if (file.mimeType === 'application/vnd.google-apps.document') {
          const exportRes = await drive.files.export({
            fileId: file.id!,
            mimeType: 'text/plain',
          });
          text = typeof exportRes.data === 'string' ? exportRes.data : JSON.stringify(exportRes.data);
        } else if (file.mimeType === 'text/plain') {
          const getRes = await drive.files.get({
            fileId: file.id!,
            alt: 'media',
          });
          text = typeof getRes.data === 'string' ? getRes.data : JSON.stringify(getRes.data);
        } else {
          console.log(`Skipping: ${file.name} - Unsupported mimeType`);
          skippedFilesDiag.push({ name: file.name!, mimeType: file.mimeType!, reason: "Unsupported file type" });
          continue;
        }

        if (text && text.trim().length > 10) {
          console.log(`Read ${text.length} characters from ${file.name}`);
          const chunkSize = 1200;
          const overlap = 200;
          let fileChunks = 0;
          
          for (let i = 0; i < text.length; i += (chunkSize - overlap)) {
            const chunkText = text.substring(i, i + chunkSize).trim();
            if (chunkText.length > 20) {
              chunks.push({
                text: chunkText,
                source: file.name || "Unknown"
              });
              fileChunks++;
            }
            if (i + chunkSize >= text.length) break;
          }
          loadedFilesDiag.push({ name: file.name!, mimeType: file.mimeType!, textLength: text.length, chunkCount: fileChunks });
          console.log(`Created ${fileChunks} chunks from ${file.name}`);
        } else {
          console.warn(`File ${file.name} appears to be too short or empty.`);
          skippedFilesDiag.push({ name: file.name!, mimeType: file.mimeType!, reason: "Empty or too short text content" });
        }
      } catch (err: any) {
        console.error(`Error processing file ${file.name}:`, err.message);
        skippedFilesDiag.push({ name: file.name!, mimeType: file.mimeType!, reason: `Export/Read failed: ${err.message}` });
      }
    }
    
    lastLoadedAt = new Date().toISOString();
    return chunks;
  } catch (err: any) {
    driveStatus = `Listing error: ${err.message}`;
    return [];
  }
}

function searchKnowledge(query: string, chunks: KnowledgeChunk[], limit = 6): KnowledgeChunk[] {
  if (!chunks.length) return [];
  
  const lowerQuery = query.toLowerCase();
  
  // Specific intent detection
  const isTestQuery = /тест|код|secret|check|98765|шалгалт/.test(lowerQuery);
  const isCourseQuery = /хичээл|төлөвлөгөө|curriculum|syllabus|хичээлүүд|судлах|үзэх|mtrl\d+|chem\d+|phys\d+/.test(lowerQuery);
  const isGeneralMtrlQuery = /элсэлт|тэтгэлэг|ажил|мэргэжил|багш|лаборатори|боломж|төгсөгч|хөтөлбөр|танилцуулга|мэдээлэл/.test(lowerQuery) || isCourseQuery;

  // Course specific keywords to prioritize
  const courseKeywords = ['сургалтын төлөвлөгөө', 'хичээлийн жагсаалт', 'мэргэжлийн суурь', 'заавал судлах', 'сонгон судлах', 'mtrl201', 'chem208', 'mtrl302', 'mtrl304'];

  const rawKeywords = lowerQuery.split(/\s+/).filter(k => k.length > 2);
  // Add Mongolian stems for better matching (agglutinative language)
  const stems = rawKeywords.map(k => k.length > 6 ? k.substring(0, 6) : k);
  const keywords = Array.from(new Set([...rawKeywords, ...stems]));
  
  if (isCourseQuery) {
    keywords.push(...courseKeywords);
  }

  const scored = chunks.map(chunk => {
    let score = 0;
    const lowerText = chunk.text.toLowerCase();
    const isTestFile = chunk.source.includes("00_Тест_Drive_уншилт");

    // Filter rules:
    // 1. Skip test file if not a test query and it's a general MTRL query
    if (isTestFile && !isTestQuery && isGeneralMtrlQuery) return { chunk, score: -1 };
    
    // 2. Prioritize course files if it's a course query
    const isCourseFile = /сургалтын|төлөвлөгөө|хичээл|curriculum|syllabus/.test(chunk.source.toLowerCase());
    if (isCourseQuery && isCourseFile) score += 15;

    // Scoring logic
    if (lowerText.includes(lowerQuery)) score += 12;
    
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        score += 3;
        if (/[^a-zA-Z0-9]/.test(keyword)) score += 2;
      }
    });

    return { chunk, score };
  });

  const results = scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.chunk);

  return results;
}

function isMongolian(text: string): boolean {
  if (!text) return false;
  
  const cyrillicMatches = text.match(/[а-яөүёА-ЯӨҮЁ]/g) || [];
  const latinMatches = text.match(/[a-zA-Z]/g) || [];
  
  const cyrillicCount = cyrillicMatches.length;
  const latinCount = latinMatches.length;
  
  // If we have some cyrillic, it's likely Mongolian (or Russian, but we accept it as 'cyrillic-based')
  // We are very lenient now: as long as there is cyrillic and it's not overwhelmed by Latin
  if (cyrillicCount > 0) {
    if (latinCount === 0) return true;
    const ratio = cyrillicCount / (cyrillicCount + latinCount);
    return ratio > 0.3; // 30% cyrillic is enough to accept it as probably containing the answer
  }

  // If no cyrillic at all, it might be just numbers/symbols
  return latinCount === 0; 
}

async function getAiResponse(systemPrompt: string, userMessage: string, retryCount = 0): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey === "YOUR_OPENROUTER_API_KEY_HERE") {
    throw new Error("OPENROUTER_API_KEY_MISSING");
  }

  const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
    model: "openrouter/free",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ],
    temperature: 0.0
  }, {
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.APP_URL || "https://mtrl.num.edu.mn",
      "X-Title": "MTRL NUM Chatbot"
    },
    timeout: 45000 
  });

  const reply = response.data.choices[0]?.message?.content || "";

  if (!reply || reply.trim().length === 0) {
    throw new Error("EMPTY_AI_REPLY");
  }

  if (!isMongolian(reply) && retryCount < 1) {
    console.warn("AI returned non-Mongolian/gibberish response. Raw:", reply.substring(0, 100));
    const strictPrompt = `${systemPrompt}\n\nSTRICT RULE: Only answer in Mongolian Cyrillic. Do not use other scripts or gibberish characters. Current invalid response started with: ${reply.substring(0, 20)}`;
    return getAiResponse(strictPrompt, userMessage, retryCount + 1);
  }

  return reply;
}

// Initial load
loadKnowledge().then(chunks => {
  knowledgeCache = chunks;
  if (!knowledgeCache.length) {
    knowledgeCache = [{
      text: "MTRL (Материал судлал, инженерчлэл) хөтөлбөр нь МУИС-ийн Инженер, технологийн сургуулийн харьяа хөтөлбөр юм. Хөтөлбөр нь материал судлаач, инженер бэлтгэдэг.",
      source: "Системийн мэдээлэл"
    }];
  }
  console.log(`[Knowledge] Loaded ${knowledgeCache.length} chunks initially.`);
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.use(cors({
    origin: ['https://set.num.edu.mn', 'http://localhost:3000', /--num\.edu\.mn$/],
    methods: ['POST', 'GET', 'OPTIONS'],
    credentials: true
  }));

  // Reload Knowledge Endpoint with detailed diagnostics
  app.get('/api/reload-knowledge', async (req, res) => {
    try {
      console.log("Manual knowledge reload requested...");
      knowledgeCache = await loadKnowledge();
      res.json({ 
        success: true, 
        chunkCount: knowledgeCache.length,
        fileCount: fileList.length,
        loadedFiles: loadedFilesDiag,
        skippedFiles: skippedFilesDiag,
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

    try {
      console.log(`Chat request received: "${message.substring(0, 50)}${message.length > 50 ? '...' : ''}"`);
      
      const relevantChunks = searchKnowledge(message, knowledgeCache);
      console.log("Selected knowledge chunks count:", relevantChunks.length);
      if (relevantChunks.length > 0) {
        console.log("Top matches sources:", relevantChunks.map(c => c.source).join(", "));
      }

      let context = "";
      let sources: string[] = [];

      if (relevantChunks.length > 0) {
        context = relevantChunks.map(c => c.text).join("\n\n---\n\n");
        sources = Array.from(new Set(relevantChunks.map(c => c.source)));
      }

      const systemPrompt = `Та МУИС-ийн Инженер, технологийн сургуулийн Материал судлал, инженерчлэл (MTRL) хөтөлбөрийн албан ёсны AI туслах. 
      
ЗААВАР:
1. Зөвхөн Монгол хэлээр, кирилл бичгээр хариул.
2. Орос, Англи болон бусад хэлээр хариулахыг хатуу хориглоно.
3. Хариулт товч, үнэн зөв, ойлгомжтой байх ёстой.
4. Өгөгдсөн CONTEXT-д байхгүй мэдээллийг зохиож болохгүй. Гэхдээ хэрэв context-д холбогдох ерөнхий мэдээлэл байвал түүнийг ашиглан хариулж болно.
5. Хэрэв мэдээлэл CONTEXT дотор ОБЪЕКТИВ байдлаар огт байхгүй бол зөвхөн: "Энэ мэдээлэл одоогоор MTRL-ийн албан ёсны мэдээллийн санд байхгүй байна. Баталгаажуулах шаардлагатай." гэж хариулна.

Нийтлэг асуултуудад зориулсан мэдээлэл Context-д байгаа бол түүнийг дэлгэрэнгүй ашигла.

CONTEXT:
${context || "MTRL хөтөлбөрийн мэдээллийн сан хоосон байна."}`;

      let reply = await getAiResponse(systemPrompt, message);

      if (sources.length > 0 && !reply.includes("Энэ мэдээлэл одоогоор MTRL-ийн албан ёсны мэдээллийн санд байхгүй байна")) {
        reply += `\n\nЭх сурвалж: ${sources.join(", ")}`;
      }

      console.log("Chatbot response sent successfully.");
      res.json({ reply });
    } catch (error: any) {
      if (error.message === "OPENROUTER_API_KEY_MISSING") {
        return res.status(500).json({ reply: "AI тохиргоо дутуу байна." });
      }
      console.error("Chatbot processing error:", error.message);
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
