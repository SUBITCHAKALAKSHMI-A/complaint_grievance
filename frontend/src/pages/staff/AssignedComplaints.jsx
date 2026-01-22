import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiEdit,
  FiMessageSquare,
  FiClock,
  FiAlertCircle,
  FiCheckCircle,
  FiCalendar,
  FiUser
} from 'react-icons/fi'
import Button from '../../components/common/Button'
import StatusBadge from '../../components/common/StatusBadge'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import '../../styles/dashboard.css'

const AssignedComplaints = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [complaints, setComplaints] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedComplaints, setSelectedComplaints] = useState([])

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'escalated', label: 'Escalated' },
  ]

  const priorityOptions = [
    { value: 'all', label: 'All Priority' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ]

  useEffect(() => {
    // Simulate API call
    const loadComplaints = async () => {
      setLoading(true)
      
      return new Promise(resolve => {
        setTimeout(() => {
          const mockComplaints = [
            {
              id: 'CMP-001238',
              title: 'Network Connectivity Issues',
              category: 'Technical',
              status: 'in-progress',
              priority: 'high',
              customer: 'Alice Johnson',
              customerEmail: 'alice@example.com',
              assignedDate: '2024-01-15',
              deadline: '2024-01-22',
              lastUpdate: '2 hours ago',
              description: 'Customer experiencing intermittent network drops affecting productivity.',
              attachments: 3,
              messages: 5,
            },
            {
              id: 'CMP-001237',
              title: 'Billing Discrepancy',
              category: 'Finance',
              status: 'pending',
              priority: 'medium',
              customer: 'Bob Smith',
              customerEmail: 'bob@example.com',
              assignedDate: '2024-01-14',
              deadline: '2024-01-21',
              lastUpdate: '1 day ago',
              description: 'Invoice shows incorrect charges for last month services.',
              attachments: 2,
              messages: 3,
            },
            {
              id: 'CMP-001236',
              title: 'Service Delay Complaint',
              category: 'Service',
              status: 'resolved',
              priority: 'high',
              customer: 'Carol Williams',
              customerEmail: 'carol@example.com',
              assignedDate: '2024-01-13',
              resolvedDate: '2024-01-16',
              lastUpdate: '2 days ago',
              description: 'Service request took longer than promised timeframe.',
              attachments: 1,
              messages: 8,
            },
            {
              id: 'CMP-001235',
              title: 'Staff Behavior Feedback',
              category: 'HR',
              status: 'escalated',
              priority: 'critical',
              customer: 'David Brown',
              customerEmail: 'david@example.com',
              assignedDate: '2024-01-12',
              deadline: '2024-01-19',
              lastUpdate: '3 days ago',
              description: 'Customer reported inappropriate behavior from service staff.',
              attachments: 0,
              messages: 12,
            },
            {
              id: 'CMP-001234',
              title: 'Product Defect Report',
              category: 'Quality',
              status: 'in-progress',
              priority: 'medium',
              customer: 'Eva Davis',
              customerEmail: 'eva@example.com',
              assignedDate: '2024-01-11',
              deadline: '2024-01-18',
              lastUpdate: '4 hours ago',
              description: 'Product received with manufacturing defect.',
              attachments: 4,
              messages: 6,
            },
            {
              id: 'CMP-001233',
              title: 'Website Performance Issue',
              category: 'Technical',
              status: 'pending',
              priority: 'high',
              customer: 'Frank Wilson',
              customerEmail: 'frank@example.com',
              assignedDate: '2024-01-10',
              deadline: '2024-01-17',
              lastUpdate: '5 hours ago',
              description: 'Website loading very slow during peak hours.',
              attachments: 2,
              messages: 4,
            },
            {
              id: 'CMP-001232',
              title: 'Refund Request',
              category: 'Finance',
              status: 'resolved',
              priority: 'medium',
              customer: 'Grace Miller',
              customerEmail: 'grace@example.com',
              assignedDate: '2024-01-09',
              resolvedDate: '2024-01-12',
              lastUpdate: '1 week ago',
              description: 'Request for refund due to service cancellation.',
              attachments: 1,
              messages: 7,
            },
            {
              id: 'CMP-001231',
              title: 'Training Request',
              category: 'HR',
              status: 'in-progress',
              priority: 'low',
              customer: 'Henry Taylor',
              customerEmail: 'henry@example.com',
              assignedDate: '2024-01-08',
              deadline: '2024-01-15',
              lastUpdate: '1 day ago',
              description: 'Additional training requested for new software.',
              attachments: 0,
              messages: 3,
            },
          ]
          
          setComplaints(mockComplaints)
          setLoading(false)
          resolve()
        }, 1500)
      })
    }
    
    loadComplaints()
  }, [])

  // Use useMemo to compute filtered complaints
  const filteredComplaints = useMemo(() => {
    let filtered = complaints

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(complaint =>
        complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(complaint => complaint.status === statusFilter)
    }

    // Apply priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(complaint => complaint.priority === priorityFilter)
    }

    return filtered
  }, [searchTerm, statusFilter, priorityFilter, complaints])

  const handleSelectComplaint = (id) => {
    if (selectedComplaints.includes(id)) {
      setSelectedComplaints(selectedComplaints.filter(complaintId => complaintId !== id))
    } else {
      setSelectedComplaints([...selectedComplaints, id])
    }
  }

  const handleSelectAll = () => {
    if (selectedComplaints.length === filteredComplaints.length) {
      setSelectedComplaints([])
    } else {
      setSelectedComplaints(filteredComplaints.map(complaint => complaint.id))
    }
  }

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'critical':
        return <FiAlertCircle className="w-4 h-4 text-red-500" />
      case 'high':
        return <FiAlertCircle className="w-4 h-4 text-orange-500" />
      case 'medium':
        return <FiClock className="w-4 h-4 text-yellow-500" />
      case 'low':
        return <FiCheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <FiAlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="dashboard-container">
      <Sidebar role="staff" />
      
      <div className="dashboard-content">
        <Header title="Assigned Complaints" role="staff" />
        
        {/* Filters and Actions */}
        <div className="mb-8">
          <div className="dashboard-card">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">Manage Your Complaints</h2>
                <p className="text-gray-600">
                  {complaints.length} total complaints assigned • {complaints.filter(c => c.status === 'pending').length} require attention
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="medium"
                  icon={<FiDownload />}
                  onClick={() => alert('Exporting selected complaints...')}
                  disabled={selectedComplaints.length === 0}
                >
                  Export Selected
                </Button>
                
                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => navigate('/staff/update-complaint')}
                >
                  Update Complaint
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search complaints by ID, title, customer..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Filters */}
              <div className="flex gap-4">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  {priorityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                
                <Button
                  variant="outline"
                  size="medium"
                  icon={<FiFilter />}
                  onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('all')
                    setPriorityFilter('all')
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Complaints List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading complaints...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedComplaints.length === filteredComplaints.length && filteredComplaints.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">
                  {selectedComplaints.length} of {filteredComplaints.length} selected
                </span>
              </div>
              
              <div className="text-sm text-gray-600">
                Showing {filteredComplaints.length} complaints
              </div>
            </div>
            
            {/* Complaints Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="dashboard-card hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedComplaints.includes(complaint.id)}
                        onChange={() => handleSelectComplaint(complaint.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="font-mono text-sm font-semibold text-purple-600">
                        {complaint.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(complaint.priority)}
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        complaint.priority === 'critical' ? 'bg-red-100 text-red-800' :
                        complaint.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        complaint.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {complaint.priority}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 truncate">
                    {complaint.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {complaint.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <FiUser className="w-4 h-4 text-gray-400" />
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">{complaint.customer}</span>
                        <span className="text-gray-500 ml-2">{complaint.customerEmail}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4 text-gray-400" />
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Deadline:</span>
                        <span className={`ml-2 ${
                          complaint.status === 'pending' && complaint.deadline === '2024-01-22' 
                            ? 'text-red-600 font-semibold'
                            : 'text-gray-600'
                        }`}>
                          {complaint.deadline}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FiMessageSquare className="w-4 h-4" />
                        <span>{complaint.messages} messages</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiEye className="w-4 h-4" />
                        <span>{complaint.attachments} files</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <StatusBadge status={complaint.status} />
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="extra-small"
                        icon={<FiMessageSquare />}
                        onClick={() => navigate(`/staff/complaint/${complaint.id}/messages`)}
                      >
                        Message
                      </Button>
                      
                      <Button
                        variant="primary"
                        size="extra-small"
                        icon={<FiEdit />}
                        onClick={() => navigate(`/staff/update-complaint/${complaint.id}`)}
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Empty State */}
            {filteredComplaints.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No complaints found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'You have no complaints assigned at the moment.'}
                </p>
                {(searchTerm || statusFilter !== 'all' || priorityFilter !== 'all') && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('')
                      setStatusFilter('all')
                      setPriorityFilter('all')
                    }}
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Bulk Actions */}
        {selectedComplaints.length > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                  {selectedComplaints.length} complaints selected
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => setSelectedComplaints([])}
                  >
                    Deselect All
                  </Button>
                  <Button
                    variant="primary"
                    size="small"
                    onClick={() => alert(`Updating ${selectedComplaints.length} complaints...`)}
                  >
                    Bulk Update
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AssignedComplaints