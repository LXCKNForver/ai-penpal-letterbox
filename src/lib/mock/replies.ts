export type MockReply = {
  id: string;
  from: string;
  location: string;
  date: string;
  greeting: string;
  paragraphs: string[];
  signature: string;
};

export const mockReplies: MockReply[] = [
  {
    id: "demo",
    from: "Luna",
    location: "英国 · 伦敦",
    date: "May 20",
    greeting: "亲爱的朋友：",
    paragraphs: [
      "谢谢你的来信！我很开心你愿意和我分享你的事情。",
      "今天学校的天气很好，我在操场上和朋友们一起踢球。虽然我跑得不快，但大家都很开心。",
      "你说你最近有点紧张，要记得好好休息呀。期待你的下一封信！",
    ],
    signature: "Luna",
  },
];
