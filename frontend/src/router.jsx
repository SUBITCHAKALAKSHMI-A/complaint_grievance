import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect, useSyncExternalStore } from 'react'
import ProtectedRoute from './components/layout/ProtectedRoute.jsx'

// Auth Pages
import Login from './pages/auth/Login.jsx'
import Signup from './pages/auth/Signup.jsx'
import RoleSelect from './pages/auth/RoleSelect.jsx'

// User Pages
import UserDashboard from './pages/user/UserDashboard.jsx'
import NewComplaint from './pages/user/NewComplaint.jsx'
import ComplaintList from './pages/user/ComplaintList.jsx'
import ComplaintTimeline from './pages/user/ComplaintTimeline.jsx'
import EmployeeRequest from './pages/user/EmployeeRequest.jsx'
import RequestStatus from './pages/user/RequestStatus.jsx'

// Staff Pages
import StaffDashboard from './pages/staff/StaffDashboard.jsx'
import AssignedComplaints from './pages/staff/AssignedComplaints.jsx'
import UpdateComplaint from './pages/staff/UpdateComplaint.jsx'
import StaffProfile from './pages/staff/StaffProfile.jsx'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import ManageUsers from './pages/admin/ManageUsers.jsx'
import ManageStaff from './pages/admin/ManageStaff.jsx'
import EmployeeRequests from './pages/admin/EmployeeRequests.jsx'
import AssignComplaints from './pages/admin/AssignComplaints.jsx'
import Escalations from './pages/admin/Escalations.jsx'
import Reports from './pages/admin/Reports.jsx'

// Custom hook for localStorage subscription (React 19 pattern)
function useUser() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })

  // Sync with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('user')
      setUser(storedUser ? JSON.parse(storedUser) : null)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return { user, login, logout }
}

function AppRouter() {
  const { user, login } = useUser()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Mark as initialized after first render
    setIsInitialized(true)
  }, [])

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#84FFC9] via-[#AAB2FF] to-[#F0A6FF]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#42047E] mx-auto"></div>
          <p className="mt-4 text-[#42047E] font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login onLogin={login} />} />
      <Route path="/signup" element={<Signup onSignup={login} />} />
      <Route path="/select-role" element={<RoleSelect onSelect={login} />} />

      {/* User Routes */}
      <Route path="/user/dashboard" element={
        <ProtectedRoute allowedRoles={['user']} user={user}>
          <UserDashboard />
        </ProtectedRoute>
      } />
      <Route path="/user/new-complaint" element={
        <ProtectedRoute allowedRoles={['user']} user={user}>
          <NewComplaint />
        </ProtectedRoute>
      } />
      <Route path="/user/complaints" element={
        <ProtectedRoute allowedRoles={['user']} user={user}>
          <ComplaintList />
        </ProtectedRoute>
      } />
      <Route path="/user/complaint/:id" element={
        <ProtectedRoute allowedRoles={['user']} user={user}>
          <ComplaintTimeline />
        </ProtectedRoute>
      } />
      <Route path="/user/employee-request" element={
        <ProtectedRoute allowedRoles={['user']} user={user}>
          <EmployeeRequest />
        </ProtectedRoute>
      } />
      <Route path="/user/request-status" element={
        <ProtectedRoute allowedRoles={['user']} user={user}>
          <RequestStatus />
        </ProtectedRoute>
      } />

      {/* Staff Routes */}
      <Route path="/staff/dashboard" element={
        <ProtectedRoute allowedRoles={['staff']} user={user}>
          <StaffDashboard />
        </ProtectedRoute>
      } />
      <Route path="/staff/assigned-complaints" element={
        <ProtectedRoute allowedRoles={['staff']} user={user}>
          <AssignedComplaints />
        </ProtectedRoute>
      } />
      <Route path="/staff/update-complaint/:id" element={
        <ProtectedRoute allowedRoles={['staff']} user={user}>
          <UpdateComplaint />
        </ProtectedRoute>
      } />
      <Route path="/staff/profile" element={
        <ProtectedRoute allowedRoles={['staff']} user={user}>
          <StaffProfile />
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['admin']} user={user}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/manage-users" element={
        <ProtectedRoute allowedRoles={['admin']} user={user}>
          <ManageUsers />
        </ProtectedRoute>
      } />
      <Route path="/admin/manage-staff" element={
        <ProtectedRoute allowedRoles={['admin']} user={user}>
          <ManageStaff />
        </ProtectedRoute>
      } />
      <Route path="/admin/employee-requests" element={
        <ProtectedRoute allowedRoles={['admin']} user={user}>
          <EmployeeRequests />
        </ProtectedRoute>
      } />
      <Route path="/admin/assign-complaints" element={
        <ProtectedRoute allowedRoles={['admin']} user={user}>
          <AssignComplaints />
        </ProtectedRoute>
      } />
      <Route path="/admin/escalations" element={
        <ProtectedRoute allowedRoles={['admin']} user={user}>
          <Escalations />
        </ProtectedRoute>
      } />
      <Route path="/admin/reports" element={
        <ProtectedRoute allowedRoles={['admin']} user={user}>
          <Reports />
        </ProtectedRoute>
      } />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default AppRouter