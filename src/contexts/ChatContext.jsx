import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const ChatContext = createContext()

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}

const STORAGE_KEY = 'employee_chat_data'

// Mock users for demo
const getAllUsers = () => {
  const allUsers = [
    { id: 1, name: 'John Doe', email: 'john@company.com', role: 'employee', department: 'Engineering', position: 'Software Developer', avatar: null },
    { id: 2, name: 'Jane Smith', email: 'jane@company.com', role: 'manager', department: 'Engineering', position: 'Engineering Manager', avatar: null },
    { id: 3, name: 'Admin User', email: 'admin@company.com', role: 'admin', department: 'HR', position: 'HR Manager', avatar: null },
    { id: 4, name: 'Mike Johnson', email: 'mike@company.com', role: 'employee', department: 'Marketing', position: 'Marketing Specialist', avatar: null },
    { id: 5, name: 'Sarah Wilson', email: 'sarah@company.com', role: 'employee', department: 'HR', position: 'HR Specialist', avatar: null },
    { id: 6, name: 'David Brown', email: 'david@company.com', role: 'employee', department: 'Sales', position: 'Sales Representative', avatar: null },
    { id: 7, name: 'Lisa Davis', email: 'lisa@company.com', role: 'employee', department: 'Finance', position: 'Financial Analyst', avatar: null },
  ]
  return allUsers
}

// Get chat data
const getChatData = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : { conversations: {}, messages: {} }
}

// Save chat data
const saveChatData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const ChatProvider = ({ children }) => {
  const { user } = useAuth()
  const [conversations, setConversations] = useState({})
  const [messages, setMessages] = useState({})
  const [onlineUsers, setOnlineUsers] = useState(new Set())
  const [selectedConversation, setSelectedConversation] = useState(null)

  // Function to update online users based on check-in status
  const updateOnlineUsers = () => {
    const timeLogs = JSON.parse(localStorage.getItem('employee_time_logs') || '{}')
    const online = new Set()
    Object.keys(timeLogs).forEach(userId => {
      const userLogs = timeLogs[userId]
      if (userLogs.currentCheckIn) {
        const today = new Date().toDateString()
        if (userLogs.currentCheckIn.date === today) {
          online.add(parseInt(userId))
        }
      }
    })
    setOnlineUsers(online)
  }

  useEffect(() => {
    if (user) {
      // Load chat data
      const chatData = getChatData()
      setConversations(chatData.conversations || {})
      setMessages(chatData.messages || {})
      updateOnlineUsers()
    }
  }, [user])

  // Listen for check-in/out updates
  useEffect(() => {
    const handleCheckInOutUpdate = () => {
      try {
        updateOnlineUsers()
      } catch (error) {
        console.warn('Error updating online users:', error)
      }
    }
    
    // Also update periodically
    const interval = setInterval(() => {
      try {
        updateOnlineUsers()
      } catch (error) {
        console.warn('Error in online users interval:', error)
      }
    }, 3000)

    try {
      window.addEventListener('checkInOutUpdate', handleCheckInOutUpdate)
    } catch (error) {
      console.warn('Error adding checkInOutUpdate listener in ChatContext:', error)
    }

    return () => {
      try {
        window.removeEventListener('checkInOutUpdate', handleCheckInOutUpdate)
        clearInterval(interval)
      } catch (error) {
        // Ignore cleanup errors
      }
    }
  }, [])

  const getAllAvailableUsers = () => {
    return getAllUsers().filter(u => u.id !== user?.id)
  }

  const getConversationId = (userId1, userId2) => {
    return [userId1, userId2].sort().join('_')
  }

  const getOrCreateConversation = (otherUserId) => {
    if (!user) return null

    const conversationId = getConversationId(user.id, otherUserId)
    const chatData = getChatData()

    if (!chatData.conversations[conversationId]) {
      const otherUser = getAllUsers().find(u => u.id === otherUserId)
      if (!otherUser) return null

      chatData.conversations[conversationId] = {
        id: conversationId,
        participants: [user.id, otherUserId],
        lastMessage: null,
        lastMessageTime: null,
        unreadCount: 0
      }
      chatData.messages[conversationId] = []
      saveChatData(chatData)
      setConversations({ ...chatData.conversations })
      setMessages({ ...chatData.messages })
    }

    return conversationId
  }

  const sendMessage = (conversationId, text) => {
    if (!user || !text.trim()) return

    const chatData = getChatData()
    if (!chatData.messages[conversationId]) {
      chatData.messages[conversationId] = []
    }

    const newMessage = {
      id: Date.now().toString(),
      senderId: user.id,
      text: text.trim(),
      timestamp: new Date().toISOString(),
      read: false
    }

    chatData.messages[conversationId].push(newMessage)
    
    // Update conversation
    if (chatData.conversations[conversationId]) {
      chatData.conversations[conversationId].lastMessage = text.trim()
      chatData.conversations[conversationId].lastMessageTime = newMessage.timestamp
      if (selectedConversation !== conversationId) {
        chatData.conversations[conversationId].unreadCount = (chatData.conversations[conversationId].unreadCount || 0) + 1
      }
    }

    saveChatData(chatData)
    setMessages({ ...chatData.messages })
    setConversations({ ...chatData.conversations })

    return newMessage
  }

  const markAsRead = (conversationId) => {
    const chatData = getChatData()
    if (chatData.conversations[conversationId]) {
      chatData.conversations[conversationId].unreadCount = 0
      if (chatData.messages[conversationId]) {
        chatData.messages[conversationId].forEach(msg => {
          if (msg.senderId !== user?.id) {
            msg.read = true
          }
        })
      }
      saveChatData(chatData)
      setConversations({ ...chatData.conversations })
      setMessages({ ...chatData.messages })
    }
  }

  const getConversationMessages = (conversationId) => {
    const chatData = getChatData()
    return chatData.messages[conversationId] || []
  }

  const getConversationList = () => {
    const chatData = getChatData()
    const allUsers = getAllUsers()
    
    return Object.values(chatData.conversations || {})
      .map(conv => {
        const otherUserId = conv.participants.find(id => id !== user?.id)
        const otherUser = allUsers.find(u => u.id === otherUserId)
        return {
          ...conv,
          otherUser,
          isOnline: onlineUsers.has(otherUserId)
        }
      })
      .sort((a, b) => {
        const timeA = a.lastMessageTime ? new Date(a.lastMessageTime) : new Date(0)
        const timeB = b.lastMessageTime ? new Date(b.lastMessageTime) : new Date(0)
        return timeB - timeA
      })
  }

  const isUserOnline = (userId) => {
    return onlineUsers.has(userId)
  }

  const value = {
    conversations,
    messages,
    selectedConversation,
    setSelectedConversation,
    getAllAvailableUsers,
    getOrCreateConversation,
    sendMessage,
    markAsRead,
    getConversationMessages,
    getConversationList,
    isUserOnline,
    onlineUsers
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}

