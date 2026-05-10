import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  // AI Chatbot Endpoint (OpenRouter)
  app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message || message.trim() === "") {
        return res.status(400).json({ reply: "Мэдээлэл хоосон байна." });
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
      
      const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
        model: "openrouter/free",
        messages: [
          { 
            role: "system", 
            content: "Та МУИС-ийн ИТС-ийн Материал судлал, инженерчлэл MTRL хөтөлбөрийн AI туслах. ЗӨВХӨН Монгол хэлээр хариул. Өөр хэлээр (Орос, Англи гэх мэт) хариулж болохгүй. Товч, үнэн зөв, элсэгч болон оюутанд ойлгомжтой хариул." 
          },
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

      const reply = response.data.choices[0]?.message?.content || "Уучлаарай, хариу авахад алдаа гарлаа.";
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
