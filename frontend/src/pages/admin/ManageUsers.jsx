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
  FiUserCheck,
  FiUserX,
  FiLock,
  FiUnlock
} from 'react-icons/fi'
import Button from '../../components/common/Button'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import '../../styles/dashboard.css'

const ManageUsers = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)

  const statusOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending Verification' },
    { value: 'banned', label: 'Banned' },
  ]

  // Use useMemo to compute filtered users
  const filteredUsers = useMemo(() => {
    let filtered = users

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter)
    }

    return filtered
  }, [users, searchTerm, statusFilter])

  // Load initial data
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockUsers = [
        {
          id: 'USR-001',
          name: 'Alice Johnson',
          email: 'alice@example.com',
          phone: '+1 (555) 123-4567',
          role: 'user',
          status: 'active',
          joinedDate: '2023-03-15',
          lastLogin: '2024-01-15 10:30',
          complaints: 12,
          verified: true,
          location: 'New York, USA',
        },
        {
          id: 'USR-002',
          name: 'Bob Smith',
          email: 'bob@example.com',
          phone: '+1 (555) 987-6543',
          role: 'user',
          status: 'active',
          joinedDate: '2023-04-22',
          lastLogin: '2024-01-14 14:20',
          complaints: 8,
          verified: true,
          location: 'Los Angeles, USA',
        },
        {
          id: 'USR-003',
          name: 'Carol Williams',
          email: 'carol@example.com',
          phone: '+1 (555) 456-7890',
          role: 'user',
          status: 'inactive',
          joinedDate: '2023-05-10',
          lastLogin: '2023-12-01 09:15',
          complaints: 3,
          verified: true,
          location: 'Chicago, USA',
        },
        {
          id: 'USR-004',
          name: 'David Brown',
          email: 'david@example.com',
          phone: '+1 (555) 321-6547',
          role: 'user',
          status: 'pending',
          joinedDate: '2024-01-10',
          lastLogin: '2024-01-10 16:45',
          complaints: 0,
          verified: false,
          location: 'Miami, USA',
        },
        {
          id: 'USR-005',
          name: 'Eva Davis',
          email: 'eva@example.com',
          phone: '+1 (555) 654-9871',
          role: 'user',
          status: 'active',
          joinedDate: '2023-06-05',
          lastLogin: '2024-01-15 08:20',
          complaints: 15,
          verified: true,
          location: 'Seattle, USA',
        },
        {
          id: 'USR-006',
          name: 'Frank Wilson',
          email: 'frank@example.com',
          phone: '+1 (555) 789-1234',
          role: 'user',
          status: 'banned',
          joinedDate: '2023-02-28',
          lastLogin: '2023-11-15 11:30',
          complaints: 25,
          verified: true,
          location: 'Boston, USA',
        },
        {
          id: 'USR-007',
          name: 'Grace Miller',
          email: 'grace@example.com',
          phone: '+1 (555) 147-2589',
          role: 'user',
          status: 'active',
          joinedDate: '2023-07-12',
          lastLogin: '2024-01-14 13:10',
          complaints: 7,
          verified: true,
          location: 'Austin, USA',
        },
        {
          id: 'USR-008',
          name: 'Henry Taylor',
          email: 'henry@example.com',
          phone: '+1 (555) 369-2581',
          role: 'user',
          status: 'inactive',
          joinedDate: '2023-08-19',
          lastLogin: '2023-10-30 15:45',
          complaints: 4,
          verified: true,
          location: 'Denver, USA',
        },
        {
          id: 'USR-009',
          name: 'Ivy Martin',
          email: 'ivy@example.com',
          phone: '+1 (555) 852-7419',
          role: 'user',
          status: 'active',
          joinedDate: '2023-09-25',
          lastLogin: '2024-01-13 10:15',
          complaints: 9,
          verified: true,
          location: 'Phoenix, USA',
        },
        {
          id: 'USR-010',
          name: 'Jack Anderson',
          email: 'jack@example.com',
          phone: '+1 (555) 963-8527',
          role: 'user',
          status: 'pending',
          joinedDate: '2024-01-05',
          lastLogin: '2024-01-05 14:30',
          complaints: 0,
          verified: false,
          location: 'Atlanta, USA',
        },
        {
          id: 'USR-011',
          name: 'Karen Thomas',
          email: 'karen@example.com',
          phone: '+1 (555) 741-8529',
          role: 'user',
          status: 'active',
          joinedDate: '2023-10-08',
          lastLogin: '2024-01-15 09:45',
          complaints: 11,
          verified: true,
          location: 'San Francisco, USA',
        },
        {
          id: 'USR-012',
          name: 'Leo Martinez',
          email: 'leo@example.com',
          phone: '+1 (555) 258-3691',
          role: 'user',
          status: 'active',
          joinedDate: '2023-11-30',
          lastLogin: '2024-01-14 16:20',
          complaints: 6,
          verified: true,
          location: 'Portland, USA',
        },
      ]
      
      setUsers(mockUsers)
      setLoading(false)
    }

    loadUsers()
  }, [])

  // Event handlers that reset pagination when filters change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to page 1 when searching
  }

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value)
    setCurrentPage(1) // Reset to page 1 when filter changes
  }

  const handleSelectUser = (id) => {
    setSelectedUsers(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(userId => userId !== id)
      } else {
        return [...prevSelected, id]
      }
    })
  }

  const handleSelectAll = () => {
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
    setSelectedUsers(prevSelected => {
      if (prevSelected.length === currentUsers.length) {
        return []
      } else {
        return currentUsers.map(user => user.id)
      }
    })
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      alert(`User ${userId} deleted successfully!`)
      // In real app, call API to delete user
    }
  }

  const handleToggleStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    if (window.confirm(`Change user status to ${newStatus}?`)) {
      alert(`User ${userId} status changed to ${newStatus}`)
      // In real app, call API to update user status
    }
  }

  const handleVerifyUser = (userId) => {
    if (window.confirm('Verify this user?')) {
      alert(`User ${userId} verified successfully!`)
      // In real app, call API to verify user
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'banned':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active':
        return <FiUserCheck className="w-4 h-4 text-green-600" />
      case 'inactive':
        return <FiUserX className="w-4 h-4 text-gray-600" />
      case 'pending':
        return <FiUserCheck className="w-4 h-4 text-yellow-600" />
      case 'banned':
        return <FiUserX className="w-4 h-4 text-red-600" />
      default:
        return <FiUserCheck className="w-4 h-4 text-gray-600" />
    }
  }

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Clear filters
  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setCurrentPage(1) // Also reset to page 1
  }

  return (
    <div className="dashboard-container">
      <Sidebar role="admin" />
      
      <div className="dashboard-content">
        <Header title="Manage Users" role="admin" />
        
        {/* Header */}
        <div className="mb-8">
          <div className="dashboard-card">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">User Management</h2>
                <p className="text-gray-600">
                  {users.length} total users • {users.filter(u => u.status === 'active').length} active • {users.filter(u => u.status === 'pending').length} pending
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="medium"
                  icon={<FiDownload />}
                  onClick={() => alert('Exporting users...')}
                >
                  Export
                </Button>
                
                <Button
                  variant="primary"
                  size="medium"
                  icon={<FiUserPlus />}
                  onClick={() => navigate('/admin/add-user')}
                >
                  Add User
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
                    placeholder="Search users by name, email, or ID..."
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
        
        {/* Users Table */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading users...</p>
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
                      checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">
                      {selectedUsers.length} of {filteredUsers.length} selected
                    </span>
                  </div>
                  
                  {selectedUsers.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="small"
                        onClick={() => setSelectedUsers([])}
                      >
                        Deselect All
                      </Button>
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => alert(`Processing ${selectedUsers.length} users...`)}
                      >
                        Bulk Actions
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Users List */}
            <div className="dashboard-card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-12"></th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Activity</th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="font-mono text-xs text-gray-500">{user.id}</span>
                                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                                  {user.role}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <FiMail className="w-3 h-3 text-gray-400" />
                              <span className="text-sm text-gray-900">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiPhone className="w-3 h-3 text-gray-400" />
                              <span className="text-sm text-gray-600">{user.phone}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{user.location}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(user.status)}
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(user.status)}`}>
                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {user.verified ? (
                                <span className="text-green-600">✓ Verified</span>
                              ) : (
                                <span className="text-yellow-600">Pending verification</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="text-sm">
                              <span className="font-medium text-gray-900">{user.complaints}</span>
                              <span className="text-gray-600"> complaints</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <FiCalendar className="w-3 h-3" />
                                <span>Joined: {user.joinedDate}</span>
                              </div>
                              <div className="mt-1">
                                <span>Last login: {user.lastLogin}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="extra-small"
                              icon={<FiEye />}
                              onClick={() => navigate(`/admin/user/${user.id}`)}
                            >
                              View
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="extra-small"
                              icon={<FiEdit />}
                              onClick={() => navigate(`/admin/edit-user/${user.id}`)}
                            >
                              Edit
                            </Button>
                            
                            {!user.verified && (
                              <Button
                                variant="outline"
                                size="extra-small"
                                icon={<FiUserCheck />}
                                onClick={() => handleVerifyUser(user.id)}
                                className="text-green-600 border-green-200 hover:bg-green-50"
                              >
                                Verify
                              </Button>
                            )}
                            
                            <Button
                              variant="outline"
                              size="extra-small"
                              icon={user.status === 'active' ? <FiLock /> : <FiUnlock />}
                              onClick={() => handleToggleStatus(user.id, user.status)}
                              className={user.status === 'active' ? 'text-yellow-600 border-yellow-200 hover:bg-yellow-50' : 'text-green-600 border-green-200 hover:bg-green-50'}
                            >
                              {user.status === 'active' ? 'Deactivate' : 'Activate'}
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="extra-small"
                              icon={<FiTrash2 />}
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Empty State */}
              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <FiSearch className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm || statusFilter !== 'all'
                      ? 'Try adjusting your search or filters'
                      : 'No users in the system yet.'}
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
              
              {/* Pagination */}
              {filteredUsers.length > 0 && (
                <div className="flex items-center justify-between p-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
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
      </div>
    </div>
  )
}

export default ManageUsers