import { MessageCircle, Heart, Eye, Star, Filter, Search, Settings, Bell, LogOut } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState('recent')
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setShowSettingsDropdown(false)
  }

  // ... rest of your data arrays remain the same ...
  const recentConnections = [
    { 
      id: 1, 
      service: 'Hair Styling', 
      provider: 'Alex Beauty Studio', 
      contacted: '2 hours ago', 
      status: 'waiting', 
      method: 'WhatsApp',
      providerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    },
    { 
      id: 2, 
      service: 'Home Cleaning', 
      provider: 'Sparkle Cleaners', 
      contacted: '1 day ago', 
      status: 'replied', 
      method: 'Direct Message',
      providerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sparkle'
    },
  ]

  const savedServices = [
    { 
      id: 3, 
      service: 'Personal Training', 
      provider: 'FitPro Training', 
      saved: 'Jan 15', 
      views: 42,
      rating: 4.8,
      providerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FitPro'
    },
    { 
      id: 4, 
      service: 'Math Tutoring', 
      provider: 'EduMentor', 
      saved: 'Jan 10', 
      views: 28,
      rating: 4.6,
      providerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EduMentor'
    },
  ]

  const recommendedProviders = [
    {
      id: 5,
      name: 'Beauty By Lisa',
      service: 'Makeup Artist',
      rating: 4.9,
      reviews: 89,
      distance: '0.8km',
      isOnline: true
    },
    {
      id: 6,
      name: 'Clean Masters',
      service: 'Deep Cleaning',
      rating: 4.7,
      reviews: 156,
      distance: '2.1km',
      isOnline: false
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Hub</h1>
            <p className="text-neutral-600">Your connections and saved services</p>
          </div>
          <div className="flex space-x-3">
            <button className="p-3 bg-white rounded-xl border border-neutral-300 hover:bg-neutral-50">
              <Bell className="w-5 h-5" />
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                className="p-3 bg-white rounded-xl border border-neutral-300 hover:bg-neutral-50"
              >
                <Settings className="w-5 h-5" />
              </button>
              
              {showSettingsDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-200 z-50">
                  <div className="py-2">
                    <Link
                      to="/settings"
                      onClick={() => setShowSettingsDropdown(false)}
                      className="flex items-center px-4 py-3 hover:bg-neutral-50 text-neutral-700"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 hover:bg-neutral-50 text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ... rest of your JSX remains exactly the same ... */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-600">Active Chats</p>
                    <p className="text-3xl font-bold">3</p>
                  </div>
                  <MessageCircle className="w-10 h-10 text-primary-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-600">Saved</p>
                    <p className="text-3xl font-bold">8</p>
                  </div>
                  <Heart className="w-10 h-10 text-rose-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-600">Viewed</p>
                    <p className="text-3xl font-bold">24</p>
                  </div>
                  <Eye className="w-10 h-10 text-accent-500" />
                </div>
              </div>
            </div>

            {/* Recent Connections */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recent Connections</h2>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setActiveFilter('recent')}
                    className={`px-3 py-1 rounded-lg ${activeFilter === 'recent' ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-700'}`}
                  >
                    Recent
                  </button>
                  <button 
                    onClick={() => setActiveFilter('waiting')}
                    className={`px-3 py-1 rounded-lg ${activeFilter === 'waiting' ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-700'}`}
                  >
                    Waiting
                  </button>
                  <Link to="/messages" className="text-primary-600 font-medium ml-4">
                    View All
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                {recentConnections.map((connection) => (
                  <div key={connection.id} className="p-4 border border-neutral-200 rounded-xl hover:border-primary-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={connection.providerAvatar}
                          alt={connection.provider}
                          className="w-12 h-12 rounded-full mr-3"
                        />
                        <div>
                          <h3 className="font-bold text-lg">{connection.service}</h3>
                          <p className="text-neutral-600">{connection.provider}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          connection.status === 'replied' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {connection.status === 'replied' ? 'Replied' : 'Waiting'}
                        </span>
                        <p className="text-sm text-neutral-500 mt-1">{connection.contacted}</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-neutral-600">
                      <div className="flex items-center mr-4">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        <span className="text-sm">{connection.method}</span>
                      </div>
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <button className="px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600">
                        Open Chat
                      </button>
                      <button className="px-4 py-2 border border-neutral-300 rounded-lg font-medium hover:bg-neutral-50">
                        View Profile
                      </button>
                      <button className="ml-auto text-rose-600 font-medium hover:text-rose-700">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Services */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Saved Services</h2>
                <Link to="/saved" className="text-primary-600 font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {savedServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl hover:bg-neutral-50">
                    <div className="flex items-center">
                      <img
                        src={service.providerAvatar}
                        alt={service.provider}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h3 className="font-bold">{service.service}</h3>
                        <p className="text-neutral-600 text-sm">{service.provider}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end mb-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{service.rating}</span>
                      </div>
                      <p className="text-sm text-neutral-500">{service.saved}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">JD</span>
                </div>
                <h3 className="font-bold text-xl">John Doe</h3>
                <p className="text-neutral-600 mb-4">john@example.com</p>
                <button className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium py-3 rounded-xl mb-3">
                  Edit Profile
                </button>
                <Link to="/create" className="w-full block btn-primary py-3 rounded-xl">
                  List a Service
                </Link>
              </div>
            </div>

            {/* Recommended Providers */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
              <h3 className="font-bold text-lg mb-4">Recommended For You</h3>
              <div className="space-y-4">
                {recommendedProviders.map((provider) => (
                  <div key={provider.id} className="p-4 border border-neutral-200 rounded-xl hover:border-primary-300">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold">{provider.name}</h4>
                      {provider.isOnline && (
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">{provider.service}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{provider.rating}</span>
                        <span className="text-neutral-500 ml-1">({provider.reviews})</span>
                      </div>
                      <span className="text-neutral-500">{provider.distance}</span>
                    </div>
                    <button className="w-full mt-3 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg font-medium hover:bg-primary-100">
                      Contact Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
              <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/search" className="flex items-center p-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl">
                  <Search className="w-5 h-5 mr-3 text-neutral-600" />
                  <span>Find Services</span>
                </Link>
                <Link to="/feed" className="flex items-center p-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl">
                  <Eye className="w-5 h-5 mr-3 text-neutral-600" />
                  <span>Browse Feed</span>
                </Link>
                <Link to="/messages" className="flex items-center p-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl">
                  <MessageCircle className="w-5 h-5 mr-3 text-neutral-600" />
                  <span>Messages</span>
                </Link>
              </div>
            </div>

            {/* Need Help */}
            <div className="p-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl text-white">
              <h3 className="font-bold text-lg mb-2">Need Help?</h3>
              <p className="text-sm mb-4">Our support team is here to help you 24/7</p>
              <button className="w-full bg-white text-primary-600 font-bold py-3 rounded-xl hover:bg-neutral-100">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}