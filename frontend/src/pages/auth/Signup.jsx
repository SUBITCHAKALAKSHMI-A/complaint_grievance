import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiMessageSquare, FiCheck } from 'react-icons/fi'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Loader from '../../components/common/Loader'
import '../../styles/auth.css'

const Signup = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    role: 'user',
  })
  const [errors, setErrors] = useState({})

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    return strength
  }

  const getPasswordStrengthText = (strength) => {
    if (strength <= 25) return { text: 'Weak', color: 'text-red-500' }
    if (strength <= 50) return { text: 'Fair', color: 'text-orange-500' }
    if (strength <= 75) return { text: 'Good', color: 'text-blue-500' }
    return { text: 'Strong', color: 'text-green-500' }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock user data
      const mockUser = {
        id: Math.floor(Math.random() * 1000) + 1,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        token: 'mock-jwt-token'
      }
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(mockUser))
      localStorage.setItem('token', mockUser.token)
      
      // Show success message
      console.log('Signup successful:', mockUser)
      
      // Redirect to role selection or dashboard
      if (formData.role === 'user') {
        navigate('/user/dashboard')
      } else {
        navigate('/select-role')
      }
      
    } catch (error) {
      console.error('Signup error:', error)
      setErrors({ 
        general: 'Signup failed. Please try again.' 
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    
    // Update password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value))
    }
  }

  const strengthInfo = getPasswordStrengthText(passwordStrength)

  return (
    <div className="auth-container" style={{ minHeight: '100vh', width: '100vw' }}>
      {/* Left Side - Gradient Background */}
      <div className="auth-left">
        <div className="auth-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                width: `${Math.random() * 40 + 10}px`,
                height: `${Math.random() * 40 + 10}px`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            />
          ))}
        </div>
        
        <div className="auth-illustration">
          <div className="illustration-container">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm mx-auto mb-6 flex items-center justify-center">
                  <FiMessageSquare className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                <p className="text-white/80 max-w-md">
                  Create your account to submit complaints, track their progress, and help us build a better grievance resolution system.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">1000+</div>
                    <div className="text-sm text-white/70">Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">95%</div>
                    <div className="text-sm text-white/70">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm text-white/70">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Signup Form */}
      <div className="auth-right">
        <div className="auth-content">
          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-logo">
                <div className="auth-logo-icon">
                  <FiMessageSquare />
                </div>
                <span className="auth-logo-text">Grievance Portal</span>
              </div>
              <h1 className="auth-title">Create Account</h1>
              <p className="auth-subtitle">Join our platform and start submitting complaints</p>
            </div>
            
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="auth-form">
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                error={errors.name}
                icon={<FiUser className="text-gray-400" />}
                disabled={loading}
                required
              />
              
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                error={errors.email}
                icon={<FiMail className="text-gray-400" />}
                disabled={loading}
                required
              />
              
              <div className="mb-4">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  error={errors.password}
                  icon={<FiLock className="text-gray-400" />}
                  iconPosition="right"
                  disabled={loading}
                  required
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  }
                />
                
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">Password strength:</span>
                      <span className={`text-xs font-medium ${strengthInfo.color}`}>
                        {strengthInfo.text}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          passwordStrength <= 25 ? 'bg-red-500' :
                          passwordStrength <= 50 ? 'bg-orange-500' :
                          passwordStrength <= 75 ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-1">
                      <div className="flex items-center gap-1">
                        <FiCheck className={`w-3 h-3 ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-300'}`} />
                        <span className="text-xs text-gray-600">8+ characters</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiCheck className={`w-3 h-3 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                        <span className="text-xs text-gray-600">Uppercase</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiCheck className={`w-3 h-3 ${/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                        <span className="text-xs text-gray-600">Number</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiCheck className={`w-3 h-3 ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                        <span className="text-xs text-gray-600">Special</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                error={errors.confirmPassword}
                icon={<FiLock className="text-gray-400" />}
                iconPosition="right"
                disabled={loading}
                required
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                }
              />
              
              <div className="mt-4 mb-6">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    disabled={loading}
                    className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="/terms" className="text-blue-600 hover:underline font-medium">
                      Terms of Service
                    </a>
                    {' '}and{' '}
                    <a href="/privacy" className="text-blue-600 hover:underline font-medium">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>
                )}
              </div>
              
              <Button
                type="submit"
                variant="primary"
                size="large"
                fullWidth
                loading={loading}
                className="mt-4"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
            
            <div className="auth-divider">
              <span>Already have an account?</span>
            </div>
            
            <div className="text-center">
              <Link to="/login">
                <Button
                  variant="outline"
                  size="large"
                  fullWidth
                  disabled={loading}
                >
                  Sign In Instead
                </Button>
              </Link>
            </div>
            
            <div className="auth-footer">
              <p>
                Need help?{' '}
                <Link to="/help" className="font-semibold text-blue-600 hover:text-blue-700">
                  Contact Support
                </Link>
              </p>
              <p className="mt-2">
                Or{' '}
                <Link to="/select-role" className="font-semibold text-purple-600 hover:text-purple-700">
                  select a specific role
                </Link>
                {' '}if you're joining as staff/admin
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              By creating an account, you agree to our{' '}
              <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
      
      {loading && <Loader fullScreen />}
    </div>
  )
}

export default Signup