import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FiUserCheck, 
  FiFileText, 
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiUpload,
  FiAward,
  FiBriefcase,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiCheck
} from 'react-icons/fi'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Modal from '../../components/common/Modal'
import Loader from '../../components/common/Loader'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import '../../styles/forms.css'

const EmployeeRequest = () => {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [showTestModal, setShowTestModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [testAnswers, setTestAnswers] = useState({})
  const [applicationStatus, setApplicationStatus] = useState(null)
  
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    
    // Educational Background
    highestEducation: '',
    institution: '',
    graduationYear: '',
    fieldOfStudy: '',
    
    // Professional Experience
    yearsOfExperience: '',
    currentPosition: '',
    currentCompany: '',
    skills: '',
    
    // Motivation
    motivation: '',
    
    // Documents
    resume: null,
    certificates: [],
    coverLetter: null,
    
    // Terms
    agreeToTerms: false,
    agreeToBackgroundCheck: false,
  })
  
  const [errors, setErrors] = useState({})

  // Qualification Test Questions
  const testQuestions = [
    {
      id: 1,
      question: 'What is your approach to handling confidential complaints?',
      options: [
        'Share with relevant team members only',
        'Keep strictly confidential',
        'Discuss with supervisor when needed',
        'Document everything but keep private'
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: 'How would you handle a complaint that requires immediate attention?',
      options: [
        'Escalate to supervisor immediately',
        'Address it within 24 hours',
        'Follow standard procedure',
        'Assess urgency then act'
      ],
      correctAnswer: 3
    },
    {
      id: 3,
      question: 'What is the most important quality for a staff member handling complaints?',
      options: [
        'Technical knowledge',
        'Communication skills',
        'Problem-solving ability',
        'Empathy and patience'
      ],
      correctAnswer: 3
    },
    {
      id: 4,
      question: 'How do you ensure fair treatment in complaint resolution?',
      options: [
        'Follow established protocols',
        'Treat each case individually',
        'Consult with team members',
        'Document all decisions'
      ],
      correctAnswer: 0
    },
    {
      id: 5,
      question: 'What would you do if you cannot resolve a complaint?',
      options: [
        'Escalate to higher authority',
        'Seek guidance from supervisor',
        'Inform the complainant',
        'All of the above'
      ],
      correctAnswer: 3
    }
  ]

  // Check existing application status
  useEffect(() => {
    // Simulate checking existing application
    setTimeout(() => {
      const mockStatus = {
        status: 'pending', // 'pending', 'approved', 'rejected', 'test-pending', 'test-completed'
        applicationDate: '2024-01-10',
        lastUpdate: '2024-01-12',
        testScore: null,
        feedback: ''
      }
      setApplicationStatus(mockStatus)
    }, 500)
  }, [])

  const steps = [
    { id: 1, title: 'Personal Info', description: 'Basic information' },
    { id: 2, title: 'Education', description: 'Academic background' },
    { id: 3, title: 'Experience', description: 'Professional experience' },
    { id: 4, title: 'Documents', description: 'Upload documents' },
    { id: 5, title: 'Review', description: 'Review & submit' },
  ]

  const validateStep = (step) => {
    const newErrors = {}
    
    switch(step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
        break
        
      case 2:
        if (!formData.highestEducation) newErrors.highestEducation = 'Highest education is required'
        if (!formData.institution.trim()) newErrors.institution = 'Institution name is required'
        if (!formData.graduationYear) newErrors.graduationYear = 'Graduation year is required'
        break
        
      case 3:
        if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required'
        if (!formData.skills.trim()) newErrors.skills = 'Please list your relevant skills'
        break
        
      case 4:
        if (!formData.resume) newErrors.resume = 'Resume is required'
        if (!formData.motivation.trim()) newErrors.motivation = 'Please explain your motivation'
        break
        
      case 5:
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms'
        if (!formData.agreeToBackgroundCheck) newErrors.agreeToBackgroundCheck = 'Background check consent is required'
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5))
    }
  }

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0] || null
      }))
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleFileUpload = (name, files) => {
    if (name === 'certificates') {
      setFormData(prev => ({
        ...prev,
        certificates: [...prev.certificates, ...Array.from(files)]
      }))
    }
  }

  const removeCertificate = (index) => {
    setFormData(prev => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index)
    }))
  }

  const handleTestAnswer = (questionId, answerIndex) => {
    setTestAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const calculateTestScore = () => {
    let score = 0
    testQuestions.forEach(question => {
      if (testAnswers[question.id] === question.correctAnswer) {
        score++
      }
    })
    return (score / testQuestions.length) * 100
  }

  const handleSubmitTest = () => {
    const score = calculateTestScore()
    setShowTestModal(false)
    
    if (score >= 70) {
      setShowSuccessModal(true)
      // In real app, this would submit to backend
      setApplicationStatus({
        status: 'test-completed',
        testScore: score,
        lastUpdate: new Date().toISOString().split('T')[0]
      })
    } else {
      alert(`Test score: ${score.toFixed(0)}%. Minimum required: 70%. Please try again.`)
    }
  }

  const handleSubmitApplication = async (e) => {
    e.preventDefault()
    
    if (!validateStep(5)) {
      return
    }
    
    setSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Show test modal for qualification test
      setShowTestModal(true)
      
    } catch (error) {
      console.error('Submission error:', error)
      setErrors({ general: 'Failed to submit application. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                error={errors.fullName}
                required
                icon={<FiUserCheck />}
              />
              
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                error={errors.email}
                required
                icon={<FiMail />}
              />
              
              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                error={errors.phone}
                required
                icon={<FiPhone />}
              />
              
              <Input
                label="Date of Birth"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                error={errors.dateOfBirth}
                required
                icon={<FiCalendar />}
              />
            </div>
            
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your complete address"
              icon={<FiMapPin />}
            />
          </div>
        )
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Educational Background</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label required">Highest Education</label>
                <select
                  name="highestEducation"
                  value={formData.highestEducation}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select education level</option>
                  <option value="high-school">High School</option>
                  <option value="associate">Associate Degree</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
                {errors.highestEducation && (
                  <p className="form-error-message">{errors.highestEducation}</p>
                )}
              </div>
              
              <Input
                label="Institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="University/College name"
                error={errors.institution}
                required
                icon={<FiAward />}
              />
              
              <Input
                label="Graduation Year"
                type="number"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                placeholder="e.g., 2020"
                error={errors.graduationYear}
                required
                min="1900"
                max="2024"
              />
              
              <Input
                label="Field of Study"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                placeholder="e.g., Computer Science"
              />
            </div>
          </div>
        )
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Professional Experience</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label required">Years of Experience</label>
                <select
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
                {errors.yearsOfExperience && (
                  <p className="form-error-message">{errors.yearsOfExperience}</p>
                )}
              </div>
              
              <Input
                label="Current Position"
                name="currentPosition"
                value={formData.currentPosition}
                onChange={handleChange}
                placeholder="e.g., Customer Service Representative"
                icon={<FiBriefcase />}
              />
              
              <Input
                label="Current Company"
                name="currentCompany"
                value={formData.currentCompany}
                onChange={handleChange}
                placeholder="Company/organization name"
              />
            </div>
            
            <div>
              <label className="form-label required">Relevant Skills</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="form-textarea min-h-[100px]"
                placeholder="List your relevant skills (comma-separated)"
                required
              />
              {errors.skills && (
                <p className="form-error-message">{errors.skills}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Example: Complaint Handling, Communication, Problem Solving, Conflict Resolution
              </p>
            </div>
          </div>
        )
        
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Documents & Motivation</h3>
            
            {/* Resume Upload */}
            <div className="form-group">
              <label className="form-label required">Resume/CV</label>
              <div className="file-upload">
                <input
                  type="file"
                  name="resume"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <div className="upload-icon">
                    <FiUpload className="w-12 h-12 mx-auto" />
                  </div>
                  <div className="upload-text">
                    <p className="font-medium">Upload your resume</p>
                    <p className="text-sm text-gray-500 mt-1">
                      PDF or DOC format, max 5MB
                    </p>
                  </div>
                </label>
              </div>
              {formData.resume && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FiFileText className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">{formData.resume.name}</p>
                        <p className="text-sm text-green-700">
                          {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, resume: null }))}
                      className="p-1 hover:bg-green-100 rounded"
                    >
                      <FiXCircle className="w-4 h-4 text-green-600" />
                    </button>
                  </div>
                </div>
              )}
              {errors.resume && (
                <p className="form-error-message">{errors.resume}</p>
              )}
            </div>
            
            {/* Certificates Upload */}
            <div className="form-group">
              <label className="form-label">Certificates (Optional)</label>
              <div className="file-upload">
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileUpload('certificates', e.target.files)}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id="certificates-upload"
                />
                <label htmlFor="certificates-upload" className="cursor-pointer">
                  <div className="upload-icon">
                    <FiAward className="w-12 h-12 mx-auto" />
                  </div>
                  <div className="upload-text">
                    <p className="font-medium">Upload certificates</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Upload relevant certifications (optional)
                    </p>
                  </div>
                </label>
              </div>
              
              {formData.certificates.length > 0 && (
                <div className="mt-3 space-y-2">
                  {formData.certificates.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FiFileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCertificate(index)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <FiXCircle className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Motivation */}
            <div className="form-group">
              <label className="form-label required">
                Why do you want to become a staff member?
              </label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                className="form-textarea min-h-[150px]"
                placeholder="Explain your motivation and why you would be a good fit for this role..."
                required
              />
              {errors.motivation && (
                <p className="form-error-message">{errors.motivation}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Minimum 100 characters. This helps us understand your interest and suitability.
              </p>
            </div>
          </div>
        )
        
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Review & Submit</h3>
            
            {/* Application Summary */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{formData.fullName || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{formData.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{formData.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{formData.dateOfBirth || 'Not provided'}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Education</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Highest Education</p>
                    <p className="font-medium">{formData.highestEducation || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Institution</p>
                    <p className="font-medium">{formData.institution || 'Not provided'}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Experience</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Years of Experience</p>
                    <p className="font-medium">{formData.yearsOfExperience || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Skills</p>
                    <p className="font-medium">{formData.skills || 'Not provided'}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Documents</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className={`w-4 h-4 ${formData.resume ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className="text-sm">Resume: {formData.resume ? 'Uploaded' : 'Not uploaded'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Certificates: {formData.certificates.length} uploaded</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Terms and Conditions */}
            <div className="space-y-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <div>
                  <span className="text-gray-700 font-medium">
                    I agree to the terms and conditions
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    I understand that this application will be reviewed by administrators and 
                    I may be required to undergo additional screening or interviews.
                  </p>
                </div>
              </label>
              {errors.agreeToTerms && (
                <p className="form-error-message">{errors.agreeToTerms}</p>
              )}
              
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreeToBackgroundCheck"
                  checked={formData.agreeToBackgroundCheck}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <div>
                  <span className="text-gray-700 font-medium">
                    I consent to background verification
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    I authorize the verification of the information provided in this application, 
                    including education and employment history.
                  </p>
                </div>
              </label>
              {errors.agreeToBackgroundCheck && (
                <p className="form-error-message">{errors.agreeToBackgroundCheck}</p>
              )}
            </div>
            
            {errors.general && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}
          </div>
        )
        
      default:
        return null
    }
  }

  // If user already has an application
  if (applicationStatus) {
    return (
      <div className="dashboard-container">
        <Sidebar role="user" />
        
        <div className="dashboard-content">
          <Header title="Employee Application Status" role="user" />
          
          <div className="max-w-4xl mx-auto">
            {/* Status Card */}
            <div className="dashboard-card mb-8">
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">Application Status</h2>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  applicationStatus.status === 'approved' ? 'bg-green-100 text-green-800' :
                  applicationStatus.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {applicationStatus.status === 'approved' ? 'Approved' :
                   applicationStatus.status === 'rejected' ? 'Rejected' :
                   applicationStatus.status === 'test-completed' ? 'Test Completed' :
                   'Under Review'}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center">
                    {applicationStatus.status === 'approved' ? (
                      <FiCheckCircle className="w-10 h-10 text-green-500" />
                    ) : applicationStatus.status === 'rejected' ? (
                      <FiXCircle className="w-10 h-10 text-red-500" />
                    ) : (
                      <FiClock className="w-10 h-10 text-yellow-500" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {applicationStatus.status === 'approved' ? 'Application Approved!' :
                       applicationStatus.status === 'rejected' ? 'Application Not Approved' :
                       'Application Under Review'}
                    </h3>
                    <p className="text-gray-600">
                      {applicationStatus.status === 'approved' ? 
                        'Congratulations! Your application has been approved. You will receive further instructions via email.' :
                       applicationStatus.status === 'rejected' ? 
                        'Thank you for your application. Unfortunately, we cannot proceed with your application at this time.' :
                        'Your application is currently being reviewed. You may be contacted for additional information or an interview.'}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Application Date</p>
                    <p className="font-semibold">{applicationStatus.applicationDate}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Last Update</p>
                    <p className="font-semibold">{applicationStatus.lastUpdate}</p>
                  </div>
                  {applicationStatus.testScore !== null && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Test Score</p>
                      <p className="font-semibold">{applicationStatus.testScore.toFixed(0)}%</p>
                    </div>
                  )}
                </div>
                
                {applicationStatus.feedback && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Feedback</h4>
                    <p className="text-gray-700">{applicationStatus.feedback}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Next Steps */}
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">Next Steps</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {applicationStatus.status === 'approved' && (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <FiMail className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Check your email</p>
                          <p className="text-sm text-gray-600">Look for onboarding instructions</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <FiUserCheck className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Complete onboarding</p>
                          <p className="text-sm text-gray-600">Follow the provided instructions</p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {applicationStatus.status === 'rejected' && (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                          <FiClock className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-medium">Reapply later</p>
                          <p className="text-sm text-gray-600">You can reapply after 90 days</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <FiMail className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Contact support</p>
                          <p className="text-sm text-gray-600">For questions about your application</p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {applicationStatus.status === 'test-completed' && (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <FiCheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Test completed</p>
                          <p className="text-sm text-gray-600">Your test score: {applicationStatus.testScore.toFixed(0)}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                          <FiClock className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-medium">Under review</p>
                          <p className="text-sm text-gray-600">Administrator will review your application</p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/user/dashboard')}
                    >
                      Back to Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <Sidebar role="user" />
      
      <div className="dashboard-content">
        <Header title="Become a Staff Member" role="user" />
        
        <div className="max-w-4xl mx-auto">
          {/* Application Header */}
          <div className="dashboard-card mb-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-emerald-400 flex items-center justify-center mx-auto mb-4">
                <FiUserCheck className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Apply to Become a Staff Member
              </h1>
              <p className="text-gray-600 mb-6">
                Complete this application form to apply for a staff position. 
                You'll need to pass a qualification test and background check.
              </p>
              
              {/* Progress Steps */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="flex flex-col items-center mb-4 md:mb-0"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        currentStep >= step.id
                          ? 'bg-gradient-to-r from-purple-600 to-emerald-400 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <FiCheck className="w-5 h-5" />
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>
                    <div className="text-center">
                      <p className={`text-sm font-medium ${
                        currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-emerald-400 transition-all duration-300"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Application Form */}
          <form onSubmit={handleSubmitApplication}>
            <div className="dashboard-card mb-8">
              {renderStep()}
            </div>
            
            {/* Form Navigation */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                size="large"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < steps.length ? (
                <Button
                  type="button"
                  variant="primary"
                  size="large"
                  onClick={handleNextStep}
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  loading={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              )}
            </div>
          </form>
          
          {/* Requirements Info */}
          <div className="dashboard-card mt-8">
            <h3 className="font-semibold text-gray-900 mb-4">Requirements & Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Eligibility Criteria</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-green-500" />
                    Minimum 18 years of age
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-green-500" />
                    Clean background check
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-green-500" />
                    Good communication skills
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-green-500" />
                    Basic computer proficiency
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Application Process</h4>
                <ol className="space-y-2 text-sm text-gray-600 list-decimal pl-5">
                  <li>Submit application form</li>
                  <li>Take qualification test</li>
                  <li>Background verification</li>
                  <li>Interview (if required)</li>
                  <li>Final decision & onboarding</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Qualification Test Modal */}
      <Modal
        isOpen={showTestModal}
        onClose={() => setShowTestModal(false)}
        title="Qualification Test"
        size="large"
        showCloseButton={false}
        backdropClose={false}
      >
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <FiFileText className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Staff Qualification Test
            </h3>
            <p className="text-gray-600">
              Please answer all questions carefully. You need at least 70% to pass.
            </p>
          </div>
          
          <div className="space-y-8">
            {testQuestions.map((question, index) => (
              <div key={question.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                <h4 className="font-medium text-gray-900 mb-4">
                  Question {index + 1}: {question.question}
                </h4>
                <div className="space-y-3">
                  {question.options.map((option, optIndex) => (
                    <label
                      key={optIndex}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        testAnswers[question.id] === optIndex
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        checked={testAnswers[question.id] === optIndex}
                        onChange={() => handleTestAnswer(question.id, optIndex)}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span className="flex-1">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              {Object.keys(testAnswers).length} of {testQuestions.length} questions answered
            </div>
            <Button
              variant="primary"
              onClick={handleSubmitTest}
              disabled={Object.keys(testAnswers).length < testQuestions.length}
            >
              Submit Test
            </Button>
          </div>
        </div>
      </Modal>
      
      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Application Submitted Successfully!"
        size="medium"
      >
        <div className="text-center p-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
            <FiCheck className="w-10 h-10 text-white" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Test Score: {calculateTestScore().toFixed(0)}%
          </h3>
          
          <p className="text-gray-600 mb-6">
            Congratulations! You have passed the qualification test. 
            Your application has been submitted for review.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-2">What happens next?</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                Administrator review of your application
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                Background verification process
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Notification of final decision
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowSuccessModal(false)
                navigate('/user/request-status')
              }}
              fullWidth
            >
              Check Status
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setShowSuccessModal(false)
                navigate('/user/dashboard')
              }}
              fullWidth
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </Modal>
      
      {submitting && <Loader fullScreen />}
    </div>
  )
}

export default EmployeeRequest