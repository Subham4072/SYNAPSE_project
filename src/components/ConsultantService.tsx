import React, { useState } from 'react';
import { Calendar, Clock, Video, Phone, MessageSquare, Star, User } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
};

interface ConsultantServiceProps {
  user: User;
}

const ConsultantService: React.FC<ConsultantServiceProps> = ({ user }) => {
  const [selectedConsultant, setSelectedConsultant] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionType, setSessionType] = useState<'video' | 'phone' | 'chat'>('video');
  const [showBookingForm, setShowBookingForm] = useState(false);

  const consultants = [
    {
      id: '1',
      name: 'Dr. Emily Rodriguez',
      title: 'Licensed Clinical Psychologist',
      specialties: ['Anxiety', 'Depression', 'Academic Stress'],
      rating: 4.9,
      experience: '8 years',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      availability: 'Mon-Fri',
      description: 'Specializing in helping students manage academic pressure and mental health challenges.',
      languages: ['English', 'Spanish']
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      title: 'Cognitive Behavioral Therapist',
      specialties: ['CBT', 'Stress Management', 'Social Anxiety'],
      rating: 4.8,
      experience: '6 years',
      image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      availability: 'Mon-Thu',
      description: 'Expert in cognitive behavioral techniques for managing anxiety and improving coping strategies.',
      languages: ['English', 'Mandarin']
    },
    {
      id: '3',
      name: 'Dr. Sarah Thompson',
      title: 'Trauma-Informed Therapist',
      specialties: ['Trauma', 'PTSD', 'Mindfulness'],
      rating: 4.9,
      experience: '10 years',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      availability: 'Tue-Sat',
      description: 'Compassionate care for students dealing with trauma and developing resilience.',
      languages: ['English']
    }
  ];

  const upcomingSessions = [
    {
      id: '1',
      consultant: 'Dr. Emily Rodriguez',
      date: '2024-01-25',
      time: '2:00 PM',
      type: 'video',
      status: 'confirmed'
    },
    {
      id: '2',
      consultant: 'Dr. Michael Chen',
      date: '2024-01-28',
      time: '10:00 AM',
      type: 'phone',
      status: 'pending'
    }
  ];

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleBookSession = () => {
    if (selectedConsultant && selectedDate && selectedTime) {
      alert(`Session booked with ${consultants.find(c => c.id === selectedConsultant)?.name} on ${selectedDate} at ${selectedTime} via ${sessionType}`);
      setShowBookingForm(false);
      setSelectedConsultant(null);
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'chat':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <Video className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Professional Consultant Support</h1>
        <p className="text-teal-100">Connect with licensed mental health professionals</p>
      </div>

      {/* Upcoming Sessions */}
      {upcomingSessions.length > 0 && (
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Upcoming Sessions</h2>
          <div className="space-y-3">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  {getSessionTypeIcon(session.type)}
                  <div>
                    <p className="font-semibold text-gray-800">{session.consultant}</p>
                    <p className="text-sm text-gray-600">{session.date} at {session.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    session.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {session.status}
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Join Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Consultants Grid */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Available Consultants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {consultants.map((consultant) => (
            <div key={consultant.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={consultant.image}
                  alt={consultant.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">{consultant.name}</h3>
                  <p className="text-sm text-gray-600">{consultant.title}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{consultant.rating}</span>
                    <span className="text-sm text-gray-500">({consultant.experience})</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{consultant.description}</p>

              <div className="space-y-2 mb-4">
                <div>
                  <span className="text-xs font-medium text-gray-700">Specialties:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {consultant.specialties.map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-gray-700">Languages:</span>
                  <span className="text-xs text-gray-600 ml-2">{consultant.languages.join(', ')}</span>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-gray-700">Available:</span>
                  <span className="text-xs text-gray-600 ml-2">{consultant.availability}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedConsultant(consultant.id);
                  setShowBookingForm(true);
                }}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:from-teal-600 hover:to-blue-600 transition-all transform hover:scale-105"
              >
                Book Session
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && selectedConsultant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-90vh overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Book Session with {consultants.find(c => c.id === selectedConsultant)?.name}
            </h3>

            <div className="space-y-4">
              {/* Session Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { type: 'video' as const, label: 'Video Call', icon: Video },
                    { type: 'phone' as const, label: 'Phone Call', icon: Phone },
                    { type: 'chat' as const, label: 'Text Chat', icon: MessageSquare }
                  ].map(({ type, label, icon: Icon }) => (
                    <button
                      key={type}
                      onClick={() => setSessionType(type)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        sessionType === type
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-xs font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-sm rounded-lg border transition-all ${
                        selectedTime === time
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookSession}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:from-teal-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Book Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Support Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg text-center">
          <Calendar className="w-12 h-12 text-teal-600 mx-auto mb-4" />
          <h3 className="font-bold text-lg text-gray-800 mb-2">Flexible Scheduling</h3>
          <p className="text-gray-600 text-sm">Book sessions that fit your academic schedule</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg text-center">
          <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="font-bold text-lg text-gray-800 mb-2">Licensed Professionals</h3>
          <p className="text-gray-600 text-sm">All consultants are licensed and experienced</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg text-center">
          <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="font-bold text-lg text-gray-800 mb-2">Crisis Support</h3>
          <p className="text-gray-600 text-sm">Emergency support available 24/7</p>
        </div>
      </div>

      {/* Crisis Support */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="font-bold text-red-800 mb-3">Need Immediate Help?</h3>
        <p className="text-red-700 mb-4">
          If you're experiencing a mental health crisis or having thoughts of self-harm, please reach out immediately:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <Phone className="w-5 h-5" />
            <span className="font-medium">Call 988</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Text HOME to 741741</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <Video className="w-5 h-5" />
            <span className="font-medium">Crisis Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultantService;