import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const MailContext = createContext()

export const useMail = () => {
  const context = useContext(MailContext)
  if (!context) {
    throw new Error('useMail must be used within a MailProvider')
  }
  return context
}

const STORAGE_KEY = 'employee_mail_data'

// Mock emails for demo
const getMockEmails = () => {
  return [
    {
      id: 1,
      from: { email: 'mike.a@zohocreator.com', name: 'Mike Anderson' },
      subject: "What's new with Creator this week",
      body: "Hi there,\n\nWe've made some exciting updates to Zoho Creator. Check them out!\n\nBest regards,\nMike",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      folder: 'inbox',
      read: false,
      starred: false,
      attachments: []
    },
    {
      id: 2,
      from: { email: 'jira@stelliteworks-stalwarts.atlassian.net', name: 'Jira' },
      subject: '[JIRA] Madhukiran assigned SL-35 to you',
      body: "Stellite Works assigned this work item to you\n\nSkill-Ladder / SL-35\n\nView in Jira",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      folder: 'inbox',
      read: false,
      starred: false,
      attachments: []
    },
    {
      id: 3,
      from: { email: 'mike.a@zohocreator.com', name: 'Mike Anderson' },
      subject: 'Join us for the Deluge workshop',
      body: "Hello,\n\nWe're hosting a Deluge workshop next week. Would you like to join?\n\nBest,\nMike",
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      folder: 'inbox',
      read: true,
      starred: false,
      attachments: []
    },
    {
      id: 4,
      from: { email: 'oliver.a@zohocreator.com', name: 'Oliver Adams' },
      subject: 'Your Zoho Creator trial is ending soon',
      body: "Hi,\n\nYour trial period is ending in 3 days. Would you like to upgrade?\n\nThanks,\nOliver",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      folder: 'inbox',
      read: true,
      starred: false,
      attachments: []
    },
    {
      id: 5,
      from: { email: 'notifications@zoho.com', name: 'Zoho Notifications' },
      subject: 'System maintenance scheduled',
      body: "Dear User,\n\nSystem maintenance is scheduled for this weekend.\n\nThank you for your understanding.",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      folder: 'notification',
      read: false,
      starred: false,
      attachments: []
    }
  ]
}

// Get mail data
const getMailData = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : { emails: getMockEmails(), folders: {} }
}

// Save mail data
const saveMailData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const MailProvider = ({ children }) => {
  const { user } = useAuth()
  const [emails, setEmails] = useState([])
  const [selectedFolder, setSelectedFolder] = useState('inbox')
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (user) {
      const mailData = getMailData()
      setEmails(mailData.emails || getMockEmails())
    }
  }, [user])

  const getEmailsByFolder = (folder) => {
    return emails.filter(email => email.folder === folder)
  }

  const getUnreadCount = (folder) => {
    return getEmailsByFolder(folder).filter(email => !email.read).length
  }

  const markAsRead = (emailId) => {
    const updatedEmails = emails.map(email =>
      email.id === emailId ? { ...email, read: true } : email
    )
    setEmails(updatedEmails)
    saveMailData({ emails: updatedEmails, folders: {} })
  }

  const markAsUnread = (emailId) => {
    const updatedEmails = emails.map(email =>
      email.id === emailId ? { ...email, read: false } : email
    )
    setEmails(updatedEmails)
    saveMailData({ emails: updatedEmails, folders: {} })
  }

  const deleteEmail = (emailId) => {
    const updatedEmails = emails.map(email =>
      email.id === emailId ? { ...email, folder: 'trash' } : email
    )
    setEmails(updatedEmails)
    saveMailData({ emails: updatedEmails, folders: {} })
    if (selectedEmail?.id === emailId) {
      setSelectedEmail(null)
    }
  }

  const starEmail = (emailId) => {
    const updatedEmails = emails.map(email =>
      email.id === emailId ? { ...email, starred: !email.starred } : email
    )
    setEmails(updatedEmails)
    saveMailData({ emails: updatedEmails, folders: {} })
  }

  const moveToFolder = (emailId, folder) => {
    const updatedEmails = emails.map(email =>
      email.id === emailId ? { ...email, folder } : email
    )
    setEmails(updatedEmails)
    saveMailData({ emails: updatedEmails, folders: {} })
  }

  const composeEmail = (email) => {
    const newEmail = {
      id: Date.now(),
      from: { email: user?.email || 'user@company.com', name: user?.name || 'User' },
      to: email.to || [],
      cc: email.cc || [],
      subject: email.subject || '',
      body: email.body || '',
      date: new Date().toISOString(),
      folder: 'sent',
      read: true,
      starred: false,
      attachments: email.attachments || []
    }
    const updatedEmails = [newEmail, ...emails]
    setEmails(updatedEmails)
    saveMailData({ emails: updatedEmails, folders: {} })
    return newEmail
  }

  const getFilteredEmails = () => {
    let filtered = getEmailsByFolder(selectedFolder)
    
    if (searchTerm) {
      filtered = filtered.filter(email =>
        email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.from.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.from.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.body.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  const groupEmailsByDate = (emailList) => {
    const groups = {
      'Today': [],
      'Yesterday': [],
      'Last 7 days': [],
      'Earlier in October': [],
      'Older': []
    }

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

    emailList.forEach(email => {
      const emailDate = new Date(email.date)
      const emailDay = new Date(emailDate.getFullYear(), emailDate.getMonth(), emailDate.getDate())

      if (emailDay.getTime() === today.getTime()) {
        groups['Today'].push(email)
      } else if (emailDay.getTime() === yesterday.getTime()) {
        groups['Yesterday'].push(email)
      } else if (emailDate >= lastWeek) {
        groups['Last 7 days'].push(email)
      } else if (emailDate.getMonth() === 9) { // October (0-indexed)
        groups['Earlier in October'].push(email)
      } else {
        groups['Older'].push(email)
      }
    })

    return Object.entries(groups).filter(([_, emails]) => emails.length > 0)
  }

  const value = {
    emails,
    selectedFolder,
    setSelectedFolder,
    selectedEmail,
    setSelectedEmail,
    searchTerm,
    setSearchTerm,
    getEmailsByFolder,
    getUnreadCount,
    markAsRead,
    markAsUnread,
    deleteEmail,
    starEmail,
    moveToFolder,
    composeEmail,
    getFilteredEmails,
    groupEmailsByDate
  }

  return (
    <MailContext.Provider value={value}>
      {children}
    </MailContext.Provider>
  )
}

