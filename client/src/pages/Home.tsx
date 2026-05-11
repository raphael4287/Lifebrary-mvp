import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Heart, BookOpen, Users, Sparkles } from "lucide-react";

/**
 * Lifebrary 首頁
 * 設計理念：溫暖復古文藝風
 * - 非對稱佈局，左側大型故事卡片 + 右側細長側欄
 * - 暖色調（米色背景、深棕文字、金色強調）
 * - 手工感邊框和紙張紋理
 */

export default function Home() {
  // 模擬的故事數據
  const featuredStories = [
    {
      id: 1,
      title: "那個改變我人生的決定",
      author: "李明",
      excerpt: "二十五歲那年，我放棄了穩定的工作，選擇追夢。這個決定讓我找到了真正的自己...",
      category: "成長",
      emotionCount: 234,
    },
    {
      id: 2,
      title: "母親的手工針線",
      author: "王芳",
      excerpt: "每一針每一線，都是母親對我的愛。在她的故事裡，我學會了什麼是堅持...",
      category: "家庭",
      emotionCount: 512,
    },
    {
      id: 3,
      title: "在異鄉找到家的感覺",
      author: "陳浩",
      excerpt: "一個人來到陌生城市，卻在這裡遇見了最溫暖的人。這是我的流浪記...",
      category: "冒險",
      emotionCount: 189,
    },
  ];

  const stats = [
    { label: "個故事", value: "2,847", icon: BookOpen },
    { label: "位作者", value: "1,203", icon: Users },
    { label: "份情感共鳴", value: "48,392", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* 導航欄 */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 text-2xl font-bold text-primary">
              <BookOpen className="w-6 h-6" />
              <span className="font-display">Lifebrary</span>
            </a>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/explore">
              <a className="text-foreground hover:text-primary transition">探索</a>
            </Link>
            <Link href="/profile">
              <a className="text-foreground hover:text-primary transition">我的故事</a>
            </Link>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/submit">
                <a>投稿新故事</a>
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* 英雄區段 */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663601285378/jX9f5vVk9MMfFEidkXx2Qz/hero-stories-KvNKQ2gtmQHACDMG7kZCib.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              讓每一段真實人生都被看見、被共鳴
            </h1>
            <p className="text-lg text-foreground/80 max-w-lg">
              Lifebrary 是一個溫暖的故事分享平台。在這裡，每個人的故事都值得被傾聽，每份情感都值得被理解。
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/explore">
                  <a>開始探索</a>
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <Link href="/submit">
                  <a>分享我的故事</a>
                </Link>
              </Button>
            </div>
          </div>

          {/* 右側統計卡片 */}
          <div className="space-y-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <Icon className="w-8 h-8 text-primary" />
                    <div>
                      <div className="text-3xl font-bold text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-sm text-foreground/60">{stat.label}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 精選故事區段 */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-2">精選故事</h2>
            <p className="text-foreground/70">
              這些故事觸動了我們的心靈，希望也能觸動你的
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <Link key={story.id} href={`/story/${story.id}`}>
                <a className="group">
                  <div className="bg-card border-2 border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition duration-300 h-full flex flex-col">
                    {/* 分類標籤 */}
                    <div className="mb-4">
                      <span className="inline-block bg-accent/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {story.category}
                      </span>
                    </div>

                    {/* 標題 */}
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition">
                      {story.title}
                    </h3>

                    {/* 摘要 */}
                    <p className="text-foreground/70 text-sm mb-4 flex-grow">
                      {story.excerpt}
                    </p>

                    {/* 底部信息 */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-sm text-foreground/60">作者：{story.author}</span>
                      <div className="flex items-center gap-2 text-primary">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm font-medium">{story.emotionCount}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 情緒互動系統介紹 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-12 text-center">
              用情感連接彼此
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "感動",
                  description: "被故事中的溫暖和勇氣所感動",
                },
                {
                  icon: Sparkles,
                  title: "共鳴",
                  description: "在他人的故事中找到自己的影子",
                },
                {
                  icon: BookOpen,
                  title: "激勵",
                  description: "從真實故事中汲取力量和智慧",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="text-center">
                    <div className="mb-4 flex justify-center">
                      <Icon className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 行動呼籲區段 */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            你的故事，值得被聽見
          </h2>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
            無論是成長的喜悅、失敗的教訓，還是平凡中的感動，每一段故事都是獨一無二的。
            在 Lifebrary，分享你的故事，與世界連接。
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/submit">
              <a>開始投稿</a>
            </Link>
          </Button>
        </div>
      </section>

      {/* 頁腳 */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-foreground mb-4">Lifebrary</h4>
              <p className="text-sm text-foreground/70">
                讓每一段真實人生都被看見、被共鳴
              </p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">功能</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <Link href="/explore">
                    <a className="hover:text-primary transition">探索故事</a>
                  </Link>
                </li>
                <li>
                  <Link href="/submit">
                    <a className="hover:text-primary transition">投稿故事</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">社群</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    關於我們
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    聯絡我們
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">法律</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    隱私政策
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    使用條款
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-foreground/60">
            <p>&copy; 2026 Lifebrary. 保留所有權利。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
