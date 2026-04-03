const GITHUB_API = "https://api.github.com";

function getHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "PromptGit",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export interface RepoMeta {
  description: string | null;
  language: string | null;
  topics: string[];
  default_branch: string;
}

export async function getRepoMeta(owner: string, repo: string): Promise<RepoMeta> {
  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, { headers: getHeaders() });
  
  if (res.status === 401) throw new Error("GitHub Authentication failed.");
  if (res.status === 403) throw new Error("GitHub API rate limit exceeded.");
  if (res.status === 404) throw new Error(`Repository ${owner}/${repo} not found.`);
  if (!res.ok) throw new Error(`GitHub API error: ${res.statusText}`);

  const data = await res.json();
  return {
    description: data.description,
    language: data.language,
    topics: data.topics || [],
    default_branch: data.default_branch || "main",
  };
}

export async function getFileTree(owner: string, repo: string, branch: string = "main") {
  const fetchBranch = async (b: string, isRetry: boolean): Promise<any> => {
    const branchRes = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/branches/${b}`, { headers: getHeaders() });
    
    if (branchRes.status === 404) {
      if (!isRetry) {
        const fallback = b === "main" ? "master" : "main";
        return fetchBranch(fallback, true);
      }
      throw new Error(`Branch ${b} not found.`);
    }
    if (!branchRes.ok) throw new Error(`GitHub Branch error: ${branchRes.statusText}`);
    
    const branchData = await branchRes.json();
    const treeSha = branchData.commit.commit.tree.sha;

    const treeRes = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=1`, { headers: getHeaders() });
    if (!treeRes.ok) throw new Error(`GitHub Tree error: ${treeRes.statusText}`);
    
    const treeData = await treeRes.json();
    return {
      tree: treeData.tree.map((t: any) => ({ path: t.path, type: t.type })),
      truncated: treeData.truncated || false
    };
  };

  return fetchBranch(branch, false);
}

export async function getReadme(owner: string, repo: string, branch: string = "main"): Promise<string> {
  const fetchReadme = async (b: string, isRetry: boolean): Promise<string> => {
    const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/readme?ref=${b}`, { headers: getHeaders() });
    
    if (res.status === 404) {
      if (!isRetry) {
        const fallback = b === "main" ? "master" : "main";
        return fetchReadme(fallback, true);
      }
      return "";
    }
    if (!res.ok) throw new Error(`GitHub Readme error: ${res.statusText}`);

    const data = await res.json();
    return Buffer.from(data.content, "base64").toString("utf-8");
  };

  return fetchReadme(branch, false);
}
