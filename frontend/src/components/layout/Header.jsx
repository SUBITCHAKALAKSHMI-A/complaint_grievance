import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FiBell, 
  FiSearch, 
  FiUser, 
  FiSettings,
  FiChevronDown,
  FiMessageSquare,
  FiHelpCircle
} from 'react-icons/fi'
import '../../styles/global.css'

const Header = ({ title, role = 'user' }) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()
  
  const notifications = [
    { id: 1, text: 'New complaint assigned to you', time: '5 min ago', unread: true },
    { id: 2, text: 'Complaint #1234 has been resolved', time: '1 hour ago', unread: true },
    { id: 3, text: 'Your employee request is under review', time: '2 hours ago', unread: false },
    { id: 4, text: 'System maintenance scheduled', time: '1 day ago', unread: false },
  ]
  
  const unreadCount = notifications.filter(n => n.unread).length
  
  const userMenu = [
    { label: 'Profile', path: `/${role}/profile`, icon: <FiUser /> },
    { label: 'Settings', path: `/${role}/settings`, icon: <FiSettings /> },
    { label: 'Help & Support', path: '/help', icon: <FiHelpCircle /> },
  ]
  
  const handleNotificationClick = (notification) => {
    // Mark as read and navigate based on notification type
    console.log('Notification clicked:', notification)
    setShowNotifications(false)
  }
  
  const handleUserMenuClick = (item) => {
    navigate(item.path)
    setShowUserMenu(false)
  }
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-emerald-400 flex items-center justify-center">
                <FiMessageSquare className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-900 to-emerald-400 bg-clip-text text-transparent">
                  {title || 'Dashboard'}
                </h1>
                <p className="text-sm text-gray-500 capitalize">Welcome back, {role}</p>
              </div>
            </div>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
                placeholder="Search complaints, users..."
              />
            </div>
            
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Notifications"
              >
                <FiBell className="text-xl text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowNotifications(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-40 animate-in fade-in-0 zoom-in-95">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                      <p className="text-sm text-gray-500">{unreadCount} unread</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                            notification.unread ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                            }`}></div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-800">{notification.text}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200">
                      <button
                        onClick={() => navigate('/notifications')}
                        className="w-full py-2 text-center text-sm text-purple-600 hover:text-purple-700 font-medium"
                      >
                        View all notifications
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="User menu"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold">
                  {role.charAt(0).toUpperCase()}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500 capitalize">{role}</p>
                </div>
                <FiChevronDown className="hidden md:block text-gray-400" />
              </button>
              
              {/* User Menu Dropdown */}
              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowUserMenu(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-40 animate-in fade-in-0 zoom-in-95">
                    <div className="p-4 border-b border-gray-200">
                      <p className="font-medium text-gray-800">John Doe</p>
                      <p className="text-sm text-gray-500 capitalize">{role}</p>
                    </div>
                    <div className="py-2">
                      {userMenu.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleUserMenuClick(item)}
                          className="flex items-center gap-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200">
                      <button
                        onClick={() => {
                          localStorage.clear()
                          navigate('/login')
                        }}
                        className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-emerald-400 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header