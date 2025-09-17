import React, { useState } from 'react';
import { User, Mail, Calendar, Edit3, Save, X, Bell, Shield, Palette, LogOut } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
};

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: 'Computer Science student passionate about mental health and technology.',
    university: 'University of Technology',
    year: 'Junior',
    interests: ['Technology', 'Mindfulness', 'Music', 'Reading']
  });
  
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    weeklyReports: true
  });

  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'privacy'>('profile');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const stats = [
    { label: 'Days Active', value: '127' },
    { label: 'Mood Entries', value: '89' },
    { label: 'Sessions Completed', value: '23' },
    { label: 'Streak', value: '14 days' }
  ];

  const recentActivity = [
    { type: 'mood', activity: 'Logged daily mood', time: '2 hours ago' },
    { type: 'video', activity: 'Completed breathing exercise', time: '1 day ago' },
    { type: 'chat', activity: 'AI support session', time: '2 days ago' },
    { type: 'session', activity: 'Consultant meeting with Dr. Rodriguez', time: '3 days ago' }
  ];

  const achievements = [
    { id: 1, title: 'First Week', description: 'Completed your first week of mood tracking', icon: '🌟', earned: true },
    { id: 2, title: 'Mindful Moments', description: 'Watched 10 meditation videos', icon: '🧘‍♀️', earned: true },
    { id: 3, title: 'Consistent Tracker', description: 'Logged mood for 30 consecutive days', icon: '📊', earned: false },
    { id: 4, title: 'Community Helper', description: 'Participated in group sessions', icon: '🤝', earned: false }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
            {user.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-white" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-indigo-100 mb-1">{user.email}</p>
            <p className="text-indigo-200 text-sm">
              Member since {new Date(user.joinedDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
              })}
            </p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-md rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'profile' as const, label: 'Profile', icon: User },
            { id: 'settings' as const, label: 'Settings', icon: Bell },
            { id: 'privacy' as const, label: 'Privacy', icon: Shield }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 transition-colors ${
                activeTab === id
                  ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center space-x-2 bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                    <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                    <input
                      type="text"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
                    <div className="flex flex-wrap gap-2">
                      {formData.interests.map((interest, index) => (
                        <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Settings</h2>
              
              <div className="space-y-4">
                {[
                  { key: 'notifications' as const, label: 'Push Notifications', description: 'Receive reminders and updates' },
                  { key: 'emailUpdates' as const, label: 'Email Updates', description: 'Weekly progress reports via email' },
                  { key: 'darkMode' as const, label: 'Dark Mode', description: 'Switch to dark theme' },
                  { key: 'weeklyReports' as const, label: 'Weekly Reports', description: 'Generate weekly wellness reports' }
                ].map(({ key, label, description }) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-800">{label}</h3>
                      <p className="text-sm text-gray-600">{description}</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange(key)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings[key] ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                        settings[key] ? 'translate-x-6' : 'translate-x-0.5'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Privacy & Security</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Data Privacy</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Your mental health data is encrypted and stored securely. We never share personal information without your consent.
                  </p>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                    View Privacy Policy →
                  </button>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Account Security</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Manage your account security settings and password.
                  </p>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                    Change Password →
                  </button>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Data Export</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Download your data including mood entries, session notes, and progress reports.
                  </p>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                    Export Data →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.activity}</p>
                  <p className="text-xs text-gray-600">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Achievements</h2>
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div key={achievement.id} className={`flex items-center space-x-3 p-3 rounded-lg ${
                achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
              }`}>
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    achievement.earned ? 'text-green-800' : 'text-gray-600'
                  }`}>{achievement.title}</p>
                  <p className={`text-xs ${
                    achievement.earned ? 'text-green-600' : 'text-gray-500'
                  }`}>{achievement.description}</p>
                </div>
                {achievement.earned && (
                  <div className="text-green-600">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;