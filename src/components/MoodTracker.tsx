import React, { useState } from 'react';
import { Smile, Meh, Frown, Calendar, TrendingUp } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
};

interface MoodTrackerProps {
  user: User;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ user }) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const moods = [
    { value: 1, label: 'Very Sad', emoji: '😢', color: 'text-red-500', bgColor: 'bg-red-100' },
    { value: 2, label: 'Sad', emoji: '😞', color: 'text-orange-500', bgColor: 'bg-orange-100' },
    { value: 3, label: 'Neutral', emoji: '😐', color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
    { value: 4, label: 'Good', emoji: '😊', color: 'text-green-500', bgColor: 'bg-green-100' },
    { value: 5, label: 'Excellent', emoji: '😄', color: 'text-blue-500', bgColor: 'bg-blue-100' }
  ];

  const weeklyData = [
    { day: 'Mon', mood: 4, date: '15' },
    { day: 'Tue', mood: 3, date: '16' },
    { day: 'Wed', mood: 5, date: '17' },
    { day: 'Thu', mood: 4, date: '18' },
    { day: 'Fri', mood: 2, date: '19' },
    { day: 'Sat', mood: 4, date: '20' },
    { day: 'Sun', mood: 5, date: '21' }
  ];

  const handleMoodSubmit = () => {
    if (selectedMood) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedMood(null);
        setNotes('');
      }, 2000);
    }
  };

  const getMoodColor = (moodValue: number) => {
    const mood = moods.find(m => m.value === moodValue);
    return mood ? mood.color : 'text-gray-500';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Daily Mood Tracker</h1>
        <p className="text-green-100">Track your emotional wellbeing over time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mood Input */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-6">How are you feeling today?</h2>
          
          <div className="grid grid-cols-5 gap-3 mb-6">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                  selectedMood === mood.value
                    ? `${mood.bgColor} border-current ${mood.color} scale-110`
                    : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                }`}
              >
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <div className="text-xs font-medium text-gray-600">{mood.label}</div>
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="What's affecting your mood today?"
            />
          </div>

          <button
            onClick={handleMoodSubmit}
            disabled={!selectedMood}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
              selectedMood
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {showSuccess ? 'Mood Recorded! ✓' : 'Record Mood'}
          </button>
        </div>

        {/* Weekly Overview */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-6">This Week's Journey</h2>
          
          <div className="flex justify-between items-end mb-6" style={{ height: '200px' }}>
            {weeklyData.map((day, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div
                  className={`w-8 bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-lg transition-all duration-500 ${getMoodColor(day.mood)}`}
                  style={{ height: `${(day.mood / 5) * 100}px` }}
                ></div>
                <div className="text-center">
                  <div className="text-2xl mb-1">{moods[day.mood - 1]?.emoji}</div>
                  <div className="text-xs text-gray-600">{day.day}</div>
                  <div className="text-xs text-gray-500">{day.date}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Weekly Insight</span>
            </div>
            <p className="text-sm text-blue-700">
              Your mood has been generally positive this week! Friday showed a dip - consider what might have affected that day.
            </p>
          </div>
        </div>
      </div>

      {/* Mood Patterns */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Mood Patterns & Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-gray-800 mb-1">Best Days</h3>
            <p className="text-sm text-gray-600">Wednesday & Sunday</p>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-3xl mb-2">⏰</div>
            <h3 className="font-semibold text-gray-800 mb-1">Peak Time</h3>
            <p className="text-sm text-gray-600">Morning hours</p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-1">Streak</h3>
            <p className="text-sm text-gray-600">7 days tracked</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;