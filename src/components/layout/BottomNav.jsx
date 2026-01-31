// src/components/layout/BottomNav.jsx
import { Home, Compass, PlusCircle, Bookmark, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function BottomNav() {
  const location = useLocation()
  const { user, triggerLogin } = useAuth()



  const navItems = [
    { icon: Home, label: 'Feed', path: '/feed', public: true },
    { icon: Compass, label: 'Explore', path: '/search', public: true },
    { icon: PlusCircle, label: 'Post', path: '/create', public: false },
    { icon: Bookmark, label: 'Saved', path: '/saved', public: false },
    { 
      icon: User, 
      label: 'Profile', 
      path: user ? '/dashboard' : '#',
      public: false,
      onClick: user ? null : triggerLogin
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-neutral-200 z-40 lg:hidden">
      <div className="flex justify-around items-center py-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          
          // If user not logged in and screen is protected, show login trigger
          if (!user && !item.public) {
            return (
              <button
                key={item.label}
                onClick={triggerLogin}
                className="flex flex-col items-center space-y-1"
              >
                <div className={`p-1 rounded-full ${isActive ? 'bg-primary-50 text-primary-500' : 'text-neutral-400'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs ${isActive ? 'text-primary-500 font-medium' : 'text-neutral-500'}`}>
                  {item.label}
                </span>
              </button>
            )
          }
          
          return item.onClick ? (
            <button
              key={item.label}
              onClick={item.onClick}
              className="flex flex-col items-center space-y-1"
            >
              <div className={`p-1 rounded-full ${isActive ? 'bg-primary-50 text-primary-500' : 'text-neutral-400'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-xs ${isActive ? 'text-primary-500 font-medium' : 'text-neutral-500'}`}>
                {item.label}
              </span>
            </button>
          ) : (
            <Link
              key={item.label}
              to={item.path}
              className="flex flex-col items-center space-y-1"
            >
              <div className={`p-1 rounded-full ${isActive ? 'bg-primary-50 text-primary-500' : 'text-neutral-400'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-xs ${isActive ? 'text-primary-500 font-medium' : 'text-neutral-500'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}