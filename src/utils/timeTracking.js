// Time tracking utility functions

const STORAGE_KEY = 'employee_time_logs'

// Get all time logs
export const getTimeLogs = () => {
  const logs = localStorage.getItem(STORAGE_KEY)
  return logs ? JSON.parse(logs) : {}
}

// Get time logs for a specific user
export const getUserTimeLogs = (userId) => {
  const logs = getTimeLogs()
  return logs[userId] || { checkIns: [], currentCheckIn: null }
}

// Save time logs
export const saveTimeLogs = (logs) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
}

// Check in
export const checkIn = (userId, userName) => {
  const logs = getTimeLogs()
  const userLogs = getUserTimeLogs(userId)
  
  // Check if already checked in today
  const today = new Date().toDateString()
  const existingCheckIn = userLogs.currentCheckIn
  if (existingCheckIn && existingCheckIn.date === today) {
    return { success: false, error: 'You are already checked in today' }
  }

  const checkInTime = new Date()
  const checkInData = {
    date: today,
    checkInTime: checkInTime.toISOString(),
    userId,
    userName
  }

  logs[userId] = {
    ...userLogs,
    currentCheckIn: checkInData
  }

  saveTimeLogs(logs)
  return { success: true, checkInTime }
}

// Check out
export const checkOut = (userId) => {
  const logs = getTimeLogs()
  const userLogs = getUserTimeLogs(userId)

  if (!userLogs.currentCheckIn) {
    return { success: false, error: 'You are not checked in' }
  }

  const checkOutTime = new Date()
  const checkInTime = new Date(userLogs.currentCheckIn.checkInTime)
  const hoursWorked = (checkOutTime - checkInTime) / (1000 * 60 * 60) // Convert to hours

  const checkInEntry = {
    ...userLogs.currentCheckIn,
    checkOutTime: checkOutTime.toISOString(),
    hoursWorked: parseFloat(hoursWorked.toFixed(2))
  }

  logs[userId] = {
    checkIns: [...(userLogs.checkIns || []), checkInEntry],
    currentCheckIn: null
  }

  saveTimeLogs(logs)
  return { success: true, checkOutTime, hoursWorked }
}

// Get today's check-in status
export const getTodayCheckInStatus = (userId) => {
  const userLogs = getUserTimeLogs(userId)
  const today = new Date().toDateString()
  
  if (userLogs.currentCheckIn && userLogs.currentCheckIn.date === today) {
    return {
      checkedIn: true,
      checkInTime: new Date(userLogs.currentCheckIn.checkInTime)
    }
  }
  return { checkedIn: false }
}

// Calculate total hours for a user
export const calculateTotalHours = (userId, days = null) => {
  const userLogs = getUserTimeLogs(userId)
  let checkIns = userLogs.checkIns || []

  if (days) {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    checkIns = checkIns.filter(entry => {
      const entryDate = new Date(entry.checkInTime)
      return entryDate >= cutoffDate
    })
  }

  const totalHours = checkIns.reduce((sum, entry) => sum + (entry.hoursWorked || 0), 0)
  return parseFloat(totalHours.toFixed(2))
}

// Get all employees' time logs (for admin)
export const getAllEmployeesTimeLogs = () => {
  const logs = getTimeLogs()
  const employeesData = []

  Object.keys(logs).forEach(userId => {
    const userLogs = logs[userId]
    const totalHours = calculateTotalHours(userId)
    const totalHoursThisWeek = calculateTotalHours(userId, 7)
    const totalHoursThisMonth = calculateTotalHours(userId, 30)
    
    employeesData.push({
      userId,
      userName: userLogs.checkIns?.[0]?.userName || 'Unknown',
      currentCheckIn: userLogs.currentCheckIn,
      totalHours,
      totalHoursThisWeek,
      totalHoursThisMonth,
      checkIns: userLogs.checkIns || [],
      lastCheckIn: userLogs.checkIns?.[userLogs.checkIns.length - 1] || null
    })
  })

  return employeesData
}

// Format time duration
export const formatDuration = (hours) => {
  const h = Math.floor(hours)
  const m = Math.floor((hours - h) * 60)
  return `${h}h ${m}m`
}

// Format date
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

