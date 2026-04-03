import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const serif = EB_Garamond({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "PromptGit — The Architectural Monolith",
  description: "High-fidelity AI prompt reverse-engineering from GitHub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${serif.variable} font-serif font-light tracking-wide antialiased text-[#e2e2e2] bg-[#000000] min-h-screen relative selection:bg-white/20 selection:text-white`}>
        {/* Ambient Bokeh Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#032e33]/30 blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#0a2342]/40 blur-[150px] mix-blend-screen" />
          
          {/* Noise texture overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        </div>

        {/* Cinematic Header Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference">
          <div className="flex items-center gap-2 font-serif text-2xl tracking-wide text-white">
            <span className="opacity-80">Prompt</span>Git
          </div>
          <div className="hidden sm:flex items-center gap-6 text-xs font-mono tracking-[0.2em] text-white/50 uppercase">
            <a 
              href="https://github.com/Himanshu-Vishwakarma-GH/PromptGit" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center"
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-4 h-4 cursor-pointer hover:text-white transition-colors"
                aria-label="GitHub-Repository"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <span>Mine Labs</span>
          </div>
        </nav>

        {/* Content Wrapper */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
