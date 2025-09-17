import React, { useState, useEffect } from 'react';
import { Brain, Menu, X, Home, BarChart3, Heart, MessageCircle, Video, Users, User, LogOut } from 'lucide-react';
import Dashboard from './components/Dashboard';
import MoodTracker from './components/MoodTracker';
import PhysiologicalData from './components/PhysiologicalData';
import Chatbot from './components/Chatbot';
import VideoTherapy from './components/VideoTherapy';
import ConsultantService from './components/ConsultantService';
import Profile from './components/Profile';
import Login from './components/Login';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
};

type ActiveSection = 'dashboard' | 'mood' | 'physiological' | 'chatbot' | 'videos' | 'consultant' | 'profile';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and check for existing user
    setTimeout(() => {
      const savedUser = localStorage.getItem('synapse_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('synapse_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('synapse_user');
    setActiveSection('dashboard');
  };

  const navigation = [
    { id: 'dashboard' as const, name: 'Dashboard', icon: Home },
    { id: 'mood' as const, name: 'Mood Tracker', icon: BarChart3 },
    { id: 'physiological' as const, name: 'Health Data', icon: Heart },
    { id: 'chatbot' as const, name: 'AI Support', icon: MessageCircle },
    { id: 'videos' as const, name: 'Video Therapy', icon: Video },
    { id: 'consultant' as const, name: 'Consultant', icon: Users },
    { id: 'profile' as const, name: 'Profile', icon: User },
  ];

  const renderActiveSection = () => {
    if (!user) return null;
    
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'mood':
        return <MoodTracker user={user} />;
      case 'physiological':
        return <PhysiologicalData user={user} />;
      case 'chatbot':
        return <Chatbot user={user} />;
      case 'videos':
        return <VideoTherapy user={user} />;
      case 'consultant':
        return <ConsultantService user={user} />;
      case 'profile':
        return <Profile user={user} onLogout={handleLogout} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">
            <Brain className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">SYNAPSE</h1>
          <p className="text-gray-600">Loading your mental wellness journey...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-800">SYNAPSE</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 absolute top-16 left-0 right-0 z-40">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fadeIn">
          {renderActiveSection()}
        </div>
      </main>

      {/* Watermark */}
      <div className="fixed bottom-4 right-4 text-xs text-gray-400 opacity-60">
        Made by Team SYNAPSE
      </div>
    </div>
  );
}

export default App;