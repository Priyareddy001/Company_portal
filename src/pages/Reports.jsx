import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  ChartBarIcon, 
  DocumentArrowDownIcon,
  CalendarDaysIcon,
  UsersIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  FunnelIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const Reports = () => {
  const { user } = useAuth()
  const [selectedReport, setSelectedReport] = useState('attendance')
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  const reportTypes = [
    { id: 'attendance', name: 'Attendance Report', icon: CalendarDaysIcon, color: 'bg-blue-500' },
    { id: 'productivity', name: 'Productivity Report', icon: ChartBarIcon, color: 'bg-green-500' },
    { id: 'leave', name: 'Leave Report', icon: ClockIcon, color: 'bg-purple-500' },
    { id: 'team', name: 'Team Performance', icon: UsersIcon, color: 'bg-orange-500' }
  ]

  const attendanceData = {
    totalDays: 22,
    presentDays: 20,
    absentDays: 2,
    lateArrivals: 3,
    earlyDepartures: 1,
    overtimeHours: 8.5
  }

  const productivityData = {
    tasksCompleted: 45,
    tasksPending: 8,
    efficiency: 92,
    averageTaskTime: '2.5h',
    projectCompletion: 78
  }

  const teamData = [
    { name: 'John Doe', department: 'Engineering', productivity: 95, attendance: 98 },
    { name: 'Jane Smith', department: 'Engineering', productivity: 88, attendance: 100 },
    { name: 'Mike Johnson', department: 'Marketing', productivity: 92, attendance: 96 },
    { name: 'Sarah Wilson', department: 'HR', productivity: 90, attendance: 100 },
    { name: 'David Brown', department: 'Sales', productivity: 85, attendance: 94 }
  ]

  const generateReport = () => {
    // In a real app, this would generate and download the report
    console.log('Generating report:', selectedReport, selectedPeriod, selectedDepartment)
  }

  const getReportIcon = (reportId) => {
    const report = reportTypes.find(r => r.id === reportId)
    return report ? report.icon : ChartBarIcon
  }

  const getReportColor = (reportId) => {
    const report = reportTypes.find(r => r.id === reportId)
    return report ? report.color : 'bg-gray-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-white dark:bg-gray-800 px-6 py-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Generate and view detailed reports for better insights
                  </p>
                </div>
                <button
                  onClick={generateReport}
                  className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-sm font-medium text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                >
                  <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                  Generate Report
                </button>
              </div>
            </div>
          </div>

          {/* Report Type Selection */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <FunnelIcon className="h-5 w-5 mr-2 text-blue-600" />
                Report Types
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {reportTypes.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={`p-4 rounded-xl border transition-all duration-200 ${
                      selectedReport === report.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`p-3 rounded-lg ${report.color} mb-3`}>
                        <report.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className={`text-sm font-medium ${
                        selectedReport === report.id 
                          ? 'text-blue-900 dark:text-blue-300' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {report.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <EyeIcon className="h-5 w-5 mr-2 text-blue-600" />
                Report Filters
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time Period
                  </label>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Departments</option>
                    <option value="engineering">Engineering</option>
                    <option value="marketing">Marketing</option>
                    <option value="hr">Human Resources</option>
                    <option value="sales">Sales</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={generateReport}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                  >
                    <ChartBarIcon className="h-4 w-4 mr-2" />
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Report Content */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <ChartBarIcon className="h-5 w-5 mr-2 text-blue-600" />
                {reportTypes.find(r => r.id === selectedReport)?.name}
              </h3>
            </div>
            <div className="p-6">
              {selectedReport === 'attendance' && (
                <div className="space-y-6">
                  {/* Attendance Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center">
                        <div className="p-2 bg-green-500 rounded-lg">
                          <CalendarDaysIcon className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-green-800 dark:text-green-300">Present Days</p>
                          <p className="text-2xl font-bold text-green-900 dark:text-green-200">{attendanceData.presentDays}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="flex items-center">
                        {/* <div className="p-2 bg-red-500 rounded-lg">
                          <ArrowTrendingDownIcon className="h-5 w-5 text-white" />
                        </div> */}
                        <div className="ml-3">
                          <p className="text-sm font-medium text-red-800 dark:text-red-300">Absent Days</p>
                          <p className="text-2xl font-bold text-red-900 dark:text-red-200">{attendanceData.absentDays}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-500 rounded-lg">
                          <ClockIcon className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Overtime Hours</p>
                          <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">{attendanceData.overtimeHours}h</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Attendance Chart Placeholder */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg text-center">
                    <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Attendance chart would be displayed here</p>
                  </div>
                </div>
              )}

              {selectedReport === 'productivity' && (
                <div className="space-y-6">
                  {/* Productivity Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-500 rounded-lg">
                          <CheckCircleIcon className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Tasks Completed</p>
                          <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">{productivityData.tasksCompleted}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-center">
                        <div className="p-2 bg-yellow-500 rounded-lg">
                          <ClockIcon className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Tasks Pending</p>
                          <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-200">{productivityData.tasksPending}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center">
                        <div className="p-2 bg-green-500 rounded-lg">
                          <ArrowTrendingUpIcon className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-green-800 dark:text-green-300">Efficiency</p>
                          <p className="text-2xl font-bold text-green-900 dark:text-green-200">{productivityData.efficiency}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                      <div className="flex items-center">
                        <div className="p-2 bg-purple-500 rounded-lg">
                          <ChartBarIcon className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-purple-800 dark:text-purple-300">Project Completion</p>
                          <p className="text-2xl font-bold text-purple-900 dark:text-purple-200">{productivityData.projectCompletion}%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Productivity Chart Placeholder */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg text-center">
                    <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Productivity chart would be displayed here</p>
                  </div>
                </div>
              )}

              {selectedReport === 'team' && (
                <div className="space-y-6">
                  {/* Team Performance Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Employee
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Department
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Productivity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Attendance
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {teamData.map((member, index) => (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              {member.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {member.department}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                                  <div 
                                    className="bg-green-500 h-2 rounded-full" 
                                    style={{width: `${member.productivity}%`}}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-900 dark:text-white">{member.productivity}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full" 
                                    style={{width: `${member.attendance}%`}}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-900 dark:text-white">{member.attendance}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {selectedReport === 'leave' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg text-center">
                    <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Leave report data would be displayed here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
