import React, { useState } from 'react';
import { Heart, Activity, Moon, Thermometer, Droplets } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
};

interface PhysiologicalDataProps {
  user: User;
}

const PhysiologicalData: React.FC<PhysiologicalDataProps> = ({ user }) => {
  const [timeRange, setTimeRange] = useState('today');

  const currentVitals = [
    {
      title: 'Heart Rate',
      value: '72 BPM',
      status: 'Normal',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-100',
      trend: 'stable'
    },
    {
      title: 'Stress Level',
      value: 'Low',
      status: 'Good',
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
      trend: 'down'
    },
    {
      title: 'Sleep Quality',
      value: '8.2h',
      status: 'Excellent',
      icon: Moon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      trend: 'up'
    },
    {
      title: 'Body Temperature',
      value: '98.6°F',
      status: 'Normal',
      icon: Thermometer,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
      trend: 'stable'
    }
  ];

  const heartRateData = [
    { time: '6:00', value: 65 },
    { time: '9:00', value: 78 },
    { time: '12:00', value: 82 },
    { time: '15:00', value: 75 },
    { time: '18:00', value: 68 },
    { time: '21:00', value: 72 },
    { time: '24:00', value: 62 }
  ];

  const stressData = [
    { day: 'Mon', level: 30 },
    { day: 'Tue', level: 45 },
    { day: 'Wed', level: 20 },
    { day: 'Thu', level: 35 },
    { day: 'Fri', level: 60 },
    { day: 'Sat', level: 15 },
    { day: 'Sun', level: 25 }
  ];

  const sleepData = [
    { phase: 'Deep Sleep', duration: 2.5, color: 'bg-blue-600' },
    { phase: 'REM Sleep', duration: 2.1, color: 'bg-purple-500' },
    { phase: 'Light Sleep', duration: 3.2, color: 'bg-blue-300' },
    { phase: 'Awake', duration: 0.4, color: 'bg-gray-400' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      default:
        return '→';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Health Monitoring</h1>
        <p className="text-red-100">Track your physiological wellbeing in real-time</p>
      </div>

      {/* Current Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentVitals.map((vital, index) => {
          const Icon = vital.icon;
          return (
            <div key={index} className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${vital.bgColor}`}>
                  <Icon className={`w-6 h-6 ${vital.color}`} />
                </div>
                <span className="text-lg">{getTrendIcon(vital.trend)}</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{vital.title}</h3>
              <p className="text-2xl font-bold text-gray-800 mb-1">{vital.value}</p>
              <p className="text-sm text-green-600 font-medium">{vital.status}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Heart Rate Chart */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Heart Rate Today</h2>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          <div className="relative h-48">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="heartRateGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* Grid lines */}
              {[0, 50, 100, 150, 200].map((y) => (
                <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#e5e7eb" strokeWidth="1" />
              ))}
              
              {/* Heart rate line */}
              <polyline
                fill="url(#heartRateGradient)"
                stroke="#ef4444"
                strokeWidth="3"
                points={heartRateData.map((point, index) => {
                  const x = (index / (heartRateData.length - 1)) * 400;
                  const y = 200 - (point.value / 100) * 200;
                  return `${x},${y}`;
                }).join(' ')}
              />
              
              {/* Data points */}
              {heartRateData.map((point, index) => {
                const x = (index / (heartRateData.length - 1)) * 400;
                const y = 200 - (point.value / 100) * 200;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#ef4444"
                    className="hover:r-6 transition-all cursor-pointer"
                  />
                );
              })}
            </svg>
            
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              {heartRateData.map((point, index) => (
                <span key={index}>{point.time}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Stress Level */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Weekly Stress Levels</h2>
          
          <div className="space-y-4">
            {stressData.map((day, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      day.level <= 30 ? 'bg-green-500' :
                      day.level <= 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${day.level}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm font-medium text-gray-800">{day.level}%</div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Stress Insight</span>
            </div>
            <p className="text-sm text-blue-700">
              Friday shows elevated stress. Consider scheduling relaxation activities for the weekend.
            </p>
          </div>
        </div>
      </div>

      {/* Sleep Analysis */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Last Night's Sleep Analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Sleep Stages</h3>
            <div className="space-y-3">
              {sleepData.map((phase, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded ${phase.color}`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-800">{phase.phase}</span>
                      <span className="text-sm text-gray-600">{phase.duration}h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Sleep Quality Score</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeDasharray={`${85 * 2.51} 251.2`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">85</div>
                    <div className="text-xs text-gray-600">Excellent</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              Based on sleep duration, efficiency, and stages
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysiologicalData;