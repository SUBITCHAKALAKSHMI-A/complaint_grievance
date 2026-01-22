import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiUser, FiUsers, FiShield, FiCheck, FiArrowRight } from 'react-icons/fi'
import Button from '../../components/common/Button'
import Loader from '../../components/common/Loader'
import '../../styles/auth.css'

const RoleSelect = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState('user')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const roles = [
    {
      id: 'user',
      title: 'Regular User',
      icon: <FiUser />,
      description: 'Submit complaints, track status, and get updates on your grievances.',
      features: [
        'Submit anonymous or public complaints',
        'Track complaint status in real-time',
        'Upload supporting documents',
        'Receive email notifications',
        'View resolution timeline',
      ],
      color: 'from-purple-600 to-pink-600',
    },
    {
      id: 'staff',
      title: 'Staff Member',
      icon: <FiUsers />,
      description: 'Handle assigned complaints, update status, and communicate with users.',
      features: [
        'View assigned complaints',
        'Update complaint status',
        'Add internal notes',
        'Communicate with users',
        'Access staff dashboard',
      ],
      color: 'from-blue-600 to-cyan-600',
    },
    {
      id: 'admin',
      title: 'Administrator',
      icon: <FiShield />,
      description: 'Manage users, assign complaints, generate reports, and oversee the system.',
      features: [
        'Manage all users and staff',
        'Assign complaints to staff',
        'Generate analytics reports',
        'Handle escalations',
        'System configuration',
      ],
      color: 'from-emerald-600 to-green-600',
    },
  ]

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId)
  }

  const handleContinue = () => {
    if (!selectedRole) return
    
    setLoading(true)
    
    // Simulate API call to set user role
    setTimeout(() => {
      setLoading(false)
      
      // Store selected role
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      user.role = selectedRole
      localStorage.setItem('user', JSON.stringify(user))
      
      // Show confirmation
      setShowConfirmation(true)
      
      // Auto-navigate after showing confirmation
      setTimeout(() => {
        switch (selectedRole) {
          case 'admin':
            navigate('/admin/dashboard')
            break
          case 'staff':
            navigate('/staff/dashboard')
            break
          default:
            navigate('/user/dashboard')
        }
      }, 2000)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      {showConfirmation ? (
        <div className="max-w-md w-full text-center animate-in fade-in-0 zoom-in-95">
          <div className="mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Role Selected Successfully!
            </h1>
            <p className="text-gray-600">
              You have been registered as a{' '}
              <span className="font-semibold text-purple-600 capitalize">
                {selectedRole}
              </span>
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${roles.find(r => r.id === selectedRole)?.color} flex items-center justify-center`}>
                {roles.find(r => r.id === selectedRole)?.icon}
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 capitalize">{selectedRole} Dashboard</h3>
                <p className="text-sm text-gray-500">Redirecting you now...</p>
              </div>
            </div>
            
            <div className="mt-4">
              <Loader type="dots" size="medium" color="primary" />
            </div>
          </div>
          
          <p className="text-sm text-gray-500">
            If you're not redirected automatically,{' '}
            <button
              onClick={() => navigate(`/${selectedRole}/dashboard`)}
              className="text-blue-600 hover:underline font-medium"
            >
              click here
            </button>
          </p>
        </div>
      ) : (
        <div className="max-w-6xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-emerald-400 flex items-center justify-center">
                <FiShield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-900 to-emerald-400 bg-clip-text text-transparent">
                Select Your Role
              </h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Choose how you want to use the Grievance Portal. Your role determines 
              the features and permissions you'll have access to.
            </p>
          </div>
          
          {/* Role Selection */}
          <div className="role-selection">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`role-card ${role.id} ${selectedRole === role.id ? 'selected' : ''}`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <div className={`role-icon bg-gradient-to-r ${role.color}`}>
                  {role.icon}
                </div>
                <h3 className="role-title">{role.title}</h3>
                <p className="role-description">{role.description}</p>
                
                <div className="mt-4 space-y-2">
                  {role.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FiCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <div className={`h-1 w-full rounded-full ${selectedRole === role.id ? 'bg-gradient-to-r from-purple-600 to-emerald-400' : 'bg-gray-200'}`}></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Selected Role Info */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${roles.find(r => r.id === selectedRole)?.color} flex items-center justify-center`}>
                  {roles.find(r => r.id === selectedRole)?.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {roles.find(r => r.id === selectedRole)?.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {roles.find(r => r.id === selectedRole)?.description}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">What you'll get:</h4>
                <ul className="space-y-2">
                  {roles.find(r => r.id === selectedRole)?.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="large"
              onClick={() => navigate('/signup')}
              disabled={loading}
            >
              Back to Signup
            </Button>
            
            <Button
              variant="primary"
              size="large"
              onClick={handleContinue}
              loading={loading}
              icon={<FiArrowRight />}
              iconPosition="right"
            >
              Continue as {roles.find(r => r.id === selectedRole)?.title}
            </Button>
          </div>
          
          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-gray-500 max-w-2xl mx-auto">
            <p>
              <strong>Note:</strong> Your role can be changed later by an administrator. 
              Some roles may require additional verification or approval.
            </p>
            <p className="mt-2">
              Need help choosing?{' '}
              <button className="text-blue-600 hover:underline font-medium">
                Contact support for guidance
              </button>
            </p>
          </div>
        </div>
      )}
      
      {loading && <Loader fullScreen />}
    </div>
  )
}

export default RoleSelect