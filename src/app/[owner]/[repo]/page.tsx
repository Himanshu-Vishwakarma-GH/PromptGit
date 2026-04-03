"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Sparkles, Copy, TriangleAlert } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    owner: string;
    repo: string;
  }>;
}

export default function RepoPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [prompt, setPrompt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    "Establishing neural link with repository",
    "Extracting deep architectural tree",
    "Analyzing repository dependency graph",
    "Synthesizing high-fidelity constraints",
    "Structuring intelligent context",
    "Finalizing prompt compilation",
  ];

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let stepInterval: NodeJS.Timeout;

    if (!prompt && !error) {
      // Artificial logarithmic progress up to 95%
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const delta = (95 - prev) * 0.05;
          return prev + delta;
        });
      }, 200);

      // Rotate text every 6 seconds
      stepInterval = setInterval(() => {
        setLoadingStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 6000);
    }
    
    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [prompt, error, steps.length]);

  useEffect(() => {
    async function executeExtraction() {
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            owner: resolvedParams.owner,
            repo: resolvedParams.repo,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to synthesize prompt.");
        }

        setPrompt(data.prompt);
      } catch (err: any) {
        setError(err.message);
      }
    }

    executeExtraction();
  }, [resolvedParams.owner, resolvedParams.repo]);

  const copyToClipboard = async () => {
    if (!prompt) return;
    await navigator.clipboard.writeText(prompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <main className="min-h-screen pt-20 pb-24 px-6 md:px-12 flex flex-col max-w-7xl mx-auto w-full relative z-10">
      
      {/* Header Section */}
      <div className="mb-12 md:mb-16">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-medium tracking-widest uppercase text-white/50 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform opacity-70" strokeWidth={1.5} />
          Back to source
        </Link>
        <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-6">
          <h1 className="text-4xl md:text-6xl font-serif italic tracking-tight text-white leading-none">
            {resolvedParams.owner}
            <span className="text-white/30">/</span>
            {resolvedParams.repo}
          </h1>
          <h2 className="font-serif italic text-xl md:text-2xl text-white/40 pb-1">
          </h2>
        </div>
      </div>

      <div className="flex-grow flex flex-col relative w-full">
        {!prompt && !error ? (
           // Loading State
          <div className="flex-grow flex flex-col items-center justify-center p-12 glass-panel min-h-[500px]">
             <div className="relative mb-10">
               <div className="absolute inset-0 bg-[#0000ff]/30 blur-[40px] rounded-full animate-pulse" />
               <Sparkles className="w-12 h-12 text-white/80 relative z-10 animate-pulse" strokeWidth={1} />
             </div>
             
             <div className="font-serif italic text-2xl md:text-3xl text-white/80 mb-8 transition-all duration-500 ease-in-out text-center max-w-md">
               {steps[loadingStep]}...
             </div>
             
             <div className="w-full max-w-sm h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-transparent via-white/80 to-white transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
             </div>
          </div>
        ) : error ? (
           // Error State
           <div className="flex-grow flex flex-col items-center justify-center p-12 glass-panel border-red-500/20 bg-red-950/10 min-h-[500px]">
             <TriangleAlert className="w-12 h-12 mb-6 text-red-400" strokeWidth={1.5} />
             <h2 className="font-serif italic text-3xl text-white mb-4">Extraction Failed</h2>
             <p className="font-sans font-light text-white/60 mb-10 max-w-md text-center leading-relaxed">
               {error}
             </p>
             <button
               onClick={() => router.push("/")}
               className="pill-btn-secondary !border-white/10 hover:!bg-white/5"
             >
               Return to Base
             </button>
           </div>
        ) : (
          // Success State
          <div className="glass-panel flex flex-col h-full w-full min-h-[600px] border-t border-white/20 shadow-2xl relative overflow-hidden group">
            {/* Top Toolbar */}
            <div className="bg-white/[0.02] border-b border-white/5 px-6 py-4 flex justify-between items-center z-20 relative">
               <div className="flex gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-white/20"/>
                  <div className="w-3 h-3 rounded-full bg-white/20"/>
                  <div className="w-3 h-3 rounded-full bg-white/20"/>
               </div>
               <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center text-xs font-mono tracking-widest uppercase text-white/60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 mr-2" strokeWidth={2} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-2" strokeWidth={1.5} />
                      Copy Synthesis
                    </>
                  )}
                </button>
            </div>
            
            {/* Text Area */}
            <div className="relative flex-grow">
              {/* Subtle inner glow behind text */}
              <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-[#00ffff]/5 blur-[100px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-[2s]" />
              
              <textarea
                readOnly
                className="w-full h-[600px] md:h-[700px] p-8 md:p-12 bg-transparent text-white/80 font-mono text-sm md:text-[15px] leading-relaxed resize-none focus:outline-none custom-scrollbar relative z-10"
                value={prompt!}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
