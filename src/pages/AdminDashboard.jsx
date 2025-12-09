import { useAuth } from '../contexts/AuthContext'
import {
  UsersIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  ClockIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CogIcon,
  ShieldCheckIcon,
  BellIcon,
  GiftIcon
} from '@heroicons/react/24/outline'

const AdminDashboard = () => {
  const { user } = useAuth()

  // Mock data for admin dashboard
  const adminStats = [
    {
      name: 'Total Employees',
      value: '156',
      icon: UsersIcon,
      color: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600',
      change: '+12 this month',
      changeType: 'positive',
      description: 'Active employees in the system',
      chartData: [140, 142, 145, 148, 150, 152, 156]
    },
    {
      name: 'Departments',
      value: '8',
      icon: BuildingOfficeIcon,
      color: 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600',
      change: '+1 new department',
      changeType: 'positive',
      description: 'Active departments',
      chartData: [7, 7, 7, 7, 7, 8, 8]
    },
    {
      name: 'Pending Approvals',
      value: '23',
      icon: ExclamationTriangleIcon,
      color: 'bg-gradient-to-br from-yellow-500 via-amber-600 to-orange-600',
      change: '-5 from last week',
      changeType: 'positive',
      description: 'Leave requests awaiting approval',
      chartData: [28, 27, 26, 25, 24, 23, 23]
    },
    {
      name: 'System Health',
      value: '99.8%',
      icon: ShieldCheckIcon,
      color: 'bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-600',
      change: '+0.2% uptime',
      changeType: 'positive',
      description: 'System uptime and performance',
      chartData: [99.5, 99.6, 99.6, 99.7, 99.7, 99.8, 99.8]
    },
    {
      name: 'Avg Performance',
      value: '87.5',
      icon: ChartBarIcon,
      color: 'bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600',
      change: '+2.3 points',
      changeType: 'positive',
      description: 'Average employee performance score',
      chartData: [83, 84, 84.5, 85.5, 86, 87, 87.5]
    },
    {
      name: 'Total Rewards',
      value: '$2,100',
      icon: GiftIcon,
      color: 'bg-gradient-to-br from-pink-500 via-rose-600 to-red-600',
      change: '+$450 this month',
      changeType: 'positive',
      description: 'Total rewards value awarded',
      chartData: [1600, 1700, 1750, 1850, 1950, 2050, 2100]
    }
  ]

  // Function to render mini sparkline chart
  const renderMiniChart = (data, color) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1
    
    return (
      <svg className="w-full h-8 mt-2 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 20" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          points={data.map((value, index) => {
            const x = (index * 100) / (data.length - 1)
            const y = 20 - ((value - min) / range) * 20
            return `${x},${y}`
          }).join(' ')}
        />
      </svg>
    )
  }

  const recentActivities = [
    {
      id: 1,
      type: 'user_registration',
      message: 'New employee John Smith registered',
      timestamp: '2 minutes ago',
      icon: UsersIcon,
      color: 'text-blue-500'
    },
    {
      id: 2,
      type: 'leave_request',
      message: 'Sarah Johnson requested 3 days leave',
      timestamp: '15 minutes ago',
      icon: CalendarDaysIcon,
      color: 'text-yellow-500'
    },
    {
      id: 3,
      type: 'system_alert',
      message: 'High server load detected',
      timestamp: '1 hour ago',
      icon: ExclamationTriangleIcon,
      color: 'text-red-500'
    },
    {
      id: 4,
      type: 'data_backup',
      message: 'Daily backup completed successfully',
      timestamp: '2 hours ago',
      icon: CheckCircleIcon,
      color: 'text-green-500'
    },
    {
      id: 5,
      type: 'report_generated',
      message: 'Monthly attendance report generated',
      timestamp: '3 hours ago',
      icon: DocumentTextIcon,
      color: 'text-purple-500'
    }
  ]

  const departmentStats = [
    { name: 'Engineering', employees: 45, growth: '+8%', color: 'bg-blue-500' },
    { name: 'Marketing', employees: 23, growth: '+12%', color: 'bg-green-500' },
    { name: 'HR', employees: 12, growth: '+5%', color: 'bg-purple-500' },
    { name: 'Finance', employees: 18, growth: '+3%', color: 'bg-yellow-500' },
    { name: 'Sales', employees: 32, growth: '+15%', color: 'bg-orange-500' },
    { name: 'Operations', employees: 26, growth: '+7%', color: 'bg-pink-500' }
  ]

  const systemMetrics = {
    totalUsers: 156,
    activeUsers: 142,
    inactiveUsers: 14
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-white via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 shadow-xl rounded-3xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative px-6 py-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="h-14 w-14 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-500 dark:via-indigo-500 dark:to-purple-500 shadow-lg shadow-blue-500/20 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                      <span className="text-xl sm:text-2xl font-bold text-white">
                        {user?.name?.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-red-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center">
                      <ShieldCheckIcon className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                      Admin Dashboard 🚀
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-1">
                      Welcome back, {user?.name?.split(' ')[0]}! Manage your organization efficiently
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-3 px-5 py-3 bg-red-100 dark:bg-red-900/20 backdrop-blur-sm rounded-xl border border-red-200 dark:border-red-800 shadow-sm">
                  <CogIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">System Admin</span>
                </div>
              </div>
              
              {/* Mobile badge */}
              <div className="flex items-center mt-4 text-sm text-gray-600 dark:text-gray-300 sm:hidden">
                <CogIcon className="h-4 w-4 mr-2 text-red-600" />
                System Admin
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4 sm:gap-6">
            {adminStats.map((stat, index) => {
              const colorMap = {
                0: 'stroke-blue-500',
                1: 'stroke-green-500',
                2: 'stroke-yellow-500',
                3: 'stroke-purple-500',
                4: 'stroke-indigo-500',
                5: 'stroke-pink-500'
              }
              const chartColor = colorMap[index]
              
              return (
                <div 
                  key={stat.name} 
                  className="group relative bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity ${stat.color}`}></div>
                  
                  <div className="relative p-5 sm:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${stat.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${
                        stat.changeType === 'positive' 
                          ? 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30' 
                          : 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30'
                      }`}>
                        {stat.changeType === 'positive' ? (
                          <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowTrendingDownIcon className="h-3 w-3 mr-1" />
                        )}
                        {stat.change}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        {stat.name}
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {stat.description}
                      </p>
                      
                      {/* Mini sparkline chart */}
                      {stat.chartData && renderMiniChart(stat.chartData, chartColor.includes('blue') ? '#3b82f6' : 
                                                                                chartColor.includes('green') ? '#10b981' : 
                                                                                chartColor.includes('yellow') ? '#eab308' : 
                                                                                chartColor.includes('purple') ? '#a855f7' : 
                                                                                chartColor.includes('indigo') ? '#6366f1' : 
                                                                                '#ec4899')}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/50 dark:via-indigo-950/50 dark:to-purple-950/50 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <BellIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activities</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">System activity log</p>
                      </div>
                    </div>
                    <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                      View all →
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div 
                        key={activity.id} 
                        className="flex items-start space-x-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-transparent dark:hover:from-gray-800/50 transition-all cursor-pointer group"
                      >
                        <div className={`flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                          activity.color === 'text-blue-500' ? 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30' :
                          activity.color === 'text-yellow-500' ? 'from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30' :
                          activity.color === 'text-red-500' ? 'from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30' :
                          activity.color === 'text-green-500' ? 'from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30' :
                          'from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30'
                        }`}>
                          <activity.icon className={`h-6 w-6 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {activity.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            {activity.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Department Overview */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/50 dark:via-purple-950/50 dark:to-pink-950/50 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                      <BuildingOfficeIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Departments</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">By employee count</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {departmentStats.map((dept, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${dept.color} group-hover:scale-125 transition-transform duration-300`}></div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{dept.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{dept.employees}</p>
                          <p className="text-xs text-green-600 dark:text-green-400 flex items-center justify-end">
                            <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
                            {dept.growth}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Statistics */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden max-w-lg mx-auto lg:mx-0">
            <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-950/50 dark:via-cyan-950/50 dark:to-teal-950/50 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <UsersIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">User Statistics</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">System users</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Users</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{systemMetrics.totalUsers}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/30">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Active Users</span>
                  <span className="text-lg font-bold text-green-600">{systemMetrics.activeUsers}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Inactive Users</span>
                  <span className="text-lg font-bold text-red-600">{systemMetrics.inactiveUsers}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
