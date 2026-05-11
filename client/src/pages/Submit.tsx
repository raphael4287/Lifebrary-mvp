import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BookOpen, Upload, X, AlertCircle } from "lucide-react";

/**
 * Lifebrary 投稿頁面
 * 設計理念：溫暖復古文藝風
 * - 完善的投稿流程
 * - 內建編輯器 + 檔案上傳模擬
 * - 內容狀態管理
 */

interface SubmissionForm {
  title: string;
  category: string;
  content: string;
  authorName: string;
  authorEmail: string;
  uploadedFiles: File[];
}

export default function Submit() {
  const [form, setForm] = useState<SubmissionForm>({
    title: "",
    category: "成長",
    content: "",
    authorName: "",
    authorEmail: "",
    uploadedFiles: [],
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = ["成長", "家庭", "冒險", "愛情", "夢想", "其他"];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.title.trim()) {
      newErrors.title = "請輸入故事標題";
    }
    if (!form.content.trim()) {
      newErrors.content = "請輸入故事內容";
    }
    if (form.content.trim().length < 200) {
      newErrors.content = "故事內容至少需要 200 個字";
    }
    if (!form.authorName.trim()) {
      newErrors.authorName = "請輸入作者名稱";
    }
    if (!form.authorEmail.trim()) {
      newErrors.authorEmail = "請輸入電子郵件";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.authorEmail)) {
      newErrors.authorEmail = "請輸入有效的電子郵件";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // 模擬提交
      console.log("提交表單:", form);
      setSubmitted(true);

      // 3秒後重置
      setTimeout(() => {
        setForm({
          title: "",
          category: "成長",
          content: "",
          authorName: "",
          authorEmail: "",
          uploadedFiles: [],
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setForm({
      ...form,
      uploadedFiles: [...form.uploadedFiles, ...files],
    });
  };

  const removeFile = (index: number) => {
    setForm({
      ...form,
      uploadedFiles: form.uploadedFiles.filter((_, i) => i !== index),
    });
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

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* 頁面標題 */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            分享你的故事
          </h1>
          <p className="text-lg text-foreground/70">
            無論是成長的喜悅、失敗的教訓，還是平凡中的感動，每一段故事都是獨一無二的。
            在 Lifebrary，分享你的故事，與世界連接。
          </p>
        </div>

        {/* 提交成功提示 */}
        {submitted && (
          <div className="mb-8 bg-green-50 border-l-4 border-green-500 p-6 rounded">
            <h3 className="font-bold text-green-700 mb-2">✓ 投稿成功！</h3>
            <p className="text-green-700 text-sm">
              感謝你的投稿。我們的編輯團隊將在 24 小時內審查你的故事。
              審查完成後，我們會透過電子郵件通知你。
            </p>
          </div>
        )}

        {/* 投稿表單 */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 故事基本信息 */}
          <section className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              故事基本信息
            </h2>

            {/* 標題 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-2">
                故事標題 *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="給你的故事起個吸引人的標題"
                className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-foreground/50 ${
                  errors.title ? "border-red-500" : "border-border"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-2">{errors.title}</p>
              )}
            </div>

            {/* 分類 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-2">
                故事分類 *
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 內容 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-2">
                故事內容 * (至少 200 字)
              </label>
              <textarea
                value={form.content}
                onChange={(e) =>
                  setForm({ ...form, content: e.target.value })
                }
                placeholder="在這裡分享你的故事..."
                rows={12}
                className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-foreground/50 font-sans resize-none ${
                  errors.content ? "border-red-500" : "border-border"
                }`}
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-foreground/60">
                  {form.content.length} 字
                </p>
                {errors.content && (
                  <p className="text-red-500 text-sm">{errors.content}</p>
                )}
              </div>
            </div>
          </section>

          {/* 作者信息 */}
          <section className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              作者信息
            </h2>

            {/* 作者名稱 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-2">
                作者名稱 *
              </label>
              <input
                type="text"
                value={form.authorName}
                onChange={(e) =>
                  setForm({ ...form, authorName: e.target.value })
                }
                placeholder="你的名字或筆名"
                className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-foreground/50 ${
                  errors.authorName ? "border-red-500" : "border-border"
                }`}
              />
              {errors.authorName && (
                <p className="text-red-500 text-sm mt-2">{errors.authorName}</p>
              )}
            </div>

            {/* 電子郵件 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-2">
                電子郵件 *
              </label>
              <input
                type="email"
                value={form.authorEmail}
                onChange={(e) =>
                  setForm({ ...form, authorEmail: e.target.value })
                }
                placeholder="your@email.com"
                className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-foreground/50 ${
                  errors.authorEmail ? "border-red-500" : "border-border"
                }`}
              />
              {errors.authorEmail && (
                <p className="text-red-500 text-sm mt-2">{errors.authorEmail}</p>
              )}
            </div>

            {/* 檔案上傳 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-2">
                上傳相關檔案（可選）
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition cursor-pointer">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-foreground/50 mx-auto mb-2" />
                  <p className="text-foreground/70">
                    拖拖檔案到這裡或點擊選擇
                  </p>
                  <p className="text-sm text-foreground/50">
                    支持圖片、PDF 等格式
                  </p>
                </label>
              </div>

              {/* 已上傳檔案列表 */}
              {form.uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {form.uploadedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-secondary/20 p-3 rounded"
                    >
                      <span className="text-sm text-foreground">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="text-foreground/60 hover:text-foreground transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* 提示信息 */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded flex gap-4">
            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-700 mb-2">投稿指南</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 請確保你的故事是原創作品</li>
                <li>• 尊重他人隱私，避免包含個人隱私信息</li>
                <li>• 故事將由我們的編輯團隊審查</li>
                <li>• 審查通過後，你的故事將被發布到平台</li>
              </ul>
            </div>
          </div>

          {/* 提交按鈕 */}
          <div className="flex gap-4">
            <Button
              type="submit"
              size="lg"
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              投稿故事
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="flex-1 border-primary text-primary hover:bg-primary/10"
              onClick={() => {
                setForm({
                  title: "",
                  category: "成長",
                  content: "",
                  authorName: "",
                  authorEmail: "",
                  uploadedFiles: [],
                });
                setErrors({});
              }}
            >
              清除表單
            </Button>
          </div>
        </form>
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
