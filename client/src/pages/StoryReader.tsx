import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Heart,
  BookOpen,
  Share2,
  ChevronLeft,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { useStoryData } from "@/hooks/useStoryData";
import { Story } from "@/hooks/useStoryData";

/**
 * Lifebrary 故事閱讀頁面
 * 設計理念：溫暖復古文藝風
 * - 寬敞的內容區域，邊距寬大，如翻開書籍
 * - 情緒互動系統（感動、共鳴、激勵）
 * - 故事狀態顯示（已發布、審查中、已驗證）
 */

interface EmotionReaction {
  type: "moved" | "resonance" | "inspired";
  label: string;
  icon: string;
  color: string;
}

const emotionReactions: EmotionReaction[] = [
  {
    type: "moved",
    label: "感動",
    icon: "❤️",
    color: "text-red-500",
  },
  {
    type: "resonance",
    label: "共鳴",
    icon: "✨",
    color: "text-yellow-500",
  },
  {
    type: "inspired",
    label: "激勵",
    icon: "⚡",
    color: "text-blue-500",
  },
];

// 模擬故事數據
const storyData: Record<
  string,
  {
    id: number;
    title: string;
    author: string;
    authorAvatar: string;
    publishDate: string;
    category: string;
    status: "published" | "reviewing" | "verified";
    content: string;
    emotionStats: Record<string, number>;
    viewCount: number;
  }
> = {
  "1": {
    id: 1,
    title: "那個改變我人生的決定",
    author: "李明",
    authorAvatar: "LM",
    publishDate: "2024年5月10日",
    category: "成長",
    status: "verified",
    content: `二十五歲那年，我做了一個改變人生的決定。

放棄穩定的工作，去追尋心中的夢想。那時候，我的父母反對，朋友們也不理解。但我知道，如果我不去嘗試，我會後悔一輩子。

第一年很難。我在陌生的城市裡，租住在狹小的地下室，每天都在思考自己是否做了正確的選擇。但就在我快要放棄的時候，我遇見了一群志同道合的人。他們鼓勵我，支持我，讓我重新找到了方向。

三年後，我成功了。不是說我變成了富豪，而是我找到了自己真正熱愛的事業，每天都充滿了工作的熱情。更重要的是，我學會了勇敢面對未知，相信自己的直覺。

現在，每當我看到年輕人在為夢想而迷茫時，我都會告訴他們：「勇敢去嘗試吧。最壞的結果，也不過是回到原點。但你會帶著經驗和智慧回來。」

這個決定改變了我的人生軌跡，也改變了我對人生的理解。`,
    emotionStats: {
      moved: 234,
      resonance: 189,
      inspired: 312,
    },
    viewCount: 1523,
  },
};

export default function StoryReader() {
  const { id } = useParams();
  const { getStory, addEmotionReaction, incrementViewCount } = useStoryData();
  const story = getStory(id || "1");
  const [userReactions, setUserReactions] = useState<Set<string>>(new Set());
  const [showShareMenu, setShowShareMenu] = useState(false);

  // 第一次加載時增加閱讀計數
  useEffect(() => {
    if (story && id) {
      incrementViewCount(id);
    }
  }, [id, story]);

  if (!story) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            故事未找到
          </h1>
          <Link href="/explore">
            <a className="text-primary hover:underline">返回探索</a>
          </Link>
        </div>
      </div>
    );
  }

  const toggleReaction = (type: string) => {
    const newReactions = new Set(userReactions);
    if (newReactions.has(type)) {
      newReactions.delete(type);
    } else {
      newReactions.add(type);
    }
    setUserReactions(newReactions);
    
    // 更新數據庫
    if (story && id) {
      addEmotionReaction(id, type as "moved" | "resonance" | "inspired");
    }
  };

  const getStatusBadge = () => {
    switch (story.status) {
      case "verified":
        return (
          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            ✓ 已驗證
          </span>
        );
      case "reviewing":
        return (
          <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
            審查中
          </span>
        );
      default:
        return (
          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            已發布
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 導航欄 */}
      <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 text-2xl font-bold text-primary">
              <BookOpen className="w-6 h-6" />
              <span>Lifebrary</span>
            </a>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/explore">
              <a className="text-foreground hover:text-primary transition">
                探索
              </a>
            </Link>
            <Link href="/profile">
              <a className="text-foreground hover:text-primary transition">
                我的故事
              </a>
            </Link>
          </div>
        </div>
      </nav>

      {/* 返回按鈕 */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/explore">
          <a className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition">
            <ChevronLeft className="w-5 h-5" />
            返回探索
          </a>
        </Link>
      </div>

      {/* 故事內容區域 */}
      <article className="container mx-auto px-4 py-8 max-w-3xl">
        {/* 故事頭部 */}
        <header className="mb-12">
          {/* 分類和狀態 */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block bg-accent/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {story.category}
            </span>
            {getStatusBadge()}
          </div>

          {/* 標題 */}
          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            {story.title}
          </h1>

          {/* 作者信息 */}
          <div className="flex items-center justify-between py-6 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                {story.author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-foreground">{story.author}</p>
                <p className="text-sm text-foreground/60">{story.createdDate}</p>
              </div>
            </div>
            <div className="text-right text-sm text-foreground/60">
              <p>{story.viewCount} 人閱讀</p>
            </div>
          </div>
        </header>

        {/* 故事正文 */}
        <div className="prose prose-lg max-w-none mb-12">
          {story.content.split("\n\n").map((paragraph, idx) => (
            <p
              key={idx}
              className="text-lg text-foreground/90 leading-relaxed mb-6 whitespace-pre-wrap"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* 情緒互動區域 */}
        <section className="bg-secondary/20 rounded-lg p-8 mb-12">
          <h3 className="text-xl font-bold text-foreground mb-6">
            這個故事讓你有什麼感受？
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {emotionReactions.map((reaction) => (
              <button
                key={reaction.type}
                onClick={() => toggleReaction(reaction.type)}
                className={`p-4 rounded-lg border-2 transition duration-300 ${
                  userReactions.has(reaction.type)
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="text-3xl mb-2">{reaction.icon}</div>
                <div className="font-semibold text-foreground mb-1">
                  {reaction.label}
                </div>
                <div className="text-2xl font-bold text-primary mb-1">
                  {story.emotionStats[reaction.type as keyof typeof story.emotionStats]} 人
                </div>
              </button>
            ))}
          </div>

          <p className="text-sm text-foreground/60 mt-6">
            你的反應將幫助其他讀者發現更多有共鳴的故事
          </p>
        </section>

        {/* 故事統計 */}
        <section className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {story.viewCount}
            </div>
            <div className="text-sm text-foreground/60">次閱讀</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {Object.values(story.emotionStats).reduce((a, b) => a + b, 0)}
            </div>
            <div className="text-sm text-foreground/60">份情感共鳴</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {Math.floor(story.content.length / 100)}
            </div>
            <div className="text-sm text-foreground/60">分鐘閱讀時間</div>
          </div>
        </section>

        {/* 分享按鈕 */}
        <div className="flex gap-4 mb-12">
          <Button className="flex-1 bg-primary hover:bg-primary/90">
            <Heart className="w-4 h-4 mr-2" />
            收藏故事
          </Button>
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Share2 className="w-4 h-4 mr-2" />
              分享
            </Button>
            {showShareMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
                <button className="w-full text-left px-4 py-2 hover:bg-secondary/50 transition">
                  複製連結
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-secondary/50 transition">
                  分享到社群媒體
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 相關故事推薦 */}
        <section className="border-t border-border pt-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            你可能也喜歡
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                id: 2,
                title: "母親的手工針線",
                author: "王芳",
                category: "家庭",
              },
              {
                id: 3,
                title: "在異鄉找到家的感覺",
                author: "陳浩",
                category: "冒險",
              },
            ].map((relatedStory) => (
              <Link key={relatedStory.id} href={`/story/${relatedStory.id}`}>
                <a className="group">
                  <div className="bg-card border-2 border-border rounded-lg p-4 hover:border-primary hover:shadow-lg transition">
                    <span className="inline-block bg-accent/20 text-primary px-2 py-1 rounded text-xs font-medium mb-2">
                      {relatedStory.category}
                    </span>
                    <h4 className="font-bold text-foreground group-hover:text-primary transition mb-2">
                      {relatedStory.title}
                    </h4>
                    <p className="text-sm text-foreground/60">
                      作者：{relatedStory.author}
                    </p>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </section>

        {/* 評論區域 */}
        <section className="border-t border-border pt-12 mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            讀者評論
          </h3>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <MessageCircle className="w-12 h-12 text-foreground/30 mx-auto mb-3" />
            <p className="text-foreground/60 mb-4">
              還沒有評論。成為第一個評論者吧！
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              寫下你的想法
            </Button>
          </div>
        </section>
      </article>

      {/* 頁腳 */}
      <footer className="bg-card border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-foreground/60">
          <p>&copy; 2026 Lifebrary. 保留所有權利。</p>
        </div>
      </footer>
    </div>
  );
}
