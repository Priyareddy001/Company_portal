import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMail } from '../contexts/MailContext'
import { useAuth } from '../contexts/AuthContext'
import ConstantHeader from '../components/ConstantHeader'
import {
  EnvelopeIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  UserGroupIcon,
  BookmarkIcon,
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassIcon,
  BellIcon,
  CogIcon,
  PaperClipIcon,
  FlagIcon,
  TrashIcon,
  StarIcon,
  PaperAirplaneIcon,
  ArrowUturnLeftIcon,
  XMarkIcon,
  PrinterIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

const Mail = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const {
    selectedFolder,
    setSelectedFolder,
    selectedEmail,
    setSelectedEmail,
    searchTerm,
    setSearchTerm,
    getUnreadCount,
    markAsRead,
    deleteEmail,
    starEmail,
    getFilteredEmails,
    groupEmailsByDate
  } = useMail()

  const [composeOpen, setComposeOpen] = useState(false)
  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    body: ''
  })

  const folders = [
    { id: 'inbox', name: 'Inbox', icon: EnvelopeIcon },
    { id: 'drafts', name: 'Drafts', icon: DocumentTextIcon },
    { id: 'templates', name: 'Templates', icon: DocumentTextIcon },
    { id: 'snoozed', name: 'Snoozed', icon: ClockIcon },
    { id: 'sent', name: 'Sent', icon: PaperAirplaneIcon },
    { id: 'spam', name: 'Spam', icon: XMarkIcon },
    { id: 'trash', name: 'Trash', icon: TrashIcon },
    { id: 'archive', name: 'Archive', icon: ArchiveBoxIcon },
    { id: 'outbox', name: 'Outbox', icon: PaperAirplaneIcon },
    { id: 'newsletter', name: 'Newsletter', icon: EnvelopeIcon },
    { id: 'notification', name: 'Notification', icon: BellIcon }
  ]

  const handleEmailClick = (email) => {
    setSelectedEmail(email)
    if (!email.read) {
      markAsRead(email.id)
    }
  }

  const handleCompose = () => {
    setComposeOpen(true)
  }

  const handleSendEmail = (e) => {
    e.preventDefault()
    // TODO: Implement send email logic
    setComposeOpen(false)
    setComposeData({ to: '', subject: '', body: '' })
  }

  const filteredEmails = getFilteredEmails()
  const groupedEmails = groupEmailsByDate(filteredEmails)
  const unreadCount = getUnreadCount(selectedFolder)

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Constant Header */}
      <ConstantHeader />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden h-[calc(100vh-5rem)] mt-20">
        {/* Left Sidebar */}
        <div className="w-72 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col shrink-0 overflow-y-auto shadow-sm">
          {/* New Mail Button - Enhanced */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={handleCompose}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Compose</span>
            </button>
          </div>

          {/* Quick Actions Section */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <PaperAirplaneIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Quick Reply</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 group">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                  <StarIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Starred</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 group">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                  <ArchiveBoxIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Archive</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                  <TrashIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Delete</span>
              </button>
            </div>
          </div>

          {/* Application Icons - Enhanced */}
          <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Applications</h3>
            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-3 p-2.5 rounded-lg bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-sm">
                <EnvelopeIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Mail</span>
              </button>
              <button className="flex items-center gap-3 p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <CalendarDaysIcon className="h-5 w-5" />
                <span className="text-sm">Calendar</span>
              </button>
              <button className="flex items-center gap-3 p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <CheckCircleIcon className="h-5 w-5" />
                <span className="text-sm">ToDo</span>
              </button>
              <button className="flex items-center gap-3 p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <DocumentTextIcon className="h-5 w-5" />
                <span className="text-sm">Notes</span>
              </button>
              <button className="flex items-center gap-3 p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <UserGroupIcon className="h-5 w-5" />
                <span className="text-sm">Contacts</span>
              </button>
              <button className="flex items-center gap-3 p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
                <BookmarkIcon className="h-5 w-5" />
                <span className="text-sm">Bookmarks</span>
                <span className="absolute left-8 top-2.5 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
            </div>
          </div>

          {/* Mailbox Folders - Enhanced */}
          <div className="flex-1 px-3 py-4 overflow-y-auto">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-2">Folders</h3>
            <div className="space-y-1">
              {folders.map((folder) => {
                const Icon = folder.icon
                const count = getUnreadCount(folder.id)
                const isSelected = selectedFolder === folder.id
                return (
                  <button
                    key={folder.id}
                    onClick={() => {
                      setSelectedFolder(folder.id)
                      setSelectedEmail(null)
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10 text-blue-700 dark:text-blue-300 border-l-4 border-blue-600 dark:border-blue-400 shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:translate-x-1'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
                      <span className="font-medium">{folder.name}</span>
                    </div>
                    {count > 0 && (
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        isSelected 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}>
                        {count}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tags and Views */}
          <div className="px-2 py-4 border-t border-gray-700 space-y-4">
            <div>
              <div className="flex items-center justify-between px-3 mb-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">Tags</span>
                <button className="text-gray-400 hover:text-white">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between px-3 mb-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">Views</span>
                <button className="text-gray-400 hover:text-white">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Email List and View */}
        <div className="flex-1 flex bg-gray-50 dark:bg-gray-900">
          {/* Email List Pane */}
          <div className="w-[420px] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col shrink-0 shadow-sm">
            {/* Email List Header - Enhanced */}
            <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <EnvelopeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white capitalize">{selectedFolder}</h2>
                    {unreadCount > 0 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">{unreadCount} unread</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Enhanced Search Bar */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
              </div>
              
              {/* Enhanced Action Bar */}
              <div className="flex items-center gap-2 mt-3">
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <StarIcon className="h-4 w-4" />
                  <span>Star</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <ArchiveBoxIcon className="h-4 w-4" />
                  <span>Archive</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <TrashIcon className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>

            {/* Enhanced Email List */}
            <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
              {groupedEmails.map(([groupName, groupEmails]) => (
                <div key={groupName} className="px-4 py-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
                    <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2">{groupName}</h3>
                    <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="space-y-2">
                    {groupEmails.map((email) => {
                      const isSelected = selectedEmail?.id === email.id
                      return (
                        <button
                          key={email.id}
                          onClick={() => handleEmailClick(email)}
                          className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                            isSelected
                              ? 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/20 border-2 border-blue-300 dark:border-blue-700 shadow-md'
                              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm ring-2 ring-white dark:ring-gray-800 ${
                              !email.read && 'ring-4 ring-blue-200 dark:ring-blue-800'
                            }`}>
                              <span className="text-sm font-semibold text-white">
                                {email.from.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-sm font-semibold truncate ${
                                      !email.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                                    }`}>
                                      {email.from.name}
                                    </span>
                                    {email.starred && <StarIconSolid className="h-4 w-4 text-yellow-500 flex-shrink-0" />}
                                    {!email.read && (
                                      <span className="h-2 w-2 bg-blue-600 rounded-full flex-shrink-0"></span>
                                    )}
                                  </div>
                                  <p className={`text-sm font-medium truncate mb-1 ${
                                    !email.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                                  }`}>
                                    {email.subject}
                                  </p>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                                  {new Date(email.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                {email.body.substring(0, 80)}...
                              </p>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
              {groupedEmails.length === 0 && (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                    <EnvelopeIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No emails found</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Your {selectedFolder} folder is empty</p>
                  <button
                    onClick={handleCompose}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Compose New Email
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Email Content Pane - Enhanced */}
          <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 shadow-sm">
            {selectedEmail ? (
              <>
                {/* Email Header Actions */}
                <div className="px-6 py-3 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <PrinterIcon className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <ChatBubbleLeftRightIcon className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <XMarkIcon className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Email Content */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">{selectedEmail.subject}</h2>
                  
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {selectedEmail.from.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">{selectedEmail.from.name}</span>
                        <span className="text-sm text-gray-500">{selectedEmail.from.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{new Date(selectedEmail.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
                        <button className="hover:text-gray-700">
                          <MagnifyingGlassIcon className="h-3 w-3" />
                        </button>
                        <button onClick={() => starEmail(selectedEmail.id)} className="hover:text-gray-700">
                          {selectedEmail.starred ? (
                            <StarIconSolid className="h-3 w-3 text-yellow-500" />
                          ) : (
                            <FlagIcon className="h-3 w-3" />
                          )}
                        </button>
                        <button className="hover:text-gray-700">
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                      <span className="text-xs text-gray-500">{user?.name}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-600 mb-2">Display now • External Images are not displayed</p>
                    <p className="text-sm text-gray-500 cursor-pointer hover:text-blue-600">Display now</p>
                  </div>

                  <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                    {selectedEmail.body}
                  </div>
                </div>

                {/* Email Actions */}
                <div className="border-t border-gray-200 px-6 py-4">
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="@mention a user or group to share this email"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm">
                      <ArrowUturnLeftIcon className="h-4 w-4" />
                      Reply
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      Reply All
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                      <PaperAirplaneIcon className="h-4 w-4" />
                      Forward
                    </button>
                    <button
                      onClick={() => deleteEmail(selectedEmail.id)}
                      className="ml-auto px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm text-red-600"
                    >
                      <TrashIcon className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center max-w-md px-6">
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-6 inline-block">
                    <EnvelopeIcon className="h-20 w-20 text-gray-300 dark:text-gray-600 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">Welcome to Mail</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">
                    Select an email from the list to start reading
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <PaperAirplaneIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                      <p className="font-semibold text-gray-700 dark:text-gray-300">Quick Reply</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Reply instantly</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <StarIcon className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                      <p className="font-semibold text-gray-700 dark:text-gray-300">Star Important</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Mark favorites</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compose Email Modal */}
      {composeOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold">New Message</h3>
              <button onClick={() => setComposeOpen(false)} className="text-gray-400 hover:text-gray-600">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSendEmail} className="flex-1 flex flex-col overflow-y-auto">
              <div className="px-6 py-4 space-y-3">
                <div>
                  <input
                    type="email"
                    placeholder="To"
                    value={composeData.to}
                    onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
                    className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={composeData.subject}
                    onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                    className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Compose your message..."
                    value={composeData.body}
                    onChange={(e) => setComposeData({ ...composeData, body: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[300px]"
                  />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button type="button" className="p-2 hover:bg-gray-100 rounded">
                    <PaperClipIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  <button type="button" className="p-2 hover:bg-gray-100 rounded">
                    <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setComposeOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Mail

