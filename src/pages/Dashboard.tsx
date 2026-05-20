import { useState } from 'react';
import Layout from '../components/Layout';
import { useAppStore } from '../store';
import { HotTopic, Content } from '../types';
import { TrendingUp, Sparkles, Send, Loader2, CheckCircle2, Clock, Edit3 } from 'lucide-react';

const Dashboard = () => {
  const { hotTopics, contents, socialAccounts, generateContent, publishContent } = useAppStore();
  const [selectedTopic, setSelectedTopic] = useState<HotTopic | null>(null);
  const [generatedContent, setGeneratedContent] = useState<Content | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showContentEditor, setShowContentEditor] = useState(false);

  const handleGenerate = async (topic: HotTopic) => {
    setIsGenerating(true);
    setSelectedTopic(topic);
    try {
      const content = await generateContent(topic);
      setGeneratedContent(content);
      setShowContentEditor(true);
    } catch (error) {
      console.error('Failed to generate content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = async () => {
    if (!generatedContent) return;
    setIsPublishing(true);
    try {
      await publishContent({ ...generatedContent, platforms: selectedPlatforms });
      setShowContentEditor(false);
      setSelectedTopic(null);
      setGeneratedContent(null);
      setSelectedPlatforms([]);
    } catch (error) {
      console.error('Failed to publish:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const getPlatformName = (platform: string) => {
    const names: Record<string, string> = {
      xiaohongshu: '小红书',
      douyin: '抖音',
      weibo: '微博'
    };
    return names[platform] || platform;
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">欢迎回来！</h1>
          <p className="text-gray-600">探索今日热点，一键生成并发布内容</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-orange-500" />
                今日热点
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hotTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {topic.category}
                    </div>
                    <div className="flex items-center gap-1 text-orange-500 text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />
                      {topic.heatScore.toLocaleString()}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-4 line-clamp-2">
                    {topic.title}
                  </h3>
                  <button
                    onClick={() => handleGenerate(topic)}
                    disabled={isGenerating}
                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isGenerating && selectedTopic?.id === topic.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        生成中...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        AI 一键生成
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">最近发布</h2>
            <div className="space-y-4">
              {contents.slice(0, 5).map((content) => (
                <div
                  key={content.id}
                  className="bg-white rounded-xl shadow-sm border p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${
                      content.status === 'published' ? 'bg-green-100 text-green-700' :
                      content.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {content.status === 'published' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {content.status === 'published' ? '已发布' :
                       content.status === 'draft' ? '草稿' : content.status}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{content.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    {content.platforms.map((platform) => (
                    <span key={platform} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {getPlatformName(platform)}
                    </span>
                  ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showContentEditor && generatedContent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">编辑并发布</h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">标题</label>
                  <input
                    type="text"
                    value={generatedContent.title}
                    onChange={(e) => setGeneratedContent({ ...generatedContent, title: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">内容</label>
                  <textarea
                    value={generatedContent.body}
                    onChange={(e) => setGeneratedContent({ ...generatedContent, body: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">选择发布平台</label>
                  <div className="flex flex-wrap gap-3">
                    {socialAccounts.map((account) => (
                    <label key={account.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedPlatforms.includes(account.platform)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPlatforms([...selectedPlatforms, account.platform]);
                          } else {
                            setSelectedPlatforms(selectedPlatforms.filter(p => p !== account.platform));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">
                        {getPlatformName(account.platform)} - {account.accountName}
                      </span>
                    </label>
                  ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowContentEditor(false);
                      setSelectedTopic(null);
                      setGeneratedContent(null);
                    }}
                    className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
                  >
                    取消
                  </button>
                  <button
                    onClick={handlePublish}
                    disabled={isPublishing || selectedPlatforms.length === 0}
                    className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isPublishing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        发布中...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        一键发布
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
