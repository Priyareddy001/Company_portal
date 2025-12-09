import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  ClockIcon,
  UsersIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import { 
  getAllEmployeesTimeLogs, 
  formatDuration, 
  formatDate,
  getUserTimeLogs
} from '../utils/timeTracking'

const EmployeeTimeTracking = () => {
  const { user } = useAuth()
  const [employeeData, setEmployeeData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [sortBy, setSortBy] = useState('hours')
  const [sortOrder, setSortOrder] = useState('desc')

  useEffect(() => {
    loadEmployeeData()
    // Refresh every minute
    const interval = setInterval(loadEmployeeData, 60000)
    return () => clearInterval(interval)
  }, [])

  const loadEmployeeData = () => {
    const data = getAllEmployeesTimeLogs()
    setEmployeeData(data)
  }

  const filteredEmployees = employeeData.filter(emp => 
    emp.userName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    let aVal, bVal
    switch (sortBy) {
      case 'hours':
        aVal = a.totalHours
        bVal = b.totalHours
        break
      case 'week':
        aVal = a.totalHoursThisWeek
        bVal = b.totalHoursThisWeek
        break
      case 'month':
        aVal = a.totalHoursThisMonth
        bVal = b.totalHoursThisMonth
        break
      case 'name':
        aVal = a.userName
        bVal = b.userName
        break
      default:
        return 0
    }

    if (typeof aVal === 'string') {
      return sortOrder === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }
    
    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
  })

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  const viewEmployeeDetails = (employee) => {
    const logs = getUserTimeLogs(employee.userId)
    setSelectedEmployee({ ...employee, logs: logs.checkIns || [] })
  }

  const getOverallStats = () => {
    if (employeeData.length === 0) return { totalEmployees: 0, totalHours: 0, averageHours: 0, checkedIn: 0 }
    
    const totalHours = employeeData.reduce((sum, emp) => sum + emp.totalHours, 0)
    const checkedIn = employeeData.filter(emp => emp.currentCheckIn).length
    const averageHours = totalHours / employeeData.length

    return {
      totalEmployees: employeeData.length,
      totalHours,
      averageHours,
      checkedIn
    }
  }

  const stats = getOverallStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-white dark:bg-gray-800 px-6 py-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Employee Time Tracking</h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    View and monitor all employees' working hours and check-in status
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Employees</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalEmployees}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500">
                    <UsersIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Hours</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatDuration(stats.totalHours)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500">
                    <ClockIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Hours</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatDuration(stats.averageHours)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-500">
                    <ChartBarIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Checked In</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.checkedIn}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-orange-500">
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Employees Table */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <UsersIcon className="h-5 w-5 mr-2 text-blue-600" />
                All Employees ({sortedEmployees.length})
              </h3>
            </div>
            <div className="overflow-x-auto">
              {sortedEmployees.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <UsersIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No employees found with time tracking data.</p>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={() => handleSort('name')}>
                        <div className="flex items-center">
                          Employee Name
                          {sortBy === 'name' && (
                            sortOrder === 'asc' ? <ArrowUpIcon className="h-4 w-4 ml-1" /> : <ArrowDownIcon className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={() => handleSort('week')}>
                        <div className="flex items-center">
                          This Week
                          {sortBy === 'week' && (
                            sortOrder === 'asc' ? <ArrowUpIcon className="h-4 w-4 ml-1" /> : <ArrowDownIcon className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={() => handleSort('month')}>
                        <div className="flex items-center">
                          This Month
                          {sortBy === 'month' && (
                            sortOrder === 'asc' ? <ArrowUpIcon className="h-4 w-4 ml-1" /> : <ArrowDownIcon className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={() => handleSort('hours')}>
                        <div className="flex items-center">
                          Total Hours
                          {sortBy === 'hours' && (
                            sortOrder === 'asc' ? <ArrowUpIcon className="h-4 w-4 ml-1" /> : <ArrowDownIcon className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {sortedEmployees.map((employee) => (
                      <tr key={employee.userId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-500 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-500 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {employee.userName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {employee.userName}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                ID: {employee.userId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                          {formatDuration(employee.totalHoursThisWeek)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                          {formatDuration(employee.totalHoursThisMonth)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                          {formatDuration(employee.totalHours)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {employee.currentCheckIn ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                              <CheckCircleIcon className="h-3 w-3 mr-1" />
                              Checked In
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              <XCircleIcon className="h-3 w-3 mr-1" />
                              Checked Out
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => viewEmployeeDetails(employee)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Employee Details Modal */}
          {selectedEmployee && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Time Logs - {selectedEmployee.userName}
                  </h3>
                  <button
                    onClick={() => setSelectedEmployee(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <XCircleIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  {selectedEmployee.logs.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                      No time logs available for this employee.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total Hours</p>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatDuration(selectedEmployee.totalHours)}</p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatDuration(selectedEmployee.totalHoursThisWeek)}</p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{formatDuration(selectedEmployee.totalHoursThisMonth)}</p>
                        </div>
                      </div>
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Check In</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Check Out</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Hours</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {selectedEmployee.logs.reverse().map((entry, index) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {new Date(entry.checkInTime).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {new Date(entry.checkInTime).toLocaleTimeString()}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {entry.checkOutTime ? new Date(entry.checkOutTime).toLocaleTimeString() : '-'}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                                {entry.hoursWorked ? formatDuration(entry.hoursWorked) : '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeTimeTracking

