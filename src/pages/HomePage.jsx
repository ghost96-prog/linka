// src/pages/HomePage.jsx
import { ArrowRight, Sparkles, Shield, Zap, ChevronRight, Users, MapPin, Clock } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import logo from '../assets/linka.png'

export default function HomePage() {
  const { user, triggerLogin } = useAuth()
  const navigate = useNavigate()
  // Your brand colors
  const primaryColor = '#25343F' // Dark blue-gray
  const secondaryColor = '#161E54' // Deep navy blue
  const accentColor = '#3B82F6' // Bright blue for highlights
  const lightAccent = '#60A5FA' // Lighter blue

  const categories = [
    { name: 'Home Services', icon: '🏠', count: '2.5k+', color: 'from-blue-500 to-cyan-500' },
    { name: 'Beauty & Spa', icon: '💅', count: '1.8k+', color: 'from-purple-500 to-pink-500' },
    { name: 'Fitness', icon: '💪', count: '850+', color: 'from-green-500 to-emerald-500' },
    { name: 'Tutoring', icon: '📚', count: '1.2k+', color: 'from-orange-500 to-amber-500' },
    { name: 'Tech Support', icon: '💻', count: '950+', color: 'from-indigo-500 to-blue-500' },
    { name: 'Events', icon: '🎉', count: '650+', color: 'from-rose-500 to-red-500' },
  ]

  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Proximity Based',
      description: 'Find providers within your area instantly with smart location matching',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Verified & Rated',
      description: 'Every professional is background checked and community-rated',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Visual Discovery',
      description: 'Browse services through engaging reels-style feed',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Instant Connection',
      description: 'Contact providers directly via WhatsApp in seconds',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    }
  ]

  const stats = [
    { label: 'Active Providers', value: '5,000+', icon: Users },
    { label: 'Services Available', value: '200+', icon: Zap },
    { label: 'Cities Covered', value: '50+', icon: MapPin },
    { label: 'Happy Clients', value: '10,000+', icon: Users },
  ]
const handleBecomeProvider = () => {
  if (!user) {
    // Navigate to auth page with provider mode
    navigate('/auth')
    return
  }
  // If user is logged in, navigate to provider dashboard
  navigate('/provider-dashboard')
}


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden py-20 md:py-32"
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-300 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-0 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left Content */}
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Logo/Brand */}
                  <div className="flex items-center  ">
                    <div className="w-22 h-22 rounded-xl flex items-center justify-center"
                         style={{ backgroundColor: "" }}>
                      <img 
                        src={logo} 
                        alt="Linka Logo" 
                        className="w-30 h-60 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentElement.innerHTML = `
                            <span class="text-white font-bold text-xl">L</span>
                          `
                        }}
                      />
                    </div>
                  </div>

                  <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full"
                       style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                    <Sparkles className="w-5 h-5" style={{ color: lightAccent }} />
                    <span className="font-medium text-white">Discover local services reimagined</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                    Connect with <br />
                    <span style={{ color: lightAccent }}>Trusted Professionals</span>
                  </h1>
                  
                  <p className="text-xl text-gray-300 mb-10 max-w-2xl">
                    Browse services through reels, find nearby providers instantly, and connect directly via WhatsApp. Your local service marketplace, simplified.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mb-16">
                    <Link
                      to="/feed"
                      className="inline-flex items-center justify-center space-x-2 text-lg px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105"
                      style={{ 
                        backgroundColor: accentColor,
                        color: 'white'
                      }}
                    >
                      <span>Explore Services</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  <button
  onClick={handleBecomeProvider}
  className="inline-flex items-center justify-center space-x-2 text-lg px-8 py-4 rounded-xl font-semibold border-2 transition-all hover:scale-105"
  style={{ 
    borderColor: accentColor,
    color: 'white'
  }}
>
  <span>REGISTER</span>
</button>
                  </div>
                </motion.div>
              </div>

              {/* Right Illustration */}
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                 <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
  <div className="grid grid-cols-2 gap-4">
    {[
      { emoji: '🔌', title: 'Electrician', color: 'bg-yellow-500' },
      { emoji: '🚰', title: 'Plumbing', color: 'bg-blue-500' },
      { emoji: '📸', title: 'Photography', color: 'bg-purple-500' },
      { emoji: '💍', title: 'Lobola Events', color: 'bg-rose-500' },
      { emoji: '✂️', title: 'Barber', color: 'bg-indigo-500' },
      { emoji: '🔨', title: 'Hardware', color: 'bg-orange-500' },
      { emoji: '📱', title: 'Gadgets Repair', color: 'bg-cyan-500' },
      { emoji: '🚚', title: 'Moving Services', color: 'bg-emerald-500' },
    ].map((item, index) => (
      <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all hover:scale-105">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3 ${item.color}`}>
          {item.emoji}
        </div>
        <h3 className="font-semibold text-white text-sm">{item.title}</h3>
        <p className="text-xs text-gray-400 mt-1">20+ providers</p>
      </div>
    ))}
  </div>
  <div className="mt-8 p-4 rounded-2xl"
       style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
        <span className="text-white">✓</span>
      </div>
      <div>
        <p className="font-medium text-white">Direct WhatsApp Connection</p>
        <p className="text-sm text-gray-300">Contact providers instantly</p>
      </div>
    </div>
  </div>
</div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                       style={{ backgroundColor: `${primaryColor}20` }}>
                    <Icon className="w-8 h-8" style={{ color: primaryColor }} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: primaryColor }}>
                    {stat.value}
                  </div>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
              Popular Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Discover services across various categories tailored to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link
                  to="/search"
                  className="group flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-center">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} providers</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
              Why Choose Linka?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We're changing how people find and connect with local service providers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className={`${feature.bgColor} p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300`}
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bgColor.replace('50', '100')} flex items-center justify-center mb-6`}>
                  <div className={feature.iconColor}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16"
               style={{
                 background: `linear-gradient(135deg, ${primaryColor}15 0%, ${secondaryColor}15 100%)`
               }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Simple steps to connect with the right service provider
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { number: '1', title: 'Discover', desc: 'Browse services through our engaging reels-style feed', icon: '👁️' },
              { number: '2', title: 'Contact', desc: 'Connect directly with providers via WhatsApp', icon: '💬' },
              { number: '3', title: 'Arrange', desc: 'Discuss details and arrange service privately', icon: '🤝' },
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
                       style={{ backgroundColor: accentColor }}>
                    {step.number}
                  </div>
                  <div className="text-4xl mb-6">{step.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20"
               style={{
                 background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
               }}>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                   style={{ backgroundColor: "accentColor" }}>
                <img 
                  src={logo} 
                  alt="Linka Logo" 
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML = `
                      <span class="text-white font-bold text-xl">L</span>
                    `
                  }}
                />
              </div>
              <span className="text-2xl font-bold text-white">Linka</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to experience service discovery reimagined?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Join thousands of satisfied clients and trusted providers in your area
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/feed"
                className="inline-flex items-center justify-center space-x-2 text-lg px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105"
                style={{ 
                  backgroundColor: 'white',
                  color: primaryColor
                }}
              >
                <span>Start Exploring Now</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
              <button
  onClick={handleBecomeProvider}
                className="inline-flex items-center justify-center space-x-2 text-lg px-8 py-4 rounded-xl font-semibold border-2 transition-all hover:scale-105"
   style={{ 
                  borderColor: 'white',
                  color: 'white'
                }}
>
                <span>List Your Service</span>
</button>
              
            </div>

            <p className="text-gray-400 mt-8 text-sm">
              No signup required to browse. Start discovering services instantly!
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}