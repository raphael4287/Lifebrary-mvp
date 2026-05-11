import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Edit2,
  Trash2,
  Eye,
  Heart,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

/**
 * Lifebrary 用戶個人頁面
 * 設計理念：溫暖復古文藝風
 * - 用戶個人信息展示
 * - 投稿列表管理
 * - 內容狀態管理（已發布、審查中、已驗證）
 */

interface UserStory {
  id: number;
  title: string;
  category: string;
  status: "published" | "reviewing" | "verified";
  viewCount: number;
  emotionCount: number;
  createdDate: string;
}

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  joinDate: string;
  totalStories: number;
  totalViews: number;
  totalEmotions: number;
  stories: UserStory[];
}

// 模擬用戶數據
const mockUserProfile: UserProfile = {
  name: "李明",
  email: "liming@example.com",
  bio: "一個熱愛分享故事的寫手，相信每個人的故事都值得被聽見。",
  joinDate: "2024年1月15日",
  totalStories: 5,
  totalViews: 3847,
  totalEmotions: 1203,
  stories: [
    {
      id: 1,
      title: "那個改變我人生的決定",
      category: "成長",
      status: "verified",
      viewCount: 1523,
      emotionCount: 735,
      createdDate: "2024年5月10日",
    },
    {
      id: 2,
      title: "創業失敗後的反思",
      category: "成長",
      status: "published",
      viewCount: 892,
      emotionCount: 234,
      createdDate: "2024年4月20日",
    },
    {
      id: 3,
      title: "與父親的對話",
      category: "家庭",
      status: "reviewing",
      viewCount: 0,
      emotionCount: 0,
      createdDate: "2024年5月15日",
    },
    {
      id: 4,
      title: "旅途中的邂逅",
      category: "冒險",
      status: "published",
      viewCount: 654,
      emotionCount: 189,
      createdDate: "2024年3月10日",
    },
    {
      id: 5,
      title: "夢想的代價",
      category: "夢想",
      status: "verified",
      viewCount: 778,
      emotionCount: 245,
      createdDate: "2024年2月28日",
    },
  ],
};

export default function Profile() {
  const [user] = useState<UserProfile>(mockUserProfile);
  const [stories, setStories] = useState<UserStory[]>(user.stories);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "published" | "reviewing" | "verified"
  >("all");

  const filteredStories =
    filterStatus === "all"
      ? stories
      : stories.filter((story) => story.status === filterStatus);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            已驗證
          </span>
        );
      case "reviewing":
        return (
          <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            審查中
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
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
              <a className="text-foreground hover:text-primary transition font-semibold">
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

      <div className="container mx-auto px-4 py-12">
        {/* 用戶信息卡片 */}
        <div className="bg-card border border-border rounded-lg p-8 mb-12">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-3xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {user.name}
                </h1>
                <p className="text-foreground/70 mb-2">{user.email}</p>
                <p className="text-sm text-foreground/60">
                  加入於 {user.joinDate}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              編輯個人檔案
            </Button>
          </div>

          {/* 個人簡介 */}
          <p className="text-foreground/80 mb-6 leading-relaxed">
            {user.bio}
          </p>

          {/* 統計信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {user.totalStories}
              </div>
              <div className="text-sm text-foreground/60">篇故事</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {user.totalViews}
              </div>
              <div className="text-sm text-foreground/60">次閱讀</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {user.totalEmotions}
              </div>
              <div className="text-sm text-foreground/60">份情感共鳴</div>
            </div>
          </div>
        </div>

        {/* 故事管理區域 */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">我的故事</h2>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/submit">
                <a>新增故事</a>
              </Link>
            </Button>
          </div>

          {/* 篩選標籤 */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {[
              { value: "all", label: "全部" },
              { value: "published", label: "已發布" },
              { value: "reviewing", label: "審查中" },
              { value: "verified", label: "已驗證" },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() =>
                  setFilterStatus(
                    filter.value as
                      | "all"
                      | "published"
                      | "reviewing"
                      | "verified"
                  )
                }
                className={`px-4 py-2 rounded-full transition ${
                  filterStatus === filter.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:border-primary"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* 故事列表 */}
          {filteredStories.length > 0 ? (
            <div className="space-y-4">
              {filteredStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-foreground">
                          {story.title}
                        </h3>
                        {getStatusBadge(story.status)}
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">
                        {story.category} • {story.createdDate}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border text-foreground hover:bg-secondary/50"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border text-foreground hover:bg-secondary/50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* 故事統計 */}
                  <div className="flex gap-6 text-sm text-foreground/70">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{story.viewCount} 次閱讀</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      <span>{story.emotionCount} 份情感共鳴</span>
                    </div>
                  </div>

                  {/* 預覽按鈕 */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <Link href={`/story/${story.id}`}>
                      <a className="text-primary hover:underline text-sm font-medium">
                        查看故事 →
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <AlertCircle className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
              <p className="text-foreground/70 mb-4">
                {filterStatus === "all"
                  ? "你還沒有投稿任何故事"
                  : `沒有${
                      filterStatus === "published"
                        ? "已發布"
                        : filterStatus === "reviewing"
                          ? "審查中"
                          : "已驗證"
                    }的故事`}
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/submit">
                  <a>開始投稿</a>
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* 帳戶設定區域 */}
        <div className="mt-12 bg-secondary/20 border border-border rounded-lg p-8">
          <h3 className="text-xl font-bold text-foreground mb-4">帳戶設定</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-card border border-border rounded hover:bg-secondary/50 transition text-foreground">
              修改密碼
            </button>
            <button className="w-full text-left px-4 py-3 bg-card border border-border rounded hover:bg-secondary/50 transition text-foreground">
              隱私設定
            </button>
            <button className="w-full text-left px-4 py-3 bg-card border border-border rounded hover:bg-secondary/50 transition text-foreground">
              通知設定
            </button>
            <button className="w-full text-left px-4 py-3 bg-card border border-border rounded hover:bg-destructive/10 transition text-destructive">
              登出
            </button>
          </div>
        </div>
      </div>

      {/* 頁腳 */}
      <footer className="bg-card border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-foreground/60">
          <p>&copy; 2026 Lifebrary. 保留所有權利。</p>
        </div>
      </footer>
    </div>
  );
}
