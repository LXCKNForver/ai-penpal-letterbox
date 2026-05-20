type CallDeepSeekInput = {
  systemPrompt: string;
  userContent: string;
};

type DeepSeekChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
};

export async function callDeepSeek({
  systemPrompt,
  userContent,
}: CallDeepSeekInput): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    throw new Error("Missing DEEPSEEK_API_KEY");
  }

  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      temperature: 0.8,
      max_tokens: 900,
    }),
  });

  const rawText = await response.text();
  let data: DeepSeekChatResponse | null = null;

  try {
    data = rawText ? (JSON.parse(rawText) as DeepSeekChatResponse) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message = data?.error?.message || rawText || response.statusText;
    throw new Error(`DeepSeek request failed (${response.status}): ${message}`);
  }

  const content = data?.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("DeepSeek response did not include reply content");
  }

  return content;
}
