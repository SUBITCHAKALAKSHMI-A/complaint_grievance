import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  FiClock, 
  FiMessageSquare, 
  FiUser, 
  FiCheckCircle,
  FiAlertCircle,
  FiFileText,
  FiDownload,
  FiArrowLeft,
  FiMail,
  FiCalendar,
  FiTag,
  FiFlag,
  FiShare2,
  FiPrinter
} from 'react-icons/fi'
import Button from '../../components/common/Button'
import StatusBadge from '../../components/common/StatusBadge'
import Modal from '../../components/common/Modal'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import '../../styles/dashboard.css'

const ComplaintTimeline = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [complaint, setComplaint] = useState(null)
  const [showShareModal, setShowShareModal] = useState(false)

  // Mock timeline data using useMemo to prevent unnecessary re-renders
  const mockTimeline = useMemo(() => [
    {
      id: 1,
      date: '2024-01-15 10:30 AM',
      title: 'Complaint Submitted',
      description: 'Complaint was successfully submitted to the system.',
      icon: '📝',
      color: 'bg-purple-500',
      user: 'You',
      attachments: [],
    },
    {
      id: 2,
      date: '2024-01-15 11:45 AM',
      title: 'Under Review',
      description: 'Complaint has been assigned to the IT Department for initial review.',
      icon: '🔍',
      color: 'bg-blue-500',
      user: 'System Admin',
      attachments: [],
    },
    {
      id: 3,
      date: '2024-01-15 02:15 PM',
      title: 'Assigned to Specialist',
      description: 'John Doe (IT Specialist) has been assigned to investigate this issue.',
      icon: '👨‍💻',
      color: 'bg-green-500',
      user: 'Department Head',
      attachments: [],
    },
    {
      id: 4,
      date: '2024-01-16 09:30 AM',
      title: 'Investigation Started',
      description: 'Initial investigation has begun. Specialist visited the location and collected evidence.',
      icon: '🔬',
      color: 'bg-yellow-500',
      user: 'John Doe',
      attachments: ['site_photos.zip'],
    },
    {
      id: 5,
      date: '2024-01-16 04:20 PM',
      title: 'Root Cause Identified',
      description: 'Network switch failure identified as the root cause. Replacement parts ordered.',
      icon: '🎯',
      color: 'bg-orange-500',
      user: 'John Doe',
      attachments: ['diagnosis_report.pdf'],
    },
    {
      id: 6,
      date: '2024-01-17 11:00 AM',
      title: 'Resolution In Progress',
      description: 'New network switch installed. Configuration and testing underway.',
      icon: '⚡',
      color: 'bg-teal-500',
      user: 'IT Department',
      attachments: [],
    },
  ], [])

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setComplaint({
        id: id || 'CMP-001234',
        title: 'Network Connectivity Issues in Building A',
        category: 'Technical',
        status: 'in-progress',
        priority: 'high',
        createdAt: '2024-01-15 10:30 AM',
        lastUpdate: '2 hours ago',
        description: 'Network connectivity issues reported in Building A affecting multiple users. The issue started on Monday morning and has been intermittent throughout the week.',
        assignedTo: 'IT Department',
        assignedPerson: 'John Doe (IT Specialist)',
        location: 'Building A, 3rd Floor',
        referenceNumber: 'REF-2024-001234',
        estimatedResolution: '2024-01-18',
        timeline: mockTimeline,
        attachments: [
          { name: 'network_diagram.pdf', size: '2.4 MB', uploaded: '2024-01-15' },
          { name: 'error_logs.txt', size: '512 KB', uploaded: '2024-01-15' },
          { name: 'site_photos.zip', size: '8.7 MB', uploaded: '2024-01-16' },
        ],
      })
      setLoading(false)
    }, 1000)
  }, [id, mockTimeline]) // Added mockTimeline to dependencies

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    setShowShareModal(true)
  }

  const handleDownloadAttachments = () => {
    // Simulate download
    alert('All attachments would be downloaded as a ZIP file.')
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar role="user" />
        <div className="dashboard-content">
          <Header title="Loading..." role="user" />
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading complaint details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!complaint) {
    return (
      <div className="dashboard-container">
        <Sidebar role="user" />
        <div className="dashboard-content">
          <Header title="Complaint Not Found" role="user" />
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <FiAlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Complaint Not Found</h3>
            <p className="text-gray-600 mb-6">
              The complaint you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/user/complaints')}>
              Back to Complaints
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <Sidebar role="user" />
      
      <div className="dashboard-content">
        <Header title={`Complaint: ${complaint.id}`} role="user" />
        
        {/* Complaint Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Button
                  variant="ghost"
                  size="small"
                  icon={<FiArrowLeft />}
                  onClick={() => navigate('/user/complaints')}
                >
                  Back
                </Button>
                <h1 className="text-2xl font-bold text-gray-900">{complaint.title}</h1>
              </div>
              <p className="text-gray-600">Reference: {complaint.referenceNumber}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="medium"
                icon={<FiPrinter />}
                onClick={handlePrint}
              >
                Print
              </Button>
              
              <Button
                variant="outline"
                size="medium"
                icon={<FiShare2 />}
                onClick={handleShare}
              >
                Share
              </Button>
            </div>
          </div>
          
          {/* Complaint Details Card */}
          <div className="dashboard-card mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FiTag className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="mt-1">
                      <StatusBadge status={complaint.status} size="large" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FiFlag className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Priority</p>
                    <p className={`font-semibold ${
                      complaint.priority === 'high' || complaint.priority === 'critical'
                        ? 'text-red-600'
                        : complaint.priority === 'medium'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                    }`}>
                      {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="font-semibold">{complaint.createdAt}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FiClock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Last Update</p>
                    <p className="font-semibold">{complaint.lastUpdate}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {complaint.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Additional Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FiTag className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Category:</span>
                        <span className="text-sm font-medium">{complaint.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiUser className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Assigned To:</span>
                        <span className="text-sm font-medium">{complaint.assignedTo}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiUser className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Assigned Person:</span>
                        <span className="text-sm font-medium">{complaint.assignedPerson}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCalendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Estimated Resolution:</span>
                        <span className="text-sm font-medium">{complaint.estimatedResolution}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Timeline Section */}
        <div className="dashboard-card mb-8">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Resolution Timeline</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>In Progress</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span>Pending</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 transform translate-x-1/2"></div>
            
            {/* Timeline Items */}
            <div className="space-y-8">
              {complaint.timeline.map((item) => (
                <div key={item.id} className="relative flex items-start gap-4">
                  {/* Timeline Dot */}
                  <div className={`relative z-10 w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                    {item.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <FiCalendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{item.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiUser className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{item.user}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{item.description}</p>
                    
                    {item.attachments && item.attachments.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <FiFileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">Attachments:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.attachments.map((attachment, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {attachment}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Current Status Indicator */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FiClock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Current Status</h3>
                    <p className="text-sm text-gray-600">
                      Your complaint is currently being actively worked on. Next update expected within 24 hours.
                    </p>
                  </div>
                </div>
                <StatusBadge status={complaint.status} size="large" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Attachments Section */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Attachments</h2>
            <Button
              variant="outline"
              size="small"
              icon={<FiDownload />}
              onClick={handleDownloadAttachments}
            >
              Download All
            </Button>
          </div>
          
          <div className="space-y-3">
            {complaint.attachments.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FiFileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{file.size}</span>
                      <span>Uploaded: {file.uploaded}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="small"
                    icon={<FiDownload />}
                    onClick={() => alert(`Downloading ${file.name}`)}
                  >
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    size="small"
                    icon={<FiMail />}
                    onClick={() => alert(`Emailing ${file.name}`)}
                  >
                    Email
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Need to Add More Information?</h3>
            <p className="text-gray-600 mb-4">
              If you have additional documents or information related to this complaint, 
              you can submit them for review.
            </p>
            <Button
              variant="outline"
              onClick={() => alert('This would open a file upload dialog')}
            >
              Add Additional Documents
            </Button>
          </div>
        </div>
        
        {/* Contact Support Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Need Immediate Assistance?</h3>
              <p className="text-gray-600">
                If you need urgent help or have additional questions about your complaint, 
                contact our support team.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => alert('This would open an email compose window')}
                icon={<FiMail />}
              >
                Email Support
              </Button>
              <Button
                variant="primary"
                onClick={() => alert('This would show contact numbers')}
              >
                Call Support
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Share Modal */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Share Complaint Details"
        size="medium"
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Share Options</h4>
            <p className="text-sm text-gray-600 mb-4">
              Choose how you want to share this complaint information.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <FiMail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Email Link</p>
                    <p className="text-sm text-gray-500">Share via email</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => {
                    alert('Email sharing functionality')
                    setShowShareModal(false)
                  }}
                >
                  Share
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <FiFileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Generate Report</p>
                    <p className="text-sm text-gray-500">Create PDF summary</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => {
                    alert('PDF generation functionality')
                    setShowShareModal(false)
                  }}
                >
                  Generate
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <FiShare2 className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Copy Link</p>
                    <p className="text-sm text-gray-500">Copy to clipboard</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    alert('Link copied to clipboard!')
                    setShowShareModal(false)
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h4 className="font-medium text-gray-900 mb-2">Share Settings</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-purple-600" defaultChecked />
                <span className="text-sm text-gray-700">Include complaint description</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-purple-600" defaultChecked />
                <span className="text-sm text-gray-700">Include current status</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-purple-600" />
                <span className="text-sm text-gray-700">Include attachments</span>
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ComplaintTimeline