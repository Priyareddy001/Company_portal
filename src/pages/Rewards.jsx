import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  GiftIcon,
  TrophyIcon,
  StarIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  CheckCircleIcon,
  ClockIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  GiftTopIcon,
  SparklesIcon,
  FireIcon,
  HeartIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

const Rewards = () => {
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showAddReward, setShowAddReward] = useState(false)
  const [newReward, setNewReward] = useState({
    employeeId: '',
    category: 'achievement',
    title: '',
    description: '',
    points: 0,
    value: 0
  })

  // Mock rewards data
  const rewardsData = [
    {
      id: 1,
      employeeId: 1,
      employeeName: 'John Smith',
      employeeAvatar: 'JS',
      department: 'Engineering',
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
      id: 2,
      employeeId: 2,
      employeeName: 'Sarah Johnson',
      employeeAvatar: 'SJ',
      department: 'Marketing',
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
      employeeId: 3,
      employeeName: 'Mike Chen',
      employeeAvatar: 'MC',
      department: 'Sales',
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
      employeeId: 4,
      employeeName: 'Emily Davis',
      employeeAvatar: 'ED',
      department: 'HR',
      category: 'innovation',
      title: 'Process Improvement Initiative',
      description: 'Implemented new HR process that saved 20 hours weekly',
      points: 600,
      value: 300,
      status: 'awarded',
      awardedDate: '2024-01-18',
      awardedBy: 'HR Director',
      type: 'monetary'
    },
    {
      id: 5,
      employeeId: 5,
      employeeName: 'David Wilson',
      employeeAvatar: 'DW',
      department: 'Engineering',
      category: 'achievement',
      title: 'Code Quality Excellence',
      description: 'Maintained 95% code quality score for 3 consecutive months',
      points: 350,
      value: 150,
      status: 'awarded',
      awardedDate: '2024-01-12',
      awardedBy: 'Tech Lead',
      type: 'gift_card'
    },
    {
      id: 6,
      employeeId: 6,
      employeeName: 'Lisa Brown',
      employeeAvatar: 'LB',
      department: 'Finance',
      category: 'recognition',
      title: 'Customer Service Excellence',
      description: 'Received 5-star feedback from multiple clients',
      points: 250,
      value: 100,
      status: 'pending',
      awardedDate: '2024-01-22',
      awardedBy: 'Finance Manager',
      type: 'gift_card'
    },
    {
      id: 7,
      employeeId: 1,
      employeeName: 'John Smith',
      employeeAvatar: 'JS',
      department: 'Engineering',
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
      id: 8,
      employeeId: 2,
      employeeName: 'Sarah Johnson',
      employeeAvatar: 'SJ',
      department: 'Marketing',
      category: 'innovation',
      title: 'Creative Campaign Award',
      description: 'Led successful marketing campaign with 300% ROI',
      points: 700,
      value: 400,
      status: 'awarded',
      awardedDate: '2024-01-08',
      awardedBy: 'Marketing Director',
      type: 'bonus'
    }
  ]

  const categories = ['all', 'achievement', 'recognition', 'performance', 'innovation', 'milestone']
  const statuses = ['all', 'awarded', 'pending', 'cancelled']
  const rewardTypes = ['monetary', 'gift_card', 'bonus', 'recognition']

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

  const filteredData = rewardsData.filter(reward => 
    (selectedCategory === 'all' || reward.category === selectedCategory) &&
    (selectedStatus === 'all' || reward.status === selectedStatus)
  )

  const totalPointsAwarded = filteredData.reduce((sum, reward) => sum + reward.points, 0)
  const totalValueAwarded = filteredData.reduce((sum, reward) => sum + reward.value, 0)
  const pendingRewards = filteredData.filter(reward => reward.status === 'pending').length

  const handleAddReward = (e) => {
    e.preventDefault()
    // In a real app, this would submit to the backend
    console.log('New reward:', newReward)
    setShowAddReward(false)
    setNewReward({
      employeeId: '',
      category: 'achievement',
      title: '',
      description: '',
      points: 0,
      value: 0
    })
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-white dark:bg-gray-800 px-6 py-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Employee Rewards</h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Manage and track employee rewards and recognition
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowAddReward(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Award Reward
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
                    Total Points: <span className="font-semibold text-gray-900 dark:text-white">{totalPointsAwarded.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Value: <span className="font-semibold text-gray-900 dark:text-white">${totalValueAwarded.toLocaleString()}</span>
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
                    <GiftIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
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
                          awarded
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
                        Total Points
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {totalPointsAwarded.toLocaleString()}
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
                        Total Value
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          ${totalValueAwarded.toLocaleString()}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-500 dark:text-gray-400">
                          awarded
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

          {/* Rewards Table */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                Rewards History
              </h3>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Employee
                      </th>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredData.map((reward) => (
                      <tr key={reward.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-500 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-500 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {reward.employeeAvatar}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {reward.employeeName}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {reward.department}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {reward.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {reward.description}
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

          {/* Add Reward Modal */}
          {showAddReward && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border border-gray-200 dark:border-gray-700 w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Award New Reward</h3>
                  <form onSubmit={handleAddReward} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Employee
                      </label>
                      <select
                        name="employeeId"
                        value={newReward.employeeId}
                        onChange={(e) => setNewReward(prev => ({ ...prev, employeeId: e.target.value }))}
                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">Select Employee</option>
                        <option value="1">John Smith - Engineering</option>
                        <option value="2">Sarah Johnson - Marketing</option>
                        <option value="3">Mike Chen - Sales</option>
                        <option value="4">Emily Davis - HR</option>
                        <option value="5">David Wilson - Engineering</option>
                        <option value="6">Lisa Brown - Finance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Category
                      </label>
                      <select
                        name="category"
                        value={newReward.category}
                        onChange={(e) => setNewReward(prev => ({ ...prev, category: e.target.value }))}
                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {categories.filter(cat => cat !== 'all').map((category) => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={newReward.title}
                        onChange={(e) => setNewReward(prev => ({ ...prev, title: e.target.value }))}
                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter reward title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={newReward.description}
                        onChange={(e) => setNewReward(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter reward description"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Points
                        </label>
                        <input
                          type="number"
                          name="points"
                          value={newReward.points}
                          onChange={(e) => setNewReward(prev => ({ ...prev, points: parseInt(e.target.value) }))}
                          className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Value ($)
                        </label>
                        <input
                          type="number"
                          name="value"
                          value={newReward.value}
                          onChange={(e) => setNewReward(prev => ({ ...prev, value: parseInt(e.target.value) }))}
                          className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowAddReward(false)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Award Reward
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Rewards
