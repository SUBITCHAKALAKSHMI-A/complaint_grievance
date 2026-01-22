import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FiCheckCircle, 
  FiClock, 
  FiAlertCircle,
  FiXCircle,
  FiFileText,
  FiDownload,
  FiRefreshCw,
  FiMail,
  FiPhone,
  FiUser,
  FiCalendar,
  FiPercent,
  FiEye,
  FiShare2
} from 'react-icons/fi'
import Button from '../../components/common/Button'
import StatusBadge from '../../components/common/StatusBadge'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import '../../styles/dashboard.css'

const RequestStatus = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [applications, setApplications] = useState([])
  const [selectedApplication, setSelectedApplication] = useState(null)

  // Define mockApplications inside useCallback to avoid dependency issues
  const getMockApplications = useCallback(() => {
    return [
      {
        id: 'APP-2024-001',
        type: 'Staff Application',
        submittedDate: '2024-01-10',
        lastUpdate: '2024-01-12',
        status: 'under-review',
        testScore: 85,
        progress: 75,
        estimatedCompletion: '2024-01-20',
        steps: [
          { id: 1, name: 'Application Submitted', status: 'completed', date: '2024-01-10' },
          { id: 2, name: 'Qualification Test', status: 'completed', date: '2024-01-11', score: 85 },
          { id: 3, name: 'Document Review', status: 'in-progress', date: '2024-01-12' },
          { id: 4, name: 'Background Check', status: 'pending', estimatedDate: '2024-01-15' },
          { id: 5, name: 'Final Decision', status: 'pending', estimatedDate: '2024-01-20' },
        ],
        documents: [
          { name: 'resume.pdf', type: 'Resume', uploaded: '2024-01-10' },
          { name: 'certificate1.pdf', type: 'Certificate', uploaded: '2024-01-10' },
          { name: 'test_results.pdf', type: 'Test Results', uploaded: '2024-01-11' },
        ],
        feedback: '',
        contactPerson: 'Jane Smith (HR Department)',
        contactEmail: 'hr@example.com',
        contactPhone: '+1 (555) 123-4567',
      },
      {
        id: 'APP-2023-045',
        type: 'Staff Application',
        submittedDate: '2023-12-01',
        lastUpdate: '2023-12-15',
        status: 'approved',
        testScore: 92,
        progress: 100,
        approvedDate: '2023-12-15',
        steps: [
          { id: 1, name: 'Application Submitted', status: 'completed', date: '2023-12-01' },
          { id: 2, name: 'Qualification Test', status: 'completed', date: '2023-12-03', score: 92 },
          { id: 3, name: 'Document Review', status: 'completed', date: '2023-12-05' },
          { id: 4, name: 'Background Check', status: 'completed', date: '2023-12-10' },
          { id: 5, name: 'Final Approval', status: 'completed', date: '2023-12-15' },
        ],
        documents: [
          { name: 'resume_old.pdf', type: 'Resume', uploaded: '2023-12-01' },
          { name: 'approval_letter.pdf', type: 'Approval Letter', uploaded: '2023-12-15' },
        ],
        feedback: 'Application approved. Welcome to the team!',
        contactPerson: 'John Doe (Admin)',
        contactEmail: 'admin@example.com',
        contactPhone: '+1 (555) 987-6543',
      },
      {
        id: 'APP-2023-028',
        type: 'Staff Application',
        submittedDate: '2023-11-15',
        lastUpdate: '2023-11-25',
        status: 'rejected',
        testScore: 65,
        progress: 60,
        rejectedDate: '2023-11-25',
        steps: [
          { id: 1, name: 'Application Submitted', status: 'completed', date: '2023-11-15' },
          { id: 2, name: 'Qualification Test', status: 'completed', date: '2023-11-18', score: 65 },
          { id: 3, name: 'Document Review', status: 'completed', date: '2023-11-20' },
          { id: 4, name: 'Background Check', status: 'failed', date: '2023-11-25' },
          { id: 5, name: 'Final Decision', status: 'cancelled', date: '2023-11-25' },
        ],
        documents: [
          { name: 'resume_rejected.pdf', type: 'Resume', uploaded: '2023-11-15' },
          { name: 'rejection_letter.pdf', type: 'Rejection Letter', uploaded: '2023-11-25' },
        ],
        feedback: 'Application rejected due to insufficient test score. Minimum required: 70%. You may reapply after 90 days.',
        contactPerson: 'HR Department',
        contactEmail: 'hr@example.com',
        contactPhone: '+1 (555) 123-4567',
      },
    ]
  }, []) // No dependencies needed

  // Fixed: Define loadApplications with proper dependencies
  const loadApplications = useCallback(async () => {
    setLoading(true)
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        const mockData = getMockApplications()
        setApplications(mockData)
        setSelectedApplication(mockData[0])
        setLoading(false)
        setRefreshing(false)
        resolve()
      }, 1000)
    })
  }, [getMockApplications]) // Include getMockApplications as a dependency

  // Fixed: Proper useEffect with async function
  useEffect(() => {
    let mounted = true
    
    const fetchData = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (mounted) {
          const mockData = getMockApplications()
          setApplications(mockData)
          setSelectedApplication(mockData[0])
          setLoading(false)
        }
      } catch (error) {
        if (mounted) {
          console.error('Error loading applications:', error)
          setLoading(false)
        }
      }
    }
    
    fetchData()
    
    return () => {
      mounted = false
    }
  }, [getMockApplications]) // Include getMockApplications as a dependency

  const handleRefresh = () => {
    setRefreshing(true)
    loadApplications().then(() => {
      setRefreshing(false)
    })
  }

  const handleViewDetails = (application) => {
    setSelectedApplication(application)
  }

  const handleDownloadDocuments = (application) => {
    // Simulate download functionality
    alert(`Downloading all documents for ${application.id}`)
  }

  const handleContactSupport = () => {
    alert('Opening support contact options...')
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved':
        return <FiCheckCircle className="w-5 h-5 text-green-500" />
      case 'rejected':
        return <FiXCircle className="w-5 h-5 text-red-500" />
      case 'under-review':
        return <FiClock className="w-5 h-5 text-yellow-500" />
      default:
        return <FiAlertCircle className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderApplicationSteps = (steps) => {
    return (
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="flex items-start gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              step.status === 'completed' ? 'bg-green-100 text-green-600' :
              step.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
              step.status === 'failed' ? 'bg-red-100 text-red-600' :
              'bg-gray-100 text-gray-400'
            }`}>
              {step.status === 'completed' ? (
                <FiCheckCircle className="w-4 h-4" />
              ) : step.status === 'in-progress' ? (
                <FiClock className="w-4 h-4" />
              ) : step.status === 'failed' ? (
                <FiXCircle className="w-4 h-4" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-current"></div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-medium text-gray-900">{step.name}</h4>
                  {step.date && (
                    <p className="text-sm text-gray-500">
                      {step.status === 'completed' ? 'Completed on ' : ''}
                      {step.date}
                    </p>
                  )}
                  {step.estimatedDate && step.status === 'pending' && (
                    <p className="text-sm text-gray-500">
                      Estimated: {step.estimatedDate}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {step.score && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <FiPercent className="w-3 h-3" />
                      {step.score}%
                    </span>
                  )}
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    step.status === 'completed' ? 'bg-green-100 text-green-800' :
                    step.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    step.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {step.status === 'in-progress' ? 'In Progress' :
                     step.status === 'completed' ? 'Completed' :
                     step.status === 'failed' ? 'Failed' :
                     'Pending'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderApplicationDetails = (application) => {
    if (!application) return null

    return (
      <div className="space-y-6">
        {/* Application Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{application.type}</h2>
            <p className="text-gray-600">Application ID: {application.id}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
              {application.status === 'approved' ? 'Approved' :
               application.status === 'rejected' ? 'Rejected' :
               'Under Review'}
            </span>
            <Button
              variant="outline"
              size="small"
              icon={<FiDownload />}
              onClick={() => handleDownloadDocuments(application)}
            >
              Download All
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Application Progress</span>
            <span>{application.progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                application.status === 'approved' ? 'bg-green-500' :
                application.status === 'rejected' ? 'bg-red-500' :
                'bg-blue-500'
              }`}
              style={{ width: `${application.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Key Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Submitted</p>
            <p className="font-semibold">{application.submittedDate}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Last Update</p>
            <p className="font-semibold">{application.lastUpdate}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Test Score</p>
            <p className="font-semibold">{application.testScore}%</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Status</p>
            <div className="flex items-center gap-2">
              {getStatusIcon(application.status)}
              <span className="font-semibold capitalize">{application.status.replace('-', ' ')}</span>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="dashboard-card mb-6">
          <div className="dashboard-card-header">
            <h3 className="dashboard-card-title">Application Process</h3>
          </div>
          <div className="p-6">
            {renderApplicationSteps(application.steps)}
          </div>
        </div>

        {/* Documents */}
        <div className="dashboard-card mb-6">
          <div className="dashboard-card-header">
            <h3 className="dashboard-card-title">Documents</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {application.documents.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FiFileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{doc.type}</span>
                        <span>Uploaded: {doc.uploaded}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="small"
                    icon={<FiDownload />}
                    onClick={() => alert(`Downloading ${doc.name}`)}
                  >
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback */}
        {application.feedback && (
          <div className="dashboard-card mb-6">
            <div className="dashboard-card-header">
              <h3 className="dashboard-card-title">
                {application.status === 'approved' ? 'Approval Message' :
                 application.status === 'rejected' ? 'Feedback' :
                 'Latest Update'}
              </h3>
            </div>
            <div className="p-6">
              <div className={`p-4 rounded-lg ${
                application.status === 'approved' ? 'bg-green-50 border border-green-200' :
                application.status === 'rejected' ? 'bg-red-50 border border-red-200' :
                'bg-blue-50 border border-blue-200'
              }`}>
                <p className="text-gray-700 whitespace-pre-line">{application.feedback}</p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3 className="dashboard-card-title">Contact Information</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiUser className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact Person</p>
                  <p className="font-medium">{application.contactPerson}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FiMail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{application.contactEmail}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <FiPhone className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{application.contactPhone}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button
                variant="primary"
                onClick={handleContactSupport}
                icon={<FiMail />}
                fullWidth
              >
                Contact Support
              </Button>
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
        <Header title="Request Status" role="user" />
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Application Status</h1>
              <p className="text-gray-600">Track the status of your staff applications</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="medium"
                icon={<FiRefreshCw />}
                onClick={handleRefresh}
                loading={refreshing}
              >
                Refresh
              </Button>
              
              <Button
                variant="primary"
                size="medium"
                onClick={() => navigate('/user/employee-request')}
              >
                New Application
              </Button>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading applications...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Applications List */}
            <div className="lg:col-span-1">
              <div className="dashboard-card">
                <div className="dashboard-card-header">
                  <h2 className="dashboard-card-title">My Applications</h2>
                  <span className="text-sm text-gray-500">{applications.length} total</span>
                </div>
                
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedApplication?.id === app.id
                          ? 'bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 shadow-sm'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => handleViewDetails(app)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(app.status)}
                          <span className="font-medium">{app.type}</span>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(app.status)}`}>
                          {app.status === 'approved' ? 'Approved' :
                           app.status === 'rejected' ? 'Rejected' :
                           'Reviewing'}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">ID:</span>
                          <span className="font-mono">{app.id}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Submitted:</span>
                          <span>{app.submittedDate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Test Score:</span>
                          <span className="font-medium">{app.testScore}%</span>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{app.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              app.status === 'approved' ? 'bg-green-500' :
                              app.status === 'rejected' ? 'bg-red-500' :
                              'bg-blue-500'
                            }`}
                            style={{ width: `${app.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {applications.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <FiFileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Applications</h3>
                    <p className="text-gray-600 mb-6">
                      You haven't submitted any staff applications yet.
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => navigate('/user/employee-request')}
                    >
                      Start Application
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Statistics */}
              <div className="dashboard-card mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Application Statistics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Applications</span>
                    <span className="font-semibold">{applications.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Approved</span>
                    <span className="font-semibold text-green-600">
                      {applications.filter(a => a.status === 'approved').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">In Review</span>
                    <span className="font-semibold text-yellow-600">
                      {applications.filter(a => a.status === 'under-review').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rejected</span>
                    <span className="font-semibold text-red-600">
                      {applications.filter(a => a.status === 'rejected').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Average Test Score</span>
                    <span className="font-semibold">
                      {applications.length > 0 
                        ? (applications.reduce((sum, app) => sum + app.testScore, 0) / applications.length).toFixed(0)
                        : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Application Details */}
            <div className="lg:col-span-2">
              {selectedApplication ? (
                renderApplicationDetails(selectedApplication)
              ) : (
                <div className="dashboard-card">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <FiEye className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Select an Application</h3>
                    <p className="text-gray-600 mb-6">
                      Choose an application from the list to view detailed status and information.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Help Section */}
              <div className="dashboard-card mt-8">
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FiPhone className="w-5 h-5 text-blue-600" />
                        <h4 className="font-medium">Phone Support</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Call our support team for immediate assistance.
                      </p>
                      <p className="font-medium text-blue-700">+1 (555) 123-4567</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FiMail className="w-5 h-5 text-green-600" />
                        <h4 className="font-medium">Email Support</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Send us an email for detailed inquiries.
                      </p>
                      <p className="font-medium text-green-700">support@grievanceportal.com</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Common Questions</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-sm">How long does the review process take?</p>
                          <p className="text-sm text-gray-600">Typically 7-14 business days</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-sm">Can I update my application?</p>
                          <p className="text-sm text-gray-600">Yes, until it's under review</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-sm">What if my application is rejected?</p>
                          <p className="text-sm text-gray-600">You can reapply after 90 days</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RequestStatus