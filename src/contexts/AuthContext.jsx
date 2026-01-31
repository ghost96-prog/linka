// src/contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on initial render
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('linka_user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadUser()
  }, [])

  const login = async (email, password) => {
    // In a real app, this would be an API call
    // For demo purposes, we'll simulate authentication
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData = {
            id: '1',
            name: 'John Doe',
            email: email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
          }
          setUser(userData)
          localStorage.setItem('linka_user', JSON.stringify(userData))
          resolve(userData)
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 1000)
    })
  }

  const register = async (userData) => {
    // In a real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email && userData.password) {
          const newUser = {
            id: Date.now().toString(),
            name: userData.name || 'New User',
            email: userData.email,
            phone: userData.phone || '',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name || userData.email}`
          }
          setUser(newUser)
          localStorage.setItem('linka_user', JSON.stringify(newUser))
          resolve(newUser)
        } else {
          reject(new Error('Registration failed'))
        }
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('linka_user')
  }

  const triggerLogin = () => setShowLoginModal(true)

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      loading,
      showLoginModal,
      setShowLoginModal,
      triggerLogin
    }}>
      {children}
    </AuthContext.Provider>
  )
}