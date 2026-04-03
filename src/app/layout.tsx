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
          <div className="hidden sm:flex text-xs font-mono tracking-[0.2em] text-white/50 uppercase">
            Beta_v2.0
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
