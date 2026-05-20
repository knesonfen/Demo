import { useState } from 'react';
import Layout from '../components/Layout';
import { useAppStore } from '../store';
import { Plus, Trash2, Edit3, Instagram, Music, MessageCircle, CheckCircle2 } from 'lucide-react';

const Accounts = () => {
  const { socialAccounts, addSocialAccount, removeSocialAccount } = useAppStore();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    platform: 'xiaohongshu' as const,
    accountName: '',
    category: '科技',
    accessToken: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSocialAccount({ ...formData, isActive: true });
    setShowModal(false);
    setFormData({ platform: 'xiaohongshu', accountName: '', category: '科技', accessToken: '' });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'xiaohongshu': return <Instagram className="w-6 h-6 text-red-500" />;
      case 'douyin': return <Music className="w-6 h-6 text-black" />;
      case 'weibo': return <MessageCircle className="w-6 h-6 text-red-600" />;
      default: return <Instagram className="w-6 h-6" />;
    }
  };

  const getPlatformName = (platform: string) => {
    const names: Record<string, string> = {
      xiaohongshu: '小红书',
      douyin: '抖音',
      weibo: '小红书'
    };
    return names[platform] || platform;
  };

  const categories = ['科技', '宝妈', '金融', '生活', '旅行', '美食', '时尚', '教育'];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">账号管理</h1>
            <p className="text-gray-600">管理您的社交媒体账号</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            添加账号
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialAccounts.map((account) => (
            <div key={account.id} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  {getPlatformIcon(account.platform)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{account.accountName}</h3>
                  <p className="text-sm text-gray-500">{getPlatformName(account.platform)}</p>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-medium">已连接</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {account.category}
                </span>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeSocialAccount(account.id)}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">添加社交账号</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">平台</label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                >
                  <option value="xiaohongshu">小红书</option>
                  <option value="douyin">抖音</option>
                  <option value="weibo">微博</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">账号名称</label>
                <input
                  type="text"
                  value={formData.accountName}
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  placeholder="请输入账号名称"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">账号分类</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Access Token</label>
                <input
                  type="text"
                  value={formData.accessToken}
                  onChange={(e) => setFormData({ ...formData, accessToken: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  placeholder="请输入 Access Token"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium"
                >
                  添加
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Accounts;
