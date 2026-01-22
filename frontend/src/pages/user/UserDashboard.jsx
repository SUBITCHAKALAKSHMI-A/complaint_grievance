import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FiFileText, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiClock,
  FiBarChart2,
  FiBell,
  FiPlus,
  FiTrendingUp,
  FiUsers
} from 'react-icons/fi'
import Button from '../../components/common/Button'
import StatusBadge from '../../components/common/StatusBadge'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import '../../styles/dashboard.css'

const UserDashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    escalated: 0,
  })
  const [recentComplaints, setRecentComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        total: 15,
        pending: 3,
        resolved: 11,
        escalated: 1,
      })
      
      setRecentComplaints([
        {
          id: 'CMP-001234',
          title: 'Network Connectivity Issues',
          category: 'Technical',
          status: 'in-progress',
          priority: 'high',
          created: '2024-01-15',
          lastUpdate: '2 hours ago',
        },
        {
          id: 'CMP-001233',
          title: 'Billing Discrepancy',
          category: 'Finance',
          status: 'resolved',
          priority: 'medium',
          created: '2024-01-14',
          lastUpdate: '1 day ago',
        },
        {
          id: 'CMP-001232',
          title: 'Service Delay Complaint',
          category: 'Service',
          status: 'pending',
          priority: 'high',
          created: '2024-01-13',
          lastUpdate: '2 days ago',
        },
        {
          id: 'CMP-001231',
          title: 'Staff Behavior Feedback',
          category: 'HR',
          status: 'escalated',
          priority: 'critical',
          created: '2024-01-12',
          lastUpdate: '3 days ago',
        },
      ])
      
      setLoading(false)
    }, 1000)
  }, [])

  const quickActions = [
    {
      title: 'New Complaint',
      description: 'Submit a new complaint',
      icon: <FiPlus />,
      path: '/user/new-complaint',
      color: 'bg-gradient-to-r from-purple-600 to-pink-600',
    },
    {
      title: 'Track Status',
      description: 'Check complaint status',
      icon: <FiTrendingUp />,
      path: '/user/complaints',
      color: 'bg-gradient-to-r from-blue-600 to-cyan-600',
    },
    {
      title: 'Become Staff',
      description: 'Apply for staff position',
      icon: <FiUsers />,
      path: '/user/employee-request',
      color: 'bg-gradient-to-r from-emerald-600 to-green-600',
    },
    {
      title: 'Get Help',
      description: 'Need assistance?',
      icon: <FiBell />,
      path: '/help',
      color: 'bg-gradient-to-r from-orange-600 to-red-600',
    },
  ]

  return (
    <div className="dashboard-container">
      <Sidebar role="user" />
      
      <div className="dashboard-content">
        <Header title="User Dashboard" role="user" />
        
        {/* Stats Overview */}
        <div className="dashboard-grid mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="stat-card-title">Total Complaints</p>
                <h3 className="stat-card-value">{stats.total}</h3>
                <p className="stat-card-change">
                  <FiTrendingUp className="text-green-300" />
                  <span className="text-green-300">+2 this week</span>
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
                  <span className="text-yellow-300">Requires attention</span>
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
                <p className="stat-card-title">Resolved</p>
                <h3 className="stat-card-value">{stats.resolved}</h3>
                <p className="stat-card-change">
                  <FiCheckCircle className="text-green-300" />
                  <span className="text-green-300">73% resolution rate</span>
                </p>
              </div>
              <div className="stat-card-icon">
                <FiCheckCircle />
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="stat-card-title">Escalated</p>
                <h3 className="stat-card-value">{stats.escalated}</h3>
                <p className="stat-card-change">
                  <FiAlertCircle className="text-red-300" />
                  <span className="text-red-300">Under review</span>
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
        
        {/* Recent Complaints */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Recent Complaints</h2>
            <Link to="/user/complaints">
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
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Complaint ID</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Update</th>
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
                          <p className="text-xs text-gray-500">Created: {complaint.created}</p>
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
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          complaint.priority === 'high' || complaint.priority === 'critical'
                            ? 'bg-red-100 text-red-800'
                            : complaint.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {complaint.priority}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-500">
                        {complaint.lastUpdate}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="small"
                            onClick={() => navigate(`/user/complaint/${complaint.id}`)}
                          >
                            View
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
        
        {/* Complaint Statistics */}
        <div className="dashboard-grid-2 mt-8">
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h2 className="dashboard-card-title">Complaint Categories</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {[
                  { category: 'Technical', count: 6, percentage: 40, color: 'bg-blue-500' },
                  { category: 'Service', count: 4, percentage: 27, color: 'bg-purple-500' },
                  { category: 'Finance', count: 3, percentage: 20, color: 'bg-green-500' },
                  { category: 'HR', count: 2, percentage: 13, color: 'bg-yellow-500' },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">{item.category}</span>
                      <span className="text-gray-500">{item.count} complaints</span>
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
            </div>
          </div>
          
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h2 className="dashboard-card-title">Resolution Timeline</h2>
            </div>
            <div className="p-4">
              <div className="space-y-6">
                {[
                  { stage: 'Submitted', duration: '0-1 days', color: 'bg-purple-500' },
                  { stage: 'Under Review', duration: '1-3 days', color: 'bg-blue-500' },
                  { stage: 'In Progress', duration: '3-7 days', color: 'bg-yellow-500' },
                  { stage: 'Resolved', duration: '7-14 days', color: 'bg-green-500' },
                ].map((stage, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${stage.color} mr-3`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{stage.stage}</p>
                      <p className="text-sm text-gray-500">{stage.duration}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-900">
                        {stage.stage === 'Resolved' ? '73%' : '100%'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard