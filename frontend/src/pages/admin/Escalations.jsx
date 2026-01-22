import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FiSearch,
  FiFilter,
  FiAlertCircle,
  FiClock,
  FiUser,
  FiFileText,
  FiCalendar,
  FiArrowUp,
  FiMessageSquare,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiBarChart2,
  FiTrendingUp,
  FiDownload
} from 'react-icons/fi'
import Button from '../../components/common/Button'
import StatusBadge from '../../components/common/StatusBadge'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import '../../styles/dashboard.css'

const Escalations = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [escalations, setEscalations] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedEscalations, setSelectedEscalations] = useState([])

  const levelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: '1', label: 'Level 1' },
    { value: '2', label: 'Level 2' },
    { value: '3', label: 'Level 3' },
  ]

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-review', label: 'In Review' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'dismissed', label: 'Dismissed' },
  ]

  // Load initial data
  useEffect(() => {
    const loadEscalations = async () => {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockEscalations = [
        {
          id: 'ESC-001',
          complaintId: 'CMP-001242',
          complaintTitle: 'Staff Behavior Feedback',
          level: 1,
          status: 'pending',
          escalatedBy: 'John Doe (Staff)',
          escalatedTo: 'Senior Management',
          escalationDate: '2024-01-12',
          escalationReason: 'Sensitive HR issue requiring senior attention',
          deadline: '2024-01-19',
          customer: 'David Brown',
          category: 'hr',
          priority: 'critical',
          originalAssignee: 'STF-004',
          daysOpen: 3,
          notes: [
            { date: '2024-01-12', user: 'John Doe', note: 'Escalated due to sensitive nature' },
            { date: '2024-01-13', user: 'Admin', note: 'Assigned to HR manager for review' },
          ],
        },
        {
          id: 'ESC-002',
          complaintId: 'CMP-001237',
          complaintTitle: 'Software Bug Report',
          level: 2,
          status: 'in-review',
          escalatedBy: 'System (Auto)',
          escalatedTo: 'Technical Director',
          escalationDate: '2024-01-10',
          escalationReason: 'Critical bug affecting multiple customers',
          deadline: '2024-01-17',
          customer: 'Ivy Martin',
          category: 'technical',
          priority: 'critical',
          originalAssignee: null,
          daysOpen: 5,
          notes: [
            { date: '2024-01-10', user: 'System', note: 'Auto-escalated after 48 hours' },
            { date: '2024-01-11', user: 'Admin', note: 'Assigned to technical team lead' },
            { date: '2024-01-12', user: 'Tech Lead', note: 'Investigating root cause' },
          ],
        },
        {
          id: 'ESC-003',
          complaintId: 'CMP-001236',
          complaintTitle: 'Customer Service Complaint',
          level: 1,
          status: 'resolved',
          escalatedBy: 'Jane Smith (Staff)',
          escalatedTo: 'Customer Service Manager',
          escalationDate: '2024-01-08',
          resolutionDate: '2024-01-12',
          escalationReason: 'Customer requested management intervention',
          deadline: '2024-01-15',
          customer: 'Jack Anderson',
          category: 'service',
          priority: 'high',
          originalAssignee: 'STF-002',
          daysOpen: 4,
          resolution: 'Manager personally called customer and resolved issue',
          notes: [
            { date: '2024-01-08', user: 'Jane Smith', note: 'Customer requested escalation' },
            { date: '2024-01-09', user: 'Manager', note: 'Contacted customer for details' },
            { date: '2024-01-12', user: 'Manager', note: 'Issue resolved, customer satisfied' },
          ],
        },
      ]
      
      setEscalations(mockEscalations)
      setLoading(false)
    }

    loadEscalations()
  }, [])

  // Use useMemo to compute filtered escalations
  const filteredEscalations = useMemo(() => {
    let filtered = escalations

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(escalation =>
        escalation.complaintTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        escalation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        escalation.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        escalation.complaintId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply level filter
    if (levelFilter !== 'all') {
      filtered = filtered.filter(escalation => escalation.level.toString() === levelFilter)
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(escalation => escalation.status === statusFilter)
    }

    return filtered
  }, [escalations, searchTerm, levelFilter, statusFilter])

  const handleSelectEscalation = (id) => {
    setSelectedEscalations(prev => {
      if (prev.includes(id)) {
        return prev.filter(escalationId => escalationId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleSelectAll = () => {
    if (selectedEscalations.length === filteredEscalations.length) {
      setSelectedEscalations([])
    } else {
      setSelectedEscalations(filteredEscalations.map(escalation => escalation.id))
    }
  }

  const handleResolveEscalation = (escalationId) => {
    if (window.confirm('Mark this escalation as resolved?')) {
      const resolution = prompt('Please provide resolution details:')
      if (resolution) {
        alert(`Escalation ${escalationId} marked as resolved.`)
      }
    }
  }

  const handleDismissEscalation = (escalationId) => {
    if (window.confirm('Dismiss this escalation?')) {
      const reason = prompt('Please provide dismissal reason:')
      if (reason) {
        alert(`Escalation ${escalationId} dismissed. Reason: ${reason}`)
      }
    }
  }

  const handleReassign = (escalationId) => {
    const newLevel = prompt('Reassign to which level? (1, 2, or 3):')
    if (newLevel && ['1', '2', '3'].includes(newLevel)) {
      alert(`Escalation ${escalationId} reassigned to Level ${newLevel}`)
    }
  }

  const getLevelColor = (level) => {
    switch(level) {
      case 1:
        return 'bg-yellow-100 text-yellow-800'
      case 2:
        return 'bg-orange-100 text-orange-800'
      case 3:
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
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

  const stats = {
    total: escalations.length,
    pending: escalations.filter(e => e.status === 'pending').length,
    inReview: escalations.filter(e => e.status === 'in-review').length,
    resolved: escalations.filter(e => e.status === 'resolved').length,
    level1: escalations.filter(e => e.level === 1).length,
    level2: escalations.filter(e => e.level === 2).length,
    level3: escalations.filter(e => e.level === 3).length,
    overdue: escalations.filter(e => new Date(e.deadline) < new Date()).length,
  }

  const averageDaysOpen = escalations.length > 0 
    ? Math.round(escalations.reduce((sum, e) => sum + e.daysOpen, 0) / escalations.length)
    : 0

  const clearFilters = () => {
    setSearchTerm('')
    setLevelFilter('all')
    setStatusFilter('all')
  }

  return (
    <div className="dashboard-container">
      <Sidebar role="admin" />
      
      <div className="dashboard-content">
        <Header title="Escalations Management" role="admin" />
        
        {/* Header */}
        <div className="mb-8">
          <div className="dashboard-card">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">Escalations Dashboard</h2>
                <p className="text-gray-600">
                  {stats.total} total escalations • {stats.overdue} overdue • Avg. {averageDaysOpen} days open
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="medium"
                  icon={<FiDownload />}
                  onClick={() => alert('Exporting escalations data...')}
                >
                  Export Report
                </Button>
                
                <Button
                  variant="primary"
                  size="medium"
                  icon={<FiBarChart2 />}
                  onClick={() => navigate('/admin/reports?tab=escalations')}
                >
                  View Analytics
                </Button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-8 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">{stats.total}</div>
                <p className="text-xs text-gray-600">Total</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-lg font-bold text-yellow-600">{stats.level1}</div>
                <p className="text-xs text-yellow-600">Level 1</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">{stats.level2}</div>
                <p className="text-xs text-orange-600">Level 2</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-lg font-bold text-red-600">{stats.level3}</div>
                <p className="text-xs text-red-600">Level 3</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-lg font-bold text-yellow-600">{stats.pending}</div>
                <p className="text-xs text-yellow-600">Pending</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{stats.inReview}</div>
                <p className="text-xs text-blue-600">In Review</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">{stats.resolved}</div>
                <p className="text-xs text-green-600">Resolved</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-lg font-bold text-red-600">{stats.overdue}</div>
                <p className="text-xs text-red-600">Overdue</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search escalations by title, ID, or customer..."
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
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                >
                  {levelOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                
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
        
        {/* Escalations List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading escalations...</p>
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
                      checked={selectedEscalations.length === filteredEscalations.length && filteredEscalations.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">
                      {selectedEscalations.length} of {filteredEscalations.length} selected
                    </span>
                  </div>
                  
                  {selectedEscalations.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="small"
                        onClick={() => setSelectedEscalations([])}
                      >
                        Deselect All
                      </Button>
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => alert(`Processing ${selectedEscalations.length} escalations...`)}
                      >
                        Bulk Actions
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Escalations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEscalations.map((escalation) => (
                <div
                  key={escalation.id}
                  className="dashboard-card hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedEscalations.includes(escalation.id)}
                        onChange={() => handleSelectEscalation(escalation.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div>
                        <span className="font-mono text-sm font-semibold text-purple-600">
                          {escalation.id}
                        </span>
                        <div className="text-xs text-gray-500">
                          Complaint: {escalation.complaintId}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiArrowUp className={`w-4 h-4 ${
                        escalation.level === 1 ? 'text-yellow-500' :
                        escalation.level === 2 ? 'text-orange-500' :
                        'text-red-500'
                      }`} />
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getLevelColor(escalation.level)}`}>
                        Level {escalation.level}
                      </span>
                    </div>
                  </div>
                  
                  {/* Escalation Details */}
                  <div className="space-y-3 mb-6">
                    <h3 className="font-semibold text-gray-900">{escalation.complaintTitle}</h3>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <FiUser className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{escalation.customer}</span>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(escalation.category)}`}>
                        {escalation.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(escalation.priority)}
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        escalation.priority === 'critical' ? 'bg-red-100 text-red-800' :
                        escalation.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        escalation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {escalation.priority}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Escalated By:</span>
                        <span className="font-medium">{escalation.escalatedBy}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Escalated To:</span>
                        <span className="font-medium">{escalation.escalatedTo}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Escalated On:</span>
                        <span className="font-medium">{escalation.escalationDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Deadline:</span>
                        <span className={`font-medium ${
                          new Date(escalation.deadline) < new Date() 
                            ? 'text-red-600' 
                            : 'text-gray-900'
                        }`}>
                          {escalation.deadline}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Reason:</span>
                      <p className="text-sm text-gray-600 mt-1">{escalation.escalationReason}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FiClock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{escalation.daysOpen} days open</span>
                      </div>
                      <StatusBadge status={escalation.status} />
                    </div>
                    
                    {escalation.resolution && (
                      <div className="p-2 bg-green-50 rounded">
                        <span className="text-sm font-medium text-green-700">Resolution:</span>
                        <p className="text-sm text-green-600 mt-1">{escalation.resolution}</p>
                      </div>
                    )}
                    
                    {escalation.dismissalReason && (
                      <div className="p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium text-gray-700">Dismissal Reason:</span>
                        <p className="text-sm text-gray-600 mt-1">{escalation.dismissalReason}</p>
                      </div>
                    )}
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Notes:</span>
                      <div className="space-y-1 mt-1">
                        {escalation.notes.slice(-2).map((note, index) => (
                          <div key={index} className="text-xs text-gray-500">
                            <span className="font-medium">{note.date}:</span> {note.note}
                          </div>
                        ))}
                        {escalation.notes.length > 2 && (
                          <div className="text-xs text-blue-600">
                            +{escalation.notes.length - 2} more notes
                          </div>
                        )}
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
                          onClick={() => navigate(`/admin/complaint/${escalation.complaintId}`)}
                          className="w-full"
                        >
                          View Complaint
                        </Button>
                      </div>
                      
                      {escalation.status === 'pending' || escalation.status === 'in-review' ? (
                        <>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="extra-small"
                              icon={<FiMessageSquare />}
                              onClick={() => navigate(`/admin/escalation/${escalation.id}/notes`)}
                              className="w-full"
                            >
                              Add Note
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant="outline"
                              size="extra-small"
                              icon={<FiCheckCircle />}
                              onClick={() => handleResolveEscalation(escalation.id)}
                              className="text-green-600 border-green-200 hover:bg-green-50"
                            >
                              Resolve
                            </Button>
                            <Button
                              variant="outline"
                              size="extra-small"
                              icon={<FiXCircle />}
                              onClick={() => handleDismissEscalation(escalation.id)}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              Dismiss
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="extra-small"
                              icon={<FiArrowUp />}
                              onClick={() => handleReassign(escalation.id)}
                              className="w-full"
                            >
                              Reassign Level
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="text-xs text-gray-500 text-center">
                          {escalation.status === 'resolved' ? (
                            <>Resolved on {escalation.resolutionDate}</>
                          ) : (
                            <>Dismissed</>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Empty State */}
            {filteredEscalations.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No escalations found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || levelFilter !== 'all' || statusFilter !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'No escalations at the moment.'}
                </p>
                {(searchTerm || levelFilter !== 'all' || statusFilter !== 'all') && (
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
        
        {/* Escalation Trends */}
        <div className="dashboard-card mt-8">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Escalation Trends</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {Math.round((stats.resolved / stats.total) * 100)}%
                </div>
                <p className="text-sm text-gray-600">Resolution Rate</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {averageDaysOpen} days
                </div>
                <p className="text-sm text-gray-600">Average Resolution Time</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">
                  {Math.round((stats.overdue / stats.total) * 100)}%
                </div>
                <p className="text-sm text-gray-600">Overdue Rate</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Escalation Prevention</h3>
                  <p className="text-sm text-gray-600">
                    Review common escalation causes and implement preventive measures.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate('/admin/prevention-analysis')}
                >
                  View Analysis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Escalations