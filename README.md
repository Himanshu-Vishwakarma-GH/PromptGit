# PromptGit — The Architectural Monolith

<p align="center">
  <img src="https://grainy-gradients.vercel.app/noise.svg" width="100%" height="8" alt="divider" />
</p>

**PromptGit** is an elite, high-fidelity reverse-engineering engine designed to transform public GitHub repositories into synthetic, expert-level LLM context. Inspired by the cinematic editorial aesthetics of **Shopify Editions** and **iertqa.com**, it provides a stunning, glassmorphic interface for modern "vibe coding" workflows.

---

## ⚡ Core Features

- **Architectural Synthesis**: Precisely extracts repository file structures and core functionalities using deep recursive tree parsing.
- **Expert-Grade Prompting**: Generates sophisticated, outcome-focused prompts that speak the language of professional prompt engineers.
- **Cinematic Experience**: A high-end, dark-mode interface featuring refractive glassmorphism, fluid Framer Motion animations, and high-tension typography (`EB Garamond` paired with `Inter`).
- **Resilient Backend**: Built with in-flight deduplication, in-memory caching, and automatic branch fallback (`main`/`master`) for maximum reliability.
- **Multi-Model Intelligence**: Leverages OpenRouter for high-quality LLM synthesis with cascading fallback mechanisms.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Intelligence**: [OpenRouter API](https://openrouter.ai/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: [Google Fonts](https://fonts.google.com/) (EB Garamond & Inter)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- An [OpenRouter API Key](https://openrouter.ai/keys)
- A [GitHub Personal Access Token](https://github.com/settings/tokens) (Optional, for higher rate limits)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/PromptGit.git
   cd PromptGit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   OPENROUTER_API_KEY=your_openrouter_key
   GITHUB_TOKEN=your_github_token (optional)
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

---

## 🌐 Deployment (Vercel)

1. Push your code to a GitHub repository.
2. Import the project into your [Vercel Dashboard](https://vercel.com/new).
3. Add the following Environment Variables:
   - `OPENROUTER_API_KEY`
   - `GITHUB_TOKEN` (Highly recommended for production)
4. Deploy.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built for the age of agentic coding.
</p>
