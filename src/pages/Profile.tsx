import { useState } from 'react';
import Layout from '../components/Layout';
import { useAppStore } from '../store';
import { User, Mail, Calendar, Save } from 'lucide-react';

const Profile = () => {
  const { user } = useAppStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert('个人信息已更新！');
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">个人中心</h1>
          <p className="text-gray-600">管理您的个人信息</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 h-32"></div>
          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-12 mb-6">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mb-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
              >
                {isEditing ? '取消' : '编辑资料'}
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <div className="flex items-center gap-3 py-2.5">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{formData.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <div className="flex items-center gap-3 py-2.5">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{formData.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">注册时间</label>
                <div className="flex items-center gap-3 py-2.5">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('zh-CN') : '未知'}
                  </span>
                </div>
              </div>

              {isEditing && (
                <button
                  onClick={handleSave}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  保存更改
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
