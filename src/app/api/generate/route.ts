import { NextResponse } from 'next/server';
import { getRepoMeta, getFileTree, getReadme } from '@/lib/github';
import { formatAsFilteredTree } from '@/lib/file-tree';
import { generatePrompt } from '@/lib/openrouter';

const README_MAX_CHARS = 8000;
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

// In-Memory Global Instances for Deduplication & Caching
const inFlight = new Map<string, Promise<{ prompt: string } | NextResponse>>();
const promptCache = new Map<string, { prompt: string; timestamp: number }>();

export async function POST(request: Request) {
  try {
    const { owner, repo } = await request.json();

    if (!owner || !repo) {
      return NextResponse.json({ error: "Missing owner or repo" }, { status: 400 });
    }

    const key = `${owner}/${repo}`.toLowerCase();

    // 1. Check Deduplication Map
    const existingReq = inFlight.get(key);
    if (existingReq) {
      const out = await existingReq;
      return out instanceof NextResponse ? out : NextResponse.json({ prompt: out.prompt });
    }

    // Wrap core logic in a deduplicated promise
    const promise = (async () => {
      // 2. Check Memory Cache
      const cached = promptCache.get(key);
      if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
        return { prompt: cached.prompt };
      }

      // 3. Fetch GitHub Data
      let meta, treeData, readmeRaw;
      try {
        meta = await getRepoMeta(owner, repo);
        [treeData, readmeRaw] = await Promise.all([
          getFileTree(owner, repo, meta.default_branch),
          getReadme(owner, repo, meta.default_branch)
        ]);
      } catch (e: any) {
        return NextResponse.json({ error: e.message || "Failed to fetch repository data" }, { status: e.message.includes('not found') ? 404 : 500 });
      }

      // 4. Transform Data
      const depth2Tree = formatAsFilteredTree(treeData.tree, `${owner}/${repo}`, 2);
      
      const readmeTreated = readmeRaw && readmeRaw.length > README_MAX_CHARS 
          ? `${readmeRaw.slice(0, README_MAX_CHARS)}\n\n... (README truncated)` 
          : (readmeRaw || "*(No README provided)*");

      const context = `
Repository: ${owner}/${repo}
Description: ${meta.description || "N/A"}
Language: ${meta.language || "N/A"}
Topics: ${meta.topics.join(", ") || "N/A"}
${treeData.truncated ? "(Note: Remote Tree was deeply truncated by GitHub)" : ""}

Root File Tree (depth 2):
\`\`\`
${depth2Tree}
\`\`\`

README:
${readmeTreated}
      `.trim();

      // 5. Query Inference Endpoint
      let generatedPrompt = "";
      try {
        generatedPrompt = await generatePrompt(context);
      } catch (e: any) {
        return NextResponse.json({ error: e.message || "Failed to generate prompt" }, { status: 500 });
      }

      // 6. Save cache
      promptCache.set(key, { prompt: generatedPrompt, timestamp: Date.now() });
      
      return { prompt: generatedPrompt };
    })();

    // Put into inFlight map
    inFlight.set(key, promise);
    
    try {
      const out = await promise;
      return out instanceof NextResponse ? out : NextResponse.json({ prompt: out.prompt });
    } finally {
      inFlight.delete(key);
    }

  } catch (error: any) {
    console.error("Generate API Error:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
