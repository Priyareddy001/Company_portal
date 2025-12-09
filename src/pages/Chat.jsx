import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChat } from '../contexts/ChatContext'
import { useAuth } from '../contexts/AuthContext'
import ConstantHeader from '../components/ConstantHeader'
import {
  ChatBubbleLeftRightIcon,
  ClockIcon,
  FolderIcon,
  CalendarDaysIcon,
  CogIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
  VideoCameraIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  HashtagIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  EnvelopeIcon,
  PaperClipIcon,
  PhotoIcon,
  DocumentIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import {
  checkIn,
  checkOut,
  getTodayCheckInStatus
} from '../utils/timeTracking'

const Chat = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const {
    getAllAvailableUsers,
    getOrCreateConversation,
    selectedConversation,
    setSelectedConversation,
    sendMessage,
    getConversationMessages,
    getConversationList,
    markAsRead,
    isUserOnline
  } = useChat()

  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('chats')
  const [messageTexts, setMessageTexts] = useState({}) // Map of conversationId -> messageText
  const [messagesMap, setMessagesMap] = useState({}) // Map of conversationId -> messages array
  const [activeConversations, setActiveConversations] = useState([]) // Array of conversation IDs (max 2)
  const [attachments, setAttachments] = useState({}) // Map of conversationId -> array of attachments
  const [departmentSearch, setDepartmentSearch] = useState('')
  const [checkedIn, setCheckedIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [showTimePopup, setShowTimePopup] = useState(false)
  const [lastMessageIds, setLastMessageIds] = useState({}) // Track last seen message IDs per conversation
  const messagesEndRefs = useRef({}) // Map of conversationId -> ref
  const laptopIconRef = useRef(null)
  const fileInputRefs = useRef({}) // Map of conversationId -> file input ref
  const notificationSoundRef = useRef(null) // Audio element for notifications

  const allUsers = getAllAvailableUsers()
  const conversations = getConversationList()

  // Load check-in status
  useEffect(() => {
    if (user) {
      const status = getTodayCheckInStatus(user.id)
      setCheckedIn(status.checkedIn)
      if (status.checkedIn && status.checkInTime) {
        setCheckInTime(status.checkInTime)
      } else {
        setCheckInTime(null)
        setElapsedTime(0)
      }
    }
  }, [user])

  // Update elapsed time when checked in
  useEffect(() => {
    if (checkedIn && checkInTime) {
      const timer = setInterval(() => {
        const now = new Date()
        const diff = now - checkInTime
        setElapsedTime(diff)
      }, 1000)

      return () => clearInterval(timer)
    } else {
      setElapsedTime(0)
    }
  }, [checkedIn, checkInTime])

  // Format elapsed time as HH:MM:SS or MM:SS
  const formatElapsedTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    
    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    } else {
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }
  }

  // Get time unit label (mins or Hrs)
  const getTimeUnit = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    return hours > 0 ? 'Hrs' : 'mins'
  }

  // Listen for check-in/out updates
  useEffect(() => {
    if (!user) return
    
    const handleCheckInOutUpdate = () => {
      try {
        if (user) {
          const status = getTodayCheckInStatus(user.id)
          setCheckedIn(status.checkedIn)
          if (status.checkedIn && status.checkInTime) {
            setCheckInTime(status.checkInTime)
          } else {
            setCheckInTime(null)
            setElapsedTime(0)
          }
        }
      } catch (error) {
        console.warn('Error updating check-in status in Chat:', error)
      }
    }
    
    try {
      window.addEventListener('checkInOutUpdate', handleCheckInOutUpdate)
    } catch (error) {
      console.warn('Error adding checkInOutUpdate listener:', error)
    }
    
    return () => {
      try {
        window.removeEventListener('checkInOutUpdate', handleCheckInOutUpdate)
      } catch (error) {
        // Ignore cleanup errors
      }
    }
  }, [user])

  // Update messages for all active conversations
  useEffect(() => {
    activeConversations.forEach(conversationId => {
      const convMessages = getConversationMessages(conversationId)
      setMessagesMap(prev => ({
        ...prev,
        [conversationId]: convMessages
      }))
      markAsRead(conversationId)
      
      // Update last seen message ID when conversation becomes active
      if (convMessages.length > 0) {
        const lastMessage = convMessages[convMessages.length - 1]
        setLastMessageIds(prev => ({
          ...prev,
          [conversationId]: lastMessage.id
        }))
      }
      
      setTimeout(() => {
        const ref = messagesEndRefs.current[conversationId]
        if (ref?.current) {
          ref.current.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    })
  }, [activeConversations, getConversationMessages, markAsRead])

  // Create notification sound
  const playNotificationSound = () => {
    try {
      // Create a simple notification sound using Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 800
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (error) {
      console.warn('Error playing notification sound:', error)
    }
  }

  // Show browser notification
  const showBrowserNotification = (title, body, conversationId) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        const notification = new Notification(title, {
          body: body,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: conversationId,
          requireInteraction: false
        })
        
        notification.onclick = () => {
          window.focus()
          notification.close()
          // Navigate to the conversation if needed
          if (conversationId) {
            handleSelectUser(conversations.find(c => c.id === conversationId)?.otherUser?.id)
          }
        }
        
        setTimeout(() => notification.close(), 5000)
      } catch (error) {
        console.warn('Error showing browser notification:', error)
      }
    }
  }

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(err => {
        console.warn('Error requesting notification permission:', err)
      })
    }
  }, [])

  // Poll for message updates in active conversations
  useEffect(() => {
    if (activeConversations.length > 0) {
      const interval = setInterval(() => {
        activeConversations.forEach(conversationId => {
          const convMessages = getConversationMessages(conversationId)
          const lastSeenId = lastMessageIds[conversationId]
          const lastMessage = convMessages[convMessages.length - 1]
          
          // Check if there's a new message
          if (lastMessage && lastMessage.id !== lastSeenId && lastMessage.senderId !== user?.id) {
            // New message received - play sound and show notification
            playNotificationSound()
            
            const conversationUser = getConversationUser(conversationId)
            const messageText = lastMessage.text || (lastMessage.attachments?.length > 0 ? 'Sent an attachment' : 'Sent a message')
            showBrowserNotification(
              conversationUser?.name || 'New Message',
              messageText,
              conversationId
            )
            
            // Dispatch notification event for header
            try {
              window.dispatchEvent(new CustomEvent('newMessageNotification', {
                detail: {
                  conversationId,
                  senderName: conversationUser?.name,
                  message: messageText,
                  conversationUser
                }
              }))
            } catch (error) {
              console.warn('Error dispatching notification event:', error)
            }
          }
          
          setMessagesMap(prev => ({
            ...prev,
            [conversationId]: convMessages
          }))
          
          // Update last seen message ID
          if (lastMessage) {
            setLastMessageIds(prev => ({
              ...prev,
              [conversationId]: lastMessage.id
            }))
          }
        })
      }, 1000)
      
      return () => clearInterval(interval)
    }
  }, [activeConversations, getConversationMessages, lastMessageIds, user, conversations])

  // Check for new messages in all conversations (not just active ones)
  useEffect(() => {
    const interval = setInterval(() => {
      const allConversations = getConversationList()
      allConversations.forEach(conversation => {
        const convMessages = getConversationMessages(conversation.id)
        const lastMessage = convMessages[convMessages.length - 1]
        const lastSeenId = lastMessageIds[conversation.id]
        
        // Only notify if conversation is not active and message is from someone else
        if (lastMessage && 
            lastMessage.id !== lastSeenId && 
            lastMessage.senderId !== user?.id &&
            !activeConversations.includes(conversation.id)) {
          
          playNotificationSound()
          
          const messageText = lastMessage.text || (lastMessage.attachments?.length > 0 ? 'Sent an attachment' : 'Sent a message')
          showBrowserNotification(
            conversation.otherUser?.name || 'New Message',
            messageText,
            conversation.id
          )
          
          // Dispatch notification event
          try {
            window.dispatchEvent(new CustomEvent('newMessageNotification', {
              detail: {
                conversationId: conversation.id,
                senderName: conversation.otherUser?.name,
                message: messageText,
                conversationUser: conversation.otherUser
              }
            }))
          } catch (error) {
            console.warn('Error dispatching notification event:', error)
          }
          
          // Update last seen
          setLastMessageIds(prev => ({
            ...prev,
            [conversation.id]: lastMessage.id
          }))
        }
      })
    }, 2000)
    
    return () => clearInterval(interval)
  }, [lastMessageIds, user, activeConversations, getConversationList, getConversationMessages])

  // Initialize last message IDs when conversations load
  useEffect(() => {
    const allConversations = getConversationList()
    const initialIds = {}
    allConversations.forEach(conversation => {
      const messages = getConversationMessages(conversation.id)
      if (messages.length > 0) {
        initialIds[conversation.id] = messages[messages.length - 1].id
      }
    })
    setLastMessageIds(initialIds)
  }, [getConversationList, getConversationMessages])

  const handleSelectUser = (userId) => {
    // Don't allow chatting with yourself
    if (userId === user?.id) {
      return
    }
    
    const conversationId = getOrCreateConversation(userId)
    if (conversationId) {
      // Add to active conversations if not already there and we have less than 2
      setActiveConversations(prev => {
        if (prev.includes(conversationId)) {
          return prev // Already active, just ensure it's selected
        }
        if (prev.length >= 2) {
          // Remove the oldest and add the new one
          return [prev[1], conversationId]
        }
        return [...prev, conversationId]
      })
      setSelectedConversation(conversationId) // For sidebar highlighting
      
      // Scroll to bottom and focus input after a short delay
      setTimeout(() => {
        const ref = messagesEndRefs.current[conversationId]
        if (ref?.current) {
          ref.current.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }

  // Check if a user has an active conversation
  const isUserActiveConversation = (userId) => {
    return activeConversations.some(convId => {
      const conv = conversations.find(c => c.id === convId)
      return conv?.otherUser?.id === userId
    })
  }

  const handleCloseConversation = (conversationId) => {
    setActiveConversations(prev => prev.filter(id => id !== conversationId))
    setMessageTexts(prev => {
      const newTexts = { ...prev }
      delete newTexts[conversationId]
      return newTexts
    })
    setMessagesMap(prev => {
      const newMessages = { ...prev }
      delete newMessages[conversationId]
      return newMessages
    })
    // If this was the selected conversation, clear selection
    if (selectedConversation === conversationId) {
      setSelectedConversation(null)
    }
  }

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }

  // Get file type
  const getFileType = (file) => {
    if (file.type.startsWith('image/')) return 'image'
    if (file.type.startsWith('video/')) return 'video'
    return 'file'
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  // Handle file selection
  const handleFileSelect = async (conversationId, e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    const newAttachments = []
    for (const file of files) {
      try {
        const base64 = await fileToBase64(file)
        newAttachments.push({
          id: Date.now() + Math.random(),
          name: file.name,
          type: getFileType(file),
          size: file.size,
          data: base64,
          mimeType: file.type
        })
      } catch (error) {
        console.error('Error reading file:', error)
      }
    }

    setAttachments(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), ...newAttachments]
    }))

    // Reset file input
    if (fileInputRefs.current[conversationId]) {
      fileInputRefs.current[conversationId].value = ''
    }
  }

  // Remove attachment
  const handleRemoveAttachment = (conversationId, attachmentId) => {
    setAttachments(prev => ({
      ...prev,
      [conversationId]: (prev[conversationId] || []).filter(att => att.id !== attachmentId)
    }))
  }

  const handleSendMessage = async (conversationId, e) => {
    e.preventDefault()
    const messageText = messageTexts[conversationId] || ''
    const conversationAttachments = attachments[conversationId] || []
    
    if (!conversationId || (!messageText.trim() && conversationAttachments.length === 0)) return

    // Send message with attachments
    const chatData = JSON.parse(localStorage.getItem('employee_chat_data') || '{"conversations": {}, "messages": {}}')
    if (!chatData.messages[conversationId]) {
      chatData.messages[conversationId] = []
    }

    const newMessage = {
      id: Date.now().toString(),
      senderId: user?.id,
      text: messageText.trim() || '',
      attachments: conversationAttachments,
      timestamp: new Date().toISOString(),
      read: false
    }

    chatData.messages[conversationId].push(newMessage)
    
    // Update conversation
    if (chatData.conversations[conversationId]) {
      const previewText = conversationAttachments.length > 0 
        ? `📎 ${conversationAttachments.length} file(s)`
        : messageText.trim()
      chatData.conversations[conversationId].lastMessage = previewText
      chatData.conversations[conversationId].lastMessageTime = newMessage.timestamp
    }

    localStorage.setItem('employee_chat_data', JSON.stringify(chatData))

    // Clear inputs
    setMessageTexts(prev => ({
      ...prev,
      [conversationId]: ''
    }))
    setAttachments(prev => ({
      ...prev,
      [conversationId]: []
    }))
    
    const convMessages = getConversationMessages(conversationId)
    setMessagesMap(prev => ({
      ...prev,
      [conversationId]: convMessages
    }))
    
    setTimeout(() => {
      const ref = messagesEndRefs.current[conversationId]
      if (ref?.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const handleCheckIn = () => {
    if (!user) return
    const result = checkIn(user.id, user.name)
    if (result.success) {
      setCheckedIn(true)
      setCheckInTime(result.checkInTime)
      try {
        window.dispatchEvent(new CustomEvent('checkInOutUpdate', { detail: { action: 'checkIn', userId: user.id } }))
      } catch (error) {
        console.warn('Error dispatching checkInOutUpdate event:', error)
      }
    } else {
      // If already checked in, just update the state
      const status = getTodayCheckInStatus(user.id)
      if (status.checkedIn) {
        setCheckedIn(true)
        if (status.checkInTime) {
          setCheckInTime(status.checkInTime)
        }
      }
    }
  }

  const handleCheckOut = () => {
    if (!user) return
    const result = checkOut(user.id)
    if (result.success) {
      setCheckedIn(false)
      setCheckInTime(null)
      setElapsedTime(0)
      try {
        window.dispatchEvent(new CustomEvent('checkInOutUpdate', { detail: { action: 'checkOut', userId: user.id } }))
      } catch (error) {
        console.warn('Error dispatching checkInOutUpdate event:', error)
      }
    } else {
      // If not checked in, just update the state
      const status = getTodayCheckInStatus(user.id)
      if (!status.checkedIn) {
        setCheckedIn(false)
        setCheckInTime(null)
        setElapsedTime(0)
      }
    }
  }

  const filteredUsers = allUsers.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getSelectedConversationUser = () => {
    if (!selectedConversation) return null
    const conv = conversations.find(c => c.id === selectedConversation)
    return conv?.otherUser
  }

  const selectedUser = getSelectedConversationUser()

  // Get user for a conversation ID
  const getConversationUser = (conversationId) => {
    const conv = conversations.find(c => c.id === conversationId)
    return conv?.otherUser
  }

  // Get all users with their status
  const getAllUsersWithStatus = () => {
    return getAllAvailableUsers().map(u => ({
      ...u,
      isOnline: isUserOnline(u.id)
    }))
  }

  const usersWithStatus = getAllUsersWithStatus()
  const atWorkUsers = usersWithStatus.filter(u => u.isOnline).concat(user ? [{...user, isOnline: true, isCurrentUser: true}] : [])
  const awayUsers = usersWithStatus.filter(u => !u.isOnline)

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Constant Header */}
      <ConstantHeader />
      
      {/* Cliq Header with Remote Work */}
      <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between px-6 shrink-0 mt-20">
        <div className="flex items-center justify-between w-full">
          {/* Left Side - Remote Work Toggle */}
          <div className="flex items-center gap-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">Remote Work</h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={checkedIn}
                onChange={(e) => {
                  // When toggle is ON (checked) → Check IN mode
                  // When toggle is OFF (unchecked) → Check OUT mode
                  if (e.target.checked) {
                    handleCheckIn()
                  } else {
                    handleCheckOut()
                  }
                }}
              />
              <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500 shadow-inner"></div>
            </label>
            {/* Laptop Icon with Time Popup */}
            <div 
              className="relative"
              ref={laptopIconRef}
              onMouseEnter={() => checkedIn && setShowTimePopup(true)}
              onMouseLeave={() => setShowTimePopup(false)}
            >
              <button
                className={`p-2.5 rounded-lg transition-all duration-200 ${
                  checkedIn 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 shadow-sm hover:shadow-md' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <ComputerDesktopIcon className="h-5 w-5" />
              </button>
              
              {/* Time Popup */}
              {showTimePopup && checkedIn && (
                <div className="absolute top-full left-0 mt-2 bg-gray-900 dark:bg-gray-950 text-white px-4 py-2.5 rounded-lg shadow-2xl z-50 whitespace-nowrap border border-gray-800 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center gap-2.5">
                    <span className="text-gray-300 font-medium">In</span>
                    <span className="text-green-400 font-semibold text-sm">
                      {formatElapsedTime(elapsedTime)} {getTimeUnit(elapsedTime)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Side - Check In/Out Buttons */}
          <div className="flex items-center gap-4">
            {checkedIn && (
              <button
                onClick={handleCheckOut}
                className="px-5 py-2.5 border-2 border-red-500 text-red-600 dark:border-red-400 dark:text-red-400 bg-transparent hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-sm active:scale-95"
              >
                Check Out
              </button>
            )}
            {!checkedIn && (
              <button
                onClick={handleCheckIn}
                className="px-5 py-2.5 border-2 border-green-500 text-green-600 dark:border-green-400 dark:text-green-400 bg-transparent hover:bg-green-50 dark:hover:bg-green-900/20 text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-sm active:scale-95"
              >
                Check In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden h-[calc(100vh-9rem)]">
        {/* Cliq Sidebar */}
        <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex shrink-0 shadow-sm">
          {/* Left Side - Navigation Tabs (Vertical) */}
          <div className="w-16 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex flex-col">
            <button
              onClick={() => setActiveTab('chats')}
              className={`w-full px-3 py-3.5 text-xs font-semibold transition-all duration-200 flex flex-col items-center justify-center ${
                activeTab === 'chats'
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-r-4 border-blue-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5 mb-1" />
              <span className="text-[10px]">CHATS</span>
            </button>
            <button
              onClick={() => setActiveTab('channels')}
              className={`w-full px-3 py-3.5 text-xs font-semibold transition-all duration-200 flex flex-col items-center justify-center ${
                activeTab === 'channels'
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-r-4 border-blue-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <HashtagIcon className="h-5 w-5 mb-1" />
              <span className="text-[10px]">CHANNELS</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`w-full px-3 py-3.5 text-xs font-semibold transition-all duration-200 flex flex-col items-center justify-center ${
                activeTab === 'history'
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-r-4 border-blue-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <ClockIcon className="h-5 w-5 mb-1" />
              <span className="text-[10px]">HISTORY</span>
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`w-full px-3 py-3.5 text-xs font-semibold transition-all duration-200 flex flex-col items-center justify-center ${
                activeTab === 'files'
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-r-4 border-blue-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <FolderIcon className="h-5 w-5 mb-1" />
              <span className="text-[10px]">FILES</span>
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`w-full px-3 py-3.5 text-xs font-semibold transition-all duration-200 flex flex-col items-center justify-center ${
                activeTab === 'calendar'
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-r-4 border-blue-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <CalendarDaysIcon className="h-5 w-5 mb-1" />
              <span className="text-[10px]">CALENDAR</span>
            </button>
            <div className="flex-1"></div>
            <button className="w-full px-3 py-3 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex flex-col items-center justify-center">
              <EllipsisVerticalIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Right Side - Conversations Section (Vertical) */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-800">
            {/* My Pins Section */}
            {activeTab === 'chats' && conversations.filter(c => c.pinned).length > 0 && (
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">My Pins</h3>
                <div className="space-y-1">
                  {conversations.filter(c => c.pinned).map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => handleSelectUser(conversation.otherUser?.id)}
                      className="w-full p-2.5 flex items-center gap-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 text-left hover:shadow-sm"
                    >
                      <div className="relative">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm ring-2 ring-white dark:ring-gray-800">
                          <span className="text-xs font-semibold text-white">
                            {conversation.otherUser?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-white dark:border-gray-800 ${
                          conversation.isOnline ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{conversation.otherUser?.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Conversations</h3>
            </div>

            {/* Conversation List */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {activeTab === 'chats' && (
                <>
                  {conversations.length > 0 ? (
                    conversations
                      .filter(conv => true)
                      .map((conversation) => (
                        <button
                          key={conversation.id}
                          onClick={() => handleSelectUser(conversation.otherUser?.id)}
                          className={`w-full p-3.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ${
                            activeConversations.includes(conversation.id) ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600' : 'hover:border-l-4 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm ring-2 ring-white dark:ring-gray-800">
                                <span className="text-sm font-semibold text-white">
                                  {conversation.otherUser?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                                </span>
                              </div>
                              <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${
                                conversation.isOnline ? 'bg-green-500' : 'bg-red-500'
                              }`}></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">
                                  {conversation.otherUser?.name}
                                </p>
                                {conversation.unreadCount > 0 && (
                                  <span className="flex-shrink-0 ml-2 px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs font-medium">
                                    {conversation.unreadCount}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {conversation.lastMessage || 'No messages yet'}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                      No conversations yet. Start chatting with your colleagues!
                    </div>
                  )}
                  
                  {/* Available Users */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Available Users</h4>
                    <div className="space-y-1">
                      {filteredUsers.slice(0, 5).map((userItem) => {
                        const isInConversation = conversations.some(c => c.otherUser?.id === userItem.id)
                        if (isInConversation) return null
                        
                        return (
                          <button
                            key={userItem.id}
                            onClick={() => handleSelectUser(userItem.id)}
                            className="w-full p-2 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            <div className="relative">
                              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                                <span className="text-xs font-medium text-white">
                                  {userItem.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                                </span>
                              </div>
                              <div className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-gray-800 ${
                                isUserOnline(userItem.id) ? 'bg-green-500' : 'bg-red-500'
                              }`}></div>
                            </div>
                            <div className="flex-1 text-left">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{userItem.name}</p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}
              
              {activeTab === 'channels' && (
                <div className="p-4">
                  <div className="mb-3">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Channels</h4>
                    <div className="space-y-1">
                      <button className="w-full p-2 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
                        <HashtagIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300"># StelliteworksDevTeam</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'history' && (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                  Chat history will appear here
                </div>
              )}
              
              {activeTab === 'files' && (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                  Shared files will appear here
                </div>
              )}
              
              {activeTab === 'calendar' && (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                  Calendar events will appear here
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Main Chat Area or Dashboard */}
        <div className="flex-1 flex overflow-hidden">
          {activeConversations.length > 0 ? (
            /* Chat Panels take full width */
            <div className="flex flex-1">
                {activeConversations.map((conversationId) => {
                  const conversationUser = getConversationUser(conversationId)
                  const conversationMessages = messagesMap[conversationId] || []
                  const conversationMessageText = messageTexts[conversationId] || ''
                  
                  return (
                    <div
                      key={conversationId}
                      className={`flex flex-col bg-white dark:bg-gray-800 shrink-0 ${activeConversations.length === 2 ? 'flex-1' : 'w-full'} ${activeConversations.length === 2 && activeConversations.indexOf(conversationId) === 0 ? 'border-r border-gray-200 dark:border-gray-700' : ''} ${activeConversations.length === 1 ? 'border-l-0' : ''}`}
                    >
                      {/* Chat Header */}
                      <div className="h-16 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between px-6 shrink-0">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleCloseConversation(conversationId)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mr-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                          <div className="relative">
                            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md ring-2 ring-white dark:ring-gray-800">
                              <span className="text-sm font-semibold text-white">
                                {conversationUser?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                              </span>
                            </div>
                            <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${
                              isUserOnline(conversationUser?.id) ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{conversationUser?.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {isUserOnline(conversationUser?.id) ? 'Online' : 'Offline'} • {conversationUser?.position}
                            </p>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <EllipsisVerticalIcon className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                        {conversationMessages.length > 0 ? (
                          conversationMessages.map((message) => {
                            const isOwn = message.senderId === user?.id
                            return (
                              <div
                                key={message.id}
                                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                              >
                                <div className={`max-w-xs lg:max-w-md rounded-2xl shadow-sm overflow-hidden ${
                                  isOwn
                                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
                                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md border border-gray-100 dark:border-gray-600'
                                }`}>
                                  {/* Attachments */}
                                  {message.attachments && message.attachments.length > 0 && (
                                    <div className="space-y-2 p-2">
                                      {message.attachments.map((attachment) => (
                                        <div key={attachment.id} className="rounded-lg overflow-hidden">
                                          {attachment.type === 'image' && (
                                            <img 
                                              src={attachment.data} 
                                              alt={attachment.name}
                                              className="max-w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                              onClick={() => window.open(attachment.data, '_blank')}
                                            />
                                          )}
                                          {attachment.type === 'video' && (
                                            <video 
                                              src={attachment.data} 
                                              controls
                                              className="max-w-full h-auto rounded-lg"
                                            >
                                              Your browser does not support the video tag.
                                            </video>
                                          )}
                                          {attachment.type === 'file' && (
                                            <a
                                              href={attachment.data}
                                              download={attachment.name}
                                              className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                            >
                                              <DocumentIcon className="h-8 w-8 text-blue-500 flex-shrink-0" />
                                              <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{attachment.name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(attachment.size)}</p>
                                              </div>
                                            </a>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  
                                  {/* Message Text */}
                                  {message.text && (
                                    <div className="px-4 py-2.5">
                                      <p className="text-sm leading-relaxed">{message.text}</p>
                                    </div>
                                  )}
                                  
                                  {/* Timestamp */}
                                  <div className={`px-4 pb-2.5 ${message.text ? 'pt-0' : 'pt-2.5'}`}>
                                    <p className={`text-xs ${
                                      isOwn ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                                    }`}>
                                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        ) : (
                          <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                            No messages yet. Start the conversation!
                          </div>
                        )}
                        <div ref={el => {
                          if (!messagesEndRefs.current[conversationId]) {
                            messagesEndRefs.current[conversationId] = { current: null }
                          }
                          messagesEndRefs.current[conversationId].current = el
                        }} />
                      </div>

                      {/* Message Input */}
                      <form onSubmit={(e) => handleSendMessage(conversationId, e)} className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shrink-0 shadow-sm">
                        {/* Attachments Preview */}
                        {attachments[conversationId] && attachments[conversationId].length > 0 && (
                          <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                            <div className="flex flex-wrap gap-2">
                              {attachments[conversationId].map((attachment) => (
                                <div key={attachment.id} className="relative group">
                                  {attachment.type === 'image' && (
                                    <div className="relative">
                                      <img 
                                        src={attachment.data} 
                                        alt={attachment.name}
                                        className="h-20 w-20 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveAttachment(conversationId, attachment.id)}
                                        className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                      >
                                        <XCircleIcon className="h-4 w-4" />
                                      </button>
                                    </div>
                                  )}
                                  {attachment.type === 'video' && (
                                    <div className="relative">
                                      <video 
                                        src={attachment.data}
                                        className="h-20 w-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveAttachment(conversationId, attachment.id)}
                                        className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                      >
                                        <XCircleIcon className="h-4 w-4" />
                                      </button>
                                    </div>
                                  )}
                                  {attachment.type === 'file' && (
                                    <div className="relative p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-2 min-w-[200px]">
                                      <DocumentIcon className="h-8 w-8 text-blue-500 flex-shrink-0" />
                                      <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium truncate">{attachment.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(attachment.size)}</p>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveAttachment(conversationId, attachment.id)}
                                        className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                                      >
                                        <XCircleIcon className="h-5 w-5" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="p-4">
                          <div className="flex items-center gap-3">
                            {/* File Attachment Button */}
                            <label className="cursor-pointer">
                              <input
                                type="file"
                                ref={el => fileInputRefs.current[conversationId] = el}
                                onChange={(e) => handleFileSelect(conversationId, e)}
                                multiple
                                accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.rar"
                                className="hidden"
                              />
                              <button
                                type="button"
                                className="p-2.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                onClick={() => fileInputRefs.current[conversationId]?.click()}
                              >
                                <PaperClipIcon className="h-5 w-5" />
                              </button>
                            </label>
                            
                            <input
                              type="text"
                              value={conversationMessageText}
                              onChange={(e) => setMessageTexts(prev => ({
                                ...prev,
                                [conversationId]: e.target.value
                              }))}
                              placeholder="Type a message..."
                              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                            />
                            <button
                              type="submit"
                              disabled={!conversationMessageText.trim() && (!attachments[conversationId] || attachments[conversationId].length === 0)}
                              className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 disabled:active:scale-100"
                            >
                              <PaperAirplaneIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )
                })}
            </div>
          ) : (
            /* Cliq Dashboard View - Full Screen */
            <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden">
              {/* Top Section - Enhanced */}
              <div className="bg-gradient-to-r from-white via-white to-gray-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-6 shadow-md">
                <div className="flex items-center justify-between mb-6">
                  {/* Company/Department Section - Enhanced */}
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                      <ChatBubbleLeftRightIcon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        Team Workspace
                      </h2>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-600 dark:text-gray-400 font-medium">
                            {atWorkUsers.length} online
                          </span>
                        </div>
                        <span className="text-gray-400 dark:text-gray-500">•</span>
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          {allUsers.length + 1} total members
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]">
                      <CalendarDaysIcon className="h-5 w-5" />
                      <span>Meetings</span>
                    </button>
                    <button className="p-2.5 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 shadow-sm">
                      <CogIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                </div>

                {/* Enhanced Search Bar */}
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search team members, conversations, or messages..."
                    value={departmentSearch}
                    onChange={(e) => setDepartmentSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 hover:border-blue-400 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none shadow-sm text-sm font-medium transition-colors"
                  />
                </div>
              </div>

              {/* Main Content - Three Columns */}
              <div className="flex-1 flex gap-5 p-6 overflow-hidden">
                {/* At Work Column */}
                <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 via-green-50/50 to-white dark:from-green-900/10 dark:via-green-900/5 dark:to-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">At Work</h3>
                      <span className="ml-auto px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
                        {atWorkUsers.length}
                      </span>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium">Active now</p>
                  </div>
                  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                    {atWorkUsers
                      .filter(u => !departmentSearch || u.name?.toLowerCase().includes(departmentSearch.toLowerCase()) || u.email?.toLowerCase().includes(departmentSearch.toLowerCase()))
                      .map((userItem) => {
                        const isActive = isUserActiveConversation(userItem.id)
                        const isCurrentUser = userItem.id === user?.id
                        
                        return (
                          <button
                            key={userItem.id}
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              if (!isCurrentUser) {
                                handleSelectUser(userItem.id)
                              }
                            }}
                            disabled={isCurrentUser}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left group ${
                              isCurrentUser 
                                ? 'cursor-default opacity-75' 
                                : 'cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-sm active:scale-[0.98]'
                            } ${
                              isActive ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 shadow-sm' : ''
                            }`}
                          >
                            <div className="relative flex-shrink-0">
                              <div className={`h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm ring-2 ring-white dark:ring-gray-800 transition-transform duration-200 ${
                                !isCurrentUser && 'group-hover:scale-110'
                              }`}>
                                <span className="text-sm font-semibold text-white">
                                  {userItem.name?.split(' ').filter(n => n.length > 0).map(n => n[0]).join('').toUpperCase() || 'U'}
                                </span>
                              </div>
                              <div className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800 transition-all duration-200 ${
                                userItem.isOnline ? 'bg-green-500 shadow-sm' : 'bg-gray-400'
                              }`}></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                  {userItem.isCurrentUser ? 'You' : userItem.name}
                                </p>
                                {isActive && (
                                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">● Active</span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{userItem.email}</p>
                            </div>
                            {!isCurrentUser && (
                              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                              </div>
                            )}
                          </button>
                        )
                      })}
                    {atWorkUsers.filter(u => !departmentSearch || u.name?.toLowerCase().includes(departmentSearch.toLowerCase()) || u.email?.toLowerCase().includes(departmentSearch.toLowerCase())).length === 0 && (
                      <div className="text-center text-gray-400 dark:text-gray-500 text-sm py-8">
                        No members found
                      </div>
                    )}
                  </div>
                </div>

                {/* Away Column */}
                <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 via-gray-50/50 to-white dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">Away</h3>
                      <span className="ml-auto px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">
                        {awayUsers.length}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Currently offline</p>
                  </div>
                  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                    {awayUsers
                      .filter(u => !departmentSearch || u.name?.toLowerCase().includes(departmentSearch.toLowerCase()) || u.email?.toLowerCase().includes(departmentSearch.toLowerCase()))
                      .map((userItem) => {
                        const isActive = isUserActiveConversation(userItem.id)
                        
                        return (
                          <button
                            key={userItem.id}
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleSelectUser(userItem.id)
                            }}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left group cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-sm active:scale-[0.98] ${
                              isActive ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 shadow-sm' : ''
                            }`}
                          >
                            <div className="relative flex-shrink-0">
                              <div className={`h-11 w-11 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center shadow-sm ring-2 ring-white dark:ring-gray-800 transition-transform duration-200 group-hover:scale-110`}>
                                <span className="text-sm font-semibold text-white">
                                  {userItem.name?.split(' ').filter(n => n.length > 0).map(n => n[0]).join('').toUpperCase() || 'U'}
                                </span>
                              </div>
                              <div className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-gray-400 dark:bg-gray-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{userItem.name}</p>
                                {isActive && (
                                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">● Active</span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{userItem.email}</p>
                            </div>
                            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                            </div>
                          </button>
                        )
                      })}
                    {awayUsers.filter(u => !departmentSearch || u.name?.toLowerCase().includes(departmentSearch.toLowerCase()) || u.email?.toLowerCase().includes(departmentSearch.toLowerCase())).length === 0 && (
                      <div className="text-center text-gray-400 dark:text-gray-500 text-sm py-8">
                        No members found
                      </div>
                    )}
                  </div>
                </div>

                {/* Meetings Column */}
                <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 via-blue-50/50 to-white dark:from-blue-900/10 dark:via-blue-900/5 dark:to-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <CalendarDaysIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">Meetings</h3>
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">No scheduled meetings</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center py-8 px-4">
                    <CalendarDaysIcon className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">No ongoing or scheduled meetings.</p>
                    <div className="flex items-center gap-2 text-sm">
                      <button className="text-blue-600 dark:text-blue-400 hover:underline">
                        My recent meetings
                      </button>
                      <span className="text-gray-400">•</span>
                      <button className="text-blue-600 dark:text-blue-400 hover:underline underline">
                        View history
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Chat
