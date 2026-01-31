
// src/pages/ProviderDashboardPage.jsx
import { MessageCircle, Eye, Users, TrendingUp, Filter, Phone, Star, Share2, Zap, BarChart } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProviderDashboardPage() {
  const [timeFilter, setTimeFilter] = useState('week')

  // Stats for connection platform
  const stats = [
    { 
      label: 'Total Connections', 
      value: '48', 
      change: '+12', 
      icon: Users, 
      color: 'text-primary-500',
      description: 'Clients who contacted you'
    },
    { 
      label: 'Profile Views', 
      value: '2.4k', 
      change: '+42%', 
      icon: Eye, 
      color: 'text-blue-500',
      description: 'Views this month'
    },
    { 
      label: 'Response Rate', 
      value: '94%', 
      change: '+8%', 
      icon: MessageCircle, 
      color: 'text-green-500',
      description: 'Avg. reply time: 12min'
    },
    { 
      label: 'Satisfaction', 
      value: '4.9', 
      change: '+0.2', 
      icon: Star, 
      color: 'text-accent-500',
      description: 'Based on 127 reviews'
    },
  ]

  // Recent connections/messages
  const recentConnections = [
    { 
      id: 1, 
      client: 'Sarah Johnson', 
      service: 'Hair Styling',
      message: 'Hi! I need help with my wedding hairstyle...',
      time: 'Just now', 
      status: 'new',
      via: 'WhatsApp',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    { 
      id: 2, 
      client: 'Mike Wilson', 
      service: 'Regular Haircuts',
      message: 'Looking for a stylist in my area',
      time: '30 min ago', 
      status: 'replied',
      via: 'Direct Message',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
    },
    { 
      id: 3, 
      client: 'Emma Davis', 
      service: 'Hair Coloring',
      message: 'Can you help with color correction?',
      time: '2 hours ago', 
      status: 'conversation',
      via: 'WhatsApp',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'
    },
    { 
      id: 4, 
      client: 'James Brown', 
      service: 'Consultation',
      message: 'Available for a quick call?',
      time: '1 day ago', 
      status: 'completed',
      via: 'Phone Call',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James'
    },
    { 
      id: 5, 
      client: 'Lisa Taylor', 
      service: 'Hair Treatment',
      message: 'Thanks for the great service!',
      time: '2 days ago', 
      status: 'review',
      via: 'Direct Message',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa'
    },
  ]

  // Service analytics based on interest
  const serviceAnalytics = [
    { 
      id: 1, 
      name: 'Hair Styling', 
      connections: 24, 
      views: 420,
      interest: 'High',
      featured: true
    },
    { 
      id: 2, 
      name: 'Hair Coloring', 
      connections: 18, 
      views: 380,
      interest: 'High',
      featured: false
    },
    { 
      id: 3, 
      name: 'Haircut', 
      connections: 32, 
      views: 560,
      interest: 'Very High',
      featured: true
    },
    { 
      id: 4, 
      name: 'Consultation', 
      connections: 12, 
      views: 210,
      interest: 'Medium',
      featured: false
    },
  ]

  // Time filters
  const timeFilters = [
    { label: 'Today', value: 'today' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'All Time', value: 'all' },
  ]

  const getStatusBadge = (status) => {
    const styles = {
      new: 'bg-blue-100 text-blue-800',
      replied: 'bg-green-100 text-green-800',
      conversation: 'bg-purple-100 text-purple-800',
      completed: 'bg-accent-100 text-accent-800',
      review: 'bg-yellow-100 text-yellow-800'
    }
    const labels = {
      new: 'New',
      replied: 'Replied',
      conversation: 'In Chat',
      completed: 'Connected',
      review: 'Reviewed'
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  const getViaBadge = (via) => {
    const styles = {
      'WhatsApp': 'bg-green-100 text-green-800',
      'Direct Message': 'bg-primary-100 text-primary-800',
      'Phone Call': 'bg-blue-100 text-blue-800'
    }
    return (
      <span className={`px-2 py-0.5 rounded text-xs ${styles[via]}`}>
        {via}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Provider Hub</h1>
              <p className="text-neutral-600">Manage your services and client connections</p>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/create" className="btn-primary">
                <Zap className="w-5 h-5 mr-2" />
                Add Service
              </Link>
              <button className="p-3 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Time Filter */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-neutral-500" />
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {timeFilters.map(filter => (
                <button
                  key={filter.value}
                  onClick={() => setTimeFilter(filter.value)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${timeFilter === filter.value ? 'bg-primary-500 text-white' : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50'}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid - Connection metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white p-5 rounded-xl border border-neutral-200 hover:border-primary-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-').replace('-500', '-50')}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-neutral-700 font-medium text-sm">{stat.label}</p>
                <p className="text-xs text-neutral-500 mt-1">{stat.description}</p>
              </div>
            )
          })}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Connections */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">Recent Connections</h2>
                  <p className="text-neutral-600 text-sm">Clients who reached out to you</p>
                </div>
                <Link to="/messages" className="text-primary-600 font-medium hover:text-primary-700">
                  View All Messages →
                </Link>
              </div>

              <div className="space-y-4">
                {recentConnections.map(connection => (
                  <div key={connection.id} className="p-4 border border-neutral-200 rounded-xl hover:border-primary-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <img
                          src={connection.avatar}
                          alt={connection.client}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-bold">{connection.client}</h3>
                            {getStatusBadge(connection.status)}
                          </div>
                          <p className="text-neutral-700 text-sm">{connection.service}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-neutral-500 mb-1">{connection.time}</span>
                        {getViaBadge(connection.via)}
                      </div>
                    </div>
                    
                    <p className="text-neutral-600 text-sm mb-3 line-clamp-1">{connection.message}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-sm">
                        {connection.status === 'new' && (
                          <button className="px-3 py-1.5 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600">
                            Reply Now
                          </button>
                        )}
                        {connection.via === 'WhatsApp' && (
                          <button className="px-3 py-1.5 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600">
                            Open WhatsApp
                          </button>
                        )}
                        <button className="px-3 py-1.5 border border-neutral-300 rounded-lg font-medium hover:bg-neutral-50">
                          View Profile
                        </button>
                      </div>
                      <button className="text-neutral-400 hover:text-neutral-600">
                        <Phone className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Performance */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">Service Performance</h2>
                  <p className="text-neutral-600 text-sm">Which services get the most interest</p>
                </div>
                <select className="bg-transparent border border-neutral-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary-300">
                  <option>Sort by Connections</option>
                  <option>Sort by Views</option>
                  <option>Sort by Interest</option>
                </select>
              </div>

              <div className="space-y-3">
                {serviceAnalytics.map(service => (
                  <div key={service.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl hover:border-primary-300 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold">{service.name}</h3>
                        {service.featured && (
                          <span className="px-2 py-0.5 bg-accent-100 text-accent-700 text-xs rounded-full">
                            Featured
                          </span>
                        )}
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          service.interest === 'Very High' ? 'bg-green-100 text-green-800' :
                          service.interest === 'High' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {service.interest} Interest
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="font-bold text-lg">{service.connections}</p>
                        <p className="text-xs text-neutral-500">Connections</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-lg">{service.views}</p>
                        <p className="text-xs text-neutral-500">Views</p>
                      </div>
                      <Link 
                        to={`/provider/1`} // Link to service edit or details
                        className="text-primary-600 font-medium hover:text-primary-700"
                      >
                        Manage
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link 
                  to="/create"
                  className="flex items-center p-4 bg-primary-50 hover:bg-primary-100 rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3 group-hover:bg-primary-200">
                    <Zap className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Add New Service</p>
                    <p className="text-sm text-neutral-600">Create a new listing</p>
                  </div>
                </Link>
                
                <Link 
                  to="/messages"
                  className="flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Respond to Messages</p>
                    <p className="text-sm text-neutral-600">3 new connections</p>
                  </div>
                </Link>
                
                <button className="w-full flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Boost Visibility</p>
                    <p className="text-sm text-neutral-600">Get more views</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center p-4 bg-accent-50 hover:bg-accent-100 rounded-xl transition-colors">
                  <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center mr-3">
                    <BarChart className="w-5 h-5 text-accent-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">View Analytics</p>
                    <p className="text-sm text-neutral-600">Performance insights</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Profile Tips */}
            <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-5 text-white">
              <h3 className="font-bold text-lg mb-4">Profile Tips</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">Increase Visibility</p>
                    <p className="text-sm opacity-90">Add more photos & videos</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">Fast Response</p>
                    <p className="text-sm opacity-90">Reply within 15 minutes</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Star className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">Get Reviews</p>
                    <p className="text-sm opacity-90">Ask happy clients for reviews</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-white text-primary-600 font-bold py-3 rounded-xl hover:bg-neutral-100 transition-colors">
                Optimize Profile
              </button>
            </div>

            {/* Platform Guide */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5">
              <h3 className="font-bold text-lg mb-3">How It Works</h3>
              <p className="text-neutral-600 text-sm mb-4">
                Linka connects you directly with clients. Here's how:
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-sm">Clients discover you</p>
                    <p className="text-xs text-neutral-500">Through feed, search, or recommendations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-sm">They contact you directly</p>
                    <p className="text-xs text-neutral-500">Via WhatsApp, call, or direct message</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-sm">You connect & discuss</p>
                    <p className="text-xs text-neutral-500">Arrange services directly with client</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold mt-0.5">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-sm">Client leaves review</p>
                    <p className="text-xs text-neutral-500">Builds your reputation for more connections</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
