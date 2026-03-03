
# CompliAI – Indian Startup Compliance CopilotCompliAI is a hackathon project that turns confusing Indian legal compliance into a clean, interactive dashboard for early‑stage founders.Founders answer a few simple questions about their startup, and CompliAI:- Suggests a **recommended structure** (e.g. Private Limited / OPC)- Generates a **compliance roadmap** (registrations, documents, checklist)- Computes a **compliance score**- Exposes everything through a **beautiful animated UI + side chat copilot**---## Features- **Founder-friendly question flow**  - Business name, type (SaaS / marketplace / D2C / services), city  - Customers (B2B/B2C), revenue band, number of founders- **Dynamic compliance engine (India-focused)**  - Recommends **entity type** (OPC vs Private Limited) based on founders  - Adjusts **GST, IEC, Shops & Establishment** importance and copy based on:    - Revenue band    - B2B vs B2C / marketplace    - City you operate from  - Adds contextual **risk alerts**, **documents**, and **checklist steps**- **Polished dashboard UI**  - Modern dark theme with soft shadows and pill chips  - Hero section with strong positioning copy  - Cards for:    - Compliance score    - Recommended structure    - Core registrations    - Documents required    - Risk radar    - Execution checklist  - Animated reveal when you click **“Generate my compliance score”**:    - Cards slide in from left/right    - List items stagger‑fade in- **CompliAI Copilot (side chat)**  - Fixed bottom‑right chat dock (desktop)  - Pre‑loaded quick questions:    - “Is GST mandatory for me?”    - “Best structure for us?”    - “Biggest risks?”  - Uses your latest **form answers + generated roadmap** as context  - Simple, rule‑based replies that feel contextual (no external API needed)---## Tech Stack- **Frontend**: React 18 + Vite- **Language**: TypeScript-ready JS (currently plain JS)- **Styling**: Hand‑written CSS (no Tailwind/Bootstrap)- **Backend**: None in this repo (designed to plug into an Express/Mongo API later)---## Getting Started### 1. Clone the repogit clone https://github.com/prajjwal-singh20/compliai-ui-26.gitcd compliai-ui-26
2. Install dependencies
npm install
3. Run the dev server
npm run dev
Then open the printed http://localhost:5173 URL in your browser.
Usage Guide
Land on the home page
You’ll see a hero + an empty state (score 0, cards waiting for input).
Fill “Tell us about your startup”
Business name, type, city, customers, revenue, founders.
Click “Generate my compliance score”
Cards animate in with:
Compliance score + label
Recommended structure and cost/timeline
Tailored registrations, documents, risks, checklist.
Use the CompliAI Copilot (bottom-right)
Click a quick question (e.g. “Is GST mandatory for me?”), or type your own.
Copilot answers using your current startup details and roadmap.
Scripts
"dev": "vite","build": "vite build","preview": "vite preview"
npm run dev – local development
npm run build – production build to dist/
npm run preview – serve the production build locally
Deploying to Vercel
This is a standard Vite React app:
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Framework preset: Vite
After connecting the GitHub repo to Vercel, these defaults should “just work”.
Roadmap / Future Ideas
Real LLM integration for the Copilot (ChatGPT / Claude / local).
Plug into a MongoDB + Express backend so multiple startups can save/load profiles.
Sector‑specific presets (Fintech, Healthtech, Edtech, D2C brand, etc.).
Exportable PDF / sharable link of the compliance roadmap for investors/advisors.
Disclaimer
This project is built for a hackathon and is not legal advice.
All compliance guidance is heuristic and simplified for Indian early‑stage startups.
Founders should confirm final decisions with a qualified professional.
