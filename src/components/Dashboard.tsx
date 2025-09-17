import React from 'react';
import { Heart, Brain, TrendingUp, Calendar, MessageCircle, Video } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
};

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const stats = [
    {
      title: 'Current Mood',
      value: 'Good',
      change: '+12%',
      icon: Brain,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Stress Level',
      value: 'Low',
      change: '-8%',
      icon: Heart,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Weekly Progress',
      value: '85%',
      change: '+15%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Sessions This Week',
      value: '4',
      change: '+2',
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentActivities = [
    { type: 'mood', title: 'Mood Check-in', time: '2 hours ago', status: 'completed' },
    { type: 'video', title: 'Relaxation Video', time: '5 hours ago', status: 'completed' },
    { type: 'chat', title: 'AI Support Chat', time: '1 day ago', status: 'completed' },
    { type: 'consultant', title: 'Consultant Session', time: '2 days ago', status: 'scheduled' }
  ];

  const recommendations = [
    {
      title: 'Morning Meditation',
      description: 'Start your day with a 10-minute guided meditation',
      type: 'video',
      duration: '10 min'
    },
    {
      title: 'Breathing Exercise',
      description: 'Quick breathing exercise for stress relief',
      type: 'exercise',
      duration: '5 min'
    },
    {
      title: 'Weekly Check-in',
      description: 'Schedule a session with our mental health consultant',
      type: 'consultant',
      duration: '30 min'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-blue-100">Here's how you're doing today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-800">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.time}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recommended for You</h2>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{rec.title}</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {rec.duration}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                  Start Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <MessageCircle className="w-6 h-6 text-blue-600" />
            <span className="font-medium text-gray-800">Chat with AI</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <Video className="w-6 h-6 text-green-600" />
            <span className="font-medium text-gray-800">Watch Videos</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <Calendar className="w-6 h-6 text-purple-600" />
            <span className="font-medium text-gray-800">Schedule Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;