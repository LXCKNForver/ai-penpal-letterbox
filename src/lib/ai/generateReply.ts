import { callDeepSeek } from "@/lib/ai/providers/deepseek";
import { buildReplyPrompt } from "@/lib/ai/prompts";
import type { PenpalMemory } from "@/src/lib/db/memories";
import type { Penpal } from "@/src/lib/db/penpals";

type GenerateReplyMode = "mock" | "deepseek";

type GenerateReplyInput = {
  penpal: Penpal;
  letter: {
    content: string;
  };
  memories?: PenpalMemory[];
  mode?: GenerateReplyMode;
};

type GenerateReplyResult = {
  prompt: string;
  content: string;
};

function pickReply(replies: string[]) {
  return replies[Math.floor(Math.random() * replies.length)];
}

function buildMockReply(penpal: Penpal) {
  const id = penpal.id.toLowerCase();
  const name = penpal.name.toLowerCase();

  if (id.includes("luna") || name.includes("luna")) {
    return pickReply([
      "亲爱的朋友：\n\n今天下午又下雨了。我看见窗边的植物叶子上停着水珠，就想起你信里写下的那件小事。它让我觉得，原来很远的人也可以在同一个安静的时刻里听见彼此。\n\n我把你的信夹进日记本，旁边贴了一张旧邮票。等雨停以后，我想去书店看看有没有新的明信片。\n\n祝好，\nLuna",
      "亲爱的朋友：\n\n我是在睡前读完你的信的。台灯照在纸上，字好像一点点暖起来。你写到的心情让我想起今天早晨的雾，刚开始看不清，可是慢慢走近，就能看见路边的小花。\n\n谢谢你愿意把这些告诉我。我也会认真收好这封信，像收好一个小小的秘密。\n\n祝你今晚有好梦，\nLuna",
      "亲爱的朋友：\n\n今天日记里我写了三件事：雨点敲窗户，植物长出新叶子，还有收到你的信。第三件事我写得最长，因为它让我觉得这一天变得不太一样。\n\n你说的事情我读了两遍。我不知道自己有没有完全懂，但我很愿意慢慢听你说。\n\n等下一场雨来的时候再写给我吧，\nLuna",
    ]);
  }

  if (id.includes("oliver") || name.includes("oliver")) {
    return pickReply([
      "嘿，远方的朋友：\n\n如果把你的信画成地图，我觉得中间会有一条弯弯的路，旁边标着“这里发生了一件重要的小事”。我读的时候，像背着包走进了一片新的森林。\n\n今天我还看见一朵像小船的云。它从操场上方慢慢开过去，好像也在赶路送信。\n\n下次我想把这张地图继续画下去。\n\nOliver",
      "你好呀：\n\n我收到你的信时，正在给一本旧地图补颜色。你的故事突然让我想到，地图上最有意思的地方不是粗粗的公路，而是那些细细的小路，因为它们不知道会通向哪里。\n\n我希望你最近也能找到一条让自己开心一点的小路。哪怕只是绕到窗边看一会儿云，也算一次冒险。\n\n保持出发，\nOliver",
      "朋友：\n\n今天的冒险很小：我在书桌底下找到了去年画丢的一张山谷地图。读完你的信以后，我在地图角落画了一枚小旗子，假装那里就是你的城市。\n\n你写的事让我觉得，勇敢不一定是跑很远，有时候只是把心里的话寄出去。\n\n期待下一封路线图，\nOliver",
    ]);
  }

  if (id.includes("xiaoxing") || name.includes("星")) {
    return pickReply([
      "你好呀：\n\n今天海边的风特别大，风铃一直响。我读你的信时，把一个小贝壳放在手心里，觉得它像一只很小的耳朵，正在帮我听远方的声音。\n\n你写的事情我都看见啦。海浪来的时候，我悄悄对它说：请把我的回信慢一点、稳一点送过去。\n\n小星",
      "亲爱的朋友：\n\n傍晚的海有一点金色，像有人把灯光撒在水面上。我坐在窗边读你的信，读到一半，楼下有小朋友在喊卖冰棒，我就突然很想笑。\n\n谢谢你把今天寄给我。我也把我的海风、贝壳和一点点晚霞装进这封信里。\n\n小星",
      "朋友你好：\n\n我今天捡到一枚有细细花纹的贝壳，像一封折起来的海边小信。读完你的来信后，我把它放在书桌旁边，决定让它陪我写完这封回信。\n\n你下次可以告诉我你那边的天空是什么颜色吗？我想把它画进我的海边地图里。\n\n小星",
    ]);
  }

  if (id.includes("momo") || name.includes("momo")) {
    return pickReply([
      "亲爱的朋友：\n\n今天放学后，我坐着旧电车经过海边。窗户有一点点雾，外面的晚霞像被海风吹散的橘子糖。读你的信时，我突然觉得远方也许不是很远，只是需要慢一点抵达。\n\n我把今天听见的铁轨声也放进这封信里，希望它到你那里时还是温热的。\n\nMomo",
      "你好呀：\n\n镰仓今天的海风很轻，坡道旁边的影子被晚霞拉得很长。我读完你的信以后，在站台坐了一小会儿，看旧电车慢慢开走。\n\n谢谢你告诉我那些小事。它们像口袋里的贝壳，不大，却会让人想要好好收着。\n\nMomo",
    ]);
  }

  if (id.includes("echo") || name.includes("echo")) {
    return pickReply([
      "亲爱的朋友：\n\n今天雪落得很轻，像有人把声音调小了。我用旧录音机录了一小段窗外的风，里面有一点空白，也有一点很远的光。\n\n读你的信时，我想到极光有时候也是慢慢出现的。很多心情不用急着说清楚，先把它们放在安全的地方也可以。\n\nEcho",
      "你好：\n\n我在雪地边读完你的信，四周安静得能听见靴子踩过雪的声音。今晚也许会有极光，也许没有，但天空还是会在那里等一会儿。\n\n谢谢你的来信。它像录音带里一段很轻的声音，我会认真听完。\n\nEcho",
    ]);
  }

  return pickReply([
    `亲爱的朋友：\n\n我收到你的信了。读完以后，它像一张被慢慢展开的小纸条，留在我今天的心情里。\n\n我也想把身边的一件小事告诉你，然后等你的下一封信。\n\n${penpal.name}`,
    `你好：\n\n谢谢你寄来的这封信。我读得很慢，因为有些句子适合停一停，再继续往下看。\n\n愿你今天也遇见一点柔软的事情。\n\n${penpal.name}`,
  ]);
}

export async function generateReply({
  penpal,
  letter,
  memories,
  mode = "deepseek",
}: GenerateReplyInput): Promise<GenerateReplyResult> {
  const prompt = buildReplyPrompt({ penpal, letter, memories });

  if (mode === "deepseek") {
    try {
      const content = await callDeepSeek({
        systemPrompt: prompt,
        userContent: letter.content,
      });

      return { prompt, content };
    } catch (error) {
      console.error("Failed to generate DeepSeek reply", error);
      throw new Error(
        error instanceof Error
          ? `DeepSeek reply generation failed: ${error.message}`
          : "DeepSeek reply generation failed"
      );
    }
  }

  return {
    prompt,
    content: buildMockReply(penpal),
  };
}
