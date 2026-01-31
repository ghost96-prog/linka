// src/components/layout/Navbar.jsx
import { Search, MapPin, Bell, Home, Compass, Plus, Bookmark, MessageCircle } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Navbar() {
  const { user, triggerLogin,logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    // { icon: Home, label: 'Home', path: '/home', public: true },
    { icon: Compass, label: 'Feed', path: '/feed', public: true },
    { icon: Compass, label: 'Explore', path: '/search', public: true },
    { icon: Plus, label: 'Create', path: '/create', public: false },
    { icon: Bookmark, label: 'Saved', path: '/saved', public: false },
    { icon: MessageCircle, label: 'Messages', path: '/messages', public: false },
  ]

  const handleNavClick = (item) => {
    if (!user && !item.public) {
      triggerLogin()
      return
    }
    navigate(item.path)
  }
const handleLogout = () => {
  logout()
  navigate('/home') // Navigate to home
}
  return (
    <nav className="hidden md:block sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-neutral-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-2xl font-bold text-gradient">Linka</span>
          </Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              // For protected screens when not logged in
              if (!user && !item.public) {
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${isActive ? 'bg-primary-50 text-primary-600' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              }
              
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${isActive ? 'bg-primary-50 text-primary-600' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Location & Search */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={() => navigate('/search')}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
            >
              <MapPin className="w-4 h-4 text-primary-500" />
              <span className="font-medium">Nearby • 5km</span>
            </button>

            {/* <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Find services..."
                className="w-64 pl-12 pr-4 py-2 bg-neutral-100 rounded-xl border border-transparent focus:border-primary-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div> */}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Tablet Search Toggle */}
            <button className="lg:hidden md:block p-2 rounded-full hover:bg-neutral-100 transition-colors">
              <Search className="w-6 h-6 text-neutral-600" />
            </button>
            
            <button className="p-2 rounded-full hover:bg-neutral-100 transition-colors">
              <Bell className="w-6 h-6 text-neutral-600" />
            </button>
            
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Dashboard/Profile Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {user.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="font-medium hidden md:inline">{user.name}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-4 border-b border-neutral-100">
                      <p className="font-bold">{user.name}</p>
                      <p className="text-sm text-neutral-600">{user.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-neutral-50"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <Home className="w-4 h-4 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium">Client Dashboard</p>
                          <p className="text-sm text-neutral-600">View connections & activity</p>
                        </div>
                      </Link>
                      
                      <Link
                        to="/provider-dashboard"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-neutral-50"
                      >
                        <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center">
                          <Plus className="w-4 h-4 text-accent-600" />
                        </div>
                        <div>
                          <p className="font-medium">Provider Dashboard</p>
                          <p className="text-sm text-neutral-600">Manage services</p>
                        </div>
                      </Link>
                    </div>
                    <div className="p-4 border-t border-neutral-100">
                     <button 
    onClick={handleLogout}
    className="w-full btn-secondary py-2"
  >
    Sign Out
  </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={triggerLogin}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-500 hover:bg-primary-600 text-white transition-colors"
              >
                <span className="font-medium">Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Tablet Navigation (md: lg:) */}
        <div className="mt-3 md:block lg:hidden">
          <div className="flex overflow-x-auto scrollbar-hide">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              // For protected screens when not logged in
              if (!user && !item.public) {
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className={`flex flex-col items-center px-3 py-2 min-w-[70px] ${isActive ? 'text-primary-600 border-b-2 border-primary-600' : 'text-neutral-500'}`}
                  >
                    <Icon className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                )
              }
              
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex flex-col items-center px-3 py-2 min-w-[70px] ${isActive ? 'text-primary-600 border-b-2 border-primary-600' : 'text-neutral-500'}`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Tablet Search Bar */}
        <div className="mt-3 md:block lg:hidden">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search services..."
              className="w-full pl-12 pr-4 py-2 bg-neutral-100 rounded-xl border border-transparent focus:border-primary-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}