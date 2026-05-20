export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface SocialAccount {
  id: string;
  userId: string;
  platform: 'xiaohongshu' | 'douyin' | 'weibo';
  accountName: string;
  category: string;
  accessToken: string;
  isActive: boolean;
  createdAt: string;
}

export interface HotTopic {
  id: string;
  title: string;
  platform: string;
  heatScore: number;
  category: string;
  createdAt: string;
}

export interface Content {
  id: string;
  userId: string;
  topicId?: string;
  title: string;
  body: string;
  images?: string[];
  platforms: string[];
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  scheduledAt?: string;
  publishedAt?: string;
  createdAt: string;
}

export interface PublishConfig {
  id: string;
  userId: string;
  platform: string;
  dailyLimit: number;
  publishTimes: string[];
  isAutoPublish: boolean;
}

export interface AnalyticsData {
  id: string;
  contentId: string;
  platform: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  collectedAt: string;
}

export interface AppStore {
  user: User | null;
  isAuthenticated: boolean;
  socialAccounts: SocialAccount[];
  hotTopics: HotTopic[];
  contents: Content[];
  publishConfigs: PublishConfig[];
  analyticsData: AnalyticsData[];
  setUser: (user: User | null) => void;
  setSocialAccounts: (accounts: SocialAccount[]) => void;
  setHotTopics: (topics: HotTopic[]) => void;
  setContents: (contents: Content[]) => void;
  setPublishConfigs: (configs: PublishConfig[]) => void;
  setAnalyticsData: (data: AnalyticsData[]) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  addSocialAccount: (account: Omit<SocialAccount, 'id' | 'userId' | 'createdAt'>) => void;
  removeSocialAccount: (id: string) => void;
  generateContent: (topic: HotTopic) => Promise<Content>;
  publishContent: (content: Content) => Promise<void>;
}
