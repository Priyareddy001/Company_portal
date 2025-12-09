import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await login(email, password)
    
    if (result.success) {
      navigate('/app/dashboard')
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

      return (
        <div className="h-screen w-screen flex items-center justify-center font-sans fixed inset-0 overflow-hidden">
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/src/assets/Background.mp4" type="video/mp4" />
            {/* Fallback image if video doesn't load */}
            <img 
              src="/src/assets/login_theme_image.jpg" 
              alt="Background" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </video>
          
          {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          
        
        {/* Left Side Welcome Section */}
      <div className="absolute top-1/2 left-24 transform -translate-y-1/2 -translate-y-28 z-10 max-w-2xl">
        <div className="text-image.png">
          <h1 className="text-7xl font-bold mb-6 leading-tight text-white">
            Welcome to <span className="text-white whitespace-nowrap">Stellite Works</span>
          </h1>
          <p className="text-2xl font-light text-white/100 italic leading-relaxed">
            "Empowering Talent, Elevating Success"
          </p>
        </div>
      </div>
      
      {/* Login Form Container */}
      <div className="absolute top-1/2 right-24 transform -translate-y-1/2 z-10 w-full max-w-md">
        <div className="backdrop-blur-2xl bg-white/5 rounded-2xl shadow-2xl border border-white/15 p-8 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 backdrop-blur-lg bg-white/5 border border-white/15 rounded-lg focus:outline-none transition-colors text-white placeholder-white/70 font-normal"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 backdrop-blur-lg bg-white/5 border border-white/15 rounded-lg focus:outline-none transition-colors text-white placeholder-white/70 font-normal"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-white/70 hover:text-white" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-white/70 hover:text-white" />
                )}
              </button>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-white/70">
                <input type="checkbox" className="mr-2 rounded" />
                Remember me
              </label>
              <a href="#" className="text-white/70 hover:text-white">Forgot Password?</a>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg backdrop-blur-sm bg-red-500/20 border border-red-400/30 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-200 drop-shadow-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#20406B]
 hover:bg-[#0A1A2F]
 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Login