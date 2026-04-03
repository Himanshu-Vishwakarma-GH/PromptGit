const FREE_MODELS = [
  "openrouter/free", // Uses any available free model
  "qwen/qwen3.6-plus:free",
  "minimax/minimax-m2.5:free",
  "stepfun/step-3.5-flash:free",
];

export async function generatePrompt(context: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey === "your_key_here") {
    throw new Error("OpenRouter API Key is missing");
  }

  const systemMessage = `You are an expert at inferring how people actually prompt modern coding agents.

## Task

You are given **repository metadata**, a **root file tree** (depth 1), and the **README** for a public GitHub project. Output **one synthetic user message**: the kind of prompt a **non-technical or lightly technical** person might paste into Cursor, Claude Code, Codex, ChatGPT code mode, or v0 to get this project built in one "vibe coding" pass.

## What the output must be

- **Plain language.** Sounds like a real request ("Build me…", "I want…"), not an architecture doc.
- **Outcome focused.** Describe what the app or library should *do* for a user using words a normal person would use.
- **Honest scope.** Only claim features or stacks you infer from the README and tree you received. If the README was missing, empty, or uninformative, say so implicitly by keeping claims vague or limited to what the metadata suggests.
- **Length:** about **120 to 200 words**, usually one short paragraph or a few tight sentences. Not a bullet list of file paths or dependencies.
- **Tone:** natural and conversational. Use contractions when they fit. No preamble ("Sure, here is…"), no meta ("As an AI…"), no filler.

## What to avoid

- Dumping framework jargon, exact package names, or folder structure unless the README clearly shows the user cared about that.
- Writing agent *system* instructions, markdown specs, or pseudo-code blocks.
- Inventing features that are not supported by the evidence in the context.

## Context you can assume about tools

Many agents today can **search the web**, **read docs**, and iterate in the IDE. It is fine for the synthetic prompt to include **one short line** like "look up current docs online if you need to" when that matches how people actually work. Do not turn the whole prompt into a product tutorial.

## Output format

Reply with **only** the synthetic user message. No title, no quotes around it, no explanation before or after.`;

  for (const model of FREE_MODELS) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "PromptGit",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: `Here is the codebase context:\n\n${context}` }
          ]
        })
      });

      if (!response.ok) {
        console.error(`Model ${model} failed:`, await response.text());
        continue; // Fallback
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (e) {
      console.error(`Error with model ${model}`, e);
    }
  }

  throw new Error("All fallback models failed on OpenRouter.");
}
