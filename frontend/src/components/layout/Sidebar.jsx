import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { 
  FiHome, 
  FiFileText, 
  FiUsers, 
  FiSettings, 
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronRight,
  FiBarChart2,
  FiAlertCircle,
  FiUserPlus,
  FiBell,
  FiHelpCircle,
  FiMessageSquare,
  FiCheckCircle,
  FiClock
} from 'react-icons/fi'
import '../../styles/global.css'

const Sidebar = ({ role = 'user' }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navigate = useNavigate()
  
  const userMenu = [
    {
      title: 'Dashboard',
      path: '/user/dashboard',
      icon: <FiHome />,
    },
    {
      title: 'New Complaint',
      path: '/user/new-complaint',
      icon: <FiFileText />,
    },
    {
      title: 'My Complaints',
      path: '/user/complaints',
      icon: <FiAlertCircle />,
    },
    {
      title: 'Become Staff',
      path: '/user/employee-request',
      icon: <FiUserPlus />,
    },
    {
      title: 'Request Status',
      path: '/user/request-status',
      icon: <FiHelpCircle />,
    },
  ]
  
  const staffMenu = [
    {
      title: 'Dashboard',
      path: '/staff/dashboard',
      icon: <FiHome />,
    },
    {
      title: 'Assigned Complaints',
      path: '/staff/assigned-complaints',
      icon: <FiAlertCircle />,
    },
    {
      title: 'Profile',
      path: '/staff/profile',
      icon: <FiUsers />,
    },
  ]
  
  const adminMenu = [
    {
      title: 'Dashboard',
      path: '/admin/dashboard',
      icon: <FiHome />,
    },
    {
      title: 'Manage Users',
      path: '/admin/manage-users',
      icon: <FiUsers />,
    },
    {
      title: 'Manage Staff',
      path: '/admin/manage-staff',
      icon: <FiUserPlus />,
    },
    {
      title: 'Employee Requests',
      path: '/admin/employee-requests',
      icon: <FiHelpCircle />,
    },
    {
      title: 'Assign Complaints',
      path: '/admin/assign-complaints',
      icon: <FiAlertCircle />,
    },
    {
      title: 'Escalations',
      path: '/admin/escalations',
      icon: <FiBell />,
    },
    {
      title: 'Reports',
      path: '/admin/reports',
      icon: <FiBarChart2 />,
    },
  ]
  
  const getMenu = () => {
    switch (role) {
      case 'admin': return adminMenu
      case 'staff': return staffMenu
      default: return userMenu
    }
  }
  
  const menu = getMenu()
  
  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/login')
  }
  
  const getStats = () => {
    switch (role) {
      case 'user':
        return [
          { label: 'Open', value: '3', color: 'bg-yellow-500' },
          { label: 'Resolved', value: '12', color: 'bg-green-500' },
          { label: 'Escalated', value: '1', color: 'bg-red-500' },
        ]
      case 'staff':
        return [
          { label: 'Assigned', value: '5', color: 'bg-blue-500' },
          { label: 'Completed', value: '23', color: 'bg-green-500' },
          { label: 'Pending', value: '2', color: 'bg-yellow-500' },
        ]
      case 'admin':
        return [
          { label: 'Total', value: '156', color: 'bg-purple-500' },
          { label: 'Pending', value: '18', color: 'bg-yellow-500' },
          { label: 'Escalated', value: '3', color: 'bg-red-500' },
        ]
      default:
        return []
    }
  }
  
  const stats = getStats()
  
  return (
    <aside className={`h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-emerald-900 text-white transition-all duration-300 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-400 to-emerald-400 flex items-center justify-center">
                <FiMessageSquare className="text-white" />
              </div>
              <h1 className="text-xl font-bold">Grievance Portal</h1>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-400 to-emerald-400 flex items-center justify-center mx-auto">
              <FiMessageSquare className="text-white" />
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <FiMenu size={20} /> : <FiX size={20} />}
          </button>
        </div>
      </div>
      
      {/* User Info */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold shadow-lg">
            {role.charAt(0).toUpperCase()}
          </div>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <h3 className="font-semibold truncate">John Doe</h3>
              <p className="text-xs text-white/70 truncate capitalize">{role}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menu.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 group ${
                    isActive
                      ? 'bg-white/20 shadow-lg transform translate-x-1'
                      : 'hover:bg-white/10 hover:translate-x-1'
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.title}</span>
                    <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        
        {/* Quick Stats */}
        {!isCollapsed && (
          <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h4 className="text-sm font-semibold mb-3">Quick Stats</h4>
            <div className="space-y-3">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-white/80">{stat.label}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
                    <span className="font-bold">{stat.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 w-full hover:bg-white/10 group ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <FiLogOut className="text-lg" />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">Logout</span>
              <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar