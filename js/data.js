globalThis.PIP_DATA = {
  quotes: [
    { en: "Small steps every day.", zh: "每天一小步就很好。" },
    { en: "Mistakes help me learn.", zh: "说错了，就是在学会。" },
    { en: "I can try again.", zh: "我可以再试一次。" },
    { en: "Listen first, then speak.", zh: "先听，再说。" },
    { en: "Say it out loud.", zh: "大声说出来。" },
    { en: "I am proud of my try.", zh: "我为这次开口感到骄傲。" },
    { en: "English can be a game.", zh: "英语也可以是一场游戏。" }
  ],
  words: {
    starter: [
      { en: "cat", zh: "猫", emoji: "🐱", hint: "开特" },
      { en: "dog", zh: "狗", emoji: "🐶", hint: "到格" },
      { en: "bird", zh: "鸟", emoji: "🐦", hint: "波德" },
      { en: "fish", zh: "鱼", emoji: "🐟", hint: "费史" },
      { en: "apple", zh: "苹果", emoji: "🍎", hint: "阿泼" },
      { en: "milk", zh: "牛奶", emoji: "🥛", hint: "米欧克" },
      { en: "book", zh: "书", emoji: "📚", hint: "布克" },
      { en: "ball", zh: "球", emoji: "⚽", hint: "波" },
      { en: "red", zh: "红色", emoji: "🔴", hint: "瑞德" },
      { en: "blue", zh: "蓝色", emoji: "🔵", hint: "布鲁" },
      { en: "happy", zh: "开心", emoji: "😊", hint: "嗨皮" },
      { en: "sun", zh: "太阳", emoji: "☀️", hint: "桑" },
      { en: "mom", zh: "妈妈", emoji: "👩", hint: "妈姆" },
      { en: "water", zh: "水", emoji: "💧", hint: "窝特" },
      { en: "hello", zh: "你好", emoji: "👋", hint: "哈喽" },
      { en: "thank you", zh: "谢谢", emoji: "🙏", hint: "三克油" }
    ],
    kid: [
      { en: "school", zh: "学校", emoji: "🏫", hint: "斯库" },
      { en: "friend", zh: "朋友", emoji: "🤝", hint: "弗伦德" },
      { en: "hungry", zh: "饿了", emoji: "😋", hint: "航格瑞" },
      { en: "breakfast", zh: "早餐", emoji: "🍳", hint: "布雷克弗斯特" },
      { en: "homework", zh: "作业", emoji: "✏️", hint: "吼姆沃克" },
      { en: "weather", zh: "天气", emoji: "🌤️", hint: "威泽" },
      { en: "library", zh: "图书馆", emoji: "📖", hint: "莱布瑞瑞" },
      { en: "please", zh: "请", emoji: "🤲", hint: "普利兹" },
      { en: "sorry", zh: "对不起", emoji: "😔", hint: "扫瑞" },
      { en: "tomorrow", zh: "明天", emoji: "📅", hint: "图猫肉" },
      { en: "share", zh: "分享", emoji: "🎁", hint: "谢尔" },
      { en: "question", zh: "问题", emoji: "❓", hint: "快斯臣" },
      { en: "practice", zh: "练习", emoji: "🎯", hint: "普拉克提斯" },
      { en: "because", zh: "因为", emoji: "💡", hint: "比考兹" },
      { en: "carefully", zh: "小心地", emoji: "🐢", hint: "凯尔弗利" },
      { en: "playground", zh: "操场", emoji: "🛝", hint: "普雷格拉温德" }
    ],
    grow: [
      { en: "although", zh: "虽然", emoji: "🤔", hint: "奥勒邹" },
      { en: "recommend", zh: "推荐", emoji: "👍", hint: "瑞可门德" },
      { en: "apologize", zh: "道歉", emoji: "🙇", hint: "阿波勒杰兹" },
      { en: "environment", zh: "环境", emoji: "🌳", hint: "因外润门特" },
      { en: "prefer", zh: "更喜欢", emoji: "💛", hint: "普瑞佛" },
      { en: "improve", zh: "提高", emoji: "📈", hint: "因普鲁夫" },
      { en: "schedule", zh: "日程", emoji: "🗓️", hint: "斯凯久" },
      { en: "confident", zh: "有信心", emoji: "💪", hint: "康菲登特" },
      { en: "however", zh: "然而", emoji: "↔️", hint: "豪埃沃" },
      { en: "borrow", zh: "借入", emoji: "🔄", hint: "波肉" },
      { en: "advice", zh: "建议", emoji: "💬", hint: "艾德外斯" },
      { en: "achieve", zh: "达成", emoji: "🏆", hint: "阿奇夫" },
      { en: "habit", zh: "习惯", emoji: "🔁", hint: "哈比特" },
      { en: "notice", zh: "注意到", emoji: "👀", hint: "诺提斯" },
      { en: "explain", zh: "解释", emoji: "🗣️", hint: "伊克斯普雷恩" },
      { en: "patient", zh: "耐心的", emoji: "⏳", hint: "配申特" }
    ]
  },
  scenes: [
    {
      id: "starter-hello",
      level: "starter",
      title: "打招呼",
      emoji: "👋",
      blurb: "告诉皮皮你是谁",
      steps: [
        {
          pip: { en: "Hi! I'm Pip. What's your name?", zh: "嗨！我是皮皮。你叫什么名字？" },
          choices: [
            { en: "My name is {name}.", zh: "我的名字是{name}。", ok: true, why: "介绍名字，最常用 My name is …" },
            { en: "I name {name}.", zh: "我名字{name}。", ok: false, why: "英语不说 I name，要说 My name is" },
            { en: "Name is me.", zh: "名字是我。", ok: false, why: "这句语序反了，别人听不懂" }
          ],
          reply: { en: "Nice to meet you, {name}!", zh: "很高兴认识你，{name}！" }
        },
        {
          pip: { en: "How are you today?", zh: "你今天好吗？" },
          choices: [
            { en: "I'm fine, thank you.", zh: "我很好，谢谢。", ok: true, why: "回答近况可以说 I'm fine, thank you." },
            { en: "I is fine.", zh: "我是很好。", ok: false, why: "说到自己用 I'm（I am），不用 I is" },
            { en: "Fine you are.", zh: "好你是。", ok: false, why: "单词都对，但顺序不是英语的说法" }
          ],
          reply: { en: "Great! Let's play English.", zh: "太好了！我们来玩英语。" }
        }
      ]
    },
    {
      id: "starter-apple",
      level: "starter",
      title: "红苹果",
      emoji: "🍎",
      blurb: "说说你喜欢什么",
      steps: [
        {
          pip: { en: "Look, a red apple. Do you like apples?", zh: "看，一个红苹果。你喜欢苹果吗？" },
          choices: [
            { en: "Yes, I like apples.", zh: "是的，我喜欢苹果。", ok: true, why: "喜欢某样东西：I like + 名词" },
            { en: "I apple like.", zh: "我苹果喜欢。", ok: false, why: "动词 like 要放在前面：I like apples" },
            { en: "Apples is me.", zh: "苹果是我。", ok: false, why: "这句变成了“苹果是我”，意思跑掉了" }
          ],
          reply: { en: "Yum! I like apples too.", zh: "好吃！我也喜欢苹果。" }
        },
        {
          pip: { en: "What color is the apple?", zh: "这个苹果是什么颜色？" },
          choices: [
            { en: "It is red.", zh: "它是红色的。", ok: true, why: "说颜色：It is red." },
            { en: "It red is.", zh: "它红是。", ok: false, why: "is 要放在颜色前面：It is red." },
            { en: "Red are apple.", zh: "红是苹果。", ok: false, why: "一个苹果用 is，而且颜色放后面" }
          ],
          reply: { en: "Yes. A red apple.", zh: "对。一个红苹果。" }
        }
      ]
    },
    {
      id: "starter-park",
      level: "starter",
      title: "去公园",
      emoji: "🏞️",
      blurb: "邀请别人一起玩",
      steps: [
        {
          pip: { en: "Let's play in the park!", zh: "我们去公园玩吧！" },
          choices: [
            { en: "OK, let's play!", zh: "好，我们玩吧！", ok: true, why: "答应邀请，可以重复 Let's play" },
            { en: "Play I you.", zh: "玩我你。", ok: false, why: "缺少 let's，听起来不像一句邀请" },
            { en: "Park is play me.", zh: "公园是玩我。", ok: false, why: "单词拼在一起，句子还没有成形" }
          ],
          reply: { en: "Come on!", zh: "来吧！" }
        },
        {
          pip: { en: "Can you run?", zh: "你会跑吗？" },
          choices: [
            { en: "Yes, I can run.", zh: "是的，我会跑。", ok: true, why: "can 后面直接加动词原形：can run" },
            { en: "Yes, I can running.", zh: "是的，我能跑着。", ok: false, why: "can 后面不用 running，用 run" },
            { en: "I run can.", zh: "我跑会。", ok: false, why: "can 要放在 run 前面" }
          ],
          reply: { en: "You are fast!", zh: "你真快！" }
        }
      ]
    },
    {
      id: "kid-pencil",
      level: "kid",
      title: "借铅笔",
      emoji: "✏️",
      blurb: "礼貌地借东西",
      steps: [
        {
          pip: { en: "I forgot my pencil. Can I borrow one?", zh: "我忘带铅笔了。我可以借一支吗？" },
          choices: [
            { en: "Sure, here you are.", zh: "当然，给你。", ok: true, why: "把东西递给别人，常说 Here you are." },
            { en: "I borrow you.", zh: "我借你。", ok: false, why: "这句会听成“我借走你”。借出可以说 Here you are." },
            { en: "Pencil no have.", zh: "铅笔没有。", ok: false, why: "想说没有，要用 I don't have a pencil." }
          ],
          reply: { en: "Thank you!", zh: "谢谢你！" }
        },
        {
          pip: { en: "You are kind. Thank you.", zh: "你真好。谢谢。" },
          choices: [
            { en: "You're welcome.", zh: "不客气。", ok: true, why: "回答谢谢，用 You're welcome." },
            { en: "Thank your.", zh: "谢谢你的。", ok: false, why: "谢谢你是 Thank you，不是 Thank your" },
            { en: "Welcome you are.", zh: "欢迎你是。", ok: false, why: "语序要用 You're welcome" }
          ],
          reply: { en: "Let's do our homework.", zh: "我们来做作业吧。" }
        }
      ]
    },
    {
      id: "kid-weather",
      level: "kid",
      title: "今天天气",
      emoji: "🌤️",
      blurb: "聊聊要不要出门",
      steps: [
        {
          pip: { en: "How's the weather today?", zh: "今天天气怎么样？" },
          choices: [
            { en: "It's sunny today.", zh: "今天是晴天。", ok: true, why: "说天气常用 It's + 天气：It's sunny." },
            { en: "Weather are sun.", zh: "天气是太阳们。", ok: false, why: "天气当一件事，用 It's sunny，不用 are" },
            { en: "I weather fine.", zh: "我天气好。", ok: false, why: "天气不是人，主语用 it" }
          ],
          reply: { en: "Sounds nice.", zh: "听起来不错。" }
        },
        {
          pip: { en: "Shall we go outside?", zh: "我们出去好吗？" },
          choices: [
            { en: "Good idea!", zh: "好主意！", ok: true, why: "赞成一个提议，可以说 Good idea!" },
            { en: "Outside we shall go yes.", zh: "外面我们将去是。", ok: false, why: "太绕了。一句 Good idea 就够" },
            { en: "Go outside is me.", zh: "出去是我。", ok: false, why: "意思变成了“出去的人是我”" }
          ],
          reply: { en: "Let's go!", zh: "走吧！" }
        }
      ]
    },
    {
      id: "kid-lunch",
      level: "kid",
      title: "吃午饭",
      emoji: "🍚",
      blurb: "点一份简单的午餐",
      steps: [
        {
          pip: { en: "I'm hungry. What do you want for lunch?", zh: "我饿了。你午饭想吃什么？" },
          choices: [
            { en: "I'd like some rice, please.", zh: "我想要一些米饭。", ok: true, why: "点餐礼貌说法：I'd like …, please." },
            { en: "I want lunch is rice.", zh: "我想午饭是米饭。", ok: false, why: "中间多了 is。说 I want some rice 也可以" },
            { en: "Hungry food me.", zh: "饿食物我。", ok: false, why: "这还不是一句完整的话" }
          ],
          reply: { en: "Rice sounds good.", zh: "米饭听起来不错。" }
        },
        {
          pip: { en: "Anything else?", zh: "还要别的吗？" },
          choices: [
            { en: "A glass of water, please.", zh: "请给我一杯水。", ok: true, why: "再加一样东西，记得说 please" },
            { en: "Water glass me.", zh: "水杯我。", ok: false, why: "一杯水是 a glass of water" },
            { en: "I water want.", zh: "我水想要。", ok: false, why: "want 要放在 water 前面" }
          ],
          reply: { en: "Here you are.", zh: "给你。" }
        }
      ]
    },
    {
      id: "grow-late",
      level: "grow",
      title: "迟到了",
      emoji: "🚌",
      blurb: "把道歉说完整",
      steps: [
        {
          pip: { en: "You're late. What happened?", zh: "你迟到了。怎么回事？" },
          choices: [
            { en: "I'm sorry I'm late. The bus was slow.", zh: "对不起我迟到了。公交车很慢。", ok: true, why: "先道歉，再用过去式说原因：was slow" },
            { en: "I late sorry bus.", zh: "我迟到对不起公交。", ok: false, why: "单词还没连成句子" },
            { en: "Sorry is me late.", zh: "对不起是我迟到。", ok: false, why: "道歉用 I'm sorry，不是 Sorry is me" }
          ],
          reply: { en: "Thanks for telling me.", zh: "谢谢你告诉我。" }
        },
        {
          pip: { en: "Please try to come on time tomorrow.", zh: "明天请尽量准时到。" },
          choices: [
            { en: "I will. Thanks for waiting.", zh: "我会的。谢谢你等我。", ok: true, why: "答应之后，记得感谢对方等待" },
            { en: "I will to on time.", zh: "我将要准时。", ok: false, why: "will 后面直接加动词：I will come on time" },
            { en: "Tomorrow late no.", zh: "明天迟到不。", ok: false, why: "想说不再迟到：I won't be late." }
          ],
          reply: { en: "See you tomorrow.", zh: "明天见。" }
        }
      ]
    },
    {
      id: "grow-advice",
      level: "grow",
      title: "给建议",
      emoji: "💡",
      blurb: "用 could 提一个办法",
      steps: [
        {
          pip: { en: "I want to improve my English. Any ideas?", zh: "我想提高英语。有什么办法吗？" },
          choices: [
            { en: "You could practice a little every day.", zh: "你可以每天练一点。", ok: true, why: "提建议常用 You could …，语气比较温和" },
            { en: "You improve English do.", zh: "你提高英语做。", ok: false, why: "缺少 could，动词顺序也不对" },
            { en: "English you should do improve.", zh: "英语你应该做提高。", ok: false, why: "should 后面跟动词原形，说 You should practice" }
          ],
          reply: { en: "That sounds possible.", zh: "这听起来做得到。" }
        },
        {
          pip: { en: "Where should I start?", zh: "我该从哪里开始？" },
          choices: [
            { en: "Start with one short talk today.", zh: "今天先做一段很短的对话。", ok: true, why: "祈使句直接用动词开头：Start with …" },
            { en: "You starting today talk.", zh: "你正在开始今天谈话。", ok: false, why: "建议对方做，用 Start 或 You can start" },
            { en: "Talk short is start.", zh: "谈话短是开始。", ok: false, why: "意思糊在一起了" }
          ],
          reply: { en: "OK. I'll start today.", zh: "好。我今天就开始。" }
        }
      ]
    },
    {
      id: "grow-library",
      level: "grow",
      title: "问路",
      emoji: "📖",
      blurb: "问图书馆怎么走",
      steps: [
        {
          pip: { en: "Excuse me, where is the library?", zh: "打扰一下，图书馆在哪里？" },
          choices: [
            { en: "Go straight, then turn left.", zh: "直走，然后左转。", ok: true, why: "指路用短句：Go straight. Turn left." },
            { en: "Library is go left straight.", zh: "图书馆是走左直。", ok: false, why: "方向要分成动作：先 straight，再 left" },
            { en: "Where library me know.", zh: "哪里图书馆我知道。", ok: false, why: "你是在指路，不是在重复问题" }
          ],
          reply: { en: "Go straight, then turn left. Got it.", zh: "直走再左转。记住了。" }
        },
        {
          pip: { en: "Is it far from here?", zh: "离这里远吗？" },
          choices: [
            { en: "No. It's about two minutes.", zh: "不远。大约两分钟。", ok: true, why: "It 指路程或地方：It's about two minutes." },
            { en: "Far is not two minute.", zh: "远不是两分钟。", ok: false, why: "分钟复数是 minutes，句子用 It's about …" },
            { en: "Here far no is.", zh: "这里远不是。", ok: false, why: "想说不远：It's not far." }
          ],
          reply: { en: "Thank you for your help.", zh: "谢谢你的帮助。" }
        }
      ]
    }
  ],
  oops: [
    {
      id: "s-am",
      level: "starter",
      words: ["I", "is", "happy."],
      wrong: 1,
      hint: "说到自己的时候，be 动词用哪一个？",
      fixes: [
        { label: "am", ok: true },
        { label: "are", ok: false, why: "are 是 you / we / they 在用" },
        { label: "be", ok: false, why: "句子里要换成 am，不是留着 be" }
      ],
      rule: "说到自己：I am happy. 不说 I is。",
      good: "I am happy."
    },
    {
      id: "s-likes",
      level: "starter",
      words: ["She", "like", "cats."],
      wrong: 1,
      hint: "她是一个人，动词要不要变化？",
      fixes: [
        { label: "likes", ok: true },
        { label: "liking", ok: false, why: "这里不是“正在喜欢”" },
        { label: "liked", ok: false, why: "这里没说昨天，不是过去的事" }
      ],
      rule: "she / he 后面，like 要加 s：She likes cats.",
      good: "She likes cats."
    },
    {
      id: "s-you",
      level: "starter",
      words: ["Thank", "your."],
      wrong: 1,
      hint: "谢谢你，最后一个词是 you 还是 your？",
      fixes: [
        { label: "you.", ok: true },
        { label: "yours.", ok: false, why: "yours 是“你的东西”" },
        { label: "you're.", ok: false, why: "you're 是“你是”" }
      ],
      rule: "谢谢你是 Thank you. your 的意思是“你的”。",
      good: "Thank you."
    },
    {
      id: "s-an",
      level: "starter",
      words: ["I", "have", "a", "apple."],
      wrong: 2,
      hint: "apple 开头的音，前面用 a 还是 an？",
      fixes: [
        { label: "an", ok: true },
        { label: "the", ok: false, why: "the 是在说“那一个”，这里只是“一个”" },
        { label: "one", ok: false, why: "one 是数字 1，这句话里用 an 更自然" }
      ],
      rule: "apple 以元音音素开头，一个苹果说 an apple。",
      good: "I have an apple."
    },
    {
      id: "s-his",
      level: "starter",
      words: ["He", "name", "is", "Tom."],
      wrong: 0,
      hint: "“他的名字”第一个词该怎么说？",
      fixes: [
        { label: "His", ok: true },
        { label: "He's", ok: false, why: "He's 是 He is，他是" },
        { label: "Him", ok: false, why: "him 是“他”做宾语时用的" }
      ],
      rule: "他的名字：His name is Tom. 不说 He name。",
      good: "His name is Tom."
    },
    {
      id: "s-teacher",
      level: "starter",
      words: ["This", "is", "a", "techer."],
      wrong: 3,
      hint: "老师这个词，拼写里少了什么？",
      fixes: [
        { label: "teacher.", ok: true },
        { label: "teach.", ok: false, why: "teach 是动词“教”" },
        { label: "teaching.", ok: false, why: "teaching 是“教学”，不是老师本人" }
      ],
      rule: "老师是 teacher，中间有 a：t-e-a-c-h-e-r。",
      good: "This is a teacher."
    },
    {
      id: "k-goes",
      level: "kid",
      words: ["She", "go", "to", "school", "every", "day."],
      wrong: 1,
      hint: "every day 表示经常，she 后面的 go 要变化。",
      fixes: [
        { label: "goes", ok: true },
        { label: "going", ok: false, why: "every day 不是正在去" },
        { label: "gone", ok: false, why: "gone 通常和 have 一起用" }
      ],
      rule: "她每天去：She goes to school. go 要变成 goes。",
      good: "She goes to school every day."
    },
    {
      id: "k-sing",
      level: "kid",
      words: ["He", "can", "sings", "well."],
      wrong: 2,
      hint: "can 后面的动词用什么形式？",
      fixes: [
        { label: "sing", ok: true },
        { label: "sang", ok: false, why: "sang 是过去式，can 后面不用" },
        { label: "singing", ok: false, why: "can 后面不用 ing" }
      ],
      rule: "can 后面用动词原形：He can sing. 不要加 s。",
      good: "He can sing well."
    },
    {
      id: "k-agree",
      level: "kid",
      words: ["I", "am", "agree", "with", "you."],
      wrong: 1,
      hint: "agree 已经是动词了，前面还需要 am 吗？",
      fixes: [
        { label: "删掉 am", ok: true, action: "delete" },
        { label: "is", ok: false, why: "不是把 am 换成 is" },
        { label: "be", ok: false, why: "agree 前面不需要 be 动词" }
      ],
      rule: "同意直接说 I agree. agree 是动词，前面不要 am。",
      good: "I agree with you."
    },
    {
      id: "k-went",
      level: "kid",
      words: ["Yesterday", "I", "go", "to", "the", "park."],
      wrong: 2,
      hint: "yesterday 是昨天，动词要用过去式。",
      fixes: [
        { label: "went", ok: true },
        { label: "goed", ok: false, why: "go 的过去式是不规则的 went" },
        { label: "going", ok: false, why: "昨天的事不用 going" }
      ],
      rule: "昨天去了：Yesterday I went. go 的过去式是 went。",
      good: "Yesterday I went to the park."
    },
    {
      id: "k-are",
      level: "kid",
      words: ["There", "is", "many", "books."],
      wrong: 1,
      hint: "books 是很多本，be 动词用 is 还是 are？",
      fixes: [
        { label: "are", ok: true },
        { label: "be", ok: false, why: "这里需要 are，不是 be" },
        { label: "am", ok: false, why: "am 只和 I 一起用" }
      ],
      rule: "很多本书：There are many books. 复数用 are。",
      good: "There are many books."
    },
    {
      id: "k-doesnt",
      level: "kid",
      words: ["She", "don't", "like", "milk."],
      wrong: 1,
      hint: "she 的否定，是 don't 还是 doesn't？",
      fixes: [
        { label: "doesn't", ok: true },
        { label: "not", ok: false, why: "不能只把 don't 换成 not" },
        { label: "isn't", ok: false, why: "like 是行为动词，否定用 doesn't" }
      ],
      rule: "她不喜欢：She doesn't like milk. don't 留给 I / you / we / they。",
      good: "She doesn't like milk."
    },
    {
      id: "g-seeing",
      level: "grow",
      words: ["I", "look", "forward", "to", "see", "you."],
      wrong: 4,
      hint: "look forward to 里面的 to，后面接什么？",
      fixes: [
        { label: "seeing", ok: true },
        { label: "saw", ok: false, why: "不是过去式的问题" },
        { label: "seen", ok: false, why: "这里不是 have seen" }
      ],
      rule: "这里的 to 是介词，后面接 doing：look forward to seeing you.",
      good: "I look forward to seeing you."
    },
    {
      id: "g-if",
      level: "grow",
      words: ["If", "I", "will", "have", "time,", "I", "will", "call."],
      wrong: 2,
      hint: "if 从句里，还要不要这个 will？",
      fixes: [
        { label: "删掉 will", ok: true, action: "delete" },
        { label: "would", ok: false, why: "不是把 will 换成 would" },
        { label: "can", ok: false, why: "这句想说的是“如果我有时间”" }
      ],
      rule: "if 说可能的将来，从句用现在式：If I have time, I will call.",
      good: "If I have time, I will call."
    },
    {
      id: "g-told",
      level: "grow",
      words: ["She", "told", "to", "me", "a", "story."],
      wrong: 2,
      hint: "tell 后面接人的时候，要不要 to？",
      fixes: [
        { label: "删掉 to", ok: true, action: "delete" },
        { label: "for", ok: false, why: "不是换成 for" },
        { label: "with", ok: false, why: "tell 某人，中间不加 with" }
      ],
      rule: "tell 后面直接加人：She told me a story.",
      good: "She told me a story."
    },
    {
      id: "g-taller",
      level: "grow",
      words: ["He", "is", "more", "taller", "than", "me."],
      wrong: 2,
      hint: "taller 已经是比较级了。",
      fixes: [
        { label: "删掉 more", ok: true, action: "delete" },
        { label: "most", ok: false, why: "most 是最高级，而且这里是两个人比" },
        { label: "much", ok: false, why: "可以说明程度 much taller，但这句错在 more" }
      ],
      rule: "taller 本身就是比较级，不要再加 more：He is taller than me.",
      good: "He is taller than me."
    },
    {
      id: "g-that",
      level: "grow",
      words: ["The", "book", "what", "I", "bought", "is", "new."],
      wrong: 2,
      hint: "修饰 book 的关系词，用 what 对吗？",
      fixes: [
        { label: "that", ok: true },
        { label: "who", ok: false, why: "who 用来指人" },
        { label: "where", ok: false, why: "where 用来指地方" }
      ],
      rule: "修饰东西，用 that 或 which：the book that I bought.",
      good: "The book that I bought is new."
    },
    {
      id: "g-go",
      level: "grow",
      words: ["I", "didn't", "went", "home."],
      wrong: 2,
      hint: "didn't 后面的动词用什么形式？",
      fixes: [
        { label: "go", ok: true },
        { label: "gone", ok: false, why: "didn't 后面不用 gone" },
        { label: "going", ok: false, why: "didn't 后面不用 going" }
      ],
      rule: "didn't 已经表示过去，后面用原形：I didn't go home.",
      good: "I didn't go home."
    }
  ],
  lessons: [
    {
      id: "s-hello",
      level: "starter",
      title: "打招呼",
      emoji: "👋",
      phrases: [
        { en: "Hello!", zh: "你好！", tip: "见面第一句。说的时候可以轻轻扬起来。" },
        { en: "My name is {name}.", zh: "我的名字是{name}。", tip: "介绍自己：My name is，再加上名字。" },
        { en: "Nice to meet you.", zh: "很高兴认识你。", tip: "第一次见面，接在名字后面。" }
      ],
      drills: [
        { en: "Hello!", prompt: "____!", answer: "Hello", options: ["Hello", "Apple", "Book"], zh: "你好！" },
        { en: "My name is {name}.", prompt: "My ____ is {name}.", answer: "name", options: ["name", "cat", "red"], zh: "我的名字是…" },
        { en: "Nice to meet you.", prompt: "Nice to ____ you.", answer: "meet", options: ["meet", "eat", "run"], zh: "很高兴认识你。" }
      ],
      apply: [
        {
          pip: { en: "Hi! What's your name?", zh: "嗨！你叫什么名字？" },
          choices: [
            { en: "My name is {name}.", zh: "我的名字是{name}。", ok: true, why: "问名字，就用今天的 My name is。" },
            { en: "I name {name}.", zh: "我名字{name}。", ok: false, why: "英语不说 I name，要说 My name is。" },
            { en: "Hello cat.", zh: "你好，猫。", ok: false, why: "这句没有回答名字。" }
          ],
          reply: { en: "Nice to meet you!", zh: "很高兴认识你！" }
        },
        {
          pip: { en: "Nice to meet you too.", zh: "我也很高兴认识你。" },
          choices: [
            { en: "Hello! Nice to meet you.", zh: "你好！很高兴认识你。", ok: true, why: "把今天的两句接在一起，就很自然。" },
            { en: "Meet is cat.", zh: "认识是猫。", ok: false, why: "单词没有连成一句问候。" },
            { en: "Name you nice.", zh: "名字你高兴。", ok: false, why: "语序反了，对方听不出问候。" }
          ]
        }
      ]
    },
    {
      id: "s-want",
      level: "starter",
      title: "我想要",
      emoji: "🍎",
      phrases: [
        { en: "I want an apple.", zh: "我想要一个苹果。", tip: "想要什么：I want + 东西。苹果前面用 an。" },
        { en: "I want some water.", zh: "我想要一些水。", tip: "水不能一个一个数，前面加 some。" },
        { en: "Thank you.", zh: "谢谢。", tip: "拿到东西之后说 Thank you。" }
      ],
      drills: [
        { en: "I want an apple.", prompt: "I ____ an apple.", answer: "want", options: ["want", "see", "run"], zh: "我想要一个苹果。" },
        { en: "I want some water.", prompt: "I want some ____.", answer: "water", options: ["water", "book", "sun"], zh: "我想要一些水。" },
        { en: "Thank you.", prompt: "____ you.", answer: "Thank", options: ["Thank", "Hello", "Meet"], zh: "谢谢你。" }
      ],
      apply: [
        {
          pip: { en: "What do you want?", zh: "你想要什么？" },
          choices: [
            { en: "I want an apple.", zh: "我想要一个苹果。", ok: true, why: "直接用 I want 说出东西。" },
            { en: "Want apple I.", zh: "要苹果我。", ok: false, why: "I want 要放在前面。" },
            { en: "I apple want.", zh: "我苹果想要。", ok: false, why: "want 要放在 apple 前面。" }
          ],
          reply: { en: "Here you are.", zh: "给你。" }
        },
        {
          pip: { en: "Here is your apple.", zh: "这是你的苹果。" },
          choices: [
            { en: "Thank you.", zh: "谢谢。", ok: true, why: "接到东西，说 Thank you。" },
            { en: "Thank your.", zh: "谢谢你的。", ok: false, why: "谢谢你是 Thank you，不是 Thank your。" },
            { en: "You thank.", zh: "你谢谢。", ok: false, why: "顺序是 Thank you。" }
          ]
        }
      ]
    },
    {
      id: "s-see",
      level: "starter",
      title: "我看见",
      emoji: "🐱",
      phrases: [
        { en: "I see a cat.", zh: "我看见一只猫。", tip: "看见什么：I see + 东西。" },
        { en: "It is red.", zh: "它是红色的。", tip: "说颜色：It is + 颜色。" },
        { en: "I like it.", zh: "我喜欢它。", tip: "喜欢刚刚说的东西，用 I like it。" }
      ],
      drills: [
        { en: "I see a cat.", prompt: "I ____ a cat.", answer: "see", options: ["see", "eat", "am"], zh: "我看见一只猫。" },
        { en: "It is red.", prompt: "It is ____.", answer: "red", options: ["red", "name", "hello"], zh: "它是红色的。" },
        { en: "I like it.", prompt: "I ____ it.", answer: "like", options: ["like", "name", "meet"], zh: "我喜欢它。" }
      ],
      apply: [
        {
          pip: { en: "Look! What do you see?", zh: "看！你看见什么？" },
          choices: [
            { en: "I see a cat.", zh: "我看见一只猫。", ok: true, why: "看见什么，就说 I see…" },
            { en: "See cat I.", zh: "看见猫我。", ok: false, why: "要用 I see a cat。" },
            { en: "Cat is see.", zh: "猫是看见。", ok: false, why: "这句话没有说“我看见”。" }
          ],
          reply: { en: "What color is it?", zh: "它是什么颜色？" }
        },
        {
          pip: { en: "What color is the cat?", zh: "这只猫是什么颜色？" },
          choices: [
            { en: "It is red. I like it.", zh: "它是红色的。我喜欢它。", ok: true, why: "先说颜色，再说喜欢。" },
            { en: "Red it like.", zh: "红它喜欢。", ok: false, why: "要分成 It is red. I like it." },
            { en: "I color cat.", zh: "我颜色猫。", ok: false, why: "还不是一句完整的话。" }
          ]
        }
      ]
    },
    {
      id: "k-school",
      level: "kid",
      title: "去上学",
      emoji: "🏫",
      phrases: [
        { en: "I go to school.", zh: "我去上学。", tip: "每天去做的事，用 go。她去才说 goes。" },
        { en: "This is my friend.", zh: "这是我的朋友。", tip: "介绍别人：This is…" },
        { en: "See you tomorrow.", zh: "明天见。", tip: "分开的时候可以说 See you tomorrow。" }
      ],
      drills: [
        { en: "I go to school.", prompt: "I ____ to school.", answer: "go", options: ["go", "eat", "see"], zh: "我去上学。" },
        { en: "This is my friend.", prompt: "This is my ____.", answer: "friend", options: ["friend", "water", "red"], zh: "这是我的朋友。" },
        { en: "See you tomorrow.", prompt: "See you ____.", answer: "tomorrow", options: ["tomorrow", "apple", "hello"], zh: "明天见。" }
      ],
      apply: [
        {
          pip: { en: "Where are you going?", zh: "你要去哪里？" },
          choices: [
            { en: "I go to school.", zh: "我去上学。", ok: true, why: "去上学，用今天的第一句。" },
            { en: "School go I.", zh: "学校去我。", ok: false, why: "要说 I go to school。" },
            { en: "I school is.", zh: "我学校是。", ok: false, why: "这句没有说出“去”。" }
          ],
          reply: { en: "Who is with you?", zh: "谁和你一起？" }
        },
        {
          pip: { en: "Is this your classmate?", zh: "这是你的同学吗？" },
          choices: [
            { en: "This is my friend. See you tomorrow.", zh: "这是我的朋友。明天见。", ok: true, why: "先介绍朋友，再说明天见。" },
            { en: "Friend this tomorrow.", zh: "朋友这个明天。", ok: false, why: "要说 This is my friend。" },
            { en: "See friend is.", zh: "见朋友是。", ok: false, why: "明天见是 See you tomorrow。" }
          ]
        }
      ]
    },
    {
      id: "k-lunch",
      level: "kid",
      title: "吃午饭",
      emoji: "🍚",
      phrases: [
        { en: "I'm hungry.", zh: "我饿了。", tip: "I'm 是 I am。说自己的感觉，用 I'm。" },
        { en: "I'd like some rice, please.", zh: "请给我一些米饭。", tip: "点餐更礼貌：I'd like…, please。" },
        { en: "Can I have some water?", zh: "我可以要一些水吗？", tip: "再要一样东西，用 Can I have…?" }
      ],
      drills: [
        { en: "I'm hungry.", prompt: "I'm ____.", answer: "hungry", options: ["hungry", "school", "friend"], zh: "我饿了。" },
        { en: "I'd like some rice, please.", prompt: "I'd like some ____, please.", answer: "rice", options: ["rice", "friend", "tomorrow"], zh: "请给我一些米饭。" },
        { en: "Can I have some water?", prompt: "Can I ____ some water?", answer: "have", options: ["have", "school", "friend"], zh: "我可以要一些水吗？" }
      ],
      apply: [
        {
          pip: { en: "Are you hungry?", zh: "你饿了吗？" },
          choices: [
            { en: "I'm hungry. I'd like some rice, please.", zh: "我饿了。请给我一些米饭。", ok: true, why: "先说饿，再用 I'd like 点餐。" },
            { en: "Hungry rice is me.", zh: "饿米饭是我。", ok: false, why: "要说 I'm hungry。" },
            { en: "I like rice am.", zh: "我喜欢米饭是。", ok: false, why: "点餐用 I'd like，不是把 am 放在最后。" }
          ],
          reply: { en: "Anything to drink?", zh: "喝点什么？" }
        },
        {
          pip: { en: "What would you like to drink?", zh: "你想喝什么？" },
          choices: [
            { en: "Can I have some water?", zh: "我可以要一些水吗？", ok: true, why: "要一杯水，用 Can I have…?" },
            { en: "Water have I can.", zh: "水有我可以。", ok: false, why: "顺序是 Can I have some water?" },
            { en: "I water some.", zh: "我水一些。", ok: false, why: "some water 要放在 have 后面。" }
          ]
        }
      ]
    },
    {
      id: "k-help",
      level: "kid",
      title: "请帮帮我",
      emoji: "🙋",
      phrases: [
        { en: "Can you help me?", zh: "你能帮我吗？", tip: "请人帮忙：Can you help me?" },
        { en: "I don't understand.", zh: "我不明白。", tip: "没听懂就直接说，这很有用。" },
        { en: "Please say it again.", zh: "请再说一次。", tip: "请对方重复：Please say it again。" }
      ],
      drills: [
        { en: "Can you help me?", prompt: "Can you ____ me?", answer: "help", options: ["help", "school", "rice"], zh: "你能帮我吗？" },
        { en: "I don't understand.", prompt: "I don't ____.", answer: "understand", options: ["understand", "hungry", "tomorrow"], zh: "我不明白。" },
        { en: "Please say it again.", prompt: "Please ____ it again.", answer: "say", options: ["say", "go", "see"], zh: "请再说一次。" }
      ],
      apply: [
        {
          pip: { en: "This word is difficult.", zh: "这个词有点难。" },
          choices: [
            { en: "I don't understand. Can you help me?", zh: "我不明白。你能帮我吗？", ok: true, why: "先说没听懂，再请人帮忙。" },
            { en: "Understand don't I.", zh: "明白不我。", ok: false, why: "要说 I don't understand。" },
            { en: "Help is word.", zh: "帮助是单词。", ok: false, why: "请求帮忙要用 Can you help me?" }
          ],
          reply: { en: "Sure. Listen once more.", zh: "当然。再听一遍。" }
        },
        {
          pip: { en: "Did you catch that?", zh: "你听清了吗？" },
          choices: [
            { en: "Please say it again.", zh: "请再说一次。", ok: true, why: "没听清，就请对方再说一次。" },
            { en: "Again say please it.", zh: "一次说请它。", ok: false, why: "顺序是 Please say it again。" },
            { en: "I say you.", zh: "我说你。", ok: false, why: "这句变成了“我说你”。" }
          ]
        }
      ]
    },
    {
      id: "g-late",
      level: "grow",
      title: "迟到道歉",
      emoji: "🚌",
      phrases: [
        { en: "I'm sorry I'm late.", zh: "对不起，我迟到了。", tip: "先道歉，再说迟到。两个 I'm 都要留着。" },
        { en: "The bus was slow.", zh: "公交车太慢了。", tip: "说已经发生的原因，用 was。" },
        { en: "I'll be on time.", zh: "我会准时到。", tip: "接下来会做的事，用 I'll。" }
      ],
      drills: [
        { en: "I'm sorry I'm late.", prompt: "I'm ____ I'm late.", answer: "sorry", options: ["sorry", "happy", "hungry"], zh: "对不起，我迟到了。" },
        { en: "The bus was slow.", prompt: "The bus was ____.", answer: "slow", options: ["slow", "apple", "friend"], zh: "公交车太慢了。" },
        { en: "I'll be on time.", prompt: "I'll be on ____.", answer: "time", options: ["time", "water", "name"], zh: "我会准时的。" }
      ],
      apply: [
        {
          pip: { en: "You are late. What happened?", zh: "你迟到了。怎么了？" },
          choices: [
            { en: "I'm sorry I'm late. The bus was slow.", zh: "对不起，我迟到了。公交车太慢了。", ok: true, why: "先道歉，再用过去式说原因。" },
            { en: "Late sorry bus.", zh: "迟到对不起公交。", ok: false, why: "要说 I'm sorry I'm late。" },
            { en: "The bus is sorry.", zh: "公交车很对不起。", ok: false, why: "道歉的人是你，不是公交车。" }
          ],
          reply: { en: "Thanks for telling me.", zh: "谢谢你告诉我。" }
        },
        {
          pip: { en: "Please come on time tomorrow.", zh: "明天请准时到。" },
          choices: [
            { en: "I'll be on time.", zh: "我会准时到。", ok: true, why: "答应接下来的事，用 I'll。" },
            { en: "I late no tomorrow.", zh: "我迟到不明天。", ok: false, why: "要说 I'll be on time。" },
            { en: "Time is me.", zh: "时间是我。", ok: false, why: "这句没有答应。" }
          ]
        }
      ]
    },
    {
      id: "g-advice",
      level: "grow",
      title: "给个建议",
      emoji: "💡",
      phrases: [
        { en: "You could practice every day.", zh: "你可以每天练一点。", tip: "给建议用 could，语气比 must 柔和。" },
        { en: "That sounds good.", zh: "听起来不错。", tip: "赞成一个办法：That sounds good。" },
        { en: "I'll start today.", zh: "我今天就开始。", tip: "把建议收成自己的行动：I'll start today。" }
      ],
      drills: [
        { en: "You could practice every day.", prompt: "You could ____ every day.", answer: "practice", options: ["practice", "sorry", "late"], zh: "你可以每天练习。" },
        { en: "That sounds good.", prompt: "That ____ good.", answer: "sounds", options: ["sounds", "sound", "sorry"], zh: "听起来不错。" },
        { en: "I'll start today.", prompt: "I'll ____ today.", answer: "start", options: ["start", "late", "sorry"], zh: "我今天就开始。" }
      ],
      apply: [
        {
          pip: { en: "I want to improve my English. Any ideas?", zh: "我想提高英语。有什么办法？" },
          choices: [
            { en: "You could practice every day.", zh: "你可以每天练一点。", ok: true, why: "提建议，用 You could…" },
            { en: "You practice English do.", zh: "你练习英语做。", ok: false, why: "缺少 could，句子还不完整。" },
            { en: "Every day you doing.", zh: "每天你正在做。", ok: false, why: "建议对方做，用 could practice。" }
          ],
          reply: { en: "That sounds possible.", zh: "这听起来做得到。" }
        },
        {
          pip: { en: "Should I wait until Monday?", zh: "我要等到星期一吗？" },
          choices: [
            { en: "That sounds good, but I'll start today.", zh: "听起来不错，不过我今天就开始。", ok: true, why: "可以赞成，再补上自己的决定。" },
            { en: "Start today is sounds.", zh: "开始今天是听起来。", ok: false, why: "要说 That sounds good。" },
            { en: "I starting Monday.", zh: "我正在开始星期一。", ok: false, why: "今天开始：I'll start today。" }
          ]
        }
      ]
    },
    {
      id: "g-way",
      level: "grow",
      title: "问一条路",
      emoji: "📖",
      phrases: [
        { en: "Excuse me, where is the library?", zh: "打扰一下，图书馆在哪里？", tip: "问路先说 Excuse me。" },
        { en: "Go straight and turn left.", zh: "直走，然后左转。", tip: "指路分成两个动作：straight，然后 left。" },
        { en: "Thank you for your help.", zh: "谢谢你的帮助。", tip: "帮完忙，用 Thank you for…" }
      ],
      drills: [
        { en: "Excuse me, where is the library?", prompt: "Excuse me, where is the ____?", answer: "library", options: ["library", "sorry", "practice"], zh: "图书馆在哪里？" },
        { en: "Go straight and turn left.", prompt: "Go straight and turn ____.", answer: "left", options: ["left", "library", "sorry"], zh: "直走再左转。" },
        { en: "Thank you for your help.", prompt: "Thank you for your ____.", answer: "help", options: ["help", "late", "bus"], zh: "谢谢你的帮助。" }
      ],
      apply: [
        {
          pip: { en: "You look lost. Can I help?", zh: "你好像迷路了。需要帮忙吗？" },
          choices: [
            { en: "Excuse me, where is the library?", zh: "打扰一下，图书馆在哪里？", ok: true, why: "问路先 Excuse me，再说 where is。" },
            { en: "Library where me.", zh: "图书馆哪里我。", ok: false, why: "要说 Where is the library?" },
            { en: "Where library is go.", zh: "哪里图书馆是走。", ok: false, why: "问和指路先分开。" }
          ],
          reply: { en: "Go straight and turn left.", zh: "直走，然后左转。" }
        },
        {
          pip: { en: "Go straight and turn left. It is close.", zh: "直走再左转。很近。" },
          choices: [
            { en: "Thank you for your help.", zh: "谢谢你的帮助。", ok: true, why: "得到帮助后，用 Thank you for your help。" },
            { en: "Help your thank.", zh: "帮助你的谢谢。", ok: false, why: "顺序是 Thank you for your help。" },
            { en: "Straight is thank.", zh: "直走是谢谢。", ok: false, why: "这句没有谢谢对方。" }
          ]
        }
      ]
    }
  ]
};
