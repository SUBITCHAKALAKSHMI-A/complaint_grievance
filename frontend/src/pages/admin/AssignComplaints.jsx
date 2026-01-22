import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FiSearch,
  FiFilter,
  FiUser,
  FiFileText,
  FiCalendar,
  FiClock,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowRight,
  FiUsers,
  FiSend,
  FiEye,
  FiRefreshCw
} from 'react-icons/fi'
import Button from '../../components/common/Button'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import '../../styles/dashboard.css'

const AssignComplaints = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [complaints, setComplaints] = useState([])
  const [staff, setStaff] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedComplaints, setSelectedComplaints] = useState([])
  const [selectedStaff, setSelectedStaff] = useState('')
  const [bulkAssign, setBulkAssign] = useState(false)

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'technical', label: 'Technical' },
    { value: 'service', label: 'Service' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'HR' },
    { value: 'quality', label: 'Quality' },
  ]

  const priorityOptions = [
    { value: 'all', label: 'All Priority' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ]

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockComplaints = [
        {
          id: 'CMP-001245',
          title: 'Network Connectivity Issues',
          category: 'technical',
          priority: 'high',
          customer: 'Alice Johnson',
          submittedDate: '2024-01-15',
          deadline: '2024-01-22',
          status: 'unassigned',
          description: 'Customer experiencing intermittent network drops affecting productivity.',
          assignedTo: null,
          escalationLevel: 0,
        },
        {
          id: 'CMP-001244',
          title: 'Billing Discrepancy',
          category: 'finance',
          priority: 'medium',
          customer: 'Bob Smith',
          submittedDate: '2024-01-14',
          deadline: '2024-01-21',
          status: 'unassigned',
          description: 'Invoice shows incorrect charges for last month services.',
          assignedTo: null,
          escalationLevel: 0,
        },
        {
          id: 'CMP-001243',
          title: 'Service Delay Complaint',
          category: 'service',
          priority: 'high',
          customer: 'Carol Williams',
          submittedDate: '2024-01-13',
          deadline: '2024-01-20',
          status: 'assigned',
          description: 'Service request took longer than promised timeframe.',
          assignedTo: 'STF-001',
          assignedToName: 'John Doe',
          escalationLevel: 0,
        },
        {
          id: 'CMP-001242',
          title: 'Staff Behavior Feedback',
          category: 'hr',
          priority: 'critical',
          customer: 'David Brown',
          submittedDate: '2024-01-12',
          deadline: '2024-01-19',
          status: 'unassigned',
          description: 'Customer reported inappropriate behavior from service staff.',
          assignedTo: null,
          escalationLevel: 1,
        },
        {
          id: 'CMP-001241',
          title: 'Product Defect Report',
          category: 'quality',
          priority: 'medium',
          customer: 'Eva Davis',
          submittedDate: '2024-01-11',
          deadline: '2024-01-18',
          status: 'unassigned',
          description: 'Product received with manufacturing defect.',
          assignedTo: null,
          escalationLevel: 0,
        },
        {
          id: 'CMP-001240',
          title: 'Website Performance Issue',
          category: 'technical',
          priority: 'high',
          customer: 'Frank Wilson',
          submittedDate: '2024-01-10',
          deadline: '2024-01-17',
          status: 'assigned',
          description: 'Website loading very slow during peak hours.',
          assignedTo: 'STF-009',
          assignedToName: 'James Wilson',
          escalationLevel: 0,
        },
      ]

      const mockStaff = [
        { id: 'STF-001', name: 'John Doe', department: 'technical', workload: 8, performance: 92, available: true },
        { id: 'STF-002', name: 'Jane Smith', department: 'customer-service', workload: 6, performance: 88, available: true },
        { id: 'STF-003', name: 'Robert Johnson', department: 'finance', workload: 5, performance: 85, available: true },
        { id: 'STF-004', name: 'Sarah Wilson', department: 'hr', workload: 7, performance: 90, available: false },
        { id: 'STF-005', name: 'Michael Brown', department: 'technical', workload: 0, performance: 78, available: true },
        { id: 'STF-006', name: 'Emily Davis', department: 'quality', workload: 4, performance: 87, available: true },
      ]
      
      setComplaints(mockComplaints)
      setStaff(mockStaff)
      setLoading(false)
    }

    loadData()
  }, [])

  // Use useMemo to compute filtered complaints
  const filteredComplaints = useMemo(() => {
    let filtered = complaints

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(complaint =>
        complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.customer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(complaint => complaint.category === categoryFilter)
    }

    // Apply priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(complaint => complaint.priority === priorityFilter)
    }

    // Filter based on bulk assign mode
    if (!bulkAssign) {
      filtered = filtered.filter(complaint => complaint.status === 'unassigned')
    }

    return filtered
  }, [complaints, searchTerm, categoryFilter, priorityFilter, bulkAssign])

  const handleSelectComplaint = (id) => {
    setSelectedComplaints(prev => {
      if (prev.includes(id)) {
        return prev.filter(complaintId => complaintId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleSelectAll = () => {
    if (selectedComplaints.length === filteredComplaints.length) {
      setSelectedComplaints([])
    } else {
      setSelectedComplaints(filteredComplaints.map(complaint => complaint.id))
    }
  }

  const handleAssign = (complaintId, staffId) => {
    if (!staffId) {
      alert('Please select a staff member first')
      return
    }

    const staffMember = staff.find(s => s.id === staffId)
    if (!staffMember) {
      alert('Invalid staff selection')
      return
    }

    if (window.confirm(`Assign complaint ${complaintId} to ${staffMember.name}?`)) {
      alert(`Complaint ${complaintId} assigned to ${staffMember.name}`)
    }
  }

  const handleBulkAssign = () => {
    if (!selectedStaff) {
      alert('Please select a staff member for bulk assignment')
      return
    }

    if (selectedComplaints.length === 0) {
      alert('Please select at least one complaint to assign')
      return
    }

    const staffMember = staff.find(s => s.id === selectedStaff)
    if (window.confirm(`Assign ${selectedComplaints.length} complaints to ${staffMember.name}?`)) {
      alert(`${selectedComplaints.length} complaints assigned to ${staffMember.name}`)
      setSelectedComplaints([])
    }
  }

  const handleAutoAssign = (complaintId) => {
    const complaint = complaints.find(c => c.id === complaintId)
    if (!complaint) return

    const suitableStaff = staff.filter(s => 
      s.available && 
      s.department === complaint.category &&
      s.workload < 8
    )

    if (suitableStaff.length === 0) {
      alert('No suitable staff available for auto-assignment')
      return
    }

    const bestStaff = suitableStaff.sort((a, b) => {
      if (a.workload !== b.workload) return a.workload - b.workload
      return b.performance - a.performance
    })[0]

    if (window.confirm(`Auto-assign to ${bestStaff.name}?`)) {
      alert(`Complaint ${complaintId} auto-assigned to ${bestStaff.name}`)
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

  const getCategoryColor = (category) => {
    switch(category) {
      case 'technical':
        return 'bg-blue-100 text-blue-800'
      case 'service':
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

  const getWorkloadColor = (workload) => {
    if (workload >= 8) return 'bg-red-100 text-red-800'
    if (workload >= 6) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return 'text-green-600'
    if (performance >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  const unassignedCount = complaints.filter(c => c.status === 'unassigned').length
  const assignedCount = complaints.filter(c => c.status === 'assigned').length
  const escalatedCount = complaints.filter(c => c.escalationLevel > 0).length

  const clearFilters = () => {
    setSearchTerm('')
    setCategoryFilter('all')
    setPriorityFilter('all')
  }

  return (
    <div className="dashboard-container">
      <Sidebar role="admin" />
      
      <div className="dashboard-content">
        <Header title="Assign Complaints" role="admin" />
        
        {/* Header */}
        <div className="mb-8">
          <div className="dashboard-card">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">Complaint Assignment</h2>
                <p className="text-gray-600">
                  {unassignedCount} unassigned • {assignedCount} assigned • {escalatedCount} escalated
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="medium"
                  icon={<FiRefreshCw />}
                  onClick={() => {
                    setSelectedComplaints([])
                    setSelectedStaff('')
                    setBulkAssign(false)
                  }}
                >
                  Reset
                </Button>
                
                <Button
                  variant={bulkAssign ? "primary" : "outline"}
                  size="medium"
                  icon={<FiUsers />}
                  onClick={() => setBulkAssign(!bulkAssign)}
                >
                  {bulkAssign ? 'Exit Bulk Mode' : 'Bulk Assign'}
                </Button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-lg font-bold text-yellow-600">{unassignedCount}</div>
                <p className="text-xs text-yellow-600">Awaiting Assignment</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{assignedCount}</div>
                <p className="text-xs text-blue-600">Currently Assigned</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-lg font-bold text-red-600">{escalatedCount}</div>
                <p className="text-xs text-red-600">Escalated Cases</p>
              </div>
            </div>
            
            {/* Staff Selection for Bulk Assign */}
            {bulkAssign && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-2">Bulk Assignment Mode</h3>
                    <p className="text-sm text-gray-600">
                      Select multiple complaints and assign them to one staff member
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <select
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={selectedStaff}
                      onChange={(e) => setSelectedStaff(e.target.value)}
                    >
                      <option value="">Select Staff Member</option>
                      {staff.map(member => (
                        <option key={member.id} value={member.id}>
                          {member.name} ({member.department}) - Workload: {member.workload}/10
                        </option>
                      ))}
                    </select>
                    
                    <Button
                      variant="primary"
                      size="medium"
                      icon={<FiSend />}
                      onClick={handleBulkAssign}
                      disabled={!selectedStaff || selectedComplaints.length === 0}
                    >
                      Assign Selected ({selectedComplaints.length})
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search complaints by title, ID, or customer..."
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
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categoryOptions.map(option => (
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
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Complaints List */}
          <div className="lg:col-span-2">
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">
                  {bulkAssign ? 'Select Complaints for Bulk Assignment' : 'Unassigned Complaints'}
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredComplaints.length} complaints
                </span>
              </div>
              
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
                  </div>
                  
                  {/* Complaints Grid */}
                  <div className="space-y-3">
                    {filteredComplaints.map((complaint) => (
                      <div
                        key={complaint.id}
                        className={`p-4 rounded-lg border ${
                          selectedComplaints.includes(complaint.id)
                            ? 'border-blue-300 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        } transition-colors`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {bulkAssign && (
                              <input
                                type="checkbox"
                                checked={selectedComplaints.includes(complaint.id)}
                                onChange={() => handleSelectComplaint(complaint.id)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            )}
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
                            {complaint.escalationLevel > 0 && (
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-800">
                                Level {complaint.escalationLevel}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <h3 className="font-semibold text-gray-900 mb-2">{complaint.title}</h3>
                        
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <FiUser className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-700">{complaint.customer}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FiCalendar className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600">{complaint.submittedDate}</span>
                              </div>
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(complaint.category)}`}>
                              {complaint.category}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 line-clamp-2">{complaint.description}</p>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <FiClock className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">Deadline: {complaint.deadline}</span>
                            </div>
                            {complaint.status === 'assigned' && (
                              <div className="text-sm text-gray-600">
                                Assigned to: <span className="font-medium">{complaint.assignedToName}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {!bulkAssign && complaint.status === 'unassigned' && (
                          <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                            <Button
                              variant="outline"
                              size="small"
                              icon={<FiEye />}
                              onClick={() => navigate(`/admin/complaint/${complaint.id}`)}
                            >
                              View Details
                            </Button>
                            
                            <select
                              className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              onChange={(e) => handleAssign(complaint.id, e.target.value)}
                              defaultValue=""
                            >
                              <option value="">Assign to...</option>
                              {staff
                                .filter(s => s.available)
                                .map(member => (
                                  <option key={member.id} value={member.id}>
                                    {member.name} ({member.department}) - Workload: {member.workload}/10
                                  </option>
                                ))
                              }
                            </select>
                            
                            <Button
                              variant="ghost"
                              size="small"
                              icon={<FiRefreshCw />}
                              onClick={() => handleAutoAssign(complaint.id)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              Auto
                            </Button>
                          </div>
                        )}
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
                        {searchTerm || categoryFilter !== 'all' || priorityFilter !== 'all'
                          ? 'Try adjusting your search or filters'
                          : 'All complaints have been assigned.'}
                      </p>
                      {(searchTerm || categoryFilter !== 'all' || priorityFilter !== 'all') && (
                        <Button
                          variant="outline"
                          onClick={clearFilters}
                        >
                          Clear all filters
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Staff Availability */}
          <div>
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">Staff Availability</h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  {staff.map((member) => (
                    <div
                      key={member.id}
                      className={`p-3 rounded-lg border ${
                        !member.available ? 'border-gray-200 bg-gray-50' :
                        member.workload >= 8 ? 'border-red-200 bg-red-50' :
                        member.workload >= 6 ? 'border-yellow-200 bg-yellow-50' :
                        'border-green-200 bg-green-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-xs text-gray-500">{member.department}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getWorkloadColor(member.workload)}`}>
                            {member.workload}/10
                          </span>
                          <span className={`text-xs font-medium ${getPerformanceColor(member.performance)}`}>
                            {member.performance}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{member.available ? '🟢 Available' : '🔴 Unavailable'}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">Performance:</span>
                          <span className={`font-medium ${getPerformanceColor(member.performance)}`}>
                            {member.performance}%
                          </span>
                        </div>
                      </div>
                      
                      {/* Workload Bar */}
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Workload</span>
                          <span>{member.workload}/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              member.workload >= 8 ? 'bg-red-500' :
                              member.workload >= 6 ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${(member.workload / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Quick Assign */}
                      {member.available && member.workload < 8 && (
                        <div className="mt-3">
                          <Button
                            variant="outline"
                            size="extra-small"
                            icon={<FiArrowRight />}
                            className="w-full"
                            onClick={() => {
                              setSelectedStaff(member.id)
                              if (!bulkAssign) {
                                alert(`Ready to assign to ${member.name}. Select complaints first.`)
                              }
                            }}
                          >
                            Assign to {member.name.split(' ')[0]}
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Assignment Guidelines</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">Green Zone (0-5 workload)</p>
                        <p className="text-xs">Ideal for new assignments</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">Yellow Zone (6-7 workload)</p>
                        <p className="text-xs">Assign only high-priority cases</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">Red Zone (8+ workload)</p>
                        <p className="text-xs">Avoid new assignments</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignComplaints