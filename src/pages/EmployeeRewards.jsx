import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  GiftIcon,
  TrophyIcon,
  StarIcon,
  CheckCircleIcon,
  ClockIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  GiftTopIcon,
  SparklesIcon,
  FireIcon,
  HeartIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'

const EmployeeRewards = () => {
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock rewards data for the current employee
  const employeeRewards = [
    {
      id: 1,
      category: 'achievement',
      title: 'Project Excellence Award',
      description: 'Outstanding performance in Q4 project delivery',
      points: 500,
      value: 250,
      status: 'awarded',
      awardedDate: '2024-01-15',
      awardedBy: 'Jane Manager',
      type: 'monetary'
    },
    {
      id: 7,
      category: 'milestone',
      title: '5 Years Service Anniversary',
      description: 'Celebrating 5 years of dedicated service',
      points: 1000,
      value: 500,
      status: 'awarded',
      awardedDate: '2024-01-05',
      awardedBy: 'CEO',
      type: 'monetary'
    },
    {
      id: 2,
      category: 'recognition',
      title: 'Team Player of the Month',
      description: 'Exceptional collaboration and support to team members',
      points: 300,
      value: 100,
      status: 'awarded',
      awardedDate: '2024-01-10',
      awardedBy: 'Mike Director',
      type: 'gift_card'
    },
    {
      id: 3,
      category: 'performance',
      title: 'Sales Target Achiever',
      description: 'Exceeded monthly sales target by 25%',
      points: 400,
      value: 200,
      status: 'pending',
      awardedDate: '2024-01-20',
      awardedBy: 'Lisa Manager',
      type: 'bonus'
    },
    {
      id: 4,
      category: 'innovation',
      title: 'Process Improvement Initiative',
      description: 'Implemented new HR process that saved 20 hours weekly',
      points: 600,
      value: 300,
      status: 'awarded',
      awardedDate: '2024-01-18',
      awardedBy: 'HR Director',
      type: 'monetary'
    }
  ]

  const categories = ['all', 'achievement', 'recognition', 'performance', 'innovation', 'milestone']
  const statuses = ['all', 'awarded', 'pending', 'cancelled']

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'achievement':
        return <TrophyIcon className="h-5 w-5" />
      case 'recognition':
        return <StarIcon className="h-5 w-5" />
      case 'performance':
        return <ChartBarIcon className="h-5 w-5" />
      case 'innovation':
        return <SparklesIcon className="h-5 w-5" />
      case 'milestone':
        return <TrophyIcon className="h-5 w-5" />
      default:
        return <GiftIcon className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'achievement':
        return 'bg-yellow-100 text-yellow-800'
      case 'recognition':
        return 'bg-blue-100 text-blue-800'
      case 'performance':
        return 'bg-green-100 text-green-800'
      case 'innovation':
        return 'bg-purple-100 text-purple-800'
      case 'milestone':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'awarded':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'monetary':
        return <CurrencyDollarIcon className="h-4 w-4" />
      case 'gift_card':
        return <GiftTopIcon className="h-4 w-4" />
      case 'bonus':
        return <FireIcon className="h-4 w-4" />
      case 'recognition':
        return <HeartIcon className="h-4 w-4" />
      default:
        return <GiftIcon className="h-4 w-4" />
    }
  }

  const filteredData = employeeRewards.filter(reward => 
    (selectedCategory === 'all' || reward.category === selectedCategory) &&
    (selectedStatus === 'all' || reward.status === selectedStatus)
  )

  const totalPointsEarned = filteredData.reduce((sum, reward) => sum + reward.points, 0)
  const totalValueEarned = filteredData.reduce((sum, reward) => sum + reward.value, 0)
  const pendingRewards = filteredData.filter(reward => reward.status === 'pending').length
  const awardedRewards = filteredData.filter(reward => reward.status === 'awarded').length

  // Calculate rank based on points
  const getRank = (points) => {
    if (points >= 2000) return { rank: 'Gold', color: 'text-yellow-600', icon: '🥇' }
    if (points >= 1000) return { rank: 'Silver', color: 'text-gray-600', icon: '🥈' }
    if (points >= 500) return { rank: 'Bronze', color: 'text-orange-600', icon: '🥉' }
    return { rank: 'Rising Star', color: 'text-blue-600', icon: '⭐' }
  }

  const currentRank = getRank(totalPointsEarned)

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-white dark:bg-gray-800 px-6 py-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-blue-500 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-500 flex items-center justify-center ring-4 ring-blue-100 dark:ring-white/20">
                    <span className="text-xl sm:text-2xl font-bold text-white">
                      {user?.name?.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">My Rewards</h1>
                    <p className="text-gray-600 dark:text-gray-300">
                      Track your achievements and recognition
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-lg mr-2">{currentRank.icon}</span>
                      <span className={`text-sm font-semibold ${currentRank.color}`}>
                        {currentRank.rank} Level
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {totalPointsEarned.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Points</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${totalValueEarned.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Value</div>
                  </div>
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
                    <GiftIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
                  </div>
                  
                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>

                  {/* Status Filter */}
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Awarded: <span className="font-semibold text-gray-900 dark:text-white">{awardedRewards}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Pending: <span className="font-semibold text-gray-900 dark:text-white">{pendingRewards}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rewards Overview Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrophyIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Total Rewards
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {filteredData.length}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-500 dark:text-gray-400">
                          earned
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
                        Points Earned
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {totalPointsEarned.toLocaleString()}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-500 dark:text-gray-400">
                          points
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
                    <CurrencyDollarIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Value Earned
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          ${totalValueEarned.toLocaleString()}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-500 dark:text-gray-400">
                          total
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
                    <ClockIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Pending Awards
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {pendingRewards}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-500 dark:text-gray-400">
                          rewards
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Progress */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                Achievement Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Gold Level</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2000+ points</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-yellow-500 h-3 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min((totalPointsEarned / 2000) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {totalPointsEarned >= 2000 ? 'Achieved!' : `${2000 - totalPointsEarned} points to go`}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Silver Level</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">1000+ points</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gray-400 h-3 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min((totalPointsEarned / 1000) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {totalPointsEarned >= 1000 ? 'Achieved!' : `${1000 - totalPointsEarned} points to go`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* My Rewards Table */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                My Rewards History
              </h3>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Reward
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Points
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Awarded Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredData.map((reward) => (
                      <tr key={reward.id}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {reward.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {reward.description}
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            Awarded by: {reward.awardedBy}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(reward.category)}`}>
                            {getCategoryIcon(reward.category)}
                            <span className="ml-1">{reward.category.charAt(0).toUpperCase() + reward.category.slice(1)}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {reward.points.toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getTypeIcon(reward.type)}
                            <span className="ml-1 text-sm font-semibold text-gray-900 dark:text-white">
                              ${reward.value.toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reward.status)}`}>
                            {reward.status === 'awarded' ? (
                              <CheckCircleIcon className="h-3 w-3 mr-1" />
                            ) : reward.status === 'pending' ? (
                              <ClockIcon className="h-3 w-3 mr-1" />
                            ) : null}
                            {reward.status.charAt(0).toUpperCase() + reward.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {new Date(reward.awardedDate).toLocaleDateString()}
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

export default EmployeeRewards
