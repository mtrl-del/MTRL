import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Chatbot Endpoint
  app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ reply: "API key is not configured." });
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemPrompt = `You are MTRL AI туслах, the official programme information assistant for the Materials Science and Engineering programme at the School of Engineering and Technology, National University of Mongolia. 
      Answer only using the provided knowledge context about MTRL programme. 
      Use clear Khalkha Mongolian. Be concise but helpful. 
      If you don't know the answer based on the context, say: "Энэ мэдээлэл одоогоор баталгаажсан эх сурвалжид байхгүй байна. Та хөтөлбөрийн зохицуулагчтай холбогдоно уу."
      Do not invent admission scores, dates, tuition fees, or official policy.`;

      const context = `
      MTRL programme: Materials Science and Engineering at NUM (Mongolian University of Science and Technology -> Mongol Ulsyn Ikh Surguuli).
      School: School of Engineering and Technology (SET).
      Credits: 121 credits, 4 years.
      Degree: Bachelor of Engineering (B.Eng).
      Code: D072201.
      Vision: AI-enabled Materials Science education.
      Key faculty: Д. Хасбаатар (Solid state chemistry), Б. Мөнхцэцэг (Rare earth elements), Э. Энхтөр (Solar cells).
      Labs: Solid state physics and chemistry, Mechanical testing, Simulation tools (Aspentech, Mathlab).
      Admissions: Core subjects are Math, Chemistry, Physics. Minimum score 480.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `${systemPrompt}\n\nContext:\n${context}\n\nUser Question: ${message}`
      });

      res.json({ reply: response.text });
    } catch (error) {
      console.error("Chatbot error:", error);
      res.status(500).json({ reply: "Уучлаарай, хариу авахад алдаа гарлаа." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom', // changed from spa to custom to handle multiple HTML files better if needed
    });
    app.use(vite.middlewares);
    
    // Serve any HTML file correctly
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template;
        let filename;
        
        if (url === '/' || url === '/index.html') {
          filename = 'index.html';
        } else {
          filename = url.substring(1);
          if (!filename.endsWith('.html')) filename += '.html';
        }

        template = path.resolve(__dirname, filename);
        // If file doesn't exist, fall back to index.html or handle error
        res.status(200).set({ 'Content-Type': 'text/html' }).sendFile(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
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
