type RelationshipLetterInput = {
  content: string;
  createdAt: string | null;
  id: string;
};

export type RelationshipLetterPreview = {
  content: string;
  date: string;
  id: string;
  title: string;
  tone: "received" | "sent";
};

export type PenpalRelationshipSummary = {
  firstInteractionAt: string | null;
  knownDays: number;
  knownLabel: string;
  lettersReceived: number;
  lettersSent: number;
  receivedLabel: string;
  recentLetters: RelationshipLetterPreview[];
  sentLabel: string;
  stage: "new" | "warming" | "familiar" | "deep";
  storyBody: string;
  storyTitle: string;
  totalLetters: number;
};

const dayMs = 24 * 60 * 60 * 1000;

function parseTime(value: string | null | undefined) {
  if (!value) return null;

  const time = new Date(value).getTime();

  return Number.isNaN(time) ? null : time;
}

function formatShortDate(value: string | null) {
  const time = parseTime(value);

  if (!time) return "路上";

  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(time));
}

function previewText(value: string) {
  const compact = value.replace(/\s+/g, " ").trim();

  return compact.length > 72 ? `${compact.slice(0, 72)}…` : compact;
}

function titleFromContent(value: string, fallback: string) {
  const firstLine = value
    .split(/\n/)
    .map((line) => line.trim())
    .find(Boolean);

  if (!firstLine) return fallback;

  return firstLine.length > 18 ? `${firstLine.slice(0, 18)}…` : firstLine;
}

function getKnownLabel(knownDays: number) {
  if (knownDays <= 0) return "等待故事开始";
  if (knownDays === 1) return "认识的第 1 天";
  if (knownDays < 14) return `认识了 ${knownDays} 天`;

  const weeks = Math.floor(knownDays / 7);

  if (weeks < 5) return `已经慢慢漂流了 ${weeks} 周`;

  return `认识的第 ${knownDays} 天`;
}

function getStoryCopy({
  knownDays,
  lettersReceived,
  lettersSent,
}: {
  knownDays: number;
  lettersReceived: number;
  lettersSent: number;
}) {
  const total = lettersReceived + lettersSent;

  if (total === 0) {
    return {
      stage: "new" as const,
      storyTitle: "等待第一封信把距离点亮",
      storyBody: "你们还没有开始第一次漂流，也许故事正停在信纸被摊开的那一刻。",
    };
  }

  if (knownDays <= 3 || total <= 1) {
    return {
      stage: "new" as const,
      storyTitle: "你们才刚刚开始漂流",
      storyBody: "第一封信的墨迹还没完全干，远方的轮廓正在一点点变清楚。",
    };
  }

  if (knownDays < 14 || total < 5) {
    return {
      stage: "warming" as const,
      storyTitle: "一些问候开始有了回音",
      storyBody: "你们交换过几段小小的日常，等待已经不像最开始那样陌生。",
    };
  }

  if (knownDays < 35 || total < 10) {
    return {
      stage: "familiar" as const,
      storyTitle: "有些等待已经变成习惯",
      storyBody: "信箱里慢慢留下了共同的天气、心情和没有说完的下一句。",
    };
  }

  return {
    stage: "deep" as const,
    storyTitle: "你们已经交换了很多故事",
    storyBody: "那些来来回回的字句让距离变得柔软，信箱也开始有了厚度。",
  };
}

function getCountLabel(count: number, empty: string, suffix: string) {
  if (count === 0) return empty;

  return `${count} ${suffix}`;
}

export function derivePenpalRelationshipSummary({
  discoveredAt,
  received,
  sent,
}: {
  discoveredAt?: string | null;
  received: RelationshipLetterInput[];
  sent: RelationshipLetterInput[];
}): PenpalRelationshipSummary {
  const eventTimes = [
    parseTime(discoveredAt),
    ...sent.map((letter) => parseTime(letter.createdAt)),
    ...received.map((letter) => parseTime(letter.createdAt)),
  ].filter((time): time is number => typeof time === "number");
  const firstInteractionTime = eventTimes.length > 0 ? Math.min(...eventTimes) : null;
  const knownDays = firstInteractionTime
    ? Math.max(1, Math.floor((Date.now() - firstInteractionTime) / dayMs) + 1)
    : 0;
  const firstInteractionAt = firstInteractionTime
    ? new Date(firstInteractionTime).toISOString()
    : null;
  const lettersReceived = received.length;
  const lettersSent = sent.length;
  const story = getStoryCopy({ knownDays, lettersReceived, lettersSent });
  const recentLetters = [
    ...received.map((letter) => ({
      content: previewText(letter.content),
      createdAt: letter.createdAt,
      date: formatShortDate(letter.createdAt),
      id: letter.id,
      title: titleFromContent(letter.content, "远方寄来的回音"),
      tone: "received" as const,
    })),
    ...sent.map((letter) => ({
      content: previewText(letter.content),
      createdAt: letter.createdAt,
      date: formatShortDate(letter.createdAt),
      id: letter.id,
      title: titleFromContent(letter.content, "你寄出的一封信"),
      tone: "sent" as const,
    })),
  ]
    .sort((a, b) => (parseTime(b.createdAt) ?? 0) - (parseTime(a.createdAt) ?? 0))
    .slice(0, 3)
    .map((letter) => ({
      content: letter.content,
      date: letter.date,
      id: letter.id,
      title: letter.title,
      tone: letter.tone,
    }));

  return {
    firstInteractionAt,
    knownDays,
    knownLabel: getKnownLabel(knownDays),
    lettersReceived,
    lettersSent,
    receivedLabel: getCountLabel(lettersReceived, "也许第一封回信正在路上", "封"),
    recentLetters,
    sentLabel: getCountLabel(lettersSent, "还没有寄出第一封信", "封"),
    totalLetters: lettersReceived + lettersSent,
    ...story,
  };
}
