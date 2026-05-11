import { useState, useEffect } from "react";

/**
 * Lifebrary 用戶管理 Hook
 * 使用 LocalStorage 進行用戶數據持久化
 */

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  joinDate: string;
  storyIds: string[];
  totalViews: number;
  totalEmotions: number;
}

const USER_KEY = "lifebrary_user";

const defaultUser: UserProfile = {
  id: "user_1",
  name: "李明",
  email: "liming@example.com",
  bio: "一個熱愛分享故事的寫手，相信每個人的故事都值得被聽見。",
  joinDate: "2024-01-15",
  storyIds: ["1", "2"],
  totalViews: 3847,
  totalEmotions: 1203,
};

export function useUserProfile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // 初始化用戶數據
  useEffect(() => {
    const loadUser = () => {
      try {
        const stored = localStorage.getItem(USER_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
        } else {
          // 首次使用，保存默認用戶
          localStorage.setItem(USER_KEY, JSON.stringify(defaultUser));
          setUser(defaultUser);
        }
      } catch (error) {
        console.error("Failed to load user profile:", error);
        setUser(defaultUser);
      }
      setIsLoaded(true);
    };

    loadUser();
  }, []);

  // 更新用戶資料
  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      setUser(updated);
    } catch (error) {
      console.error("Failed to update user profile:", error);
    }
  };

  // 添加故事到用戶
  const addStoryToUser = (storyId: string) => {
    if (!user) return;
    const storySet = new Set(user.storyIds);
    storySet.add(storyId);
    const updated = {
      ...user,
      storyIds: Array.from(storySet),
    };
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      setUser(updated);
    } catch (error) {
      console.error("Failed to add story to user:", error);
    }
  };

  // 從用戶移除故事
  const removeStoryFromUser = (storyId: string) => {
    if (!user) return;
    const updated = {
      ...user,
      storyIds: user.storyIds.filter((id) => id !== storyId),
    };
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      setUser(updated);
    } catch (error) {
      console.error("Failed to remove story from user:", error);
    }
  };

  // 更新用戶統計信息
  const updateStats = (views: number, emotions: number) => {
    if (!user) return;
    const updated = {
      ...user,
      totalViews: user.totalViews + views,
      totalEmotions: user.totalEmotions + emotions,
    };
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      setUser(updated);
    } catch (error) {
      console.error("Failed to update user stats:", error);
    }
  };

  return {
    user,
    isLoaded,
    updateProfile,
    addStoryToUser,
    removeStoryFromUser,
    updateStats,
  };
}
