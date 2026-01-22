import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FiAlertCircle, 
  FiCheckCircle, 
  FiClock,
  FiBell,
  FiPlus,
  FiTrendingUp,
  FiUsers,
  FiFileText,
  FiBarChart2,
  FiMessageSquare,
  FiActivity
} from 'react-icons/fi'
import Button from '../../components/common/Button'
import StatusBadge from '../../components/common/StatusBadge'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import '../../styles/dashboard.css'

const StaffDashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalAssigned: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  })
  const [recentComplaints, setRecentComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Static user data - doesn't need useState since it doesn't change
  const user = {
    name: 'John Doe',
    role: 'Support Staff',
    department: 'Customer Service',
    performance: 85,
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalAssigned: 28,
        pending: 6,
        inProgress: 8,
        resolved: 14,
      })
      
      setRecentComplaints([
        {
          id: 'CMP-001238',
          title: 'Network Connectivity Issues',
          category: 'Technical',
          status: 'in-progress',
          priority: 'high',
          assignedDate: '2024-01-15',
          deadline: '2024-01-22',
          customer: 'Alice Johnson',
          customerEmail: 'alice@example.com',
        },
        {
          id: 'CMP-001237',
          title: 'Billing Discrepancy',
          category: 'Finance',
          status: 'pending',
          priority: 'medium',
          assignedDate: '2024-01-14',
          deadline: '2024-01-21',
          customer: 'Bob Smith',
          customerEmail: 'bob@example.com',
        },
        {
          id: 'CMP-001236',
          title: 'Service Delay Complaint',
          category: 'Service',
          status: 'resolved',
          priority: 'high',
          assignedDate: '2024-01-13',
          resolvedDate: '2024-01-16',
          customer: 'Carol Williams',
          customerEmail: 'carol@example.com',
        },
        {
          id: 'CMP-001235',
          title: 'Staff Behavior Feedback',
          category: 'HR',
          status: 'escalated',
          priority: 'critical',
          assignedDate: '2024-01-12',
          deadline: '2024-01-19',
          customer: 'David Brown',
          customerEmail: 'david@example.com',
        },
      ])
      
      setLoading(false)
    }, 1000)
  }, [])

  const quickActions = [
    {
      title: 'Assigned Complaints',
      description: 'View your assigned complaints',
      icon: <FiFileText />,
      path: '/staff/complaints',
      color: 'bg-gradient-to-r from-blue-600 to-cyan-600',
    },
    {
      title: 'Update Complaint',
      description: 'Update complaint status',
      icon: <FiPlus />,
      path: '/staff/update-complaint',
      color: 'bg-gradient-to-r from-purple-600 to-pink-600',
    },
    {
      title: 'Performance Stats',
      description: 'View your performance',
      icon: <FiTrendingUp />,
      path: '/staff/performance',
      color: 'bg-gradient-to-r from-emerald-600 to-green-600',
    },
    {
      title: 'Send Message',
      description: 'Contact customers',
      icon: <FiMessageSquare />,
      path: '/staff/messages',
      color: 'bg-gradient-to-r from-orange-600 to-red-600',
    },
  ]

  const priorityStats = [
    { level: 'Critical', count: 2, color: 'bg-red-500' },
    { level: 'High', count: 6, color: 'bg-orange-500' },
    { level: 'Medium', count: 12, color: 'bg-yellow-500' },
    { level: 'Low', count: 8, color: 'bg-green-500' },
  ]

  const upcomingDeadlines = [
    { id: 'CMP-001238', title: 'Network Issues', deadline: 'Tomorrow', priority: 'high' },
    { id: 'CMP-001237', title: 'Billing Query', deadline: 'In 2 days', priority: 'medium' },
    { id: 'CMP-001239', title: 'Service Complaint', deadline: 'In 3 days', priority: 'high' },
  ]

  return (
    <div className="dashboard-container">
      <Sidebar role="staff" />
      
      <div className="dashboard-content">
        <Header title="Staff Dashboard" role="staff" />
        
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="dashboard-card bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-gray-600 mb-4">
                  {user.role} • {user.department}
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiActivity className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Performance: {user.performance}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {stats.resolved} resolved this month
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                    JD
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
                <p className="stat-card-title">Total Assigned</p>
                <h3 className="stat-card-value">{stats.totalAssigned}</h3>
                <p className="stat-card-change">
                  <FiTrendingUp className="text-green-300" />
                  <span className="text-green-300">+5 this week</span>
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
                <p className="stat-card-title">Pending</p>
                <h3 className="stat-card-value">{stats.pending}</h3>
                <p className="stat-card-change">
                  <FiClock className="text-yellow-300" />
                  <span className="text-yellow-300">Requires action</span>
                </p>
              </div>
              <div className="stat-card-icon">
                <FiAlertCircle />
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="stat-card-title">In Progress</p>
                <h3 className="stat-card-value">{stats.inProgress}</h3>
                <p className="stat-card-change">
                  <FiActivity className="text-blue-300" />
                  <span className="text-blue-300">Active work</span>
                </p>
              </div>
              <div className="stat-card-icon">
                <FiTrendingUp />
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="stat-card-title">Resolved</p>
                <h3 className="stat-card-value">{stats.resolved}</h3>
                <p className="stat-card-change">
                  <FiCheckCircle className="text-green-300" />
                  <span className="text-green-300">50% this month</span>
                </p>
              </div>
              <div className="stat-card-icon">
                <FiCheckCircle />
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions & Upcoming Deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="dashboard-card">
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
          </div>
          
          {/* Upcoming Deadlines */}
          <div>
            <div className="dashboard-card h-full">
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">Upcoming Deadlines</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {upcomingDeadlines.map((item, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm font-semibold text-purple-600">
                          {item.id}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          item.priority === 'high' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="font-medium text-gray-900 mb-2">{item.title}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Due: {item.deadline}</span>
                        <Button
                          variant="outline"
                          size="extra-small"
                          onClick={() => navigate(`/staff/complaint/${item.id}`)}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Complaints & Priority Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Complaints */}
          <div className="lg:col-span-2">
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">Recent Assigned Complaints</h2>
                <Link to="/staff/complaints">
                  <Button variant="outline" size="small">
                    View All
                  </Button>
                </Link>
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading complaints...</p>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title & Customer</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Deadline</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentComplaints.map((complaint) => (
                        <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4">
                            <span className="font-mono text-sm font-semibold text-purple-600">
                              {complaint.id}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-gray-900">{complaint.title}</p>
                              <p className="text-xs text-gray-500">
                                {complaint.customer} • {complaint.customerEmail}
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {complaint.category}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <StatusBadge status={complaint.status} />
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-900">
                                {complaint.deadline || 'N/A'}
                              </span>
                              {complaint.assignedDate && (
                                <span className="text-xs text-gray-500">
                                  Assigned: {complaint.assignedDate}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="small"
                                onClick={() => navigate(`/staff/complaint/${complaint.id}`)}
                              >
                                View
                              </Button>
                              <Button
                                variant="primary"
                                size="small"
                                onClick={() => navigate(`/staff/update-complaint/${complaint.id}`)}
                              >
                                Update
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          
          {/* Priority Breakdown */}
          <div>
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">Priority Breakdown</h2>
              </div>
              <div className="p-4">
                <div className="space-y-6">
                  {priorityStats.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="font-medium text-gray-700">{item.level}</span>
                        </div>
                        <span className="text-gray-500">{item.count} complaints</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ 
                            width: `${(item.count / stats.totalAssigned) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Average Resolution Time</span>
                      <span className="font-semibold">3.2 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Customer Satisfaction</span>
                      <span className="font-semibold text-green-600">4.5/5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Escalation Rate</span>
                      <span className="font-semibold text-blue-600">12%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">First Response Time</span>
                      <span className="font-semibold">4.8 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Activity Summary */}
        <div className="dashboard-card mt-8">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Today's Activity Summary</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">8</div>
                <p className="text-sm text-gray-600">Complaints Updated</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">3</div>
                <p className="text-sm text-gray-600">Complaints Resolved</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
                <p className="text-sm text-gray-600">Messages Sent</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">2</div>
                <p className="text-sm text-gray-600">New Assignments</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Need Assistance?</h3>
                  <p className="text-sm text-gray-600">
                    Contact your supervisor or the admin team for support with complex cases.
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/staff/support')}
                  >
                    Get Support
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/staff/profile')}
                  >
                    View Profile
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

export default StaffDashboard