import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BookOpen, Home } from "lucide-react";

/**
 * Lifebrary 404 Not Found 頁面
 * 設計理念：溫暖復古文藝風
 */

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="text-center max-w-md px-4">
        <BookOpen className="w-24 h-24 text-primary/30 mx-auto mb-6" />
        
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        
        <h2 className="text-2xl font-bold text-foreground mb-2">
          故事未找到
        </h2>
        
        <p className="text-foreground/70 mb-8">
          抱歉，我們找不到你要尋找的故事。這個頁面可能已被移除或不存在。
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/">
              <a className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                返回首頁
              </a>
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
          >
            <Link href="/explore">
              <a>探索故事</a>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
