import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  BellIcon,
  XMarkIcon,
  HomeIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon
} from '@heroicons/react/24/outline'
import { useTheme } from '../contexts/ThemeContext'
import { 
  checkIn, 
  checkOut 
} from '../utils/timeTracking'
import { useState, useEffect, useRef } from 'react'
import { getTodayCheckInStatus } from '../utils/timeTracking'

const ConstantHeader = ({ onMenuClick }) => {
  const { user } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [checkedIn, setCheckedIn] = useState(false)
  const [messageNotifications, setMessageNotifications] = useState([])
  const notificationRef = useRef(null)
  const profileRef = useRef(null)

  const handleCheckIn = () => {
    if (!user) return
    try {
      const result = checkIn(user.id)
      if (result.success) {
        setCheckedIn(true)
        try {
          window.dispatchEvent(new CustomEvent('checkInOutUpdate', { detail: { action: 'checkIn', userId: user.id } }))
        } catch (e) {
          // Ignore dispatch errors
        }
      }
    } catch (error) {
      console.error('Check-in error:', error)
    }
  }

  const handleCheckOut = () => {
    if (!user) return
    try {
      const result = checkOut(user.id)
      if (result.success) {
        setCheckedIn(false)
        try {
          window.dispatchEvent(new CustomEvent('checkInOutUpdate', { detail: { action: 'checkOut', userId: user.id } }))
        } catch (e) {
          // Ignore dispatch errors
        }
      }
    } catch (error) {
      console.error('Check-out error:', error)
    }
  }

  // Load check-in status
  useEffect(() => {
    if (user) {
      const status = getTodayCheckInStatus(user.id)
      setCheckedIn(status.checkedIn)
    }
  }, [user])

  // Listen for check-in/out updates
  useEffect(() => {
    if (!user) return
    
    const handleCheckInOutUpdate = () => {
      try {
        if (user) {
          const status = getTodayCheckInStatus(user.id)
          setCheckedIn(status.checkedIn)
        }
      } catch (error) {
        console.warn('Error updating check-in status:', error)
      }
    }
    
    window.addEventListener('checkInOutUpdate', handleCheckInOutUpdate)
    return () => {
      try {
        window.removeEventListener('checkInOutUpdate', handleCheckInOutUpdate)
      } catch (error) {
        // Ignore cleanup errors
      }
    }
  }, [user])

  // Close popups when clicking outside
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

  // Listen for new message notifications
  useEffect(() => {
    const handleNewMessage = (event) => {
      try {
        const { senderName, message, conversationId } = event.detail || {}
        if (senderName && message) {
          const newNotification = {
            id: Date.now(),
            title: `New message from ${senderName}`,
            message: message,
            time: 'Just now',
            unread: true,
            type: 'message',
            conversationId
          }
          setMessageNotifications(prev => [newNotification, ...prev].slice(0, 50)) // Keep last 50
        }
      } catch (error) {
        console.warn('Error handling new message notification:', error)
      }
    }
    
    try {
      window.addEventListener('newMessageNotification', handleNewMessage)
    } catch (error) {
      console.warn('Error adding message notification listener:', error)
    }
    
    return () => {
      try {
        window.removeEventListener('newMessageNotification', handleNewMessage)
      } catch (error) {
        // Ignore cleanup errors
      }
    }
  }, [])

  const systemNotifications = [
    { id: 1, title: 'Leave Request Approved', message: 'Your vacation request has been approved', time: '2 hours ago', unread: true },
    { id: 2, title: 'New Announcement', message: 'Company meeting scheduled for tomorrow', time: '5 hours ago', unread: true },
    { id: 3, title: 'Task Assignment', message: 'You have been assigned a new task', time: '1 day ago', unread: false }
  ]

  const allNotifications = [...messageNotifications, ...systemNotifications]
  const unreadCount = allNotifications.filter(n => n.unread).length

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-20 shrink-0 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 md:px-6 shadow-sm">
      {/* Left Side - Company Portal Logo */}
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        {onMenuClick && (
          <button
            type="button"
            className="lg:hidden -m-2.5 p-2.5 text-gray-700 dark:text-gray-300"
            onClick={onMenuClick}
          >
            <Bars3Icon className="h-7 w-7" />
          </button>
        )}
        <button
          onClick={() => navigate('/app/dashboard')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="h-12 w-12 bg-blue-500 dark:bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-lg">CP</span>
          </div>
          <span className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white whitespace-nowrap">Company Portal</span>
        </button>
      </div>

      {/* Center - Application Tabs (Home, Cliq, Mail) */}
      <div className="flex-1 hidden md:flex items-center justify-center gap-3 min-w-0">
        <button
          onClick={() => navigate('/app/dashboard')}
          className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
            location.pathname === '/app/dashboard' || location.pathname.startsWith('/app/reports') || location.pathname === '/app'
              ? 'text-gray-900 dark:text-white border-b-2 border-blue-600 pb-2'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <HomeIcon className="h-6 w-6" />
          <span className="text-base font-medium">Home</span>
        </button>
        <button
          onClick={() => window.location.href = '/app/chat'}
          className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
            location.pathname === '/app/chat'
              ? 'text-blue-600 border-b-2 border-blue-600 pb-2'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
          <span className="text-base font-medium">Cliq</span>
        </button>
        <button
          onClick={() => window.location.href = '/app/mail'}
          className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
            location.pathname === '/app/mail'
              ? 'text-gray-900 dark:text-white border-b-2 border-blue-600 pb-2'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <EnvelopeIcon className="h-6 w-6" />
          <span className="text-base font-medium">Mail</span>
        </button>
      </div>

      {/* Right Side - Mode Toggle, Notifications, Profile */}
      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        {/* Mode Toggle (Dark/Light) */}
        <button
          onClick={toggleDarkMode}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
        </button>
        
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white relative"
          >
            <BellIcon className="h-6 w-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-semibold">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>
          
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {allNotifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                    No notifications
                  </div>
                ) : (
                  allNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                        notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                      onClick={() => {
                        if (notification.type === 'message' && notification.conversationId) {
                          window.location.href = '/app/chat'
                        }
                        setNotificationsOpen(false)
                      }}
                    >
                      <div className="flex items-start">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{notification.message}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notification.time}</p>
                        </div>
                        {notification.unread && (
                          <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="relative"
          >
            <div className="h-10 w-10 rounded-full bg-blue-500 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-500 flex items-center justify-center border-2 border-white dark:border-gray-800">
              <span className="text-base font-medium text-white">
                {user?.name?.split(' ').filter(n => n.length > 0).map(n => n[0]).join('').toUpperCase() || 'U'}
              </span>
            </div>
            {/* Status dot - Green when checked in, Red when checked out */}
            <div className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800 ${
              checkedIn ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
          </button>

          {/* Profile Popup */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
              {/* Top Section - Blue Background */}
              <div className="bg-blue-600 dark:bg-blue-700 px-6 py-8 relative">
                <button
                  onClick={() => setProfileOpen(false)}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center border-4 border-white dark:border-gray-700">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {user?.name?.split(' ').filter(n => n.length > 0).map(n => n[0]).join('').toUpperCase() || 'U'}
                      </span>
                    </div>
                    {/* Status dot - Green when checked in, Red when checked out */}
                    <div className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white dark:border-gray-700 ${
                      checkedIn ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                </div>
              </div>

              {/* Middle Section - White Background */}
              <div className="px-6 py-5 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user?.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">User ID</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{user?.id}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      navigate('/app/profile')
                      setProfileOpen(false)
                    }}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    My account
                  </button>
                  <button
                    onClick={() => {
                      navigate('/login')
                      setProfileOpen(false)
                    }}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    Sign out
                  </button>
                </div>
              </div>

              {/* Bottom Section - Remote Work */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Remote Work</h4>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${
                        checkedIn ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {checkedIn ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button className="flex-1 flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {checkedIn ? 'Available for Collaboration' : 'Checked Out'}
                    </span>
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
              )}
            </div>
          </div>
    </header>
  )
}

export default ConstantHeader

