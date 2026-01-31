// src/components/features/auth/LoginModal.jsx
import { useState } from 'react'
import { X, Mail, Lock, User, Phone, Eye, EyeOff, Facebook, Chrome as Google } from 'lucide-react'
import { useAuth } from '../../../contexts/AuthContext'
import toast from 'react-hot-toast'

export default function LoginModal() {
  const { showLoginModal, setShowLoginModal, login, register } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })

  const validateForm = () => {
    if (isLogin) {
      if (!formData.email || !formData.password) {
        toast.error('Please fill in all fields')
        return false
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        toast.error('Please enter a valid email')
        return false
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error('Please fill in all required fields')
        return false
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        toast.error('Please enter a valid email')
        return false
      }
      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters')
        return false
      }
    }
    return true
  }

 const handleSubmit = async (e) => {
  e.preventDefault()
  
  if (!validateForm()) return
  
  setLoading(true)
  
  try {
    if (isLogin) {
      await login(formData.email, formData.password)
      toast.success('Successfully logged in!')
    } else {
      await register(formData)
      toast.success('Account created successfully!')
    }
    
    // CLOSE THE MODAL AFTER SUCCESS
    setShowLoginModal(false)
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: ''
    })
    
    // Reset to login view for next time
    setIsLogin(true)
    
  } catch (error) {
    toast.error(error.message || 'Authentication failed')
  } finally {
    setLoading(false)
  }
}

  const handleSocialLogin = (provider) => {
    toast.success(`Sign in with ${provider} would be implemented in production`)
  }

  if (!showLoginModal) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden max-h-[90vh] md:max-h-[550px] lg:max-h-[500px] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setShowLoginModal(false)
            setIsLogin(true)
            setFormData({
              name: '',
              email: '',
              phone: '',
              password: ''
            })
          }}
          className="absolute top-3 right-3 md:top-4 md:right-4 p-1.5 md:p-2 rounded-full hover:bg-neutral-100 transition-colors z-10"
        >
          <X className="w-4 h-4 md:w-5 md:h-5 text-neutral-600" />
        </button>

        {/* Header */}
        <div className="p-4 md:p-6 lg:p-6 pb-0">
          <div className="text-center mb-4 md:mb-5">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg md:rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-3">
              <span className="text-white text-base md:text-lg font-bold">L</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold mb-1">
              {isLogin ? 'Welcome Back!' : 'Join Linka'}
            </h2>
            <p className="text-neutral-600 text-sm">
              {isLogin ? 'Sign in to book services' : 'Create your account to get started'}
            </p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button 
              onClick={() => handleSocialLogin('Google')}
              className="flex items-center justify-center space-x-2 py-2 bg-neutral-50 hover:bg-neutral-100 rounded-lg border border-neutral-200 transition-colors text-sm"
            >
              <Google className="w-4 h-4" />
              <span>Google</span>
            </button>
            <button 
              onClick={() => handleSocialLogin('Facebook')}
              className="flex items-center justify-center space-x-2 py-2 bg-neutral-50 hover:bg-neutral-100 rounded-lg border border-neutral-200 transition-colors text-sm"
            >
              <Facebook className="w-4 h-4 text-blue-600" />
              <span>Facebook</span>
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-neutral-600">or continue with email</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 lg:p-6 pt-0">
          <div className="space-y-3 md:space-y-3">
            {!isLogin && (
              <div>
                <label className="block text-xs md:text-sm font-medium text-neutral-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4 md:w-4 md:h-4" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-9 md:pl-10 pr-3 py-2 md:py-2.5 bg-neutral-50 rounded-lg border border-neutral-300 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs md:text-sm font-medium text-neutral-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4 md:w-4 md:h-4" />
                <input
                  type="email"
                  placeholder="hello@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-9 md:pl-10 pr-3 py-2 md:py-2.5 bg-neutral-50 rounded-lg border border-neutral-300 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all text-sm"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs md:text-sm font-medium text-neutral-700 mb-1.5">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4 md:w-4 md:h-4" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-9 md:pl-10 pr-3 py-2 md:py-2.5 bg-neutral-50 rounded-lg border border-neutral-300 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs md:text-sm font-medium text-neutral-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4 md:w-4 md:h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-9 md:pl-10 pr-9 md:pr-10 py-2 md:py-2.5 bg-neutral-50 rounded-lg border border-neutral-300 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? 
                    <EyeOff className="w-4 h-4 md:w-4 md:h-4" /> : 
                    <Eye className="w-4 h-4 md:w-4 md:h-4" />
                  }
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold py-2.5 md:py-3 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </span>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>

          <div className="text-center mt-3 md:mt-4">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  password: ''
                })
              }}
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>

          <p className="text-xs text-neutral-500 text-center mt-3 px-2">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </div>
    </div>
  )
}