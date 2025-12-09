import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { 
  HomeIcon, 
  UserIcon, 
  CalendarDaysIcon, 
  UsersIcon, 
  MegaphoneIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ClockIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline'
import { useState, useEffect, useRef } from 'react'

const ProtectedLayout = () => {
  const { user, logout } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const mainContentRef = useRef(null)

  // Reset scroll position when route changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0
    }
  }, [location.pathname])

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: HomeIcon, badge: null },
    { name: 'Profile', href: '/app/profile', icon: UserIcon, badge: null },
    { name: 'Leave Management', href: '/app/leave', icon: CalendarDaysIcon, badge: '2' },
    { name: 'Employee Directory', href: '/app/directory', icon: UsersIcon, badge: null },
    { name: 'Announcements', href: '/app/announcements', icon: MegaphoneIcon, badge: '3' },
    { name: 'Time Tracking', href: '/time-tracking', icon: ClockIcon, badge: null },
    { name: 'Reports', href: '/reports', icon: ChartBarIcon, badge: null },
    { name: 'Documents', href: '/documents', icon: DocumentTextIcon, badge: null },
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

  const isCurrentPath = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-80 flex-col bg-white dark:bg-gray-800 shadow-2xl border-r border-gray-200 dark:border-gray-700">
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EP</span>
              </div>
              <h1 className="ml-3 text-xl font-bold text-white">Employee Portal</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.href)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isCurrentPath(item.href)
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
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
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-80 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-2xl">
          <div className="flex h-16 items-center px-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EP</span>
              </div>
              <h1 className="ml-3 text-xl font-bold text-white">Employee Portal</h1>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isCurrentPath(item.href)
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
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
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.name?.split(' ').map(n => n[0]).join('')}
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
      <div className="lg:pl-80 w-full flex flex-col h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-4 shadow-lg sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-300 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Theme toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 relative"
                >
                  <BellIcon className="h-5 w-5" />
                  {notifications.filter(n => n.unread).length > 0 && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                  )}
                </button>
                
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`p-4 border-b border-gray-100 dark:border-gray-700 ${notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                          <div className="flex items-start">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{notification.message}</p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notification.time}</p>
                            </div>
                            {notification.unread && (
                              <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User menu */}
              <div className="flex items-center gap-x-2">
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.position}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.name?.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-x-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span className="hidden lg:block">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main ref={mainContentRef} className="flex-1 overflow-y-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default ProtectedLayout
