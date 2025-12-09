import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ChatProvider } from './contexts/ChatContext'
import { MailProvider } from './contexts/MailContext'
import Layout from './components/Layout'
import ProtectedLayout from './components/ProtectedLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import LeaveManagement from './pages/LeaveManagement'
import EmployeeDirectory from './pages/EmployeeDirectory'
import Announcements from './pages/Announcements'
import TimeTracking from './pages/TimeTracking'
import Reports from './pages/Reports'
import Documents from './pages/Documents'
import AdminDashboard from './pages/AdminDashboard'
import UserManagement from './pages/UserManagement'
import SystemSettings from './pages/SystemSettings'
import Performance from './pages/Performance'
import Rewards from './pages/Rewards'
import EmployeeRewards from './pages/EmployeeRewards'
import EmployeeTimeTracking from './pages/EmployeeTimeTracking'
import Chat from './pages/Chat'
import Mail from './pages/Mail'
import ProtectedRoute from './components/ProtectedRoute'
import AdminOnlyRoute from './components/AdminOnlyRoute'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <MailProvider>
            <Router>
          <div className="min-h-screen min-h-[100dvh] w-full flex flex-col overflow-x-hidden">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
              
              {/* Standalone routes - separate layout without main sidebar (must be before /app route) */}
              <Route path="/app/chat" element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } />
              <Route path="/app/mail" element={
                <ProtectedRoute>
                  <Mail />
                </ProtectedRoute>
              } />
              
              {/* All app routes with Layout */}
              <Route path="/app" element={<Layout />}>
                {/* Public routes - no login required */}
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="reports" element={<Reports />} />
                <Route path="documents" element={<Documents />} />
                
                {/* Time Tracking - Admin only (for their own detailed tracking) */}
                <Route path="time-tracking" element={
                  <ProtectedRoute>
                    <AdminOnlyRoute>
                      <TimeTracking />
                    </AdminOnlyRoute>
                  </ProtectedRoute>
                } />
                
                {/* Protected routes - login required */}
                <Route path="dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="leave" element={
                  <ProtectedRoute>
                    <LeaveManagement />
                  </ProtectedRoute>
                } />
                <Route path="directory" element={
                  <ProtectedRoute>
                    <EmployeeDirectory />
                  </ProtectedRoute>
                } />
                <Route path="announcements" element={
                  <ProtectedRoute>
                    <Announcements />
                  </ProtectedRoute>
                } />
                <Route path="rewards" element={
                  <ProtectedRoute>
                    <EmployeeRewards />
                  </ProtectedRoute>
                } />
                
                {/* Admin routes - admin role required */}
                <Route path="admin" element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="admin/users" element={
                  <ProtectedRoute>
                    <UserManagement />
                  </ProtectedRoute>
                } />
                <Route path="admin/settings" element={
                  <ProtectedRoute>
                    <SystemSettings />
                  </ProtectedRoute>
                } />
                <Route path="admin/performance" element={
                  <ProtectedRoute>
                    <Performance />
                  </ProtectedRoute>
                } />
                <Route path="admin/rewards" element={
                  <ProtectedRoute>
                    <Rewards />
                  </ProtectedRoute>
                } />
                <Route path="admin/time-tracking" element={
                  <ProtectedRoute>
                    <EmployeeTimeTracking />
                  </ProtectedRoute>
                } />
                {/* Default redirect for /app */}
                <Route index element={<Navigate to="reports" replace />} />
                {/* Catch-all for /app routes */}
                <Route path="*" element={<Navigate to="reports" replace />} />
              </Route>
              {/* Catch-all for root level */}
              <Route path="*" element={<Navigate to="/app/reports" replace />} />
            </Routes>
          </div>
        </Router>
          </MailProvider>
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App