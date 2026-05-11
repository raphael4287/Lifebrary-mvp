import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Heart,
  BookOpen,
  Search,
  Filter,
  ChevronDown,
  X,
} from "lucide-react";
import { useStoryData } from "@/hooks/useStoryData";

/**
 * Lifebrary 探索頁面
 * 設計理念：溫暖復古文藝風
 * - 左側篩選欄 + 右側故事瀑布流
 * - 支持搜尋、標籤、年份、性別篩選
 * - 多種排序方式
 */

// 模擬故事數據
const mockStories = [
  {
    id: 1,
    title: "那個改變我人生的決定",
    author: "李明",
    excerpt: "二十五歲那年，我放棄了穩定的工作，選擇追夢...",
    category: "成長",
    year: 2024,
    authorGender: "male",
    emotionCount: 234,
    status: "verified",
  },
  {
    id: 2,
    title: "母親的手工針線",
    author: "王芳",
    excerpt: "每一針每一線，都是母親對我的愛...",
    category: "家庭",
    year: 2024,
    authorGender: "female",
    emotionCount: 512,
    status: "published",
  },
  {
    id: 3,
    title: "在異鄉找到家的感覺",
    author: "陳浩",
    excerpt: "一個人來到陌生城市，卻在這裡遇見了最溫暖的人...",
    category: "冒險",
    year: 2023,
    authorGender: "male",
    emotionCount: 189,
    status: "published",
  },
  {
    id: 4,
    title: "失敗教會我的事",
    author: "張麗",
    excerpt: "創業失敗後，我才真正明白什麼是堅持...",
    category: "成長",
    year: 2024,
    authorGender: "female",
    emotionCount: 456,
    status: "verified",
  },
  {
    id: 5,
    title: "與爺爺的最後一個夏天",
    author: "劉天",
    excerpt: "那個夏天，我們在老房子裡聊天，聊了一輩子的故事...",
    category: "家庭",
    year: 2023,
    authorGender: "male",
    emotionCount: 678,
    status: "published",
  },
  {
    id: 6,
    title: "重新開始的勇氣",
    author: "林雨",
    excerpt: "三十歲時，我決定放下過去，重新開始...",
    category: "成長",
    year: 2024,
    authorGender: "female",
    emotionCount: 345,
    status: "published",
  },
];

const categories = ["全部", "成長", "家庭", "冒險", "愛情", "夢想"];
const years = [2024, 2023, 2022, 2021];
const genders = [
  { value: "all", label: "全部" },
  { value: "male", label: "男性作者" },
  { value: "female", label: "女性作者" },
  { value: "other", label: "其他" },
];

export default function Explore() {
  const { stories, isLoaded } = useStoryData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedGender, setSelectedGender] = useState("all");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "verified">(
    "latest"
  );
  const [showFilters, setShowFilters] = useState(false);

  // 篩選和搜尋邏輯
  const filteredStories = useMemo(() => {
    let results = stories;

    // 搜尋
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (story) =>
          story.title.toLowerCase().includes(query) ||
          story.author.toLowerCase().includes(query) ||
          story.content.toLowerCase().includes(query)
      );
    }

    // 分類篩選
    if (selectedCategory !== "全部") {
      results = results.filter((story) => story.category === selectedCategory);
    }

    // 年份篩選
    if (selectedYear) {
      results = results.filter((story) => story.year === selectedYear);
    }

    // 性別篩選
    if (selectedGender !== "all") {
      results = results.filter(
        (story) => story.authorGender === selectedGender
      );
    }

    // 排序
    if (sortBy === "popular") {
      results.sort((a, b) => {
        const aTotal = a.emotionStats.moved + a.emotionStats.resonance + a.emotionStats.inspired;
        const bTotal = b.emotionStats.moved + b.emotionStats.resonance + b.emotionStats.inspired;
        return bTotal - aTotal;
      });
    } else if (sortBy === "verified") {
      results.sort((a, b) => {
        if (a.status === "verified" && b.status !== "verified") return -1;
        if (a.status !== "verified" && b.status === "verified") return 1;
        return 0;
      });
    } else {
      results.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
    }

    return results;
  }, [searchQuery, selectedCategory, selectedYear, selectedGender, sortBy, stories]);

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "全部" ||
    selectedYear ||
    selectedGender !== "all";

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
              <a className="text-foreground hover:text-primary transition font-semibold">
                探索
              </a>
            </Link>
            <Link href="/profile">
              <a className="text-foreground hover:text-primary transition">
                我的故事
              </a>
            </Link>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/submit">
                <a>投稿</a>
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* 搜尋欄 */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/50" />
            <input
              type="text"
              placeholder="搜尋故事、作者或關鍵詞..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-foreground/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左側篩選欄 */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block lg:col-span-1`}
          >
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="font-bold text-foreground">篩選</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-foreground/60 hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 分類篩選 */}
              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3">分類</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded transition ${
                        selectedCategory === cat
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary/50 text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 年份篩選 */}
              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3">年份</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedYear(null)}
                    className={`w-full text-left px-3 py-2 rounded transition ${
                      !selectedYear
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary/50 text-foreground"
                    }`}
                  >
                    全部
                  </button>
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`w-full text-left px-3 py-2 rounded transition ${
                        selectedYear === year
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary/50 text-foreground"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* 性別篩選 */}
              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3">作者</h4>
                <div className="space-y-2">
                  {genders.map((gender) => (
                    <button
                      key={gender.value}
                      onClick={() => setSelectedGender(gender.value)}
                      className={`w-full text-left px-3 py-2 rounded transition ${
                        selectedGender === gender.value
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary/50 text-foreground"
                      }`}
                    >
                      {gender.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 清除篩選 */}
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("全部");
                    setSelectedYear(null);
                    setSelectedGender("all");
                  }}
                  className="w-full px-3 py-2 text-sm text-primary hover:bg-primary/10 rounded transition"
                >
                  清除所有篩選
                </button>
              )}
            </div>
          </div>

          {/* 右側故事列表 */}
          <div className="lg:col-span-3">
            {/* 排序選項和篩選按鈕 */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground/70">
                  找到 {filteredStories.length} 個故事
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* 排序下拉 */}
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as "latest" | "popular" | "verified"
                    )
                  }
                  className="px-3 py-2 bg-card border border-border rounded text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="latest">最新發布</option>
                  <option value="popular">最受歡迎</option>
                  <option value="verified">已驗證</option>
                </select>

                {/* 篩選按鈕（行動版） */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden px-3 py-2 bg-card border border-border rounded hover:bg-secondary/50 transition"
                >
                  <Filter className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>

            {/* 故事卡片網格 */}
            {filteredStories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredStories.map((story) => (
                  <Link key={story.id} href={`/story/${story.id}`}>
                    <a className="group">
                      <div className="bg-card border-2 border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition duration-300 h-full flex flex-col">
                        {/* 狀態徽章 */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-block bg-accent/20 text-primary px-3 py-1 rounded-full text-xs font-medium">
                            {story.category}
                          </span>
                          {story.status === "verified" && (
                            <span className="text-xs font-medium text-primary">
                              ✓ 已驗證
                            </span>
                          )}
                        </div>

                        {/* 標題 */}
                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition line-clamp-2">
                          {story.title}
                        </h3>

                        {/* 摘要 */}
                        <p className="text-foreground/70 text-sm mb-4 flex-grow line-clamp-3">
                          {story.content.substring(0, 100)}...
                        </p>

                        {/* 底部信息 */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex flex-col">
                            <span className="text-xs text-foreground/60">
                              {story.author}
                            </span>
                            <span className="text-xs text-foreground/50">
                              {story.year}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-primary">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {story.emotionStats.moved + story.emotionStats.resonance + story.emotionStats.inspired}
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-foreground/70 mb-4">沒有找到符合條件的故事</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("全部");
                    setSelectedYear(null);
                    setSelectedGender("all");
                  }}
                  className="text-primary hover:underline"
                >
                  清除篩選條件
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
