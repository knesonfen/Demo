import { useState } from 'react';
import Layout from '../components/Layout';
import { useAppStore } from '../store';
import { PublishConfig } from '../types';
import { Clock, Save, Plus, Trash2 } from 'lucide-react';

const PublishConfigPage = () => {
  const { publishConfigs, socialAccounts } = useAppStore();
  const [configs, setConfigs] = useState<PublishConfig[]>(publishConfigs);

  const getPlatformName = (platform: string) => {
    const names: Record<string, string> = {
      xiaohongshu: '小红书',
      douyin: '抖音',
      weibo: '微博'
    };
    return names[platform] || platform;
  };

  const updateConfig = (platform: string, updates: Partial<PublishConfig>) => {
    setConfigs(configs.map(c => c.platform === platform ? { ...c, ...updates } : c));
  };

  const addTime = (platform: string) => {
    const config = configs.find(c => c.platform === platform);
    if (config) {
      updateConfig(platform, { publishTimes: [...config.publishTimes, '09:00' });
    }
  };

  const removeTime = (platform: string, index: number) => {
    const config = configs.find(c => c.platform === platform);
    if (config) {
      updateConfig(platform, {
        publishTimes: config.publishTimes.filter((_, i) => i !== index)
      });
    }
  };

  const updateTime = (platform: string, index: number, newTime: string) => {
    const config = configs.find(c => c.platform === platform);
    if (config) {
      const newTimes = [...config.publishTimes];
      newTimes[index] = newTime;
      updateConfig(platform, { publishTimes: newTimes });
    }
  };

  const handleSave = () => {
    alert('配置已保存！');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">发布配置</h1>
            <p className="text-gray-600">配置每日发帖数量和自动发布时间</p>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            保存配置
          </button>
        </div>

        <div className="space-y-6">
          {socialAccounts.map((account) => {
          const config = configs.find(c => c.platform === account.platform) || {
            id: '',
            userId: '',
            platform: account.platform,
            dailyLimit: 3,
            publishTimes: ['09:00', '14:00', '20:00'],
            isAutoPublish: true
          };
          
          return (
            <div key={account.platform} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{getPlatformName(account.platform)}</h3>
                  <p className="text-sm text-gray-500">{account.accountName}</p>
                </div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={config.isAutoPublish}
                    onChange={(e) => updateConfig(account.platform, { isAutoPublish: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">开启自动发布</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    每日发帖上限
                  </label>
                  <input
                    type="number"
                    value={config.dailyLimit}
                    onChange={(e) => updateConfig(account.platform, { dailyLimit: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                    min={1}
                    max={10}
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    发布时间
                  </label>
                  <button
                    onClick={() => addTime(account.platform)}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    添加时间
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {config.publishTimes.map((time, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => updateTime(account.platform, index, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <button
                        onClick={() => removeTime(account.platform, index)}
                        className="p-2 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }}
        </div>
      </div>
    </Layout>
  );
};

export default PublishConfigPage;
