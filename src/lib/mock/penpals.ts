export type MockPenpal = {
  id: string;
  name: string;
  age: number;
  country: string;
  city: string;
  location: string;
  avatar: string;
  avatarLabel: string;
  bio: string;
  intro: string;
  quote: string;
  roomDescription: string;
  favoriteThings: string[];
  topics: string[];
  tags: string[];
  relationshipStats: {
    knownDays: number;
    lettersReceived: number;
    lettersSent: number;
  };
  recentLetters: Array<{
    id: string;
    title: string;
    preview: string;
    date: string;
  }>;
  color: string;
  mapPosition: {
    top: string;
    left: string;
  };
};

export const mockPenpals: MockPenpal[] = [
  {
    id: "luna",
    name: "Luna",
    age: 12,
    country: "\u82f1\u56fd",
    city: "\u4f26\u6566",
    location: "\u82f1\u56fd · \u4f26\u6566",
    avatar: "Lu",
    avatarLabel: "Lu",
    bio: "\u559c\u6b22\u5199\u65e5\u8bb0\u3001\u65e7\u90ae\u7968\u548c\u96e8\u5929\u7684\u7a97\u8fb9\u3002",
    intro:
      "Luna \u559c\u6b22\u628a\u5f88\u5c0f\u7684\u4e8b\u60c5\u5199\u8fdb\u65e5\u8bb0\u91cc\uff1a\u4e00\u573a\u96e8\u3001\u4e00\u672c\u65e7\u4e66\uff0c\u6216\u8005\u7a97\u53f0\u4e0a\u65b0\u957f\u51fa\u6765\u7684\u53f6\u5b50\u3002\u5979\u7684\u56de\u4fe1\u603b\u662f\u6162\u6162\u7684\uff0c\u4f46\u5f88\u8ba4\u771f\u3002",
    quote: "\u5982\u679c\u4e0b\u96e8\u7684\u8bdd\uff0c\u6211\u4f1a\u5750\u5728\u7a97\u8fb9\u5199\u4fe1\u3002",
    roomDescription:
      "\u5979\u7684\u5c0f\u684c\u4e0a\u603b\u6709\u4e00\u672c\u65e7\u65e5\u8bb0\uff0c\u4e00\u76c6\u690d\u7269\uff0c\u8fd8\u6709\u51e0\u5f20\u6ca1\u8d34\u5b8c\u7684\u90ae\u7968\u3002",
    favoriteThings: ["\u96e8\u5929", "\u65e7\u4e66\u5e97", "\u690d\u7269", "\u65e5\u8bb0"],
    topics: ["\u5b66\u6821\u751f\u6d3b", "\u7a97\u8fb9\u5929\u6c14", "\u90ae\u7968"],
    tags: ["\u5c0f\u5b66\u751f", "\u82b1\u8349\u690d\u7269", "\u65e5\u8bb0"],
    relationshipStats: {
      knownDays: 12,
      lettersReceived: 3,
      lettersSent: 2,
    },
    recentLetters: [
      {
        id: "luna-rain",
        title: "\u96e8\u5929\u7684\u7a97\u8fb9",
        preview: "\u4eca\u5929\u4e0b\u96e8\u4e86\uff0c\u6211\u628a\u4f60\u4e0a\u6b21\u8bf4\u7684\u6545\u4e8b\u53c8\u8bfb\u4e86\u4e00\u904d\u3002",
        date: "05/20",
      },
      {
        id: "luna-stamp",
        title: "\u4e00\u5f20\u6ca1\u8d34\u5b8c\u7684\u90ae\u7968",
        preview: "\u6211\u5728\u62bd\u5c49\u91cc\u627e\u5230\u4e00\u5f20\u5f88\u65e7\u7684\u90ae\u7968\uff0c\u50cf\u4e00\u4e2a\u5c0f\u79d8\u5bc6\u3002",
        date: "05/16",
      },
    ],
    color: "#8c9a63",
    mapPosition: { top: "38%", left: "55%" },
  },
  {
    id: "oliver",
    name: "Oliver",
    age: 13,
    country: "\u52a0\u62ff\u5927",
    city: "\u6e29\u54e5\u534e",
    location: "\u52a0\u62ff\u5927 · \u6e29\u54e5\u534e",
    avatar: "Ol",
    avatarLabel: "Ol",
    bio: "\u6536\u96c6\u5730\u56fe\uff0c\u4e5f\u559c\u6b22\u628a\u5468\u672b\u753b\u6210\u5c0f\u6f2b\u753b\u3002",
    intro:
      "Oliver \u5e38\u5e38\u628a\u770b\u5230\u7684\u4e91\u3001\u6811\u548c\u8def\u7ebf\u753b\u5728\u7b14\u8bb0\u672c\u4e0a\u3002\u4ed6\u7684\u4fe1\u50cf\u4e00\u5f20\u5c0f\u5730\u56fe\uff0c\u4f1a\u628a\u4f60\u5e26\u5230\u5f88\u8fdc\u53c8\u5f88\u5b89\u9759\u7684\u5730\u65b9\u3002",
    quote: "\u6211\u89c9\u5f97\u5730\u56fe\u4e0a\u7684\u7ebf\uff0c\u50cf\u8fd8\u6ca1\u5199\u5b8c\u7684\u4fe1\u3002",
    roomDescription:
      "\u4ed6\u7684\u5899\u4e0a\u8d34\u7740\u6d77\u8fb9\u7684\u660e\u4fe1\u7247\uff0c\u4e66\u684c\u8fb9\u653e\u7740\u5f69\u8272\u94c5\u7b14\u548c\u4e00\u5377\u6ca1\u7528\u5b8c\u7684\u80f6\u5e26\u3002",
    favoriteThings: ["\u5730\u56fe", "\u4e91", "\u6f2b\u753b", "\u68ee\u6797"],
    topics: ["\u5468\u672b\u5192\u9669", "\u753b\u753b", "\u6d77\u8fb9\u98ce"],
    tags: ["\u5730\u56fe", "\u6f2b\u753b", "\u81ea\u7136"],
    relationshipStats: {
      knownDays: 9,
      lettersReceived: 2,
      lettersSent: 2,
    },
    recentLetters: [
      {
        id: "oliver-cloud",
        title: "\u50cf\u5c0f\u8239\u7684\u4e91",
        preview: "\u6211\u4eca\u5929\u770b\u5230\u7684\u4e91\u753b\u4e0b\u6765\u4e86\uff0c\u5b83\u4eec\u6162\u6162\u7ecf\u8fc7\u64cd\u573a\u3002",
        date: "05/19",
      },
    ],
    color: "#8aa1aa",
    mapPosition: { top: "31%", left: "22%" },
  },
  {
    id: "xiaoxing",
    name: "\u5c0f\u661f",
    age: 11,
    country: "\u4e2d\u56fd",
    city: "\u53a6\u95e8",
    location: "\u4e2d\u56fd · \u53a6\u95e8",
    avatar: "\u661f",
    avatarLabel: "\u661f",
    bio: "\u7231\u542c\u6d77\u6d6a\u58f0\uff0c\u60f3\u8ba4\u8bc6\u4f1a\u8bb2\u6545\u4e8b\u7684\u670b\u53cb\u3002",
    intro:
      "\u5c0f\u661f\u4f4f\u5728\u6d77\u8fb9\uff0c\u5979\u559c\u6b22\u628a\u6d77\u98ce\u3001\u8d1d\u58f3\u548c\u508d\u665a\u7684\u706f\u5149\u5199\u8fdb\u4fe1\u91cc\u3002\u5979\u8bf4\u6bcf\u5c01\u4fe1\u90fd\u50cf\u4e00\u4e2a\u88ab\u6298\u8d77\u6765\u7684\u5c0f\u591c\u665a\u3002",
    quote: "\u5982\u679c\u6d77\u6d6a\u80fd\u9001\u4fe1\uff0c\u5b83\u4e00\u5b9a\u4f1a\u8d70\u5f97\u5f88\u6162\u3002",
    roomDescription:
      "\u5979\u7684\u7a97\u53f0\u653e\u7740\u8d1d\u58f3\u3001\u5c0f\u73bb\u7483\u74f6\uff0c\u8fd8\u6709\u4e00\u5f20\u753b\u5230\u4e00\u534a\u7684\u6d77\u8fb9\u5730\u56fe\u3002",
    favoriteThings: ["\u6d77\u98ce", "\u8d1d\u58f3", "\u6545\u4e8b", "\u591c\u665a"],
    topics: ["\u6d77\u8fb9", "\u6545\u4e8b", "\u753b\u753b"],
    tags: ["\u6d77\u8fb9", "\u6545\u4e8b", "\u753b\u753b"],
    relationshipStats: {
      knownDays: 7,
      lettersReceived: 1,
      lettersSent: 1,
    },
    recentLetters: [
      {
        id: "xiaoxing-shell",
        title: "\u4e66\u684c\u65c1\u7684\u8d1d\u58f3",
        preview: "\u6d77\u98ce\u6709\u4e00\u70b9\u54b8\uff0c\u6211\u628a\u8d1d\u58f3\u653e\u5728\u4e66\u684c\u65c1\u8fb9\uff0c\u60f3\u5bc4\u7ed9\u4f60\u770b\u3002",
        date: "05/18",
      },
    ],
    color: "#c58f7a",
    mapPosition: { top: "55%", left: "72%" },
  },
];

export function findMockPenpal(penpalId: string) {
  const normalizedId = penpalId === "xia-xing" ? "xiaoxing" : penpalId;

  return mockPenpals.find((penpal) => penpal.id === normalizedId);
}
