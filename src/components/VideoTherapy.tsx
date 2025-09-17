import React, { useState } from 'react';
import { Play, Clock, Star, Filter, Search } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
};

interface VideoTherapyProps {
  user: User;
}

const VideoTherapy: React.FC<VideoTherapyProps> = ({ user }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Videos', color: 'bg-gray-500' },
    { id: 'anxiety', name: 'Anxiety Relief', color: 'bg-blue-500' },
    { id: 'stress', name: 'Stress Management', color: 'bg-green-500' },
    { id: 'meditation', name: 'Meditation', color: 'bg-purple-500' },
    { id: 'sleep', name: 'Better Sleep', color: 'bg-indigo-500' },
    { id: 'motivation', name: 'Motivation', color: 'bg-orange-500' }
  ];

  const videos = [
    {
      id: '1',
      title: '10-Minute Morning Meditation',
      description: 'Start your day with mindfulness and positive energy',
      duration: '10:32',
      category: 'meditation',
      rating: 4.8,
      thumbnail: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      instructor: 'Dr. Sarah Chen',
      views: '12.5K'
    },
    {
      id: '2',
      title: 'Breathing Techniques for Anxiety',
      description: 'Learn effective breathing methods to manage anxiety and panic',
      duration: '8:45',
      category: 'anxiety',
      rating: 4.9,
      thumbnail: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      instructor: 'Michael Rodriguez',
      views: '18.2K'
    },
    {
      id: '3',
      title: 'Progressive Muscle Relaxation',
      description: 'Release physical tension and mental stress with guided exercises',
      duration: '15:20',
      category: 'stress',
      rating: 4.7,
      thumbnail: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      instructor: 'Dr. Emma Thompson',
      views: '9.8K'
    },
    {
      id: '4',
      title: 'Sleep Stories for Better Rest',
      description: 'Calming narratives to help you drift off peacefully',
      duration: '25:10',
      category: 'sleep',
      rating: 4.6,
      thumbnail: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      instructor: 'Lisa Park',
      views: '15.7K'
    },
    {
      id: '5',
      title: 'Daily Affirmations for Confidence',
      description: 'Build self-esteem and motivation with positive affirmations',
      duration: '12:30',
      category: 'motivation',
      rating: 4.8,
      thumbnail: 'https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      instructor: 'James Wilson',
      views: '22.1K'
    },
    {
      id: '6',
      title: 'Mindful Walking Practice',
      description: 'Combine gentle movement with mindfulness meditation',
      duration: '18:15',
      category: 'meditation',
      rating: 4.5,
      thumbnail: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      instructor: 'Dr. Maria Santos',
      views: '7.3K'
    }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVideoPlay = (videoId: string) => {
    // In a real app, this would open a video player
    alert(`Playing video ${videoId}. In a real implementation, this would open the video player.`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Video Therapy Library</h1>
        <p className="text-purple-100">Guided videos to support your mental wellness journey</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Categories:</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? `${category.color} text-white shadow-lg scale-105`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div key={video.id} className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="relative group">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleVideoPlay(video.id)}
                  className="bg-white/90 p-4 rounded-full hover:bg-white transition-colors"
                >
                  <Play className="w-8 h-8 text-purple-600" />
                </button>
              </div>
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {video.duration}
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                {video.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {video.description}
              </p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{video.rating}</span>
                  <span className="text-sm text-gray-500">({video.views} views)</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  categories.find(c => c.id === video.category)?.color || 'bg-gray-500'
                } text-white`}>
                  {categories.find(c => c.id === video.category)?.name}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">By {video.instructor}</span>
                <button
                  onClick={() => handleVideoPlay(video.id)}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-indigo-600 transition-all transform hover:scale-105"
                >
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎥</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No videos found</h3>
          <p className="text-gray-600">Try adjusting your search or category filters</p>
        </div>
      )}

      {/* Usage Tips */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Getting the Most from Video Therapy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="text-4xl mb-2">🧘‍♀️</div>
            <h3 className="font-semibold mb-2">Find a Quiet Space</h3>
            <p className="text-sm text-gray-600">Choose a comfortable, distraction-free environment for your practice</p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-2">⏰</div>
            <h3 className="font-semibold mb-2">Set a Regular Schedule</h3>
            <p className="text-sm text-gray-600">Consistency is key - try to practice at the same time each day</p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-2">📝</div>
            <h3 className="font-semibold mb-2">Track Your Progress</h3>
            <p className="text-sm text-gray-600">Note how you feel before and after each session</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTherapy;