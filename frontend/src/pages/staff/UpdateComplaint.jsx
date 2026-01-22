import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  FiArrowLeft,
  FiSave,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiXCircle,
  FiMessageSquare,
  FiPaperclip,
  FiUser,
  FiCalendar,
  FiFileText,
  FiSend
} from 'react-icons/fi'
import Button from '../../components/common/Button'
import StatusBadge from '../../components/common/StatusBadge'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import '../../styles/dashboard.css'

const UpdateComplaint = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [complaint, setComplaint] = useState(null)
  const [updates, setUpdates] = useState({
    status: '',
    priority: '',
    assignedTo: '',
    resolution: '',
    notes: '',
    nextFollowUp: '',
    sendNotification: true,
  })

  const statusOptions = [
    { value: 'pending', label: 'Pending', icon: FiClock, color: 'text-yellow-500' },
    { value: 'in-progress', label: 'In Progress', icon: FiAlertCircle, color: 'text-blue-500' },
    { value: 'resolved', label: 'Resolved', icon: FiCheckCircle, color: 'text-green-500' },
    { value: 'escalated', label: 'Escalated', icon: FiAlertCircle, color: 'text-red-500' },
    { value: 'closed', label: 'Closed', icon: FiXCircle, color: 'text-gray-500' },
  ]

  const priorityOptions = [
    { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
  ]

  const assignedToOptions = [
    { value: 'self', label: 'Keep Assigned to Me' },
    { value: 'john-doe', label: 'John Doe (Level 2 Support)' },
    { value: 'jane-smith', label: 'Jane Smith (Supervisor)' },
    { value: 'tech-team', label: 'Technical Team' },
    { value: 'finance-team', label: 'Finance Team' },
  ]

  useEffect(() => {
    // Simulate API call to fetch complaint details
    setTimeout(() => {
      const mockComplaint = {
        id: id || 'CMP-001238',
        title: 'Network Connectivity Issues',
        category: 'Technical',
        status: 'in-progress',
        priority: 'high',
        customer: 'Alice Johnson',
        customerEmail: 'alice@example.com',
        customerPhone: '+1 (555) 123-4567',
        assignedDate: '2024-01-15',
        deadline: '2024-01-22',
        description: 'Customer experiencing intermittent network drops affecting productivity. The issue occurs daily between 2-4 PM.',
        attachments: [
          { name: 'network_logs.pdf', size: '2.4 MB', uploaded: '2024-01-15' },
          { name: 'screenshot_1.png', size: '1.8 MB', uploaded: '2024-01-15' },
        ],
        history: [
          { date: '2024-01-15', action: 'Complaint submitted', user: 'Alice Johnson' },
          { date: '2024-01-15', action: 'Assigned to support staff', user: 'System' },
          { date: '2024-01-16', action: 'Initial investigation started', user: 'Current User' },
        ],
        messages: [
          { user: 'Customer', message: 'The network drops are affecting my work. Can you help?', time: '2024-01-15 14:30' },
          { user: 'Support', message: 'We\'re looking into the issue. Can you provide more details?', time: '2024-01-15 15:15' },
        ],
        currentAssignee: 'Current User',
      }
      
      setComplaint(mockComplaint)
      setUpdates({
        status: mockComplaint.status,
        priority: mockComplaint.priority,
        assignedTo: 'self',
        resolution: '',
        notes: '',
        nextFollowUp: '',
        sendNotification: true,
      })
      setLoading(false)
    }, 1000)
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      alert('Complaint updated successfully!')
      setSaving(false)
      navigate('/staff/complaints')
    }, 1500)
  }

  const handleSendMessage = () => {
    alert('Message sent to customer!')
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar role="staff" />
        <div className="dashboard-content">
          <Header title="Update Complaint" role="staff" />
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading complaint details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <Sidebar role="staff" />
      
      <div className="dashboard-content">
        <Header title="Update Complaint" role="staff" />
        
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            size="medium"
            icon={<FiArrowLeft />}
            onClick={() => navigate('/staff/complaints')}
          >
            Back to Complaints
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Complaint Details & Update Form */}
          <div className="lg:col-span-2">
            <div className="dashboard-card mb-8">
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">Complaint Details</h2>
                <StatusBadge status={complaint.status} />
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Complaint ID
                        </label>
                        <p className="font-mono text-lg font-semibold text-purple-600">
                          {complaint.id}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <p className="text-gray-900 font-medium">{complaint.title}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {complaint.category}
                        </span>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <p className="text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded">
                          {complaint.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <FiUser className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{complaint.customer}</p>
                          <p className="text-sm text-gray-500">{complaint.customerEmail}</p>
                          <p className="text-sm text-gray-500">{complaint.customerPhone}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Assigned Date
                          </label>
                          <p className="text-gray-900">{complaint.assignedDate}</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Deadline
                          </label>
                          <p className={`font-medium ${
                            complaint.status === 'pending' ? 'text-red-600' : 'text-gray-900'
                          }`}>
                            {complaint.deadline}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Assignee
                        </label>
                        <p className="text-gray-900 font-medium">{complaint.currentAssignee}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Update Form */}
                <form onSubmit={handleSubmit}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Update Complaint</h3>
                  
                  <div className="space-y-6">
                    {/* Status Update */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Status
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {statusOptions.map((option) => {
                          const Icon = option.icon
                          return (
                            <button
                              type="button"
                              key={option.value}
                              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                                updates.status === option.value
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => setUpdates({ ...updates, status: option.value })}
                            >
                              <Icon className={`w-6 h-6 mb-2 ${option.color}`} />
                              <span className="text-sm font-medium">{option.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    
                    {/* Priority & Assignment */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priority
                        </label>
                        <select
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={updates.priority}
                          onChange={(e) => setUpdates({ ...updates, priority: e.target.value })}
                          required
                        >
                          {priorityOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Reassign To
                        </label>
                        <select
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={updates.assignedTo}
                          onChange={(e) => setUpdates({ ...updates, assignedTo: e.target.value })}
                        >
                          {assignedToOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {/* Resolution Details */}
                    {updates.status === 'resolved' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Resolution Details
                        </label>
                        <textarea
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows="3"
                          placeholder="Describe how the complaint was resolved..."
                          value={updates.resolution}
                          onChange={(e) => setUpdates({ ...updates, resolution: e.target.value })}
                          required={updates.status === 'resolved'}
                        />
                      </div>
                    )}
                    
                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Internal Notes
                      </label>
                      <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="4"
                        placeholder="Add any internal notes or observations..."
                        value={updates.notes}
                        onChange={(e) => setUpdates({ ...updates, notes: e.target.value })}
                      />
                    </div>
                    
                    {/* Next Follow-up */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Next Follow-up Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={updates.nextFollowUp}
                        onChange={(e) => setUpdates({ ...updates, nextFollowUp: e.target.value })}
                      />
                    </div>
                    
                    {/* Notification */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sendNotification"
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        checked={updates.sendNotification}
                        onChange={(e) => setUpdates({ ...updates, sendNotification: e.target.checked })}
                      />
                      <label htmlFor="sendNotification" className="ml-2 text-sm text-gray-700">
                        Send notification to customer about this update
                      </label>
                    </div>
                    
                    {/* Submit Buttons */}
                    <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                      <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        icon={<FiSave />}
                        loading={saving}
                      >
                        Save Changes
                      </Button>
                      
                      <Button
                        type="button"
                        variant="outline"
                        size="large"
                        onClick={() => navigate('/staff/complaints')}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Sidebar: Attachments & History */}
          <div>
            {/* Recent Messages */}
            <div className="dashboard-card mb-8">
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">Recent Messages</h2>
                <Button
                  variant="ghost"
                  size="small"
                  icon={<FiMessageSquare />}
                  onClick={handleSendMessage}
                >
                  Send Message
                </Button>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  {complaint.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        msg.user === 'Customer'
                          ? 'bg-blue-50 border border-blue-100'
                          : 'bg-gray-50 border border-gray-100'
                      }`}
                    >
                      <div className="flex justify-between mb-2">
                        <span className={`text-sm font-medium ${
                          msg.user === 'Customer' ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                          {msg.user}
                        </span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-sm text-gray-700">{msg.message}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    rows="3"
                    placeholder="Type your message to the customer..."
                  />
                  <Button
                    variant="primary"
                    size="small"
                    icon={<FiSend />}
                    className="mt-2"
                    fullWidth
                    onClick={handleSendMessage}
                  >
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Attachments */}
            <div className="dashboard-card mb-8">
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">Attachments</h2>
                <Button
                  variant="ghost"
                  size="small"
                  icon={<FiPaperclip />}
                  onClick={() => alert('Upload attachment')}
                >
                  Add
                </Button>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  {complaint.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FiFileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size} • {file.uploaded}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="extra-small"
                        onClick={() => alert(`Downloading ${file.name}`)}
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* History */}
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">History</h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  {complaint.history.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-2 h-2 rounded-full ${
                          index === 0 ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></div>
                        {index < complaint.history.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-300"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm font-medium text-gray-900">{item.action}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <FiCalendar className="w-3 h-3" />
                          <span>{item.date}</span>
                          <span>•</span>
                          <span>{item.user}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateComplaint