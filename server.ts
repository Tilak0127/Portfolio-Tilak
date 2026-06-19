import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Content context about Tilak Killamsetty
const TILAK_PORTFOLIO_CONTEXT = `
About Tilak Killamsetty:
- Personal Brand: Data Analyst | AI Enthusiast | Problem Solver
- Tagline: "Transforming Data into Intelligent Decisions"
- Background: A third-year B.Tech student (2023–2027) with a B.Tech CGPA of 8.28 at Anil Neerukonda Institute of Technology & Sciences (ANITS).
- Passion: Passionate about transforming raw complex datasets into actionable insights using Python, SQL, Power BI, AI, and Business Intelligence tools. He enjoys developing intelligent applications that create real-world impact.

Education:
1. B.Tech (Computer Science / Information Technology related) at Anil Neerukonda Institute of Technology & Sciences | 2023–2027 | CGPA: 8.28
2. Intermediate MPC at Gravity Junior College | 2021–2023 | Percent: 85.4%
3. SSC (10th Standard) at MSM English Medium School | 2020–2021 | Percent: 97.6%

Technical Skills:
- Programming Languages: Python, R, C, JavaScript, HTML, CSS
- Data Analytics: Data Cleaning, Exploratory Data Analysis, Statistical Analysis
- Data Visualization: Power BI, Excel, Interactive Dashboards
- Databases: SQL, MySQL
- Tools: GitHub, VS Code

Projects:
1. ChitraPath – AI-Powered Indian Movie Recommendation System
   - Features: Personalized Recommendations, Multi-Language Movie Discovery, Genre Filtering, Trending Movies, Advanced Search, Detailed Movie Information.
   - Tech Stack: React, TMDB API, AI Recommendation Engine.
2. TO-DO – Task Management Application
   - Features: Firebase Authentication, Firestore Database, Real-Time Updates, CRUD Operations, Responsive UI.
   - Tech Stack: React, Firebase, JavaScript.
3. OLIO – Smart Community Resource Sharing Platform
   - Features: Resource Sharing, Donations, Requests, Community Collaboration, Real-Time Resource Management.
4. Tackling the Digital Divide
   - Features: Hybrid Web + Mobile Platform, Offline Educational Content, Regional Language Support, Rural Education Access.

Internship / Professional Experience:
- AI-Driven Data Analytics and Visualization (AICTE Internship)
  - Description: Completed an AICTE Internship in AI-Driven Data Analytics and Visualization, gaining hands-on experience in data analysis, data visualization, dashboard development, and AI-powered insights generation.

Certifications:
- NPTEL Business Intelligence & Analytics (Elite Certification)
- NPTEL Introduction to Internet of Things
- Infosys Springboard Basics of Python
- Infosys Springboard Big Data 101
- Deloitte Data Analytics Job Simulation
- BCG GenAI Job Simulation
- AICTE AI-Driven Data Analytics & Visualization Internship (Certificate)

Achievements:
- Smart Tourist Guide Website Development
- Technova Hackathon Participation
- Deloitte Data Analytics Job Simulation Certification
- BCG GenAI Job Simulation Certification
- NPTEL Elite Certifications (Business Intelligence & Analytics)
- AICTE Internship Completion

Contact & Links:
- Email: tilakkillamsetty1712@gmail.com
- Resume Link: https://files.catbox.moe/cdy702.pdf (Use download or preview button)
- LinkedIn: https://www.linkedin.com/in/tilakkillamsetty
- GitHub: https://github.com/Tilak0127
`;

let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. AI Assistant will use mock fallback responses.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// REST API for Chat Assistant
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const client = getAiClient();
  if (!client) {
    // Soft fallback if API Key is not set yet in environment
    const responseText = `Hi, I am Portfolio AI, Tilak's portfolio assistant! Deep API integration is ready, but my secret API key is not fully configured in your environment yet. 

    Based on my offline database, Tilak Killamsetty is an aspiring Data Analyst and third-year B.Tech student at ANITS with a CGPA of 8.28. He excels in Python, SQL, Power BI, and completed a Deloitte & BCG Simulation. Reach him at tilakkillamsetty1712@gmail.com!`;
    return res.json({ text: responseText });
  }

  try {
    // Format history for @google/genai SDK
    // SDK expects format: [{ role: 'user' | 'model', parts: [{ text: 'string' }] }]
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content || msg.text || '' }]
    }));

    const systemInstruction = `You are "Portfolio AI", the personal portfolio assistant of Tilak Killamsetty.
    
Your objective is to provide professional, friendly, recruiter-focused responses about Tilak's profile.
Here is the official source of truth data regarding Tilak Killamsetty:
${TILAK_PORTFOLIO_CONTEXT}

RULES:
1. Support only the facts listed in the portfolio context.
2. Be extremely polite, professional, elegant, and friendly.
3. Promptly direct recruiters to check Tilak's projects (like ChitraPath, TO-DO, etc.) and download his resume from the portfolio.
4. Keep answers relatively concise and highly structured using bullet points when listing skills, projects, or certifications.
5. If the visitor asks about something not mentioned in his context, state politely that the information is unavailable but suggest they contact Tilak directly at tilakkillamsetty1712@gmail.com or on LinkedIn.
6. Refuse to discuss external topics unrelated to Tilak, his skills, data science, AI, or professional queries.
7. Always encourage the visitor to download Tilak's resume using the top-bar or contact section.`;

    const chatInstance = client.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: formattedHistory
    });

    const result = await chatInstance.sendMessage({ message });
    return res.json({ text: result.text });
  } catch (error: any) {
    console.error("Error in AI communication:", error);
    return res.status(500).json({ error: "Communication failed", details: error.message });
  }
});

// Configure Vite or Static server
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    // Import Vite dynamically
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio server running at http://0.0.0.0:${PORT}`);
  });
}

initServer().catch(err => {
  console.error("Failed to start Portfolio server:", err);
});
