import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiBriefcase,
  FiEdit,
  FiSave,
  FiLock,
  FiBell,
  FiKey,
  FiShield,
  FiActivity,
  FiTrendingUp,
  FiCheckCircle,
  FiClock
} from 'react-icons/fi'
import Button from '../../components/common/Button'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import '../../styles/dashboard.css'

const StaffProfile = () => {
  const navigate = useNavigate() // Kept for future navigation features
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState(null)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    // Simulate API call to fetch profile
    setTimeout(() => {
      const mockProfile = {
        id: 'EMP-00123',
        name: 'John Doe',
        email: 'john.doe@company.com',
        phone: '+1 (555) 123-4567',
        position: 'Senior Support Specialist',
        department: 'Customer Service',
        joiningDate: '2022-03-15',
        address: '123 Main St, San Francisco, CA 94107',
        bio: 'Experienced customer support professional with 5+ years in technical support and complaint resolution. Specialized in network and software issues.',
        skills: [
          'Customer Service',
          'Technical Support',
          'Problem Solving',
          'Communication',
          'CRM Software',
          'Network Troubleshooting'
        ],
        certifications: [
          'Certified Customer Service Professional (CCSP)',
          'ITIL Foundation Certification',
          'CompTIA A+'
        ],
        stats: {
          totalResolved: 342,
          satisfactionRate: 92,
          avgResolutionTime: '2.8 days',
          currentWorkload: 8
        },
        notifications: {
          email: true,
          sms: false,
          push: true,
          dailyDigest: true,
          weeklyReport: true
        },
        security: {
          twoFactorEnabled: true,
          lastPasswordChange: '2024-01-01',
          lastLogin: '2024-01-15 09:30',
          activeSessions: 2
        }
      }
      
      setProfile(mockProfile)
      setFormData({
        name: mockProfile.name,
        email: mockProfile.email,
        phone: mockProfile.phone,
        position: mockProfile.position,
        department: mockProfile.department,
        address: mockProfile.address,
        bio: mockProfile.bio
      })
      setLoading(false)
    }, 1000)
  }, [])

  const handleSave = async () => {
    setSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      setProfile(prev => ({ ...prev, ...formData }))
      setSaving(false)
      setEditing(false)
      alert('Profile updated successfully!')
    }, 1500)
  }

  const handleCancel = () => {
    setFormData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      position: profile.position,
      department: profile.department,
      address: profile.address,
      bio: profile.bio
    })
    setEditing(false)
  }

  const performanceMetrics = [
    { label: 'Resolution Rate', value: '94%', change: '+2%', color: 'text-green-600', icon: FiTrendingUp },
    { label: 'Avg. Response Time', value: '2.4h', change: '-0.3h', color: 'text-blue-600', icon: FiClock },
    { label: 'Customer Satisfaction', value: '4.7/5', change: '+0.2', color: 'text-purple-600', icon: FiCheckCircle },
    { label: 'Escalation Rate', value: '8%', change: '-3%', color: 'text-yellow-600', icon: FiActivity },
  ]

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar role="staff" />
        <div className="dashboard-content">
          <Header title="Profile" role="staff" />
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading profile...</p>
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
        <Header title="Profile" role="staff" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Info */}
          <div className="lg:col-span-2">
            {/* Profile Header */}
            <div className="dashboard-card mb-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {!editing && (
                      <button
                        className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        onClick={() => setEditing(true)}
                      >
                        <FiEdit className="w-5 h-5 text-gray-600" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      {editing ? (
                        <input
                          type="text"
                          className="text-2xl font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      ) : (
                        <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {profile.position}
                        </span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-600">{profile.department}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Employee ID</p>
                      <p className="font-mono font-semibold text-purple-600">{profile.id}</p>
                    </div>
                  </div>
                  
                  {/* Bio */}
                  <div className="mb-6">
                    {editing ? (
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="3"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Write a brief bio about yourself..."
                      />
                    ) : (
                      <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                    )}
                  </div>
                  
                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FiMail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        {editing ? (
                          <input
                            type="email"
                            className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        ) : (
                          <p className="font-medium text-gray-900">{profile.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <FiPhone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        {editing ? (
                          <input
                            type="tel"
                            className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        ) : (
                          <p className="font-medium text-gray-900">{profile.phone}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <FiMapPin className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        {editing ? (
                          <input
                            type="text"
                            className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          />
                        ) : (
                          <p className="font-medium text-gray-900">{profile.address}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <FiCalendar className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Joined On</p>
                        <p className="font-medium text-gray-900">{profile.joiningDate}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Edit Buttons */}
                  {editing && (
                    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
                      <Button
                        variant="primary"
                        size="medium"
                        icon={<FiSave />}
                        loading={saving}
                        onClick={handleSave}
                      >
                        Save Changes
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="medium"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Performance Metrics */}
            <div className="dashboard-card mb-8">
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">Performance Metrics</h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {performanceMetrics.map((metric, index) => {
                    const Icon = metric.icon
                    return (
                      <div key={index} className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Icon className={`w-5 h-5 ${metric.color}`} />
                          <span className="text-sm text-gray-600">{metric.label}</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                        <span className={`text-sm font-medium ${metric.color}`}>
                          {metric.change}
                        </span>
                      </div>
                    )
                  })}
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Complaint Statistics</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total Resolved</span>
                        <span className="font-semibold">{profile.stats.totalResolved}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Satisfaction Rate</span>
                        <span className="font-semibold text-green-600">
                          {profile.stats.satisfactionRate}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Avg. Resolution Time</span>
                        <span className="font-semibold">{profile.stats.avgResolutionTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Current Workload</span>
                        <span className="font-semibold">{profile.stats.currentWorkload}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Settings */}
          <div>
            {/* Certifications */}
            <div className="dashboard-card mb-8">
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">Certifications</h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  {profile.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <FiBriefcase className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">{cert}</span>
                    </div>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="small"
                  className="w-full mt-4"
                  onClick={() => navigate('/staff/add-certification')} // Now using navigate
                >
                  Add Certification
                </Button>
              </div>
            </div>
            
            {/* Notification Settings */}
            <div className="dashboard-card mb-8">
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">
                  <FiBell className="inline mr-2" />
                  Notifications
                </h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  {Object.entries(profile.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={value}
                          onChange={() => navigate('/staff/notification-settings')} // Now using navigate
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Security Settings */}
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">
                  <FiShield className="inline mr-2" />
                  Security
                </h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-500">Add an extra layer of security</p>
                    </div>
                    <span className={`text-sm font-medium ${
                      profile.security.twoFactorEnabled ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {profile.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Last Password Change</p>
                      <p className="text-xs text-gray-500">{profile.security.lastPasswordChange}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Last Login</p>
                      <p className="text-xs text-gray-500">{profile.security.lastLogin}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Active Sessions</p>
                      <p className="text-xs text-gray-500">{profile.security.activeSessions} devices</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        size="small"
                        icon={<FiKey />}
                        className="w-full"
                        onClick={() => navigate('/staff/change-password')} // Now using navigate
                      >
                        Change Password
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="small"
                        icon={<FiShield />}
                        className="w-full"
                        onClick={() => navigate('/staff/two-factor')} // Now using navigate
                      >
                        Manage 2FA
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="small"
                        className="w-full text-red-600 hover:text-red-700 hover:border-red-200"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to log out from all devices?')) {
                            alert('Logged out from all devices')
                            navigate('/login') // Now using navigate
                          }
                        }}
                      >
                        Log Out All Devices
                      </Button>
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

export default StaffProfile