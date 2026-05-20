import { create } from 'zustand';
import { AppStore, User, SocialAccount, HotTopic, Content, PublishConfig, AnalyticsData } from './types';

// Mock data
const mockUser: User = {
  id: '1',
  email: 'demo@example.com',
  name: '演示用户',
  createdAt: new Date().toISOString()
};

const mockHotTopics: HotTopic[] = [
  { id: '1', title: 'AI技术最新突破', platform: 'tech', heatScore: 9800, category: '科技', createdAt: new Date().toISOString() },
  { id: '2', title: '育儿技巧分享', platform: 'xiaohongshu', heatScore: 7600, category: '宝妈', createdAt: new Date().toISOString() },
  { id: '3', title: '股市行情分析', platform: 'weibo', heatScore: 8500, category: '金融', createdAt: new Date().toISOString() },
  { id: '4', title: '健康饮食指南', platform: 'douyin', heatScore: 6200, category: '生活', createdAt: new Date().toISOString() },
  { id: '5', title: '旅行推荐攻略', platform: 'xiaohongshu', heatScore: 5800, category: '旅行', createdAt: new Date().toISOString() }
];

const mockSocialAccounts: SocialAccount[] = [
  { id: '1', userId: '1', platform: 'xiaohongshu', accountName: '科技小达人', category: '科技', accessToken: 'xxx', isActive: true, createdAt: new Date().toISOString() },
  { id: '2', userId: '1', platform: 'douyin', accountName: '宝妈日记', category: '宝妈', accessToken: 'xxx', isActive: true, createdAt: new Date().toISOString() }
];

const mockContents: Content[] = [
  { id: '1', userId: '1', title: 'AI技术发展趋势', body: '人工智能正在快速发展，未来几年将有更多突破...', platforms: ['xiaohongshu', 'weibo'], status: 'published', publishedAt: new Date().toISOString(), createdAt: new Date().toISOString() }
];

const mockPublishConfigs: PublishConfig[] = [
  { id: '1', userId: '1', platform: 'xiaohongshu', dailyLimit: 3, publishTimes: ['09:00', '14:00', '20:00'], isAutoPublish: true },
  { id: '2', userId: '1', platform: 'douyin', dailyLimit: 2, publishTimes: ['12:00', '18:00'], isAutoPublish: true }
];

const mockAnalyticsData: AnalyticsData[] = [
  { id: '1', contentId: '1', platform: 'xiaohongshu', views: 1250, likes: 85, comments: 12, shares: 5, collectedAt: new Date().toISOString() },
  { id: '2', contentId: '1', platform: 'weibo', views: 3200, likes: 156, comments: 34, shares: 23, collectedAt: new Date().toISOString() }
];

export const useAppStore = create<AppStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  socialAccounts: [],
  hotTopics: [],
  contents: [],
  publishConfigs: [],
  analyticsData: [],

  setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
  setSocialAccounts: (accounts: SocialAccount[]) => set({ socialAccounts: accounts }),
  setHotTopics: (topics: HotTopic[]) => set({ hotTopics: topics }),
  setContents: (contents: Content[]) => set({ contents }),
  setPublishConfigs: (configs: PublishConfig[]) => set({ publishConfigs: configs }),
  setAnalyticsData: (data: AnalyticsData[]) => set({ analyticsData: data }),

  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ user: mockUser, isAuthenticated: true, socialAccounts: mockSocialAccounts, hotTopics: mockHotTopics, contents: mockContents, publishConfigs: mockPublishConfigs, analyticsData: mockAnalyticsData });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, socialAccounts: [], hotTopics: [], contents: [], publishConfigs: [], analyticsData: [] });
  },

  addSocialAccount: (account) => {
    const newAccount: SocialAccount = {
      ...account,
      id: Date.now().toString(),
      userId: '1',
      createdAt: new Date().toISOString()
    };
    set(state => ({ socialAccounts: [...state.socialAccounts, newAccount] }));
  },

  removeSocialAccount: (id: string) => {
    set(state => ({ socialAccounts: state.socialAccounts.filter(a => a.id !== id) }));
  },

  generateContent: async (topic: HotTopic) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const content: Content = {
      id: Date.now().toString(),
      userId: '1',
      topicId: topic.id,
      title: topic.title,
      body: `关于"${topic.title}"的精彩内容：\n\n这是一篇基于当前热点话题生成的高质量文章，包含了最新的观点和分析。内容详实，可读性强，非常适合在各大社交平台发布。\n\n#${topic.category} #热点`,
      platforms: [],
      status: 'draft',
      createdAt: new Date().toISOString()
    };
    set(state => ({ contents: [content, ...state.contents] }));
    return content;
  },

  publishContent: async (content: Content) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const updatedContent = { ...content, status: 'published' as const, publishedAt: new Date().toISOString() };
    set(state => ({
      contents: state.contents.map(c => c.id === content.id ? updatedContent : c)
    }));
  }
}));
