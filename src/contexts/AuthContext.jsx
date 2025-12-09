import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('employee_portal_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Demo authentication - in real app, this would be an API call
    const demoUsers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@company.com',
        role: 'employee',
        department: 'Engineering',
        position: 'Software Developer',
        avatar: null
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@company.com',
        role: 'manager',
        department: 'Engineering',
        position: 'Engineering Manager',
        avatar: null
      },
      {
        id: 3,
        name: 'Admin User',
        email: 'admin@company.com',
        role: 'admin',
        department: 'HR',
        position: 'HR Manager',
        avatar: null
      }
    ]

    const foundUser = demoUsers.find(u => u.email === email)
    
    if (foundUser && password === 'password') {
      setUser(foundUser)
      localStorage.setItem('employee_portal_user', JSON.stringify(foundUser))
      return { success: true }
    }
    
    return { success: false, error: 'Invalid credentials' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('employee_portal_user')
  }

  const value = {
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
