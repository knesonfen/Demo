import Layout from '../components/Layout';
import { useAppStore } from '../store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Eye, Heart, MessageCircle, Share2, TrendingUp } from 'lucide-react';

const Analytics = () => {
  const { analyticsData, contents } = useAppStore();

  const totalViews = analyticsData.reduce((sum, d) => sum + d.views, 0);
  const totalLikes = analyticsData.reduce((sum, d) => sum + d.likes, 0);
  const totalComments = analyticsData.reduce((sum, d) => sum + d.comments, 0);
  const totalShares = analyticsData.reduce((sum, d) => sum + d.shares, 0);

  const platformData = analyticsData.reduce((acc, d) => {
    if (!acc[d.platform]) {
      acc[d.platform] = { views: 0, likes: 0, comments: 0, shares: 0 };
    }
    acc[d.platform].views += d.views;
    acc[d.platform].likes += d.likes;
    acc[d.platform].comments += d.comments;
    acc[d.platform].shares += d.shares;
    return acc;
  }, {} as Record<string, any>);

  const chartData = Object.entries(platformData).map(([platform, data]) => ({
    platform: getPlatformName(platform),
    views: data.views,
    likes: data.likes,
    comments: data.comments,
    shares: data.shares
  });

  const pieData = Object.entries(platformData).map(([platform, data]) => ({
    name: getPlatformName(platform),
    value: data.views
  }));

  const COLORS = ['#2563eb', '#0891b2', '#f97316', '#10b981'];

  function getPlatformName(platform: string) {
    const names: Record<string, string> = {
      xiaohongshu: '小红书',
      douyin: '抖音',
      weibo: '微博'
    };
    return names[platform] || platform;
  }

  const statCards = [
    { label: '总浏览', value: totalViews, icon: Eye, color: 'from-blue-500 to-blue-600', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { label: '总点赞', value: totalLikes, icon: Heart, color: 'from-red-500 to-red-600', iconBg: 'bg-red-100', iconColor: 'text-red-600' },
    { label: '总评论', value: totalComments, icon: MessageCircle, color: 'from-cyan-500 to-cyan-600', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600' },
    { label: '总分享', value: totalShares, icon: Share2, color: 'from-orange-500 to-orange-600', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">数据统计</h1>
          <p className="text-gray-600">查看您的社交媒体数据表现</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <div key={card.label} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.value.toLocaleString()}</p>
                </div>
                <div className={`${card.iconBg} p-3 rounded-lg">
                  <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            平台数据对比
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#2563eb" name="浏览" radius={[4, 4, 0, 0]} />
                <Bar dataKey="likes" fill="#0891b2" name="点赞" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">浏览量分布</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">内容表现</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">内容标题</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">平台</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">浏览</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">点赞</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">评论</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">分享</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.map((data) => {
                  const content = contents.find((c) => c.id === data.contentId);
                  return (
                    <tr key={data.id} className="border-b last:border-0">
                      <td className="py-3 px-4 text-sm text-gray-900">{content?.title || '未知'}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{getPlatformName(data.platform)}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{data.views.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{data.likes.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{data.comments.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{data.shares.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
