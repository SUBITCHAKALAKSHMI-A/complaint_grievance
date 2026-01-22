import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FiFilter, 
  FiSearch, 
  FiEye, 
  FiMessageSquare,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiRefreshCw
} from 'react-icons/fi'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import StatusBadge from '../../components/common/StatusBadge'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import '../../styles/tables.css'

const ComplaintList = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    priority: '',
    dateFrom: '',
    dateTo: ''
  })
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [complaints, setComplaints] = useState([])
  
  const itemsPerPage = 10

  // Mock data
  const mockComplaints = [
    {
      id: 'CMP-001234',
      title: 'Network Connectivity Issues in Building A',
      category: 'Technical',
      status: 'in-progress',
      priority: 'high',
      created: '2024-01-15',
      lastUpdate: '2 hours ago',
      description: 'Network connectivity issues reported in Building A affecting multiple users.',
      assignedTo: 'IT Department',
    },
    {
      id: 'CMP-001233',
      title: 'Billing Discrepancy for January Services',
      category: 'Finance',
      status: 'resolved',
      priority: 'medium',
      created: '2024-01-14',
      lastUpdate: '1 day ago',
      description: 'Incorrect billing amount charged for January services.',
      assignedTo: 'Finance Department',
    },
    {
      id: 'CMP-001232',
      title: 'Service Delay Complaint - Support Ticket #456',
      category: 'Service',
      status: 'pending',
      priority: 'high',
      created: '2024-01-13',
      lastUpdate: '2 days ago',
      description: 'Service request delayed beyond promised timeline.',
      assignedTo: 'Customer Service',
    },
    {
      id: 'CMP-001231',
      title: 'Staff Behavior Feedback - Meeting Room Incident',
      category: 'HR',
      status: 'escalated',
      priority: 'critical',
      created: '2024-01-12',
      lastUpdate: '3 days ago',
      description: 'Inappropriate behavior reported during team meeting.',
      assignedTo: 'HR Department',
    },
    {
      id: 'CMP-001230',
      title: 'Facilities Maintenance - Broken AC Unit',
      category: 'Facilities',
      status: 'resolved',
      priority: 'medium',
      created: '2024-01-11',
      lastUpdate: '4 days ago',
      description: 'AC unit in Room 203 not functioning properly.',
      assignedTo: 'Facilities Management',
    },
    {
      id: 'CMP-001229',
      title: 'Security Concern - Unauthorized Access',
      category: 'Security',
      status: 'in-progress',
      priority: 'critical',
      created: '2024-01-10',
      lastUpdate: '5 days ago',
      description: 'Report of unauthorized access to restricted area.',
      assignedTo: 'Security Department',
    },
    {
      id: 'CMP-001228',
      title: 'Academic Complaint - Course Materials',
      category: 'Academic',
      status: 'pending',
      priority: 'low',
      created: '2024-01-09',
      lastUpdate: '6 days ago',
      description: 'Inadequate course materials provided for Spring semester.',
      assignedTo: 'Academic Affairs',
    },
    {
      id: 'CMP-001227',
      title: 'Administrative Issue - Document Processing',
      category: 'Administrative',
      status: 'resolved',
      priority: 'low',
      created: '2024-01-08',
      lastUpdate: '1 week ago',
      description: 'Delay in processing official documents.',
      assignedTo: 'Administration',
    },
    {
      id: 'CMP-001226',
      title: 'Technical Support - Software Installation',
      category: 'Technical',
      status: 'resolved',
      priority: 'medium',
      created: '2024-01-07',
      lastUpdate: '1 week ago',
      description: 'Issues with software installation on new machines.',
      assignedTo: 'IT Department',
    },
    {
      id: 'CMP-001225',
      title: 'Service Quality - Support Response Time',
      category: 'Service',
      status: 'in-progress',
      priority: 'high',
      created: '2024-01-06',
      lastUpdate: '1 week ago',
      description: 'Concerns about slow response time from support team.',
      assignedTo: 'Customer Service',
    },
    {
      id: 'CMP-001224',
      title: 'Finance - Expense Reimbursement Delay',
      category: 'Finance',
      status: 'pending',
      priority: 'medium',
      created: '2024-01-05',
      lastUpdate: '2 weeks ago',
      description: 'Delay in processing expense reimbursement claims.',
      assignedTo: 'Finance Department',
    },
    {
      id: 'CMP-001223',
      title: 'HR - Leave Policy Clarification',
      category: 'HR',
      status: 'resolved',
      priority: 'low',
      created: '2024-01-04',
      lastUpdate: '2 weeks ago',
      description: 'Request for clarification on new leave policy.',
      assignedTo: 'HR Department',
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setComplaints(mockComplaints)
      setLoading(false)
    }, 1000)
  }, [])

  const categories = ['All', 'Technical', 'Service', 'Finance', 'HR', 'Facilities', 'Security', 'Academic', 'Administrative']
  const statuses = ['All', 'new', 'pending', 'in-progress', 'resolved', 'escalated', 'closed']
  const priorities = ['All', 'low', 'medium', 'high', 'critical']

  const filteredComplaints = complaints.filter(complaint => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase())

    // Status filter
    const matchesStatus = !filters.status || filters.status === 'All' || complaint.status === filters.status

    // Category filter
    const matchesCategory = !filters.category || filters.category === 'All' || complaint.category === filters.category

    // Priority filter
    const matchesPriority = !filters.priority || filters.priority === 'All' || complaint.priority === filters.priority

    // Date filter
    const complaintDate = new Date(complaint.created)
    const matchesDateFrom = !filters.dateFrom || complaintDate >= new Date(filters.dateFrom)
    const matchesDateTo = !filters.dateTo || complaintDate <= new Date(filters.dateTo + 'T23:59:59')

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority && matchesDateFrom && matchesDateTo
  })

  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentComplaints = filteredComplaints.slice(startIndex, endIndex)

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }))
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handleResetFilters = () => {
    setFilters({
      status: '',
      category: '',
      priority: '',
      dateFrom: '',
      dateTo: ''
    })
    setSearchTerm('')
    setCurrentPage(1)
  }

  const handleExport = () => {
    // Simulate export functionality
    alert('Export functionality would generate a CSV file here.')
  }

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  return (
    <div className="dashboard-container">
      <Sidebar role="user" />
      
      <div className="dashboard-content">
        <Header title="My Complaints" role="user" />
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Complaints</h1>
              <p className="text-gray-600">Track and manage all your submitted complaints</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="medium"
                icon={<FiDownload />}
                onClick={handleExport}
              >
                Export
              </Button>
              
              <Button
                variant="outline"
                size="medium"
                icon={<FiRefreshCw />}
                onClick={handleRefresh}
                loading={loading}
              >
                Refresh
              </Button>
              
              <Button
                variant="primary"
                size="medium"
                onClick={() => navigate('/user/new-complaint')}
              >
                New Complaint
              </Button>
            </div>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search complaints by ID, title, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {/* Filter Toggle */}
              <Button
                variant="outline"
                size="medium"
                icon={<FiFilter />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters {Object.values(filters).filter(Boolean).length > 0 && 
                  `(${Object.values(filters).filter(Boolean).length})`
                }
              </Button>
              
              {/* Reset Filters */}
              {(searchTerm || Object.values(filters).some(Boolean)) && (
                <Button
                  variant="ghost"
                  size="medium"
                  onClick={handleResetFilters}
                >
                  Clear All
                </Button>
              )}
            </div>
            
            {/* Filter Options */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">All Status</option>
                      {statuses.map(status => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={filters.priority}
                      onChange={(e) => handleFilterChange('priority', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">All Priorities</option>
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Range
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        value={filters.dateFrom}
                        onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        placeholder="From"
                      />
                      <input
                        type="date"
                        value={filters.dateTo}
                        onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        placeholder="To"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">{complaints.length}</div>
              <div className="text-sm text-gray-600">Total Complaints</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="text-2xl font-bold text-yellow-600">
                {complaints.filter(c => c.status === 'pending' || c.status === 'in-progress').length}
              </div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="text-2xl font-bold text-green-600">
                {complaints.filter(c => c.status === 'resolved').length}
              </div>
              <div className="text-sm text-gray-600">Resolved</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="text-2xl font-bold text-red-600">
                {complaints.filter(c => c.status === 'escalated').length}
              </div>
              <div className="text-sm text-gray-600">Escalated</div>
            </div>
          </div>
        </div>
        
        {/* Complaints Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading complaints...</p>
              </div>
            </div>
          ) : filteredComplaints.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <FiMessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No complaints found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || Object.values(filters).some(Boolean) 
                  ? 'Try adjusting your search or filters'
                  : 'You haven\'t submitted any complaints yet'
                }
              </p>
              {(searchTerm || Object.values(filters).some(Boolean)) ? (
                <Button
                  variant="outline"
                  onClick={handleResetFilters}
                >
                  Clear All Filters
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => navigate('/user/new-complaint')}
                >
                  Submit Your First Complaint
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Complaint ID
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentComplaints.map((complaint) => (
                      <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <span className="font-mono text-sm font-semibold text-purple-600">
                            {complaint.id}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-gray-900 truncate max-w-xs">
                              {complaint.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Assigned to: {complaint.assignedTo}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {complaint.category}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <StatusBadge status={complaint.status} />
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            complaint.priority === 'high' || complaint.priority === 'critical'
                              ? 'bg-red-100 text-red-800'
                              : complaint.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {complaint.priority}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FiCalendar className="w-4 h-4" />
                            {complaint.created}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="small"
                              icon={<FiEye />}
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
              
              {/* Pagination */}
              <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="text-sm text-gray-600 mb-4 md:mb-0">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredComplaints.length)} of {filteredComplaints.length} complaints
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="small"
                    icon={<FiChevronLeft />}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium ${
                            currentPage === pageNum
                              ? 'bg-purple-600 text-white'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="small"
                    icon={<FiChevronRight />}
                    iconPosition="right"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Resolution Rate</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600">73%</div>
                <div className="text-sm text-gray-600">of your complaints resolved</div>
              </div>
              <div className="w-20 h-20">
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="#10b981"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="226.1946710584651"
                      strokeDashoffset="226.1946710584651 * 0.27"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">73%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Average Resolution Time</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-600">5.2 days</div>
                <div className="text-sm text-gray-600">average time to resolve</div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <FiCalendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Most Common Category</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-purple-600">Technical</div>
                <div className="text-sm text-gray-600">40% of your complaints</div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                <FiMessageSquare className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComplaintList