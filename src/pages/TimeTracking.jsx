import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  ClockIcon, 
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'
import { 
  checkIn, 
  checkOut, 
  getTodayCheckInStatus, 
  getUserTimeLogs, 
  calculateTotalHours,
  formatDuration,
  formatDate
} from '../utils/timeTracking'

const TimeTracking = () => {
  const { user } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [checkedIn, setCheckedIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [timeEntries, setTimeEntries] = useState([])
  const [message, setMessage] = useState({ text: '', type: '' })
  const [selectedPeriod, setSelectedPeriod] = useState('week')

  const loadTimeEntries = () => {
    if (user) {
      const userLogs = getUserTimeLogs(user.id)
      setTimeEntries(userLogs.checkIns || [])
    }
  }

  // Function to refresh check-in status
  const refreshCheckInStatus = () => {
    if (user) {
      const status = getTodayCheckInStatus(user.id)
      setCheckedIn(status.checkedIn)
      if (status.checkedIn) {
        setCheckInTime(status.checkInTime)
      } else {
        setCheckInTime(null)
        setElapsedTime(0)
      }
    }
    loadTimeEntries()
  }

  useEffect(() => {
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Load initial check-in status
    refreshCheckInStatus()

    // Listen for check-in/out updates from header
    const handleCheckInOutUpdate = (event) => {
      try {
        if (event.detail && event.detail.userId === user?.id) {
          refreshCheckInStatus()
        }
      } catch (error) {
        console.warn('Error in checkInOutUpdate handler:', error)
      }
    }
    
    try {
      window.addEventListener('checkInOutUpdate', handleCheckInOutUpdate)
    } catch (error) {
      console.warn('Error adding checkInOutUpdate listener in TimeTracking:', error)
    }

    // Refresh periodically to stay in sync
    const syncInterval = setInterval(() => {
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
      window.addEventListener('focus', handleFocus)
    } catch (error) {
      console.warn('Error adding focus listener:', error)
    }

    return () => {
      try {
        clearInterval(timer)
        clearInterval(syncInterval)
        window.removeEventListener('checkInOutUpdate', handleCheckInOutUpdate)
        window.removeEventListener('focus', handleFocus)
      } catch (error) {
        // Ignore cleanup errors
      }
    }
  }, [user])

  useEffect(() => {
    // Update elapsed time if checked in
    if (checkedIn && checkInTime) {
      const timer = setInterval(() => {
        const now = new Date()
        const diff = now - checkInTime
        setElapsedTime(diff)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [checkedIn, checkInTime])

  const handleCheckIn = () => {
    if (!user) {
      setMessage({ text: 'Please login to check in', type: 'error' })
      return
    }

    const result = checkIn(user.id, user.name)
    if (result.success) {
      setCheckedIn(true)
      setCheckInTime(result.checkInTime)
      setMessage({ text: 'Successfully checked in!', type: 'success' })
      loadTimeEntries()
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
      // Dispatch event to notify header component
      try {
        window.dispatchEvent(new CustomEvent('checkInOutUpdate', { detail: { action: 'checkIn', userId: user.id } }))
        window.dispatchEvent(new CustomEvent('timeTrackingUpdate'))
      } catch (error) {
        console.warn('Error dispatching events:', error)
      }
    } else {
      setMessage({ text: result.error || 'Failed to check in', type: 'error' })
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    }
  }

  const handleCheckOut = () => {
    if (!user) {
      setMessage({ text: 'Please login to check out', type: 'error' })
      return
    }

    const result = checkOut(user.id)
    if (result.success) {
      setCheckedIn(false)
      setCheckInTime(null)
      setElapsedTime(0)
      setMessage({ text: `Successfully checked out! You worked ${formatDuration(result.hoursWorked)} today.`, type: 'success' })
      loadTimeEntries()
      setTimeout(() => setMessage({ text: '', type: '' }), 5000)
      // Dispatch event to notify header component
      try {
        window.dispatchEvent(new CustomEvent('checkInOutUpdate', { detail: { action: 'checkOut', userId: user.id } }))
      } catch (error) {
        console.warn('Error dispatching checkInOutUpdate event:', error)
      }
      try {
        window.dispatchEvent(new CustomEvent('timeTrackingUpdate'))
      } catch (error) {
        console.warn('Error dispatching timeTrackingUpdate event:', error)
      }
    } else {
      setMessage({ text: result.error || 'Failed to check out', type: 'error' })
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    }
  }

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60))
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const getStats = () => {
    if (!user) return { totalHours: 0, weekHours: 0, monthHours: 0 }
    
    return {
      totalHours: calculateTotalHours(user.id),
      weekHours: calculateTotalHours(user.id, 7),
      monthHours: calculateTotalHours(user.id, 30)
    }
  }

  const stats = getStats()
  const filteredEntries = selectedPeriod === 'all' 
    ? timeEntries 
    : timeEntries.filter(entry => {
        const entryDate = new Date(entry.checkInTime)
        const now = new Date()
        if (selectedPeriod === 'week') {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          return entryDate >= weekAgo
        } else if (selectedPeriod === 'month') {
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          return entryDate >= monthAgo
        }
        return true
      }).reverse()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-white dark:bg-gray-800 px-6 py-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Time Tracking</h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Check in and check out to track your working hours
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Current Time</p>
                    <p className="text-gray-900 dark:text-white text-lg font-mono">
                      {currentTime.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div className={`rounded-lg p-4 ${
              message.type === 'success' 
                ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-300'
                : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-300'
            }`}>
              <div className="flex items-center">
                {message.type === 'success' ? (
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                ) : (
                  <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                )}
                <span>{message.text}</span>
              </div>
            </div>
          )}

          {/* Check In/Out Card */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <ClockIcon className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                {checkedIn ? 'Currently Checked In' : 'Ready to Check In'}
              </h3>
            </div>
            <div className="p-6">
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
                {/* Timer Display */}
                <div className="text-center lg:text-left">
                  <div className="text-4xl sm:text-5xl font-mono font-bold text-gray-900 dark:text-white mb-2">
                    {checkedIn && checkInTime ? formatTime(elapsedTime) : '00:00:00'}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {checkedIn 
                      ? `Checked in at ${checkInTime?.toLocaleTimeString() || ''}` 
                      : 'Check in to start tracking your time'}
                  </p>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center space-x-4">
                  {!checkedIn ? (
                    <button
                      onClick={handleCheckIn}
                      className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
                    >
                      <ArrowRightOnRectangleIcon className="h-6 w-6 mr-2" />
                      Check In
                    </button>
                  ) : (
                    <button
                      onClick={handleCheckOut}
                      className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
                    >
                      <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-2" />
                      Check Out
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Hours</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatDuration(stats.totalHours)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500">
                    <ClockIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">All time</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">This Week</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatDuration(stats.weekHours)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500">
                    <ChartBarIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Last 7 days</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">This Month</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatDuration(stats.monthHours)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-500">
                    <CalendarDaysIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Last 30 days</p>
              </div>
            </div>
          </div>

          {/* Time Entries */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <CalendarDaysIcon className="h-5 w-5 mr-2 text-blue-600" />
                  Time Logs
                </h3>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              {filteredEntries.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <ClockIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No time entries found. Check in to start tracking your time!</p>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Check In
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Check Out
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Hours Worked
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredEntries.map((entry, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {new Date(entry.checkInTime).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {new Date(entry.checkInTime).toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {entry.checkOutTime 
                            ? new Date(entry.checkOutTime).toLocaleTimeString()
                            : <span className="text-gray-400">-</span>
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                          {entry.hoursWorked ? formatDuration(entry.hoursWorked) : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {entry.checkOutTime ? (
                              <>
                                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                <span className="ml-2 text-sm text-green-600 dark:text-green-400">Completed</span>
                              </>
                            ) : (
                              <>
                                <ClockIcon className="h-5 w-5 text-yellow-500" />
                                <span className="ml-2 text-sm text-yellow-600 dark:text-yellow-400">In Progress</span>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeTracking
