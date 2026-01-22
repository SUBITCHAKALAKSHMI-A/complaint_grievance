import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FiUsers, 
  FiFileText, 
  FiCheckCircle, 
  FiAlertCircle,
  FiClock,
  FiTrendingUp,
  FiBarChart2,
  FiSettings,
  FiBell,
  FiMessageSquare,
  FiActivity,
  FiShield
} from 'react-icons/fi'
import Button from '../../components/common/Button'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import '../../styles/dashboard.css'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStaff: 0,
    totalComplaints: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0,
    escalatedComplaints: 0,
    pendingEmployeeRequests: 0,
  })
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalUsers: 145,
        totalStaff: 28,
        totalComplaints: 342,
        pendingComplaints: 45,
        resolvedComplaints: 284,
        escalatedComplaints: 13,
        pendingEmployeeRequests: 8,
      })
      
      setRecentActivity([
        {
          id: 1,
          type: 'new_complaint',
          title: 'New Complaint Submitted',
          description: 'Network connectivity issues reported by Alice Johnson',
          time: '10 minutes ago',
          icon: <FiFileText className="w-5 h-5 text-blue-600" />,
          color: 'bg-blue-100',
        },
        {
          id: 2,
          type: 'employee_request',
          title: 'New Employee Request',
          description: 'Bob Smith applied for staff position',
          time: '25 minutes ago',
          icon: <FiUsers className="w-5 h-5 text-purple-600" />,
          color: 'bg-purple-100',
        },
        {
          id: 3,
          type: 'complaint_resolved',
          title: 'Complaint Resolved',
          description: 'Billing discrepancy resolved by John Doe',
          time: '1 hour ago',
          icon: <FiCheckCircle className="w-5 h-5 text-green-600" />,
          color: 'bg-green-100',
        },
        {
          id: 4,
          type: 'escalation',
          title: 'Complaint Escalated',
          description: 'Service delay complaint escalated to level 2',
          time: '2 hours ago',
          icon: <FiAlertCircle className="w-5 h-5 text-red-600" />,
          color: 'bg-red-100',
        },
        {
          id: 5,
          type: 'staff_assigned',
          title: 'Staff Assigned',
          description: 'New complaint assigned to Sarah Wilson',
          time: '3 hours ago',
          icon: <FiUsers className="w-5 h-5 text-orange-600" />,
          color: 'bg-orange-100',
        },
      ])
    }, 1000)
  }, [])

  const quickActions = [
    {
      title: 'Manage Users',
      description: 'View and manage all users',
      icon: <FiUsers />,
      path: '/admin/manage-users',
      color: 'bg-gradient-to-r from-blue-600 to-cyan-600',
    },
    {
      title: 'Manage Staff',
      description: 'View and manage staff members',
      icon: <FiShield />,
      path: '/admin/manage-staff',
      color: 'bg-gradient-to-r from-purple-600 to-pink-600',
    },
    {
      title: 'Employee Requests',
      description: 'Review qualification requests',
      icon: <FiUsers />,
      path: '/admin/employee-requests',
      color: 'bg-gradient-to-r from-emerald-600 to-green-600',
    },
    {
      title: 'Assign Complaints',
      description: 'Assign complaints to staff',
      icon: <FiFileText />,
      path: '/admin/assign-complaints',
      color: 'bg-gradient-to-r from-orange-600 to-red-600',
    },
    {
      title: 'Escalations',
      description: 'Manage escalated complaints',
      icon: <FiAlertCircle />,
      path: '/admin/escalations',
      color: 'bg-gradient-to-r from-red-600 to-pink-600',
    },
    {
      title: 'Reports',
      description: 'View analytics & reports',
      icon: <FiBarChart2 />,
      path: '/admin/reports',
      color: 'bg-gradient-to-r from-indigo-600 to-purple-600',
    },
  ]

  const complaintStats = [
    { category: 'Technical', count: 124, percentage: 36, color: 'bg-blue-500' },
    { category: 'Service', count: 89, percentage: 26, color: 'bg-purple-500' },
    { category: 'Finance', count: 67, percentage: 20, color: 'bg-green-500' },
    { category: 'HR', count: 42, percentage: 12, color: 'bg-yellow-500' },
    { category: 'Other', count: 20, percentage: 6, color: 'bg-gray-500' },
  ]

  const systemMetrics = [
    { label: 'Avg. Response Time', value: '2.8 hours', change: '-0.4h', trend: 'up' },
    { label: 'Resolution Rate', value: '83%', change: '+5%', trend: 'up' },
    { label: 'User Satisfaction', value: '4.6/5', change: '+0.3', trend: 'up' },
    { label: 'Escalation Rate', value: '3.8%', change: '-1.2%', trend: 'down' },
  ]

  return (
    <div className="dashboard-container">
      <Sidebar role="admin" />
      
      <div className="dashboard-content">
        <Header title="Admin Dashboard" role="admin" />
        
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="dashboard-card bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome back, Administrator!
                </h1>
                <p className="text-gray-600 mb-4">
                  System Overview • Last updated: Today, 10:30 AM
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-gray-700">All Systems Operational</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiActivity className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {stats.totalComplaints} total complaints managed
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {stats.resolvedComplaints} resolved ({Math.round((stats.resolvedComplaints / (stats.totalComplaints || 1)) * 100)}%)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                    A
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="dashboard-grid mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="stat-card-title">Total Users</p>
                <h3 className="stat-card-value">{stats.totalUsers}</h3>
                <p className="stat-card-change">
                  <FiTrendingUp className="text-green-300" />
                  <span className="text-green-300">+12 this week</span>
                </p>
              </div>
              <div className="stat-card-icon">
                <FiUsers />
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="stat-card-title">Staff Members</p>
                <h3 className="stat-card-value">{stats.totalStaff}</h3>
                <p className="stat-card-change">
                  <FiUsers className="text-blue-300" />
                  <span className="text-blue-300">Active: {stats.totalStaff}</span>
                </p>
              </div>
              <div className="stat-card-icon">
                <FiShield />
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="stat-card-title">Total Complaints</p>
                <h3 className="stat-card-value">{stats.totalComplaints}</h3>
                <p className="stat-card-change">
                  <FiFileText className="text-purple-300" />
                  <span className="text-purple-300">+24 today</span>
                </p>
              </div>
              <div className="stat-card-icon">
                <FiFileText />
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="stat-card-title">Pending Requests</p>
                <h3 className="stat-card-value">{stats.pendingEmployeeRequests}</h3>
                <p className="stat-card-change">
                  <FiClock className="text-yellow-300" />
                  <span className="text-yellow-300">Requires review</span>
                </p>
              </div>
              <div className="stat-card-icon">
                <FiBell />
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="dashboard-card mb-8">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Quick Actions</h2>
          </div>
          <div className="quick-actions">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="action-btn"
              >
                <div className={`action-icon ${action.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                  {action.icon}
                </div>
                <h3 className="action-text font-semibold">{action.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Complaint Statistics & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Complaint Statistics */}
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h2 className="dashboard-card-title">Complaint Statistics</h2>
              <Link to="/admin/reports">
                <Button variant="outline" size="small">
                  View Details
                </Button>
              </Link>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {complaintStats.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="font-medium text-gray-700">{item.category}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-500">{item.count} complaints</span>
                        <span className="font-semibold">{item.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{stats.pendingComplaints}</div>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">{stats.resolvedComplaints}</div>
                  <p className="text-sm text-gray-600">Resolved</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">{stats.escalatedComplaints}</div>
                  <p className="text-sm text-gray-600">Escalated</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{stats.pendingEmployeeRequests}</div>
                  <p className="text-sm text-gray-600">Emp. Requests</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h2 className="dashboard-card-title">Recent Activity</h2>
              <Link to="/admin/activity-logs">
                <Button variant="outline" size="small">
                  View All
                </Button>
              </Link>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center flex-shrink-0`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">System Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {systemMetrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="text-lg font-bold text-gray-900 mb-1">{metric.value}</div>
                      <div className="flex items-center justify-center gap-1">
                        <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change}
                        </span>
                        <FiTrendingUp className={`w-4 h-4 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600 rotate-180'}`} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* System Status & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* System Status */}
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h2 className="dashboard-card-title">System Status</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div>
                      <p className="font-medium text-gray-900">Application Server</p>
                      <p className="text-sm text-gray-600">Running smoothly</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">100%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div>
                      <p className="font-medium text-gray-900">Database</p>
                      <p className="text-sm text-gray-600">Connected & responsive</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">99.8%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div>
                      <p className="font-medium text-gray-900">Email Service</p>
                      <p className="text-sm text-gray-600">Slight delay in notifications</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-yellow-600">92%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div>
                      <p className="font-medium text-gray-900">File Storage</p>
                      <p className="text-sm text-gray-600">Uploads working normally</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">100%</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Last Backup</h3>
                    <p className="text-sm text-gray-600">Completed today at 02:00 AM</p>
                  </div>
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => navigate('/admin/system-settings')}
                  >
                    Manage
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pending Actions */}
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h2 className="dashboard-card-title">Pending Actions</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FiUsers className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Employee Requests</p>
                      <p className="text-sm text-gray-600">{stats.pendingEmployeeRequests} pending review</p>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="small"
                    onClick={() => navigate('/admin/employee-requests')}
                  >
                    Review
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FiAlertCircle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-gray-900">Escalated Complaints</p>
                      <p className="text-sm text-gray-600">{stats.escalatedComplaints} require attention</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => navigate('/admin/escalations')}
                  >
                    View
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FiClock className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium text-gray-900">Overdue Complaints</p>
                      <p className="text-sm text-gray-600">7 complaints past deadline</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => navigate('/admin/manage-complaints?status=overdue')}
                  >
                    Review
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FiSettings className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">System Updates</p>
                      <p className="text-sm text-gray-600">2 updates available</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => navigate('/admin/system-settings')}
                  >
                    Update
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                    <p className="text-sm text-gray-600">Check documentation or contact support</p>
                  </div>
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => alert('Opening help documentation...')}
                  >
                    Get Help
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard