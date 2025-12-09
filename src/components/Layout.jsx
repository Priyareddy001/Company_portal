import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import ConstantHeader from './ConstantHeader'
import { 
  HomeIcon, 
  UserIcon, 
  CalendarDaysIcon, 
  UsersIcon, 
  MegaphoneIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ClockIcon,
  SunIcon,
  MoonIcon,
  CogIcon,
  ShieldCheckIcon,
  GiftIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { useState, useEffect, useRef } from 'react'
import { 
  checkIn, 
  checkOut, 
  getTodayCheckInStatus 
} from '../utils/timeTracking'

const Layout = () => {
  const { user, logout } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [checkedIn, setCheckedIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [timeMessage, setTimeMessage] = useState({ text: '', type: '' })
  const notificationRef = useRef(null)
  const profileRef = useRef(null)
  const mainContentRef = useRef(null)

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationsOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }

    if (notificationsOpen || profileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [notificationsOpen, profileOpen])

  // Reset scroll position when route changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0
    }
  }, [location.pathname])

  // Load check-in status
  const refreshCheckInStatus = () => {
    if (user) {
      const status = getTodayCheckInStatus(user.id)
      setCheckedIn(status.checkedIn)
      if (status.checkedIn) {
        setCheckInTime(status.checkInTime)
      } else {
        setCheckInTime(null)
      }
    } else {
      setCheckedIn(false)
      setCheckInTime(null)
    }
  }

  useEffect(() => {
    if (!user) return
    
    refreshCheckInStatus()

    // Listen for custom events from TimeTracking page
    const handleTimeTrackingUpdate = () => {
      try {
        refreshCheckInStatus()
      } catch (error) {
        console.warn('Error in timeTrackingUpdate handler:', error)
      }
    }
    
    // Refresh periodically to stay in sync
    const interval = setInterval(() => {
      try {
        refreshCheckInStatus()
      } catch (error) {
        console.warn('Error in sync interval:', error)
      }
    }, 2000)

    // Refresh when window gains focus
    const handleFocus = () => {
      try {
        refreshCheckInStatus()
      } catch (error) {
        console.warn('Error in focus handler:', error)
      }
    }
    
    try {
      window.addEventListener('timeTrackingUpdate', handleTimeTrackingUpdate)
      window.addEventListener('focus', handleFocus)
    } catch (error) {
      console.warn('Error adding event listeners:', error)
    }

    return () => {
      try {
        window.removeEventListener('timeTrackingUpdate', handleTimeTrackingUpdate)
        window.removeEventListener('focus', handleFocus)
        clearInterval(interval)
      } catch (error) {
        // Ignore cleanup errors
      }
    }
  }, [user])

  // Update elapsed time if checked in
  useEffect(() => {
    if (checkedIn && checkInTime) {
      const timer = setInterval(() => {
        const now = new Date()
        const diff = now - checkInTime
        setElapsedTime(diff)
      }, 1000)

      return () => clearInterval(timer)
    } else {
      setElapsedTime(0)
    }
  }, [checkedIn, checkInTime])

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: HomeIcon, badge: null },
    { name: 'Profile', href: '/app/profile', icon: UserIcon, badge: null },
    { name: 'Leave Management', href: '/app/leave', icon: CalendarDaysIcon, badge: '2' },
    { name: 'Employee Directory', href: '/app/directory', icon: UsersIcon, badge: null },
    { name: 'Announcements', href: '/app/announcements', icon: MegaphoneIcon, badge: '3' },
    { name: 'My Rewards', href: '/app/rewards', icon: GiftIcon, badge: null },
    { name: 'Reports', href: '/app/reports', icon: ChartBarIcon, badge: null },
    { name: 'Documents', href: '/app/documents', icon: DocumentTextIcon, badge: null },
    // Admin section
    { name: 'Admin Dashboard', href: '/app/admin', icon: ShieldCheckIcon, badge: null, admin: true },
    { name: 'User Management', href: '/app/admin/users', icon: UsersIcon, badge: null, admin: true },
    { name: 'Employee Time Tracking', href: '/app/admin/time-tracking', icon: ClockIcon, badge: null, admin: true },
    { name: 'Performance', href: '/app/admin/performance', icon: ChartBarIcon, badge: null, admin: true },
    { name: 'Rewards', href: '/app/admin/rewards', icon: GiftIcon, badge: null, admin: true },
    { name: 'System Settings', href: '/app/admin/settings', icon: CogIcon, badge: null, admin: true },
  ]

  const notifications = [
    { id: 1, title: 'Leave Request Approved', message: 'Your vacation request has been approved', time: '2 hours ago', unread: true },
    { id: 2, title: 'New Announcement', message: 'Company policy update published', time: '1 day ago', unread: true },
    { id: 3, title: 'Performance Review', message: 'Your quarterly review is due next week', time: '2 days ago', unread: false },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const handleCheckIn = () => {
    if (!user) {
      setTimeMessage({ text: 'Please login to check in', type: 'error' })
      setTimeout(() => setTimeMessage({ text: '', type: '' }), 3000)
      return
    }

    const result = checkIn(user.id, user.name)
    if (result.success) {
      setCheckedIn(true)
      setCheckInTime(result.checkInTime)
      setTimeMessage({ text: 'Checked in successfully!', type: 'success' })
      setTimeout(() => setTimeMessage({ text: '', type: '' }), 3000)
      // Dispatch event to notify other components
      try {
        window.dispatchEvent(new CustomEvent('checkInOutUpdate', { detail: { action: 'checkIn', userId: user.id } }))
      } catch (error) {
        console.warn('Error dispatching checkInOutUpdate event:', error)
      }
    } else {
      setTimeMessage({ text: result.error || 'Failed to check in', type: 'error' })
      setTimeout(() => setTimeMessage({ text: '', type: '' }), 3000)
    }
  }

  const handleCheckOut = () => {
    if (!user) {
      setTimeMessage({ text: 'Please login to check out', type: 'error' })
      setTimeout(() => setTimeMessage({ text: '', type: '' }), 3000)
      return
    }

    const result = checkOut(user.id)
    if (result.success) {
      setCheckedIn(false)
      setCheckInTime(null)
      setElapsedTime(0)
      setTimeMessage({ text: 'Checked out successfully!', type: 'success' })
      setTimeout(() => setTimeMessage({ text: '', type: '' }), 3000)
      // Dispatch event to notify other components
      try {
        window.dispatchEvent(new CustomEvent('checkInOutUpdate', { detail: { action: 'checkOut', userId: user.id } }))
      } catch (error) {
        console.warn('Error dispatching checkInOutUpdate event:', error)
      }
    } else {
      setTimeMessage({ text: result.error || 'Failed to check out', type: 'error' })
      setTimeout(() => setTimeMessage({ text: '', type: '' }), 3000)
    }
  }

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60))
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const isCurrentPath = (path) => location.pathname === path

  return (
    <div className="min-h-screen min-h-[100dvh] w-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Constant Header - Full Width at Top */}
      <ConstantHeader onMenuClick={() => setSidebarOpen(true)} />

      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-80 flex-col bg-white dark:bg-gray-800 shadow-2xl border-r border-gray-200 dark:border-gray-700 pt-20">
          <div className="flex h-16 shrink-0 items-center justify-end px-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto space-y-1 px-3 py-4">
            {navigation.filter(item => !item.admin || user?.role === 'admin').map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.href)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isCurrentPath(item.href)
                    ? 'bg-blue-100 text-blue-700 dark:bg-white/20 dark:text-white'
                    : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </div>
                {item.badge && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:top-20 lg:bottom-0 lg:left-0 lg:flex lg:w-80 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden">
          <nav className="flex-1 overflow-y-auto space-y-1 px-3 py-4">
            {navigation.filter(item => !item.admin || user?.role === 'admin').map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.href)
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isCurrentPath(item.href)
                    ? 'bg-blue-100 text-blue-700 dark:bg-white/20 dark:text-white'
                    : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </div>
                {item.badge && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
          
          {/* User section */}
          <div className="shrink-0 border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-500 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-500 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.name?.split(' ').filter(n => n.length > 0).map(n => n[0]).join('').toUpperCase() || 'U'}
                </span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.position}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-80 w-full flex flex-col min-h-[calc(100vh-5rem)] min-h-[calc(100dvh-5rem)] h-[calc(100vh-5rem)] max-h-[calc(100vh-5rem)] overflow-hidden mt-20">
        {/* Page content */}
        <main ref={mainContentRef} className="flex-1 overflow-y-auto overflow-x-hidden w-full min-w-0 max-w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout