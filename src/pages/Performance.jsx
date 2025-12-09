import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  EyeIcon,
  PencilIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'

const Performance = () => {
  const { user } = useAuth()
  const [selectedPeriod, setSelectedPeriod] = useState('quarter')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [viewMode, setViewMode] = useState('overview') // overview, detailed

  // Mock performance data
  const performanceData = [
    {
      id: 1,
      name: 'John Smith',
      department: 'Engineering',
      position: 'Senior Developer',
      avatar: 'JS',
      overallScore: 92,
      goals: {
        completed: 8,
        total: 10,
        percentage: 80
      },
      productivity: 88,
      quality: 95,
      collaboration: 90,
      attendance: 98,
      lastReview: '2024-01-15',
      status: 'excellent',
      trends: {
        productivity: 'up',
        quality: 'up',
        collaboration: 'stable',
        attendance: 'up'
      }
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      department: 'Marketing',
      position: 'Marketing Manager',
      avatar: 'SJ',
      overallScore: 87,
      goals: {
        completed: 7,
        total: 9,
        percentage: 78
      },
      productivity: 85,
      quality: 89,
      collaboration: 92,
      attendance: 95,
      lastReview: '2024-01-10',
      status: 'good',
      trends: {
        productivity: 'up',
        quality: 'stable',
        collaboration: 'up',
        attendance: 'stable'
      }
    },
    {
      id: 3,
      name: 'Mike Chen',
      department: 'Sales',
      position: 'Sales Representative',
      avatar: 'MC',
      overallScore: 78,
      goals: {
        completed: 5,
        total: 8,
        percentage: 63
      },
      productivity: 75,
      quality: 80,
      collaboration: 85,
      attendance: 90,
      lastReview: '2024-01-05',
      status: 'needs_improvement',
      trends: {
        productivity: 'down',
        quality: 'stable',
        collaboration: 'up',
        attendance: 'stable'
      }
    },
    {
      id: 4,
      name: 'Emily Davis',
      department: 'HR',
      position: 'HR Specialist',
      avatar: 'ED',
      overallScore: 94,
      goals: {
        completed: 9,
        total: 10,
        percentage: 90
      },
      productivity: 92,
      quality: 96,
      collaboration: 95,
      attendance: 100,
      lastReview: '2024-01-20',
      status: 'excellent',
      trends: {
        productivity: 'up',
        quality: 'up',
        collaboration: 'up',
        attendance: 'stable'
      }
    },
    {
      id: 5,
      name: 'David Wilson',
      department: 'Engineering',
      position: 'Junior Developer',
      avatar: 'DW',
      overallScore: 82,
      goals: {
        completed: 6,
        total: 8,
        percentage: 75
      },
      productivity: 80,
      quality: 85,
      collaboration: 88,
      attendance: 92,
      lastReview: '2024-01-12',
      status: 'good',
      trends: {
        productivity: 'up',
        quality: 'up',
        collaboration: 'stable',
        attendance: 'up'
      }
    },
    {
      id: 6,
      name: 'Lisa Brown',
      department: 'Finance',
      position: 'Financial Analyst',
      avatar: 'LB',
      overallScore: 89,
      goals: {
        completed: 8,
        total: 9,
        percentage: 89
      },
      productivity: 87,
      quality: 91,
      collaboration: 90,
      attendance: 96,
      lastReview: '2024-01-18',
      status: 'good',
      trends: {
        productivity: 'stable',
        quality: 'up',
        collaboration: 'up',
        attendance: 'stable'
      }
    }
  ]

  const departments = ['all', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance']
  const periods = ['month', 'quarter', 'year']

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-800'
      case 'good':
        return 'bg-blue-100 text-blue-800'
      case 'needs_improvement':
        return 'bg-yellow-100 text-yellow-800'
      case 'poor':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
      case 'down':
        return <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
      case 'stable':
        return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
      default:
        return null
    }
  }

  const filteredData = performanceData.filter(employee => 
    selectedDepartment === 'all' || employee.department === selectedDepartment
  )

  const averageScore = filteredData.reduce((sum, emp) => sum + emp.overallScore, 0) / filteredData.length

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-white dark:bg-gray-800 px-6 py-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Employee Performance</h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Monitor and analyze employee performance metrics
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setViewMode(viewMode === 'overview' ? 'detailed' : 'overview')}
                    className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <EyeIcon className="h-4 w-4 mr-2" />
                    {viewMode === 'overview' ? 'Detailed View' : 'Overview'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <FunnelIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
                  </div>
                  
                  {/* Department Filter */}
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept === 'all' ? 'All Departments' : dept}
                      </option>
                    ))}
                  </select>

                  {/* Period Filter */}
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {periods.map((period) => (
                      <option key={period} value={period}>
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Average Score: <span className="font-semibold text-gray-900 dark:text-white">{averageScore.toFixed(1)}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Employees: <span className="font-semibold text-gray-900 dark:text-white">{filteredData.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Overview Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ChartBarIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Average Performance
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {averageScore.toFixed(1)}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-500 dark:text-gray-400">
                          / 100
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <StarIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Excellent Performers
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {filteredData.filter(emp => emp.status === 'excellent').length}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-500 dark:text-gray-400">
                          employees
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Goals Completed
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {Math.round(filteredData.reduce((sum, emp) => sum + emp.goals.percentage, 0) / filteredData.length)}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-500 dark:text-gray-400">
                          %
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Needs Improvement
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {filteredData.filter(emp => emp.status === 'needs_improvement').length}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-500 dark:text-gray-400">
                          employees
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Table */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                Employee Performance Details
              </h3>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Overall Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Goals Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Productivity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Quality
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Last Review
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredData.map((employee) => (
                      <tr key={employee.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-500 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-500 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {employee.avatar}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {employee.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {employee.position} • {employee.department}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`text-lg font-semibold ${getScoreColor(employee.overallScore)}`}>
                              {employee.overallScore}
                            </span>
                            <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">/100</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-1">
                              <div className="text-sm text-gray-900 dark:text-white">
                                {employee.goals.completed}/{employee.goals.total} goals
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${employee.goals.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-900 dark:text-white">
                              {employee.productivity}%
                            </span>
                            {getTrendIcon(employee.trends.productivity)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-900 dark:text-white">
                              {employee.quality}%
                            </span>
                            {getTrendIcon(employee.trends.quality)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                            {employee.status.replace('_', ' ').charAt(0).toUpperCase() + employee.status.replace('_', ' ').slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {new Date(employee.lastReview).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Performance
