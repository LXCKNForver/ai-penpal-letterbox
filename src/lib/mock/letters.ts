export type InboxLetter = {
  id: string;
  from: string;
  location: string;
  subject: string;
  preview: string;
  date: string;
  unread?: boolean;
  stampColor: string;
};

export type SentLetter = {
  id: string;
  to: string;
  title: string;
  date: string;
  status: "sent" | "waiting";
};

export const inboxLetters: InboxLetter[] = [
  {
    id: "letter-luna",
    from: "Luna",
    location: "英国 · 伦敦",
    subject: "来自 Luna 的回信",
    preview: "亲爱的朋友：今天学校的天气很好，我在窗边给你写信...",
    date: "05/20",
    unread: true,
    stampColor: "#c58f7a",
  },
  {
    id: "letter-oliver",
    from: "Oliver",
    location: "加拿大 · 温哥华",
    subject: "来自 Oliver 的回信",
    preview: "我把今天看到的云画下来了，像一艘慢慢经过的小船。",
    date: "05/19",
    stampColor: "#8aa1aa",
  },
  {
    id: "letter-xia",
    from: "小星",
    location: "中国 · 厦门",
    subject: "来自小星的回信",
    preview: "海风有一点咸，我把贝壳放在书桌旁边，想寄给你看。",
    date: "05/18",
    stampColor: "#8c9a63",
  },
];

export const sentLetters: SentLetter[] = [
  {
    id: "sent-luna",
    to: "Luna",
    title: "今天我的心情是...",
    date: "05/20 10:30",
    status: "sent",
  },
  {
    id: "sent-oliver",
    to: "Oliver",
    title: "我最近在学习...",
    date: "05/18 21:15",
    status: "waiting",
  },
];
