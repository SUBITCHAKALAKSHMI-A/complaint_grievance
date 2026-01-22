import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FiSearch,
  FiFilter,
  FiEdit,
  FiTrash2,
  FiEye,
  FiUserPlus,
  FiDownload,
  FiMail,
  FiPhone,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiBarChart2,
  FiShield,
  FiStar,
  FiTrendingUp
} from 'react-icons/fi'
import Button from '../../components/common/Button'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import '../../styles/dashboard.css'

const ManageStaff = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [staff, setStaff] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedStaff, setSelectedStaff] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [staffPerPage] = useState(10)

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'customer-service', label: 'Customer Service' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'quality', label: 'Quality Assurance' },
  ]

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'on-leave', label: 'On Leave' },
    { value: 'probation', label: 'Probation' },
  ]

  // Load initial data
  useEffect(() => {
    const loadStaff = async () => {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockStaff = [
        {
          id: 'STF-001',
          name: 'John Doe',
          email: 'john.doe@company.com',
          phone: '+1 (555) 111-2222',
          department: 'technical',
          position: 'Senior Support Specialist',
          status: 'active',
          hireDate: '2022-03-15',
          performance: 92,
          resolvedComplaints: 142,
          satisfaction: 4.7,
          workload: 8,
          skills: ['Technical Support', 'Network Troubleshooting', 'CRM'],
          lastActivity: '2024-01-15 09:30',
        },
        {
          id: 'STF-002',
          name: 'Jane Smith',
          email: 'jane.smith@company.com',
          phone: '+1 (555) 222-3333',
          department: 'customer-service',
          position: 'Customer Service Manager',
          status: 'active',
          hireDate: '2021-11-20',
          performance: 88,
          resolvedComplaints: 189,
          satisfaction: 4.5,
          workload: 6,
          skills: ['Customer Service', 'Communication', 'Problem Solving'],
          lastActivity: '2024-01-15 10:15',
        },
        {
          id: 'STF-003',
          name: 'Robert Johnson',
          email: 'robert.johnson@company.com',
          phone: '+1 (555) 333-4444',
          department: 'finance',
          position: 'Finance Specialist',
          status: 'active',
          hireDate: '2022-06-10',
          performance: 85,
          resolvedComplaints: 67,
          satisfaction: 4.6,
          workload: 5,
          skills: ['Financial Analysis', 'Billing', 'Excel'],
          lastActivity: '2024-01-14 14:20',
        },
        {
          id: 'STF-004',
          name: 'Sarah Wilson',
          email: 'sarah.wilson@company.com',
          phone: '+1 (555) 444-5555',
          department: 'hr',
          position: 'HR Coordinator',
          status: 'active',
          hireDate: '2022-01-05',
          performance: 90,
          resolvedComplaints: 54,
          satisfaction: 4.8,
          workload: 7,
          skills: ['HR Management', 'Conflict Resolution', 'Training'],
          lastActivity: '2024-01-15 08:45',
        },
        {
          id: 'STF-005',
          name: 'Michael Brown',
          email: 'michael.brown@company.com',
          phone: '+1 (555) 555-6666',
          department: 'technical',
          position: 'Network Engineer',
          status: 'inactive',
          hireDate: '2021-08-30',
          performance: 78,
          resolvedComplaints: 98,
          satisfaction: 4.2,
          workload: 0,
          skills: ['Network Engineering', 'Security', 'Linux'],
          lastActivity: '2023-12-10 11:30',
        },
        {
          id: 'STF-006',
          name: 'Emily Davis',
          email: 'emily.davis@company.com',
          phone: '+1 (555) 666-7777',
          department: 'quality',
          position: 'Quality Analyst',
          status: 'active',
          hireDate: '2022-09-15',
          performance: 87,
          resolvedComplaints: 76,
          satisfaction: 4.4,
          workload: 4,
          skills: ['Quality Assurance', 'Testing', 'Documentation'],
          lastActivity: '2024-01-14 16:10',
        },
        {
          id: 'STF-007',
          name: 'David Miller',
          email: 'david.miller@company.com',
          phone: '+1 (555) 777-8888',
          department: 'customer-service',
          position: 'Support Specialist',
          status: 'probation',
          hireDate: '2023-10-01',
          performance: 82,
          resolvedComplaints: 23,
          satisfaction: 4.3,
          workload: 9,
          skills: ['Customer Support', 'Ticketing Systems', 'Communication'],
          lastActivity: '2024-01-15 11:20',
        },
        {
          id: 'STF-008',
          name: 'Lisa Taylor',
          email: 'lisa.taylor@company.com',
          phone: '+1 (555) 888-9999',
          department: 'finance',
          position: 'Billing Specialist',
          status: 'on-leave',
          hireDate: '2022-04-22',
          performance: 89,
          resolvedComplaints: 45,
          satisfaction: 4.6,
          workload: 0,
          skills: ['Billing', 'Accounting', 'Customer Service'],
          lastActivity: '2023-12-20 13:45',
        },
        {
          id: 'STF-009',
          name: 'James Wilson',
          email: 'james.wilson@company.com',
          phone: '+1 (555) 999-0000',
          department: 'technical',
          position: 'Software Support',
          status: 'active',
          hireDate: '2022-12-01',
          performance: 84,
          resolvedComplaints: 31,
          satisfaction: 4.5,
          workload: 6,
          skills: ['Software Support', 'Troubleshooting', 'Programming'],
          lastActivity: '2024-01-15 09:10',
        },
        {
          id: 'STF-010',
          name: 'Maria Garcia',
          email: 'maria.garcia@company.com',
          phone: '+1 (555) 000-1111',
          department: 'hr',
          position: 'Training Coordinator',
          status: 'active',
          hireDate: '2023-02-14',
          performance: 91,
          resolvedComplaints: 39,
          satisfaction: 4.7,
          workload: 5,
          skills: ['Training', 'HR', 'Communication'],
          lastActivity: '2024-01-14 15:30',
        },
        {
          id: 'STF-011',
          name: 'Thomas Anderson',
          email: 'thomas.anderson@company.com',
          phone: '+1 (555) 121-2121',
          department: 'quality',
          position: 'Compliance Officer',
          status: 'active',
          hireDate: '2021-12-05',
          performance: 86,
          resolvedComplaints: 62,
          satisfaction: 4.4,
          workload: 3,
          skills: ['Compliance', 'Quality Control', 'Auditing'],
          lastActivity: '2024-01-13 10:45',
        },
        {
          id: 'STF-012',
          name: 'Sophia Martinez',
          email: 'sophia.martinez@company.com',
          phone: '+1 (555) 232-3232',
          department: 'customer-service',
          position: 'Customer Success Manager',
          status: 'active',
          hireDate: '2022-07-18',
          performance: 93,
          resolvedComplaints: 112,
          satisfaction: 4.8,
          workload: 7,
          skills: ['Customer Success', 'Account Management', 'Sales'],
          lastActivity: '2024-01-15 14:20',
        },
      ]
      
      setStaff(mockStaff)
      setLoading(false)
    }

    loadStaff()
  }, [])

  // Use useMemo to compute filtered staff
  const filteredStaff = useMemo(() => {
    let filtered = staff

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.position.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply department filter
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(member => member.department === departmentFilter)
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(member => member.status === statusFilter)
    }

    return filtered
  }, [staff, searchTerm, departmentFilter, statusFilter])

  // Event handlers that reset pagination when filters change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to page 1
  }

  const handleDepartmentFilterChange = (e) => {
    setDepartmentFilter(e.target.value)
    setCurrentPage(1) // Reset to page 1
  }

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value)
    setCurrentPage(1) // Reset to page 1
  }

  const handleSelectStaff = (id) => {
    setSelectedStaff(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(staffId => staffId !== id)
      } else {
        return [...prevSelected, id]
      }
    })
  }

  const handleSelectAll = () => {
    const currentStaff = filteredStaff.slice(indexOfFirstStaff, indexOfLastStaff)
    setSelectedStaff(prevSelected => {
      if (prevSelected.length === currentStaff.length) {
        return []
      } else {
        return currentStaff.map(member => member.id)
      }
    })
  }

  const handleDeleteStaff = (staffId) => {
    if (window.confirm('Are you sure you want to remove this staff member? This action cannot be undone.')) {
      alert(`Staff member ${staffId} removed successfully!`)
    }
  }

  const handleToggleStatus = (staffId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    if (window.confirm(`Change staff status to ${newStatus}?`)) {
      alert(`Staff ${staffId} status changed to ${newStatus}`)
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

  const getStatusColor = (status) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'on-leave':
        return 'bg-blue-100 text-blue-800'
      case 'probation':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  // Pagination logic
  const indexOfLastStaff = currentPage * staffPerPage
  const indexOfFirstStaff = indexOfLastStaff - staffPerPage
  const currentStaff = filteredStaff.slice(indexOfFirstStaff, indexOfLastStaff)
  const totalPages = Math.ceil(filteredStaff.length / staffPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const clearFilters = () => {
    setSearchTerm('')
    setDepartmentFilter('all')
    setStatusFilter('all')
    setCurrentPage(1) // Also reset to page 1
  }

  const departmentStats = staff.reduce((acc, member) => {
    acc[member.department] = (acc[member.department] || 0) + 1
    return acc
  }, {})

  return (
    <div className="dashboard-container">
      <Sidebar role="admin" />
      
      <div className="dashboard-content">
        <Header title="Manage Staff" role="admin" />
        
        {/* Header */}
        <div className="mb-8">
          <div className="dashboard-card">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">Staff Management</h2>
                <p className="text-gray-600">
                  {staff.length} total staff • {staff.filter(s => s.status === 'active').length} active • {staff.filter(s => s.status === 'probation').length} in probation
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="medium"
                  icon={<FiDownload />}
                  onClick={() => alert('Exporting staff data...')}
                >
                  Export
                </Button>
                
                <Button
                  variant="primary"
                  size="medium"
                  icon={<FiUserPlus />}
                  onClick={() => navigate('/admin/add-staff')}
                >
                  Add Staff
                </Button>
              </div>
            </div>
            
            {/* Department Stats */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-3">
                {Object.entries(departmentStats).map(([dept, count]) => (
                  <div
                    key={dept}
                    className={`px-3 py-2 rounded-lg ${getDepartmentColor(dept)} text-sm font-medium`}
                  >
                    {dept.replace('-', ' ').toUpperCase()}: {count}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search staff by name, email, or position..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              
              {/* Filters */}
              <div className="flex gap-4">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={departmentFilter}
                  onChange={handleDepartmentFilterChange}
                >
                  {departmentOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
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
        
        {/* Staff Table */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading staff data...</p>
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
                      checked={selectedStaff.length === currentStaff.length && currentStaff.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">
                      {selectedStaff.length} of {filteredStaff.length} selected
                    </span>
                  </div>
                  
                  {selectedStaff.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="small"
                        onClick={() => setSelectedStaff([])}
                      >
                        Deselect All
                      </Button>
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => alert(`Processing ${selectedStaff.length} staff members...`)}
                      >
                        Bulk Actions
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Staff List */}
            <div className="dashboard-card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-12"></th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Staff Member</th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department & Position</th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Performance</th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentStaff.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <input
                            type="checkbox"
                            checked={selectedStaff.includes(member.id)}
                            onChange={() => handleSelectStaff(member.id)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{member.name}</p>
                              <div className="space-y-1 mt-1">
                                <div className="flex items-center gap-2">
                                  <FiMail className="w-3 h-3 text-gray-400" />
                                  <span className="text-xs text-gray-600">{member.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FiPhone className="w-3 h-3 text-gray-400" />
                                  <span className="text-xs text-gray-600">{member.phone}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDepartmentColor(member.department)}`}>
                                {member.department.replace('-', ' ').toUpperCase()}
                              </span>
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                                {member.position}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <FiCalendar className="w-3 h-3" />
                                <span>Hired: {member.hireDate}</span>
                              </div>
                              <div className="mt-1">
                                <span>Last activity: {member.lastActivity}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FiBarChart2 className={`w-4 h-4 ${getPerformanceColor(member.performance)}`} />
                                <span className={`font-semibold ${getPerformanceColor(member.performance)}`}>
                                  {member.performance}%
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FiStar className="w-3 h-3 text-yellow-500" />
                                <span className="text-xs font-medium">{member.satisfaction}/5</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs">
                                <span className="font-medium">{member.resolvedComplaints}</span>
                                <span className="text-gray-600"> resolved complaints</span>
                              </div>
                              <div className="text-xs">
                                <span className="font-medium">{member.workload}</span>
                                <span className="text-gray-600"> current workload</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {member.skills.slice(0, 3).map((skill, index) => (
                                <span
                                  key={index}
                                  className="text-xs px-2 py-0.5 bg-gray-100 text-gray-800 rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                              {member.skills.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{member.skills.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              {member.status === 'active' ? (
                                <FiCheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <FiXCircle className="w-4 h-4 text-red-600" />
                              )}
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(member.status)}`}>
                                {member.status.replace('-', ' ').toUpperCase()}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {member.workload > 8 ? (
                                <span className="text-red-600">High workload</span>
                              ) : member.workload > 5 ? (
                                <span className="text-yellow-600">Moderate workload</span>
                              ) : (
                                <span className="text-green-600">Low workload</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="extra-small"
                                icon={<FiEye />}
                                onClick={() => navigate(`/admin/staff/${member.id}`)}
                                className="w-full"
                              >
                                View Profile
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="extra-small"
                                icon={<FiEdit />}
                                onClick={() => navigate(`/admin/edit-staff/${member.id}`)}
                                className="w-full"
                              >
                                Edit
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="extra-small"
                                icon={member.status === 'active' ? <FiXCircle /> : <FiCheckCircle />}
                                onClick={() => handleToggleStatus(member.id, member.status)}
                                className={`w-full ${
                                  member.status === 'active'
                                    ? 'text-red-600 border-red-200 hover:bg-red-50'
                                    : 'text-green-600 border-green-200 hover:bg-green-50'
                                }`}
                              >
                                {member.status === 'active' ? 'Deactivate' : 'Activate'}
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="extra-small"
                                icon={<FiTrash2 />}
                                onClick={() => handleDeleteStaff(member.id)}
                                className="w-full text-red-600 border-red-200 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Empty State */}
              {filteredStaff.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <FiSearch className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No staff found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm || departmentFilter !== 'all' || statusFilter !== 'all'
                      ? 'Try adjusting your search or filters'
                      : 'No staff members in the system yet.'}
                  </p>
                  {(searchTerm || departmentFilter !== 'all' || statusFilter !== 'all') && (
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                    >
                      Clear all filters
                    </Button>
                  )}
                </div>
              )}
              
              {/* Pagination */}
              {filteredStaff.length > 0 && (
                <div className="flex items-center justify-between p-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Showing {indexOfFirstStaff + 1} to {Math.min(indexOfLastStaff, filteredStaff.length)} of {filteredStaff.length} staff members
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium ${
                            currentPage === number
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {number}
                        </button>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        
        {/* Performance Summary */}
        <div className="dashboard-card mt-8">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Performance Summary</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Math.round(staff.reduce((sum, m) => sum + m.performance, 0) / staff.length)}%
                </div>
                <p className="text-sm text-gray-600">Average Performance</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {staff.reduce((sum, m) => sum + m.resolvedComplaints, 0)}
                </div>
                <p className="text-sm text-gray-600">Total Resolved</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.round(staff.reduce((sum, m) => sum + m.satisfaction, 0) / staff.length * 10) / 10}/5
                </div>
                <p className="text-sm text-gray-600">Avg. Satisfaction</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {Math.round(staff.reduce((sum, m) => sum + m.workload, 0) / staff.length)}
                </div>
                <p className="text-sm text-gray-600">Avg. Workload</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Need to manage workloads?</h3>
                  <p className="text-sm text-gray-600">
                    Reassign tasks from overloaded staff to optimize performance.
                  </p>
                </div>
                <Button
                  variant="primary"
                  onClick={() => navigate('/admin/assign-complaints')}
                >
                  Reassign Tasks
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageStaff