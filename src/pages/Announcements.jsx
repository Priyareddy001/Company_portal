import { useState } from 'react'
import { 
  MegaphoneIcon,
  CalendarIcon,
  UserIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const Announcements = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const announcements = [
    {
      id: 1,
      title: 'New Company Policy Update',
      content: 'We have updated our remote work policy. All employees are now allowed to work from home up to 3 days per week. Please review the updated policy document in the employee handbook.',
      category: 'policy',
      priority: 'high',
      author: 'HR Department',
      publishDate: '2024-01-15',
      read: false
    },
    {
      id: 2,
      title: 'Quarterly Team Building Event',
      content: 'Join us for our quarterly team building event on January 25th at the company headquarters. We will have team activities, lunch, and networking opportunities. Please RSVP by January 20th.',
      category: 'event',
      priority: 'medium',
      author: 'Events Team',
      publishDate: '2024-01-10',
      read: true
    },
    {
      id: 3,
      title: 'System Maintenance Notice',
      content: 'Our employee portal will be undergoing scheduled maintenance on January 22nd from 2:00 AM to 6:00 AM EST. During this time, the portal may be temporarily unavailable.',
      category: 'system',
      priority: 'high',
      author: 'IT Department',
      publishDate: '2024-01-12',
      read: false
    },
    {
      id: 4,
      title: 'Welcome New Team Members',
      content: 'Please join us in welcoming our new team members: Sarah Johnson (Marketing), Mike Chen (Engineering), and Lisa Rodriguez (Sales). They will be starting on January 20th.',
      category: 'general',
      priority: 'low',
      author: 'HR Department',
      publishDate: '2024-01-08',
      read: true
    },
    {
      id: 5,
      title: 'Performance Review Schedule',
      content: 'Annual performance reviews will begin on February 1st. All employees will receive their review schedule by January 25th. Please prepare your self-assessment documents.',
      category: 'hr',
      priority: 'medium',
      author: 'HR Department',
      publishDate: '2024-01-05',
      read: false
    },
    {
      id: 6,
      title: 'Office Holiday Schedule',
      content: 'The office will be closed on February 19th for Presidents Day. Please plan your work accordingly and ensure all urgent matters are addressed before the holiday.',
      category: 'general',
      priority: 'low',
      author: 'Administration',
      publishDate: '2024-01-03',
      read: true
    }
  ]

  const categories = [
    { id: 'all', name: 'All Announcements', icon: MegaphoneIcon },
    { id: 'policy', name: 'Policy Updates', icon: DocumentTextIcon },
    { id: 'event', name: 'Events', icon: CalendarIcon },
    { id: 'system', name: 'System Updates', icon: InformationCircleIcon },
    { id: 'hr', name: 'HR Updates', icon: UserIcon },
    { id: 'general', name: 'General', icon: MegaphoneIcon }
  ]

  const filteredAnnouncements = selectedCategory === 'all' 
    ? announcements 
    : announcements.filter(announcement => announcement.category === selectedCategory)

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
      case 'medium':
        return <InformationCircleIcon className="h-5 w-5 text-yellow-500" />
      case 'low':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      default:
        return <InformationCircleIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const unreadCount = announcements.filter(announcement => !announcement.read).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Announcements</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Stay updated with the latest company news and updates
              </p>
            </div>
            {unreadCount > 0 && (
              <div className="flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {unreadCount} unread
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Filter by Category</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative rounded-lg border p-4 focus:outline-none ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                <div className="flex flex-col items-center">
                  <category.icon className={`h-6 w-6 ${
                    selectedCategory === category.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
                  }`} />
                  <span className={`mt-2 text-sm font-medium ${
                    selectedCategory === category.id ? 'text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'
                  }`}>
                    {category.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 ${
              !announcement.read ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className={`text-lg font-medium ${
                      !announcement.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {announcement.title}
                    </h3>
                    {!announcement.read && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        New
                      </span>
                    )}
                  </div>
                  
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {announcement.content}
                  </p>
                  
                  <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <UserIcon className="h-4 w-4 mr-1" />
                      {announcement.author}
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {formatDate(announcement.publishDate)}
                    </div>
                  </div>
                </div>
                
                <div className="ml-4 flex flex-col items-end space-y-2">
                  <div className="flex items-center">
                    {getPriorityIcon(announcement.priority)}
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                    </span>
                  </div>
                  
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                    {announcement.read ? 'Mark as unread' : 'Mark as read'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Announcements */}
      {filteredAnnouncements.length === 0 && (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-12 sm:p-6 text-center">
            <MegaphoneIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No announcements found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              There are no announcements in this category at the moment.
            </p>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  )
}

export default Announcements
