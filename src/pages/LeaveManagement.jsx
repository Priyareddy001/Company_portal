import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  CalendarDaysIcon, 
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

const LeaveManagement = () => {
  const { user } = useAuth()
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [requestForm, setRequestForm] = useState({
    type: 'vacation',
    startDate: '',
    endDate: '',
    reason: '',
    days: 0
  })

  const leaveTypes = [
    { id: 'vacation', name: 'Vacation', color: 'bg-blue-100 text-blue-800' },
    { id: 'sick', name: 'Sick Leave', color: 'bg-red-100 text-red-800' },
    { id: 'personal', name: 'Personal', color: 'bg-green-100 text-green-800' },
    { id: 'maternity', name: 'Maternity/Paternity', color: 'bg-purple-100 text-purple-800' },
    { id: 'emergency', name: 'Emergency', color: 'bg-yellow-100 text-yellow-800' }
  ]

  const leaveRequests = [
    {
      id: 1,
      type: 'vacation',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
      days: 5,
      reason: 'Family vacation',
      status: 'approved',
      submittedDate: '2024-01-01',
      approvedBy: 'Jane Smith'
    },
    {
      id: 2,
      type: 'sick',
      startDate: '2024-01-10',
      endDate: '2024-01-10',
      days: 1,
      reason: 'Doctor appointment',
      status: 'pending',
      submittedDate: '2024-01-08'
    },
    {
      id: 3,
      type: 'personal',
      startDate: '2024-01-25',
      endDate: '2024-01-25',
      days: 1,
      reason: 'Personal matters',
      status: 'rejected',
      submittedDate: '2024-01-20',
      approvedBy: 'Jane Smith',
      rejectionReason: 'Insufficient notice period'
    },
    {
      id: 4,
      type: 'vacation',
      startDate: '2024-02-01',
      endDate: '2024-02-05',
      days: 4,
      reason: 'Weekend getaway',
      status: 'approved',
      submittedDate: '2024-01-15',
      approvedBy: 'John Doe'
    },
    {
      id: 5,
      type: 'emergency',
      startDate: '2024-01-28',
      endDate: '2024-01-28',
      days: 1,
      reason: 'Family emergency',
      status: 'pending',
      submittedDate: '2024-01-27'
    },
    {
      id: 6,
      type: 'maternity',
      startDate: '2024-03-01',
      endDate: '2024-05-30',
      days: 90,
      reason: 'Maternity leave',
      status: 'approved',
      submittedDate: '2024-01-15',
      approvedBy: 'HR Manager'
    },
    {
      id: 7,
      type: 'sick',
      startDate: '2024-01-30',
      endDate: '2024-02-01',
      days: 2,
      reason: 'Flu symptoms',
      status: 'approved',
      submittedDate: '2024-01-29',
      approvedBy: 'Jane Smith'
    },
    {
      id: 8,
      type: 'personal',
      startDate: '2024-02-10',
      endDate: '2024-02-10',
      days: 1,
      reason: 'Moving day',
      status: 'pending',
      submittedDate: '2024-02-05'
    }
  ]

  const leaveBalances = [
    { type: 'Vacation', total: 20, used: 5, remaining: 15 },
    { type: 'Sick Leave', total: 10, used: 2, remaining: 8 },
    { type: 'Personal', total: 5, used: 1, remaining: 4 },
    { type: 'Maternity/Paternity', total: 90, used: 0, remaining: 90 }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRequestForm(prev => ({
      ...prev,
      [name]: value
    }))

    // Calculate days if dates are selected
    if (name === 'startDate' || name === 'endDate') {
      if (requestForm.startDate && requestForm.endDate) {
        const start = new Date(requestForm.startDate)
        const end = new Date(requestForm.endDate)
        const diffTime = Math.abs(end - start)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
        setRequestForm(prev => ({
          ...prev,
          days: diffDays
        }))
      }
    }
  }

  const handleSubmitRequest = (e) => {
    e.preventDefault()
    // In a real app, this would submit to the backend
    console.log('Leave request submitted:', requestForm)
    setShowRequestForm(false)
    setRequestForm({
      type: 'vacation',
      startDate: '',
      endDate: '',
      reason: '',
      days: 0
    })
    // Show success message
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />
      default:
        return <ExclamationTriangleIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
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
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Leave Management</h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Manage your leave requests and view your leave balance
                  </p>
                </div>
                <button
                  onClick={() => setShowRequestForm(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Request Leave
                </button>
              </div>
            </div>
          </div>

      {/* Leave Balances */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {leaveBalances.map((balance) => (
          <div key={balance.type} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CalendarDaysIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {balance.type}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {balance.remaining}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-500 dark:text-gray-400">
                        / {balance.total}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leave Requests */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
            Recent Leave Requests
          </h3>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Days
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
            </table>
            {/* Scrollable table body with max height for 3 rows */}
            <div className="max-h-48 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {leaveRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          leaveTypes.find(t => t.id === request.type)?.color || 'bg-gray-100 text-gray-800'
                        }`}>
                          {leaveTypes.find(t => t.id === request.type)?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {request.days}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {request.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(request.status)}
                          <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Request Leave Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-gray-200 dark:border-gray-700 w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Request Leave</h3>
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Leave Type
                  </label>
                  <select
                    name="type"
                    value={requestForm.type}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {leaveTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={requestForm.startDate}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={requestForm.endDate}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {requestForm.days > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Total Days
                    </label>
                    <div className="mt-1 text-sm text-gray-900 dark:text-white">{requestForm.days} days</div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Reason
                  </label>
                  <textarea
                    name="reason"
                    value={requestForm.reason}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Please provide a reason for your leave request"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Submit Request
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

export default LeaveManagement
