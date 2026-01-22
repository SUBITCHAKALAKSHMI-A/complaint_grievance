import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FiSearch,
  FiFilter,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiDownload,
  FiMail,
  FiPhone,
  FiCalendar,
  FiUser,
  FiFileText,
  FiPercent,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi'
import Button from '../../components/common/Button'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import '../../styles/dashboard.css'

const EmployeeRequests = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedRequests, setSelectedRequests] = useState([])

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'test-pending', label: 'Test Pending' },
    { value: 'test-completed', label: 'Test Completed' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ]

  // Load initial data
  useEffect(() => {
    const loadRequests = async () => {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockRequests = [
        {
          id: 'EMP-REQ-001',
          userId: 'USR-001',
          userName: 'Alice Johnson',
          userEmail: 'alice@example.com',
          userPhone: '+1 (555) 123-4567',
          currentRole: 'user',
          requestedRole: 'staff',
          department: 'technical',
          applicationDate: '2024-01-10',
          status: 'pending',
          testScore: null,
          testDate: null,
          experience: '3 years in IT support',
          qualifications: ['CompTIA A+', 'Network+'],
          notes: 'Experienced in network troubleshooting',
          documents: ['resume.pdf', 'certificate1.pdf'],
        },
        {
          id: 'EMP-REQ-002',
          userId: 'USR-002',
          userName: 'Bob Smith',
          userEmail: 'bob@example.com',
          userPhone: '+1 (555) 987-6543',
          currentRole: 'user',
          requestedRole: 'staff',
          department: 'customer-service',
          applicationDate: '2024-01-11',
          status: 'test-pending',
          testScore: null,
          testDate: '2024-01-15',
          experience: '5 years customer service',
          qualifications: ['Customer Service Certification'],
          notes: 'Excellent communication skills',
          documents: ['resume.pdf'],
        },
        {
          id: 'EMP-REQ-003',
          userId: 'USR-003',
          userName: 'Carol Williams',
          userEmail: 'carol@example.com',
          userPhone: '+1 (555) 456-7890',
          currentRole: 'user',
          requestedRole: 'staff',
          department: 'finance',
          applicationDate: '2024-01-09',
          status: 'test-completed',
          testScore: 85,
          testDate: '2024-01-12',
          experience: '4 years in accounting',
          qualifications: ['CPA', 'Excel Expert'],
          notes: 'Strong analytical skills',
          documents: ['resume.pdf', 'cpa_certificate.pdf'],
        },
      ]
      
      setRequests(mockRequests)
      setLoading(false)
    }

    loadRequests()
  }, [])

  // Use useMemo to compute filtered requests
  const filteredRequests = useMemo(() => {
    let filtered = requests

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.department.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter)
    }

    return filtered
  }, [requests, searchTerm, statusFilter])

  const handleSelectRequest = (id) => {
    setSelectedRequests(prev => {
      if (prev.includes(id)) {
        return prev.filter(requestId => requestId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleSelectAll = () => {
    if (selectedRequests.length === filteredRequests.length) {
      setSelectedRequests([])
    } else {
      setSelectedRequests(filteredRequests.map(request => request.id))
    }
  }

  const handleApproveRequest = (requestId) => {
    if (window.confirm('Approve this employee request? This will grant staff access to the user.')) {
      alert(`Request ${requestId} approved successfully!`)
    }
  }

  const handleRejectRequest = (requestId) => {
    if (window.confirm('Reject this employee request?')) {
      const reason = prompt('Please provide a reason for rejection:')
      if (reason) {
        alert(`Request ${requestId} rejected. Reason: ${reason}`)
      }
    }
  }

  const handleScheduleTest = (requestId) => {
    const testDate = prompt('Enter test date (YYYY-MM-DD):')
    if (testDate) {
      alert(`Test scheduled for ${testDate} for request ${requestId}`)
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'test-pending':
        return 'bg-blue-100 text-blue-800'
      case 'test-completed':
        return 'bg-purple-100 text-purple-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending':
        return <FiClock className="w-4 h-4 text-yellow-600" />
      case 'test-pending':
        return <FiAlertCircle className="w-4 h-4 text-blue-600" />
      case 'test-completed':
        return <FiPercent className="w-4 h-4 text-purple-600" />
      case 'approved':
        return <FiCheckCircle className="w-4 h-4 text-green-600" />
      case 'rejected':
        return <FiXCircle className="w-4 h-4 text-red-600" />
      default:
        return <FiClock className="w-4 h-4 text-gray-600" />
    }
  }

  const getDepartmentColor = (department) => {
    switch(department) {
      case 'technical':
        return 'bg-blue-100 text-blue-800'
      case 'customer-service':
        return 'bg-green-100 text-green-800'
      case 'finance':
        return 'bg-purple-100 text-purple-800'
      case 'hr':
        return 'bg-pink-100 text-pink-800'
      case 'quality':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTestScoreColor = (score) => {
    if (!score) return 'text-gray-500'
    if (score >= 80) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    testPending: requests.filter(r => r.status === 'test-pending').length,
    testCompleted: requests.filter(r => r.status === 'test-completed').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  }

  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
  }

  return (
    <div className="dashboard-container">
      <Sidebar role="admin" />
      
      <div className="dashboard-content">
        <Header title="Employee Requests" role="admin" />
        
        {/* Header */}
        <div className="mb-8">
          <div className="dashboard-card">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">Employee Qualification Requests</h2>
                <p className="text-gray-600">
                  Review and process requests from users to become staff members
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="medium"
                  icon={<FiDownload />}
                  onClick={() => alert('Exporting requests...')}
                >
                  Export
                </Button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">{stats.total}</div>
                <p className="text-xs text-gray-600">Total</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-lg font-bold text-yellow-600">{stats.pending}</div>
                <p className="text-xs text-yellow-600">Pending</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{stats.testPending}</div>
                <p className="text-xs text-blue-600">Test Pending</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">{stats.testCompleted}</div>
                <p className="text-xs text-purple-600">Test Done</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">{stats.approved}</div>
                <p className="text-xs text-green-600">Approved</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-lg font-bold text-red-600">{stats.rejected}</div>
                <p className="text-xs text-red-600">Rejected</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search requests by name, email, or department..."
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
                
                <Button
                  variant="outline"
                  size="medium"
                  icon={<FiFilter />}
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Requests List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading requests...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Bulk Actions */}
            <div className="mb-6">
              <div className="dashboard-card">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedRequests.length === filteredRequests.length && filteredRequests.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">
                      {selectedRequests.length} of {filteredRequests.length} selected
                    </span>
                  </div>
                  
                  {selectedRequests.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="small"
                        onClick={() => setSelectedRequests([])}
                      >
                        Deselect All
                      </Button>
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => alert(`Processing ${selectedRequests.length} requests...`)}
                      >
                        Bulk Actions
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Requests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="dashboard-card hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedRequests.includes(request.id)}
                        onChange={() => handleSelectRequest(request.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="font-mono text-sm font-semibold text-purple-600">
                        {request.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(request.status)}
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(request.status)}`}>
                        {request.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  {/* User Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                      {request.userName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{request.userName}</h3>
                      <div className="space-y-1 mt-1">
                        <div className="flex items-center gap-2">
                          <FiMail className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-600">{request.userEmail}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiPhone className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-600">{request.userPhone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Request Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Department:</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDepartmentColor(request.department)}`}>
                        {request.department.replace('-', ' ')}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Applied:</span>
                      <span className="text-sm font-medium">{request.applicationDate}</span>
                    </div>
                    
                    {request.testDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Test Date:</span>
                        <span className="text-sm font-medium">{request.testDate}</span>
                      </div>
                    )}
                    
                    {request.testScore !== null && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Test Score:</span>
                        <span className={`text-sm font-bold ${getTestScoreColor(request.testScore)}`}>
                          {request.testScore}%
                        </span>
                      </div>
                    )}
                    
                    <div>
                      <span className="text-sm text-gray-600">Experience:</span>
                      <p className="text-sm text-gray-700 mt-1">{request.experience}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600">Qualifications:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {request.qualifications.map((qual, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-0.5 bg-gray-100 text-gray-800 rounded"
                          >
                            {qual}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {request.notes && (
                      <div>
                        <span className="text-sm text-gray-600">Notes:</span>
                        <p className="text-sm text-gray-700 mt-1">{request.notes}</p>
                      </div>
                    )}
                    
                    <div>
                      <span className="text-sm text-gray-600">Documents:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <FiFileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{request.documents.length} files</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="extra-small"
                          icon={<FiEye />}
                          onClick={() => navigate(`/admin/request/${request.id}`)}
                          className="w-full"
                        >
                          View Details
                        </Button>
                      </div>
                      
                      {request.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="extra-small"
                            icon={<FiCalendar />}
                            onClick={() => handleScheduleTest(request.id)}
                            className="w-full"
                          >
                            Schedule Test
                          </Button>
                        </div>
                      )}
                      
                      {request.status === 'test-completed' && (
                        <>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="extra-small"
                              icon={<FiCheckCircle />}
                              onClick={() => handleApproveRequest(request.id)}
                              className="w-full text-green-600 border-green-200 hover:bg-green-50"
                            >
                              Approve
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="extra-small"
                              icon={<FiXCircle />}
                              onClick={() => handleRejectRequest(request.id)}
                              className="w-full text-red-600 border-red-200 hover:bg-red-50"
                            >
                              Reject
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Empty State */}
            {filteredRequests.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'No employee requests at the moment.'}
                </p>
                {(searchTerm || statusFilter !== 'all') && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
            )}
          </>
        )}
        
        {/* Quick Stats */}
        <div className="dashboard-card mt-8">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Processing Summary</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {Math.round((stats.testCompleted + stats.approved + stats.rejected) / stats.total * 100)}%
                </div>
                <p className="text-sm text-gray-600">Processing Completion Rate</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {Math.round(stats.approved / (stats.approved + stats.rejected) * 100)}%
                </div>
                <p className="text-sm text-gray-600">Approval Rate</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-2">
                  {Math.round(
                    requests
                      .filter(r => r.testScore !== null)
                      .reduce((sum, r) => sum + r.testScore, 0) / 
                    requests.filter(r => r.testScore !== null).length
                  )}%
                </div>
                <p className="text-sm text-gray-600">Average Test Score</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Need to configure qualification tests?</h3>
                  <p className="text-sm text-gray-600">
                    Manage test questions, passing scores, and department requirements.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate('/admin/test-configuration')}
                >
                  Configure Tests
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeRequests