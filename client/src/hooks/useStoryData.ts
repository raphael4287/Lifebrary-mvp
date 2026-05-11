import { useState, useEffect } from "react";

/**
 * Lifebrary 故事數據管理 Hook
 * 使用 LocalStorage 進行數據持久化
 */

export interface Story {
  id: string;
  title: string;
  author: string;
  authorEmail: string;
  category: string;
  content: string;
  year: number;
  authorGender: "male" | "female" | "other";
  status: "published" | "reviewing" | "verified";
  viewCount: number;
  emotionStats: {
    moved: number;
    resonance: number;
    inspired: number;
  };
  userReactions: Set<string>;
  createdDate: string;
  updatedDate: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  joinDate: string;
  stories: string[]; // Story IDs
}

const STORIES_KEY = "lifebrary_stories";
const USER_KEY = "lifebrary_user";
const REACTIONS_KEY = "lifebrary_reactions";

// 初始故事數據
const initialStories: Story[] = [
  {
    id: "1",
    title: "那個改變我人生的決定",
    author: "李明",
    authorEmail: "liming@example.com",
    category: "成長",
    content: "二十五歲那年，我做了一個改變人生的決定...",
    year: 2024,
    authorGender: "male",
    status: "verified",
    viewCount: 1523,
    emotionStats: { moved: 234, resonance: 189, inspired: 312 },
    userReactions: new Set(),
    createdDate: "2024-05-10",
    updatedDate: "2024-05-10",
  },
  {
    id: "2",
    title: "母親的手工針線",
    author: "王芳",
    authorEmail: "wangfang@example.com",
    category: "家庭",
    content: "每一針每一線，都是母親對我的愛...",
    year: 2024,
    authorGender: "female",
    status: "published",
    viewCount: 892,
    emotionStats: { moved: 512, resonance: 234, inspired: 178 },
    userReactions: new Set(),
    createdDate: "2024-04-20",
    updatedDate: "2024-04-20",
  },
  {
    id: "3",
    title: "在異鄉找到家的感覺",
    author: "陳浩",
    authorEmail: "chenhao@example.com",
    category: "冒險",
    content: "一個人來到陌生城市，卻在這裡遇見了最溫暖的人...",
    year: 2023,
    authorGender: "male",
    status: "published",
    viewCount: 654,
    emotionStats: { moved: 189, resonance: 145, inspired: 234 },
    userReactions: new Set(),
    createdDate: "2023-12-15",
    updatedDate: "2023-12-15",
  },
];

export function useStoryData() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 初始化數據
  useEffect(() => {
    const loadStories = () => {
      try {
        const stored = localStorage.getItem(STORIES_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setStories(
            parsed.map((story: any) => ({
              ...story,
              userReactions: new Set(story.userReactions || []),
            }))
          );
        } else {
          // 首次使用，保存初始數據
          localStorage.setItem(STORIES_KEY, JSON.stringify(initialStories));
          setStories(initialStories);
        }
      } catch (error) {
        console.error("Failed to load stories:", error);
        setStories(initialStories);
      }
      setIsLoaded(true);
    };

    loadStories();
  }, []);

  // 保存故事到 LocalStorage
  const saveStories = (updatedStories: Story[]) => {
    try {
      const toStore = updatedStories.map((story) => ({
        ...story,
        userReactions: Array.from(story.userReactions),
      }));
      localStorage.setItem(STORIES_KEY, JSON.stringify(toStore));
      setStories(updatedStories);
    } catch (error) {
      console.error("Failed to save stories:", error);
    }
  };

  // 添加新故事
  const addStory = (storyData: Omit<Story, "id" | "createdDate" | "updatedDate" | "userReactions">) => {
    const newStory: Story = {
      ...storyData,
      id: Date.now().toString(),
      userReactions: new Set(),
      createdDate: new Date().toISOString().split("T")[0],
      updatedDate: new Date().toISOString().split("T")[0],
    };
    const updated = [...stories, newStory];
    saveStories(updated);
    return newStory;
  };

  // 更新故事
  const updateStory = (id: string, updates: Partial<Story>) => {
    const updated = stories.map((story) =>
      story.id === id
        ? {
            ...story,
            ...updates,
            updatedDate: new Date().toISOString().split("T")[0],
          }
        : story
    );
    saveStories(updated);
  };

  // 刪除故事
  const deleteStory = (id: string) => {
    const updated = stories.filter((story) => story.id !== id);
    saveStories(updated);
  };

  // 獲取單個故事
  const getStory = (id: string) => {
    return stories.find((story) => story.id === id);
  };

  // 添加情緒反應
  const addEmotionReaction = (storyId: string, emotionType: "moved" | "resonance" | "inspired") => {
    const updated = stories.map((story) => {
      if (story.id === storyId) {
        const newReactions = new Set(story.userReactions);
        if (newReactions.has(emotionType)) {
          newReactions.delete(emotionType);
          story.emotionStats[emotionType] = Math.max(0, story.emotionStats[emotionType] - 1);
        } else {
          newReactions.add(emotionType);
          story.emotionStats[emotionType] += 1;
        }
        return { ...story, userReactions: newReactions };
      }
      return story;
    });
    saveStories(updated);
  };

  // 增加閱讀計數
  const incrementViewCount = (storyId: string) => {
    const updated = stories.map((story) =>
      story.id === storyId ? { ...story, viewCount: story.viewCount + 1 } : story
    );
    saveStories(updated);
  };

  // 搜尋故事
  const searchStories = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return stories.filter(
      (story) =>
        story.title.toLowerCase().includes(lowerQuery) ||
        story.author.toLowerCase().includes(lowerQuery) ||
        story.content.toLowerCase().includes(lowerQuery)
    );
  };

  // 按分類篩選
  const filterByCategory = (category: string) => {
    return stories.filter((story) => story.category === category);
  };

  // 按狀態篩選
  const filterByStatus = (status: Story["status"]) => {
    return stories.filter((story) => story.status === status);
  };

  // 按年份篩選
  const filterByYear = (year: number) => {
    return stories.filter((story) => story.year === year);
  };

  // 按作者性別篩選
  const filterByGender = (gender: string) => {
    return stories.filter((story) => story.authorGender === gender);
  };

  return {
    stories,
    isLoaded,
    addStory,
    updateStory,
    deleteStory,
    getStory,
    addEmotionReaction,
    incrementViewCount,
    searchStories,
    filterByCategory,
    filterByStatus,
    filterByYear,
    filterByGender,
  };
}
