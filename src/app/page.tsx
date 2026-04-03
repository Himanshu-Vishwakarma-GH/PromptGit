"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) return;

    setIsLoading(true);

    let path = repoUrl.trim();
    if (path.startsWith("http")) {
      const url = new URL(path);
      path = url.pathname.slice(1);
    }
    path = path.replace(/\.git$/, "");

    router.push(`/${path}`);
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4 md:px-12 relative pt-20">
      
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center z-10 mb-20 md:mb-32">
        
        {/* Typographic Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <h1 className="text-5xl md:text-[6rem] lg:text-[7.5rem] font-serif italic tracking-tight text-white leading-[0.9] mb-6 drop-shadow-2xl">
            Reverse Engineer<span className="text-white/40">.</span>
          </h1>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            className="font-serif italic text-2xl md:text-3xl text-white/70 font-light tracking-wide max-w-2xl mx-auto text-balance"
          >
            The intelligent parser that understands architecture just as well as you do.
          </motion.h2>
        </motion.div>

        {/* Glassmorphic Form Segment */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit} 
          className="w-full max-w-3xl flex flex-col items-center gap-8 relative z-20"
        >
          
          <div className="w-full relative group">
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="Paste a GitHub URL (e.g. github.com/vercel/next.js)"
              className="glass-input text-center placeholder:text-white/20 shadow-[0_0_30px_rgba(0,255,255,0.02)]"
              required
              disabled={isLoading}
              spellCheck={false}
            />
            
            {/* Subtle glow orb hovering behind the input */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-full bg-[#00ffff]/10 blur-[40px] rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          </div>

          <button
            type="submit"
            disabled={isLoading || !repoUrl.trim()}
            className="pill-btn-primary disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            {isLoading ? (
              <>
                <Sparkles className="w-5 h-5 animate-pulse text-indigo-500" strokeWidth={1.5} />
                <span className="relative z-10">Parsing Architecture...</span>
              </>
            ) : (
              <>
                <span className="relative z-10">Extract Prompt</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500 opacity-70 relative z-10" strokeWidth={2} />
              </>
            )}
          </button>
        </motion.form>
      </div>

      {/* Decorative Cinematic Footnotes */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute bottom-10 left-10 right-10 flex justify-between items-center font-mono text-[10px] tracking-widest uppercase"
      >
        <div className="flex gap-4">
          <span>Sys: Online</span>
          <span className="hidden sm:inline">Engine: Pro_v1</span>
        </div>
        <div>
          Auth: Open_Access
        </div>
      </motion.div>
    </main>
  );
}
