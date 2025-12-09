import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'
import { 
  CalendarDaysIcon, 
  UsersIcon, 
  DocumentTextIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChartBarIcon,
  AcademicCapIcon,
  CalendarIcon,
  UserGroupIcon,
  BriefcaseIcon,
  GiftIcon,
  StarIcon,
  BellIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PresentationChartLineIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'

const Dashboard = () => {
  const { user } = useAuth()

  const stats = [
    {
      name: 'Leave Balance',
      value: '15 days',
      icon: CalendarDaysIcon,
      color: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600',
      change: '+2 days',
      changeType: 'positive',
      description: 'Available vacation days',
      chartData: [12, 13, 13, 14, 15, 14, 15]
    },
    {
      name: 'Team Members',
      value: '8',
      icon: UsersIcon,
      color: 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600',
      change: '+1 this month',
      changeType: 'positive',
      description: 'Direct reports',
      chartData: [6, 6, 7, 7, 7, 8, 8]
    },
    {
      name: 'Pending Tasks',
      value: '3',
      icon: DocumentTextIcon,
      color: 'bg-gradient-to-br from-yellow-500 via-amber-600 to-orange-600',
      change: '-2 from last week',
      changeType: 'positive',
      description: 'Tasks to complete',
      chartData: [5, 5, 5, 4, 4, 3, 3]
    },
    {
      name: 'Hours This Week',
      value: '40.5',
      icon: ClockIcon,
      color: 'bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-600',
      change: '+2.5 from last week',
      changeType: 'positive',
      description: 'Total hours worked',
      chartData: [38, 38, 40, 39, 41, 40, 40.5]
    },
    {
      name: 'Reward Points',
      value: '2,800',
      icon: StarIcon,
      color: 'bg-gradient-to-br from-pink-500 via-rose-600 to-red-600',
      change: '+500 this month',
      changeType: 'positive',
      description: 'Total points earned',
      chartData: [2300, 2350, 2400, 2500, 2600, 2700, 2800]
    }
  ]

  const weeklyHours = [6, 8, 7, 8, 8, 4] // Hours by day
  const monthlyPerformance = {
    thisMonth: 95,
    lastMonth: 88,
    chartData: [82, 85, 88, 90, 92, 94, 95]
  }

  // Chart data for visualizations
  const taskDistribution = [
    { name: 'Completed', value: 145, percentage: 58, color: '#10b981' },
    { name: 'In Progress', value: 72, percentage: 29, color: '#3b82f6' },
    { name: 'Pending', value: 33, percentage: 13, color: '#f59e0b' }
  ]

  const weeklyActivity = [
    { day: 'Mon', hours: 8 },
    { day: 'Tue', hours: 7.5 },
    { day: 'Wed', hours: 8.5 },
    { day: 'Thu', hours: 7 },
    { day: 'Fri', hours: 8 },
    { day: 'Sat', hours: 5 },
    { day: 'Sun', hours: 4 }
  ]

  const projectStatus = {
    onTrack: { value: 85, percentage: 85, color: '#10b981', label: 'On Track' },
    atRisk: { value: 12, percentage: 12, color: '#f59e0b', label: 'At Risk' },
    blocked: { value: 3, percentage: 3, color: '#ef4444', label: 'Blocked' }
  }

  // Function to render donut chart
  const renderDonutChart = (data, size = 120) => {
    const center = size / 2
    const radius = size / 2 - 10
    let cumulativePercentage = 0

    return (
      <svg width={size} height={size} className="transform -rotate-90">
        {data.map((item, index) => {
          const circumference = 2 * Math.PI * radius
          const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`
          const offset = cumulativePercentage
          const strokeDashoffset = (offset / 100) * circumference
          cumulativePercentage += item.percentage

          return (
            <circle
              key={index}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth="8"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500"
            />
          )
        })}
      </svg>
    )
  }

  // Function to render bar chart
  const renderBarChart = (data, maxValue) => {
    return (
      <div className="flex items-end justify-between h-32 gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full relative bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden h-full">
              <div
                className={`w-full transition-all duration-500 rounded-t-lg ${
                  index % 2 === 0 ? 'bg-gradient-to-t from-blue-500 to-blue-600' : 'bg-gradient-to-t from-purple-500 to-purple-600'
                }`}
                style={{ 
                  height: `${(item.hours / maxValue) * 100}%`,
                  minHeight: '8px'
                }}
              >
                <span className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-xs font-semibold">
                  {item.hours}h
                </span>
              </div>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-medium">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    )
  }

  const maxHours = Math.max(...weeklyActivity.map(d => d.hours))

  const recentActivities = [
    {
      id: 1,
      type: 'leave',
      message: 'Your leave request for Dec 15-20 has been approved',
      time: '2 hours ago',
      icon: CheckCircleIcon,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      id: 2,
      type: 'announcement',
      message: 'New company policy update published',
      time: '1 day ago',
      icon: DocumentTextIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      id: 3,
      type: 'reminder',
      message: 'Performance review due next week',
      time: '2 days ago',
      icon: ExclamationTriangleIcon,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      id: 4,
      type: 'team',
      message: 'New team member Sarah joined the Engineering team',
      time: '3 days ago',
      icon: UserGroupIcon,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      id: 5,
      type: 'reward',
      message: 'You earned 500 points for Project Excellence Award!',
      time: '1 week ago',
      icon: GiftIcon,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20'
    }
  ]

  const quickActions = [
    { name: 'Request Leave', href: '/app/leave', icon: CalendarDaysIcon, bgColor: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/30 dark:hover:bg-blue-900/40', textColor: 'text-blue-700 dark:text-blue-300', iconColor: 'text-blue-600 dark:text-blue-400' },
    { name: 'Update Profile', href: '/app/profile', icon: UsersIcon, bgColor: 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/40', textColor: 'text-emerald-700 dark:text-emerald-300', iconColor: 'text-emerald-600 dark:text-emerald-400' },
    { name: 'View Rewards', href: '/app/rewards', icon: GiftIcon, bgColor: 'bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-900/40', textColor: 'text-rose-700 dark:text-rose-300', iconColor: 'text-rose-600 dark:text-rose-400' },
    { name: 'View Directory', href: '/app/directory', icon: UserGroupIcon, bgColor: 'bg-violet-50 hover:bg-violet-100 dark:bg-violet-950/30 dark:hover:bg-violet-900/40', textColor: 'text-violet-700 dark:text-violet-300', iconColor: 'text-violet-600 dark:text-violet-400' },
    { name: 'Read Announcements', href: '/app/announcements', icon: DocumentTextIcon, bgColor: 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/30 dark:hover:bg-amber-900/40', textColor: 'text-amber-700 dark:text-amber-300', iconColor: 'text-amber-600 dark:text-amber-400' }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Welcome Section */}
          <div className="relative bg-gradient-to-br from-white via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 shadow-xl rounded-3xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative px-6 py-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="h-14 w-14 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-500 dark:via-indigo-500 dark:to-purple-500 shadow-lg shadow-blue-500/20 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                      <span className="text-xl sm:text-2xl font-bold text-white">
                      {user?.name?.split(' ').map(n => n[0]).join('')}
                    </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center">
                      <CheckCircleIcon className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                      Welcome back, {user?.name?.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-1">
                      Here's what's happening with your account today
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-3 px-5 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                  {new Date().toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              
              {/* Mobile date */}
              <div className="flex items-center mt-4 text-sm text-gray-600 dark:text-gray-300 sm:hidden">
                <CalendarIcon className="h-4 w-4 mr-2 text-blue-600" />
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 sm:gap-6">
            {stats.map((stat, index) => {
              const colorMap = {
                0: 'stroke-blue-500',
                1: 'stroke-green-500',
                2: 'stroke-yellow-500',
                3: 'stroke-purple-500',
                4: 'stroke-pink-500'
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
                                                                                  '#ec4899')}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Chart Visualizations Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Task Distribution Donut Chart */}
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/50 dark:via-purple-950/50 dark:to-pink-950/50 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <ChartBarIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Task Distribution</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Overall completion status</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center mb-6 relative">
                  <div className="relative">
                    {renderDonutChart(taskDistribution, 140)}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">250</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {taskDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{item.percentage}%</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">({item.value})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weekly Activity Bar Chart */}
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-950/50 dark:via-cyan-950/50 dark:to-teal-950/50 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <ClockIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Weekly Activity</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Hours worked per day</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {renderBarChart(weeklyActivity, maxHours)}
              </div>
            </div>

            {/* Project Status Donut Chart */}
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/50 dark:via-emerald-950/50 dark:to-teal-950/50 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <BriefcaseIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Project Status</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Current health status</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center mb-6 relative">
                  <div className="relative">
                    {renderDonutChart([
                      projectStatus.onTrack,
                      projectStatus.atRisk,
                      projectStatus.blocked
                    ], 140)}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">100%</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Projects</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {Object.values(projectStatus).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{item.percentage}%</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">({item.value})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/50 dark:via-indigo-950/50 dark:to-purple-950/50 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <BellIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Latest updates from your account</p>
                      </div>
                    </div>
                    <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                      View all →
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivities.map((activity, activityIdx) => (
                      <div 
                        key={activity.id} 
                        className="flex items-start space-x-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-transparent dark:hover:from-gray-800/50 transition-all cursor-pointer group"
                      >
                        <div className={`flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center ${activity.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                          <activity.icon className={`h-6 w-6 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {activity.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
          </div>
        </div>

            {/* Quick Actions */}
            <div>
              {/* Quick Actions Section */}
              <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/50 dark:via-emerald-950/50 dark:to-teal-950/50 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <BriefcaseIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Quick Actions</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Common tasks</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-3">
                    {quickActions.map((action) => (
                      <a
                        key={action.name}
                        href={action.href}
                        className={`group relative p-4 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg ${action.bgColor} hover:scale-[1.02] transform`}
                      >
                        <div className="flex items-center space-x-3">
                          <action.icon className={`h-5 w-5 ${action.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                          <span className={`text-sm font-semibold ${action.textColor}`}>{action.name}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance & Team Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Performance Overview */}
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/50 dark:via-amber-950/50 dark:to-yellow-950/50 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <PresentationChartLineIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Performance Overview</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Your productivity metrics</p>
                  </div>
                </div>
           </div>
           <div className="p-6">
                <div className="space-y-6">
                  {/* This Month */}
                  <div className="space-y-3">
               <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</span>
                      <span className="text-2xl font-bold text-green-600 flex items-center">
                        <TrophyIcon className="h-5 w-5 mr-1" />
                        {monthlyPerformance.thisMonth}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full flex items-center justify-end pr-2 transition-all duration-500" style={{width: `${monthlyPerformance.thisMonth}%`}}>
                        <CheckCircleIcon className="h-3 w-3 text-white" />
                      </div>
               </div>
               </div>
                  
                  {/* Last Month */}
                  <div className="space-y-3">
               <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Month</span>
                      <span className="text-2xl font-bold text-blue-600">{monthlyPerformance.lastMonth}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500" style={{width: `${monthlyPerformance.lastMonth}%`}}></div>
                    </div>
                  </div>

                  {/* Performance Trend Chart */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Performance Trend</p>
                    <div className="h-20 w-full">
                      <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                        <polyline
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          points={monthlyPerformance.chartData.map((value, index) => {
                            const x = (index * 100) / (monthlyPerformance.chartData.length - 1)
                            const y = 20 - (value / 100) * 20
                            return `${x},${y}`
                          }).join(' ')}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 0.8}} />
                            <stop offset="100%" style={{stopColor: '#3b82f6', stopOpacity: 0.3}} />
                          </linearGradient>
                        </defs>
                      </svg>
               </div>
               </div>
             </div>
           </div>
         </div>

         {/* Team Collaboration */}
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/50 dark:via-purple-950/50 dark:to-pink-950/50 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <UserGroupIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Team Collaboration</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Recent interactions</p>
                  </div>
                </div>
           </div>
           <div className="p-6">
             <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-transparent hover:from-blue-100/50 dark:from-blue-950/50 dark:hover:from-blue-900/50 transition-all cursor-pointer group">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold">JD</span>
                 </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">John Doe</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Software Developer · Active</p>
                 </div>
                    <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
               </div>
                  
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-green-50/50 to-transparent hover:from-green-100/50 dark:from-green-950/50 dark:hover:from-green-900/50 transition-all cursor-pointer group">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold">SM</span>
                 </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Sarah Miller</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Project Manager · Online</p>
                 </div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
               </div>
                  
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/50 to-transparent hover:from-purple-100/50 dark:from-purple-950/50 dark:hover:from-purple-900/50 transition-all cursor-pointer group">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold">AR</span>
                 </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Alex Rodriguez</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">UI/UX Designer · Away</p>
                 </div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Weekly Summary */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-50 via-teal-50 to-emerald-50 dark:from-cyan-950/50 dark:via-teal-950/50 dark:to-emerald-950/50 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Weekly Summary</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Your weekly achievements</p>
                </div>
              </div>
         </div>
         <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900/30 group hover:shadow-lg transition-all cursor-pointer">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    42
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">Hours Worked</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">On track</div>
                </div>
                
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-100 dark:border-green-900/30 group hover:shadow-lg transition-all cursor-pointer">
                  <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    8
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">Tasks Completed</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Excellent!</div>
             </div>
                
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border border-purple-100 dark:border-purple-900/30 group hover:shadow-lg transition-all cursor-pointer">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    3
             </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">Meetings Attended</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Keep it up</div>
             </div>
           </div>
         </div>
       </div>

          {/* Recent Projects & Company News Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       {/* Recent Projects */}
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-950/50 dark:via-purple-950/50 dark:to-fuchsia-950/50 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                    <BriefcaseIcon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Projects</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Active work items</p>
                  </div>
                </div>
         </div>
         <div className="p-6">
           <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-100 dark:border-green-900/30 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-3">
               <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                          Employee Portal Redesign
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          Due: Jan 30, 2025
                        </p>
               </div>
               <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">85%</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Complete</div>
                 </div>
               </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full transition-all duration-500" style={{width: '85%'}}></div>
               </div>
             </div>
                  
                  <div className="p-5 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-100 dark:border-blue-900/30 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-3">
               <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          Mobile App Development
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          Due: Feb 15, 2025
                        </p>
               </div>
               <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">60%</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">In Progress</div>
                      </div>
                 </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full transition-all duration-500" style={{width: '60%'}}></div>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Company News */}
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-red-50 dark:from-rose-950/50 dark:via-pink-950/50 dark:to-red-950/50 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
                    <DocumentTextIcon className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Company News</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Latest updates</p>
                  </div>
                </div>
         </div>
         <div className="p-6">
           <div className="space-y-4">
                  <div className="p-5 rounded-xl border-l-4 border-blue-500 bg-gradient-to-r from-blue-50/50 to-transparent hover:from-blue-100/50 dark:from-blue-950/50 dark:hover:from-blue-900/50 transition-all cursor-pointer group">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      New Office Opening
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      We're excited to announce the opening of our new office in downtown.
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 flex items-center">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      2 days ago
                    </p>
       </div>

                  <div className="p-5 rounded-xl border-l-4 border-green-500 bg-gradient-to-r from-green-50/50 to-transparent hover:from-green-100/50 dark:from-green-950/50 dark:hover:from-green-900/50 transition-all cursor-pointer group">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      Team Building Event
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Join us for our quarterly team building event next Friday.
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 flex items-center">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      5 days ago
                    </p>
                 </div>
             </div>
           </div>
         </div>
       </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard