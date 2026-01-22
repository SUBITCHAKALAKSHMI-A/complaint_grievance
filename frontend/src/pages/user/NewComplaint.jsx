import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FiFileText, 
  FiUpload, 
  FiAlertCircle,
  FiLock,
  FiGlobe,
  FiX,
  FiCheck
} from 'react-icons/fi'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Modal from '../../components/common/Modal'
import Loader from '../../components/common/Loader'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import '../../styles/forms.css'

const NewComplaint = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [submissionMode, setSubmissionMode] = useState('public') // 'public' or 'anonymous'
  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    priority: 'medium',
    department: '',
    contactEmail: '',
    contactPhone: '',
  })
  const [errors, setErrors] = useState({})

  const categories = [
    'Technical',
    'Service',
    'Finance',
    'HR',
    'Facilities',
    'Security',
    'Academic',
    'Administrative',
    'Other'
  ]

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-orange-600' },
    { value: 'critical', label: 'Critical', color: 'text-red-600' },
  ]

  const departments = [
    'IT Department',
    'Customer Service',
    'Finance Department',
    'HR Department',
    'Facilities Management',
    'Academic Affairs',
    'Administration',
    'General'
  ]

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles([...files, ...selectedFiles])
  }

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters'
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters'
    }
    
    if (!formData.priority) {
      newErrors.priority = 'Priority is required'
    }
    
    if (!formData.department) {
      newErrors.department = 'Department is required'
    }
    
    if (submissionMode === 'public') {
      if (!formData.contactEmail.trim()) {
        newErrors.contactEmail = 'Email is required for public submissions'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
        newErrors.contactEmail = 'Please enter a valid email'
      }
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
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Show confirmation modal
      setShowConfirmation(true)
      
    } catch (error) {
      console.error('Submission error:', error)
      setErrors({ 
        general: 'Failed to submit complaint. Please try again.' 
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleConfirmationClose = () => {
    setShowConfirmation(false)
    navigate('/user/complaints')
  }

  return (
    <div className="dashboard-container">
      <Sidebar role="user" />
      
      <div className="dashboard-content">
        <Header title="New Complaint" role="user" />
        
        <div className="max-w-4xl mx-auto">
          {/* Submission Mode Selection */}
          <div className="dashboard-card mb-8">
            <div className="dashboard-card-header">
              <h2 className="dashboard-card-title">Submission Mode</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => setSubmissionMode('public')}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    submissionMode === 'public'
                      ? 'border-purple-500 bg-purple-50 shadow-lg transform scale-105'
                      : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      submissionMode === 'public'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <FiGlobe className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-lg">Public Submission</h3>
                      <p className="text-sm text-gray-600">Track status and get updates</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <FiCheck className="w-4 h-4 text-green-500" />
                      Full status tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheck className="w-4 h-4 text-green-500" />
                      Email notifications
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheck className="w-4 h-4 text-green-500" />
                      Direct communication
                    </li>
                  </ul>
                </button>
                
                <button
                  onClick={() => setSubmissionMode('anonymous')}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    submissionMode === 'anonymous'
                      ? 'border-purple-500 bg-purple-50 shadow-lg transform scale-105'
                      : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      submissionMode === 'anonymous'
                        ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <FiLock className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-lg">Anonymous Submission</h3>
                      <p className="text-sm text-gray-600">Complete privacy protection</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <FiCheck className="w-4 h-4 text-green-500" />
                      No personal information
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheck className="w-4 h-4 text-green-500" />
                      Limited tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheck className="w-4 h-4 text-green-500" />
                      Enhanced privacy
                    </li>
                  </ul>
                </button>
              </div>
            </div>
          </div>
          
          {/* Complaint Form */}
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h2 className="dashboard-card-title">Complaint Details</h2>
            </div>
            
            {errors.general && (
              <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <Input
                  label="Complaint Title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Brief summary of your complaint"
                  error={errors.title}
                  required
                />
                
                <div className="form-group">
                  <label className="form-label required">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="form-error-message">{errors.category}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label className="form-label required">Priority</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {priorities.map((priority) => (
                      <button
                        key={priority.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, priority: priority.value }))}
                        className={`p-4 rounded-lg border-2 text-center transition-all ${
                          formData.priority === priority.value
                            ? 'border-purple-500 bg-purple-50 shadow-md'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className={`text-sm font-semibold ${priority.color}`}>
                          {priority.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {priority.value === 'low' && 'No urgency'}
                          {priority.value === 'medium' && 'Normal'}
                          {priority.value === 'high' && 'Urgent'}
                          {priority.value === 'critical' && 'Immediate'}
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.priority && (
                    <p className="form-error-message">{errors.priority}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label className="form-label required">Affected Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="form-error-message">{errors.department}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label className="form-label required">
                    Detailed Description
                    <span className="text-gray-500 font-normal ml-2">
                      (Minimum 50 characters)
                    </span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-textarea min-h-[200px]"
                    placeholder="Provide detailed information about your complaint. Include dates, locations, people involved, and any other relevant details."
                    required
                  />
                  <div className="flex justify-between mt-1">
                    {errors.description ? (
                      <p className="form-error-message">{errors.description}</p>
                    ) : (
                      <p className="text-sm text-gray-500">
                        {formData.description.length}/50 characters minimum
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      {formData.description.length}/5000 characters
                    </p>
                  </div>
                </div>
                
                {/* Contact Information (only for public submissions) */}
                {submissionMode === 'public' && (
                  <div className="border-t pt-6 mt-6">
                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Email Address"
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        placeholder="Enter your email for updates"
                        error={errors.contactEmail}
                        required
                      />
                      
                      <Input
                        label="Phone Number (Optional)"
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                )}
                
                {/* File Upload */}
                <div className="form-group">
                  <label className="form-label">Supporting Documents</label>
                  <div className="file-upload">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="upload-icon">
                        <FiUpload className="w-12 h-12 mx-auto" />
                      </div>
                      <div className="upload-text">
                        <p className="font-medium">Click to upload files</p>
                        <p className="text-sm text-gray-500 mt-1">
                          or drag and drop files here
                        </p>
                      </div>
                      <div className="upload-hint">
                        PDF, JPG, PNG, DOC up to 10MB each
                      </div>
                    </label>
                  </div>
                  
                  {/* File List */}
                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <FiFileText className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <FiX className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Form Actions */}
                <div className="form-actions border-t pt-6 mt-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="large"
                      onClick={() => navigate('/user/dashboard')}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    
                    <Button
                      type="submit"
                      variant="primary"
                      size="large"
                      loading={loading}
                      className="flex-1"
                    >
                      {loading ? 'Submitting...' : 'Submit Complaint'}
                    </Button>
                  </div>
                  
                  <div className="mt-4 text-center text-sm text-gray-500">
                    <p>
                      By submitting this complaint, you agree to our{' '}
                      <a href="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </a>
                      . {submissionMode === 'anonymous' && 'Your identity will remain confidential.'}
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
        title="Complaint Submitted Successfully!"
        size="medium"
      >
        <div className="text-center p-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
            <FiCheck className="w-10 h-10 text-white" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Complaint ID: CMP-00{Math.floor(Math.random() * 10000)}
          </h3>
          
          <p className="text-gray-600 mb-6">
            Your complaint has been successfully submitted. 
            {submissionMode === 'public' 
              ? ' You will receive updates via email.' 
              : ' Your identity is protected.'
            }
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-2">What happens next?</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                Complaint will be reviewed within 24 hours
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                Assigned to relevant department
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Resolution updates will be provided
              </li>
            </ul>
          </div>
          
          <Button
            onClick={handleConfirmationClose}
            variant="primary"
            size="large"
            fullWidth
          >
            Track My Complaint
          </Button>
        </div>
      </Modal>
      
      {loading && <Loader fullScreen />}
    </div>
  )
}

export default NewComplaint