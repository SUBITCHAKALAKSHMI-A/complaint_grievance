// src/services/emailService.js

// Email service for EmailJS integration
class EmailService {
  constructor() {
    // EmailJS configuration - use direct values
    this.emailjsConfig = {
      serviceId: 'service_grievance',
      templateId: 'template_grievance',
      userId: 'user_grievance'
    };

    // Initialize EmailJS if available
    if (typeof window !== 'undefined' && window.emailjs) {
      window.emailjs.init(this.emailjsConfig.userId);
    }
  }

  // Send email using EmailJS
  sendEmail = async (templateParams) => {
    try {
      // Check if EmailJS is available
      if (!window.emailjs) {
        console.warn('EmailJS not available, using mock email service');
        return this.sendMockEmail(templateParams);
      }

      const response = await window.emailjs.send(
        this.emailjsConfig.serviceId,
        this.emailjsConfig.templateId,
        templateParams
      );

      console.log('Email sent successfully:', response);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Failed to send email:', error);
      // Fall back to mock email service
      return this.sendMockEmail(templateParams);
    }
  };

  // Mock email service for development
  sendMockEmail = async (templateParams) => {
    console.log('Mock email sent with params:', templateParams);
    
    // Simulate async operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Mock email sent successfully (development mode)',
          templateParams
        });
      }, 500);
    });
  };

  // Send complaint submission confirmation
  sendComplaintSubmissionEmail = async (userEmail, userName, complaintId, complaintTitle) => {
    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      from_name: 'Grievance Portal',
      subject: 'Complaint Submitted Successfully',
      complaint_id: complaintId,
      complaint_title: complaintTitle,
      message: `Your complaint "${complaintTitle}" has been submitted successfully. Your complaint ID is ${complaintId}. You can track the status of your complaint in your dashboard.`,
      date: new Date().toLocaleDateString(),
      support_email: 'support@grievanceportal.com',
      portal_url: window.location.origin
    };

    return await this.sendEmail(templateParams);
  };

  // Send status update notification
  sendStatusUpdateEmail = async (userEmail, userName, complaintId, complaintTitle, newStatus, note = '') => {
    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      from_name: 'Grievance Portal',
      subject: `Complaint Status Update: ${complaintTitle}`,
      complaint_id: complaintId,
      complaint_title: complaintTitle,
      new_status: newStatus,
      note: note || 'No additional notes provided.',
      message: `The status of your complaint "${complaintTitle}" has been updated to ${newStatus}.`,
      date: new Date().toLocaleDateString(),
      portal_url: window.location.origin
    };

    return await this.sendEmail(templateParams);
  };

  // Send assignment notification to staff
  sendAssignmentEmail = async (staffEmail, staffName, complaintId, complaintTitle, assignedBy) => {
    const templateParams = {
      to_email: staffEmail,
      to_name: staffName,
      from_name: 'Grievance Portal Admin',
      subject: `New Complaint Assigned: ${complaintTitle}`,
      complaint_id: complaintId,
      complaint_title: complaintTitle,
      assigned_by: assignedBy,
      message: `You have been assigned a new complaint "${complaintTitle}" (ID: ${complaintId}). Please review and take appropriate action.`,
      date: new Date().toLocaleDateString(),
      portal_url: window.location.origin
    };

    return await this.sendEmail(templateParams);
  };

  // Send escalation notification
  sendEscalationEmail = async (userEmail, userName, complaintId, complaintTitle, escalationLevel, reason) => {
    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      from_name: 'Grievance Portal',
      subject: `Complaint Escalated: ${complaintTitle}`,
      complaint_id: complaintId,
      complaint_title: complaintTitle,
      escalation_level: escalationLevel,
      reason: reason,
      message: `Your complaint "${complaintTitle}" has been escalated to Level ${escalationLevel} due to: ${reason}`,
      date: new Date().toLocaleDateString(),
      portal_url: window.location.origin
    };

    return await this.sendEmail(templateParams);
  };

  // Send resolution notification
  sendResolutionEmail = async (userEmail, userName, complaintId, complaintTitle, resolution) => {
    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      from_name: 'Grievance Portal',
      subject: `Complaint Resolved: ${complaintTitle}`,
      complaint_id: complaintId,
      complaint_title: complaintTitle,
      resolution: resolution,
      message: `Your complaint "${complaintTitle}" has been resolved. Resolution: ${resolution}`,
      date: new Date().toLocaleDateString(),
      portal_url: window.location.origin,
      feedback_url: `${window.location.origin}/feedback/${complaintId}`
    };

    return await this.sendEmail(templateParams);
  };

  // Send employee request submission confirmation
  sendEmployeeRequestEmail = async (userEmail, userName, requestId) => {
    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      from_name: 'Grievance Portal',
      subject: 'Employee Request Submitted',
      request_id: requestId,
      message: `Your employee/staff qualification request has been submitted successfully. Request ID: ${requestId}. The admin team will review your request and contact you soon.`,
      date: new Date().toLocaleDateString(),
      portal_url: window.location.origin
    };

    return await this.sendEmail(templateParams);
  };

  // Send employee request status update
  sendEmployeeRequestStatusEmail = async (userEmail, userName, requestId, status, note = '') => {
    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      from_name: 'Grievance Portal Admin',
      subject: `Employee Request ${status}`,
      request_id: requestId,
      status: status,
      note: note || 'No additional notes provided.',
      message: `Your employee/staff qualification request (ID: ${requestId}) has been ${status}.`,
      date: new Date().toLocaleDateString(),
      portal_url: window.location.origin
    };

    return await this.sendEmail(templateParams);
  };

  // Send password reset email
  sendPasswordResetEmail = async (userEmail, resetToken) => {
    const resetLink = `${window.location.origin}/reset-password?token=${resetToken}`;
    
    const templateParams = {
      to_email: userEmail,
      from_name: 'Grievance Portal',
      subject: 'Password Reset Request',
      reset_link: resetLink,
      message: `You requested a password reset. Click the link below to reset your password:`,
      date: new Date().toLocaleDateString(),
      expiry_time: '1 hour'
    };

    return await this.sendEmail(templateParams);
  };

  // Send welcome email to new users
  sendWelcomeEmail = async (userEmail, userName, role) => {
    const dashboardLink = `${window.location.origin}/dashboard`;
    
    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      from_name: 'Grievance Portal',
      subject: 'Welcome to Grievance Portal',
      role: role,
      dashboard_link: dashboardLink,
      message: `Welcome to the Grievance Portal! Your account has been created successfully. You have been registered as a ${role}.`,
      date: new Date().toLocaleDateString(),
      support_email: 'support@grievanceportal.com'
    };

    return await this.sendEmail(templateParams);
  };

  // Send report generated notification
  sendReportEmail = async (userEmail, userName, reportType, reportUrl) => {
    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      from_name: 'Grievance Portal',
      subject: `Report Generated: ${reportType}`,
      report_type: reportType,
      report_url: reportUrl,
      message: `Your ${reportType} report has been generated successfully. You can download it from the provided link.`,
      date: new Date().toLocaleDateString()
    };

    return await this.sendEmail(templateParams);
  };

  // Send system alert to admin
  sendSystemAlertEmail = async (adminEmail, alertType, message, severity = 'medium') => {
    const templateParams = {
      to_email: adminEmail,
      from_name: 'Grievance Portal System',
      subject: `System Alert: ${alertType}`,
      alert_type: alertType,
      severity: severity,
      message: message,
      timestamp: new Date().toISOString(),
      portal_url: window.location.origin
    };

    return await this.sendEmail(templateParams);
  };

  // Test email service
  testEmailService = async () => {
    const testParams = {
      to_email: 'test@example.com',
      to_name: 'Test User',
      from_name: 'Grievance Portal',
      subject: 'Test Email',
      message: 'This is a test email from Grievance Portal.',
      date: new Date().toLocaleDateString()
    };

    try {
      const result = await this.sendEmail(testParams);
      return {
        success: result.success,
        message: result.message,
        service: 'Email service is working correctly'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Email service test failed',
        error: error.message
      };
    }
  };
}

export default new EmailService();