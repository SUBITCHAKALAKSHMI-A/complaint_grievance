/**
 * Email templates for various notifications
 */

// Base template with styling
const baseTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grievance Redressal Portal</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: linear-gradient(135deg, #84FFC9 0%, #AAB2FF 50%, #F0A6FF 100%);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }
        .email-header {
            background: linear-gradient(90deg, #42047E 0%, #07F49E 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: 0.5px;
        }
        .email-header p {
            margin: 10px 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .email-body {
            padding: 40px 30px;
            background-color: white;
        }
        .email-footer {
            background: linear-gradient(90deg, #1ED7B5 0%, #F0F9A7 100%);
            color: #333;
            padding: 25px 20px;
            text-align: center;
            font-size: 14px;
        }
        .email-footer a {
            color: #42047E;
            text-decoration: none;
            font-weight: 600;
        }
        .email-footer a:hover {
            text-decoration: underline;
        }
        .button {
            display: inline-block;
            background: linear-gradient(90deg, #42047E 0%, #07F49E 100%);
            color: white;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            transition: all 0.3s ease;
        }
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(66, 4, 126, 0.3);
        }
        .complaint-details {
            background-color: #f8f9fa;
            border-left: 4px solid #42047E;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .detail-item {
            margin: 10px 0;
        }
        .detail-label {
            font-weight: 600;
            color: #42047E;
        }
        .status-badge {
            display: inline-block;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            margin: 5px 0;
        }
        .status-new {
            background: linear-gradient(90deg, #FF6B6B 0%, #FF8E53 100%);
            color: white;
        }
        .status-review {
            background: linear-gradient(90deg, #4ECDC4 0%, #44A08D 100%);
            color: white;
        }
        .status-resolved {
            background: linear-gradient(90deg, #06D6A0 0%, #1B9AAA 100%);
            color: white;
        }
        .status-escalated {
            background: linear-gradient(90deg, #9D4EDD 0%, #C77DFF 100%);
            color: white;
        }
        .test-info {
            background: linear-gradient(90deg, #1ED7B5 0%, #F0F9A7 100%);
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .note {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 15px 0;
            border-radius: 6px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        ${content}
    </div>
</body>
</html>
`;

// Complaint Submitted Template
export const complaintSubmittedTemplate = (data) => baseTemplate(`
    <div class="email-header">
        <h1>🚀 Complaint Submitted Successfully!</h1>
        <p>Your grievance has been registered with ID: <strong>${data.complaintId}</strong></p>
    </div>
    <div class="email-body">
        <h2>Dear ${data.userName},</h2>
        <p>Thank you for submitting your complaint to the Grievance Redressal Portal. We have received your concern and will process it shortly.</p>
        
        <div class="complaint-details">
            <h3>Complaint Details:</h3>
            <div class="detail-item">
                <span class="detail-label">Complaint ID:</span> ${data.complaintId}
            </div>
            <div class="detail-item">
                <span class="detail-label">Category:</span> ${data.category}
            </div>
            <div class="detail-item">
                <span class="detail-label">Priority:</span> ${data.priority}
            </div>
            <div class="detail-item">
                <span class="detail-label">Date Submitted:</span> ${data.date}
            </div>
            <div class="detail-item">
                <span class="detail-label">Current Status:</span> 
                <span class="status-badge status-new">New</span>
            </div>
        </div>
        
        <p>You can track the status of your complaint using the tracking ID mentioned above.</p>
        
        <div class="note">
            <strong>Note:</strong> Please keep your complaint ID safe for future reference. 
            You will receive updates on your registered email address.
        </div>
        
        <div style="text-align: center;">
            <a href="${data.trackingLink}" class="button">Track Your Complaint</a>
        </div>
        
        <p>For any queries, please contact our support team.</p>
        <p>Best Regards,<br>Grievance Redressal Team</p>
    </div>
    <div class="email-footer">
        <p>© 2024 Grievance Redressal Portal. All rights reserved.</p>
        <p>This is an automated email. Please do not reply to this message.</p>
    </div>
`);

// Status Update Template
export const statusUpdateTemplate = (data) => baseTemplate(`
    <div class="email-header">
        <h1>📢 Complaint Status Updated</h1>
        <p>Your complaint status has been changed to <strong>${data.newStatus}</strong></p>
    </div>
    <div class="email-body">
        <h2>Dear ${data.userName},</h2>
        <p>We would like to inform you that there has been an update on your complaint.</p>
        
        <div class="complaint-details">
            <h3>Update Details:</h3>
            <div class="detail-item">
                <span class="detail-label">Complaint ID:</span> ${data.complaintId}
            </div>
            <div class="detail-item">
                <span class="detail-label">Previous Status:</span> ${data.oldStatus}
            </div>
            <div class="detail-item">
                <span class="detail-label">New Status:</span> 
                <span class="status-badge ${
                  data.newStatus === 'Resolved' ? 'status-resolved' : 
                  data.newStatus === 'Under Review' ? 'status-review' : 
                  data.newStatus === 'Escalated' ? 'status-escalated' : 'status-new'
                }">${data.newStatus}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Updated By:</span> ${data.updatedBy}
            </div>
            <div class="detail-item">
                <span class="detail-label">Update Date:</span> ${data.updateDate}
            </div>
            ${data.comments ? `
            <div class="detail-item">
                <span class="detail-label">Comments:</span> ${data.comments}
            </div>
            ` : ''}
        </div>
        
        <p>You can view detailed updates on your complaint dashboard.</p>
        
        <div style="text-align: center;">
            <a href="${data.dashboardLink}" class="button">View Dashboard</a>
        </div>
        
        <p>If you have any questions regarding this update, please contact us.</p>
        <p>Best Regards,<br>Grievance Redressal Team</p>
    </div>
    <div class="email-footer">
        <p>© 2024 Grievance Redressal Portal. All rights reserved.</p>
        <p>This is an automated email. Please do not reply to this message.</p>
    </div>
`);

// Employee Request Submitted Template
export const employeeRequestSubmittedTemplate = (data) => baseTemplate(`
    <div class="email-header">
        <h1>💼 Employee Request Submitted</h1>
        <p>Your request to become a staff member has been received</p>
    </div>
    <div class="email-body">
        <h2>Dear ${data.userName},</h2>
        <p>Thank you for showing interest in becoming a staff member of the Grievance Redressal Portal.</p>
        
        <div class="complaint-details">
            <h3>Request Details:</h3>
            <div class="detail-item">
                <span class="detail-label">Request ID:</span> ${data.requestId}
            </div>
            <div class="detail-item">
                <span class="detail-label">Submitted Date:</span> ${data.submissionDate}
            </div>
            <div class="detail-item">
                <span class="detail-label">Current Status:</span> 
                <span class="status-badge status-review">Pending Review</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Applied Role:</span> ${data.appliedRole}
            </div>
        </div>
        
        <div class="test-info">
            <h3>Next Steps:</h3>
            <p>Your request will be reviewed by our administration team. If shortlisted, you will be notified about:</p>
            <ul>
                <li>Qualification test schedule</li>
                <li>Interview process (if applicable)</li>
                <li>Required documentation</li>
            </ul>
            <p>Please ensure your profile information is complete and up-to-date.</p>
        </div>
        
        <div class="note">
            <strong>Important:</strong> The review process may take 3-5 business days. 
            You will receive notifications about any updates.
        </div>
        
        <div style="text-align: center;">
            <a href="${data.profileLink}" class="button">Update Your Profile</a>
        </div>
        
        <p>We appreciate your interest in joining our team!</p>
        <p>Best Regards,<br>Recruitment Team</p>
    </div>
    <div class="email-footer">
        <p>© 2024 Grievance Redressal Portal. All rights reserved.</p>
        <p>This is an automated email. Please do not reply to this message.</p>
    </div>
`);

// Test Scheduled Template
export const testScheduledTemplate = (data) => baseTemplate(`
    <div class="email-header">
        <h1>📝 Qualification Test Scheduled</h1>
        <p>Your ${data.testType} test has been scheduled</p>
    </div>
    <div class="email-body">
        <h2>Dear ${data.userName},</h2>
        <p>Congratulations! Your employee request has been shortlisted for the next stage.</p>
        
        <div class="complaint-details">
            <h3>Test Details:</h3>
            <div class="detail-item">
                <span class="detail-label">Test Type:</span> ${data.testType}
            </div>
            <div class="detail-item">
                <span class="detail-label">Date:</span> ${data.testDate}
            </div>
            <div class="detail-item">
                <span class="detail-label">Time:</span> ${data.testTime}
            </div>
            <div class="detail-item">
                <span class="detail-label">Duration:</span> ${data.duration}
            </div>
            <div class="detail-item">
                <span class="detail-label">Platform:</span> ${data.platform}
            </div>
            ${data.meetingLink ? `
            <div class="detail-item">
                <span class="detail-label">Meeting Link:</span> 
                <a href="${data.meetingLink}">Join Meeting</a>
            </div>
            ` : ''}
        </div>
        
        <div class="test-info">
            <h3>Instructions:</h3>
            <ul>
                ${data.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
            </ul>
        </div>
        
        <div class="note">
            <strong>Important:</strong> 
            <ul>
                <li>Please join 10 minutes before the scheduled time</li>
                <li>Have a stable internet connection</li>
                <li>Keep your identification ready</li>
                <li>Test link will be active 15 minutes before the test</li>
            </ul>
        </div>
        
        ${data.testLink ? `
        <div style="text-align: center;">
            <a href="${data.testLink}" class="button">Go to Test Portal</a>
        </div>
        ` : ''}
        
        <p>All the best for your test!</p>
        <p>Best Regards,<br>Recruitment Team</p>
    </div>
    <div class="email-footer">
        <p>© 2024 Grievance Redressal Portal. All rights reserved.</p>
        <p>This is an automated email. Please do not reply to this message.</p>
    </div>
`);

// Request Approved Template
export const requestApprovedTemplate = (data) => baseTemplate(`
    <div class="email-header" style="background: linear-gradient(90deg, #06D6A0 0%, #1B9AAA 100%);">
        <h1>🎉 Congratulations! Request Approved</h1>
        <p>Welcome to the Grievance Redressal Team</p>
    </div>
    <div class="email-body">
        <h2>Dear ${data.userName},</h2>
        <p>We are delighted to inform you that your request to become a staff member has been approved!</p>
        
        <div class="complaint-details">
            <h3>Approval Details:</h3>
            <div class="detail-item">
                <span class="detail-label">New Role:</span> ${data.newRole}
            </div>
            <div class="detail-item">
                <span class="detail-label">Effective Date:</span> ${data.effectiveDate}
            </div>
            <div class="detail-item">
                <span class="detail-label">Staff ID:</span> ${data.staffId}
            </div>
            <div class="detail-item">
                <span class="detail-label">Reporting To:</span> ${data.reportingManager}
            </div>
        </div>
        
        <div class="test-info">
            <h3>Next Steps:</h3>
            <ol>
                <li>Login to your account with your existing credentials</li>
                <li>Complete your staff profile setup</li>
                <li>Review the staff handbook and guidelines</li>
                <li>Attend the orientation session (if scheduled)</li>
                <li>Start handling assigned complaints</li>
            </ol>
        </div>
        
        <div class="note">
            <strong>Important Information:</strong>
            <ul>
                <li>Your dashboard has been upgraded with staff features</li>
                <li>You can now access staff-specific modules</li>
                <li>Training materials are available in your dashboard</li>
                <li>For any queries, contact your reporting manager</li>
            </ul>
        </div>
        
        <div style="text-align: center;">
            <a href="${data.staffDashboardLink}" class="button">Go to Staff Dashboard</a>
        </div>
        
        <p>Welcome aboard! We look forward to working with you.</p>
        <p>Best Regards,<br>Administration Team</p>
    </div>
    <div class="email-footer">
        <p>© 2024 Grievance Redressal Portal. All rights reserved.</p>
        <p>This is an automated email. Please do not reply to this message.</p>
    </div>
`);

// Escalation Notification Template
export const escalationTemplate = (data) => baseTemplate(`
    <div class="email-header" style="background: linear-gradient(90deg, #9D4EDD 0%, #C77DFF 100%);">
        <h1>⚠️ Complaint Escalated</h1>
        <p>Complaint ID: ${data.complaintId} has been escalated</p>
    </div>
    <div class="email-body">
        <h2>Attention Required</h2>
        <p>The following complaint has been escalated due to delay in resolution:</p>
        
        <div class="complaint-details">
            <h3>Escalation Details:</h3>
            <div class="detail-item">
                <span class="detail-label">Complaint ID:</span> ${data.complaintId}
            </div>
            <div class="detail-item">
                <span class="detail-label">Complaint Title:</span> ${data.complaintTitle}
            </div>
            <div class="detail-item">
                <span class="detail-label">Escalated From:</span> ${data.escalatedFrom}
            </div>
            <div class="detail-item">
                <span class="detail-label">Escalated To:</span> ${data.escalatedTo}
            </div>
            <div class="detail-item">
                <span class="detail-label">Reason:</span> ${data.reason}
            </div>
            <div class="detail-item">
                <span class="detail-label">Days Pending:</span> ${data.daysPending}
            </div>
            <div class="detail-item">
                <span class="detail-label">Priority Level:</span> 
                <span style="color: #E63946; font-weight: 600;">${data.priority}</span>
            </div>
        </div>
        
        <div class="note">
            <strong>Action Required:</strong>
            <ul>
                <li>Review the complaint details immediately</li>
                <li>Assign to appropriate staff member</li>
                <li>Update the complaint status</li>
                <li>Notify the user about the escalation</li>
            </ul>
        </div>
        
        <div style="text-align: center;">
            <a href="${data.complaintLink}" class="button">View Complaint Details</a>
        </div>
        
        <p>Please address this escalation at the earliest.</p>
        <p>Regards,<br>Escalation Management System</p>
    </div>
    <div class="email-footer">
        <p>© 2024 Grievance Redressal Portal. All rights reserved.</p>
        <p>This is an automated email. Please do not reply to this message.</p>
    </div>
`);

// Admin Notification Template
export const adminNotificationTemplate = (data) => baseTemplate(`
    <div class="email-header">
        <h1>📊 ${data.title}</h1>
        <p>${data.subtitle}</p>
    </div>
    <div class="email-body">
        <h2>Administrator Notification</h2>
        <p>${data.message}</p>
        
        <div class="complaint-details">
            <h3>Summary:</h3>
            ${data.summary.map(item => `
            <div class="detail-item">
                <span class="detail-label">${item.label}:</span> ${item.value}
            </div>
            `).join('')}
        </div>
        
        ${data.actions && data.actions.length > 0 ? `
        <div class="note">
            <strong>Required Actions:</strong>
            <ul>
                ${data.actions.map(action => `<li>${action}</li>`).join('')}
            </ul>
        </div>
        ` : ''}
        
        <div style="text-align: center;">
            <a href="${data.dashboardLink}" class="button">Go to Admin Dashboard</a>
        </div>
        
        <p>This is an automated notification from the system.</p>
        <p>Regards,<br>System Notification Service</p>
    </div>
    <div class="email-footer">
        <p>© 2024 Grievance Redressal Portal. All rights reserved.</p>
        <p>This is an automated email. Please do not reply to this message.</p>
    </div>
`);

/**
 * Get email template by type
 * @param {string} type - Template type
 * @param {Object} data - Template data
 * @returns {string} - HTML email template
 */
export const getEmailTemplate = (type, data) => {
  const templates = {
    'complaint_submitted': complaintSubmittedTemplate,
    'status_update': statusUpdateTemplate,
    'employee_request': employeeRequestSubmittedTemplate,
    'test_scheduled': testScheduledTemplate,
    'request_approved': requestApprovedTemplate,
    'escalation': escalationTemplate,
    'admin_notification': adminNotificationTemplate
  };

  const templateFn = templates[type];
  if (!templateFn) {
    throw new Error(`Template type "${type}" not found`);
  }

  return templateFn(data);
};

/**
 * Get email subject by type
 * @param {string} type - Template type
 * @param {Object} data - Additional data for subject
 * @returns {string} - Email subject
 */
export const getEmailSubject = (type, data = {}) => {
  const subjects = {
    'complaint_submitted': `Complaint Submitted Successfully - ID: ${data.complaintId || 'N/A'}`,
    'status_update': `Complaint Status Updated - ${data.complaintId || 'N/A'}`,
    'employee_request': 'Employee Request Submitted - Grievance Portal',
    'test_scheduled': `Qualification Test Scheduled - ${data.testType || 'Test'}`,
    'request_approved': 'Congratulations! Employee Request Approved',
    'escalation': `URGENT: Complaint Escalated - ${data.complaintId || 'N/A'}`,
    'admin_notification': 'Admin Notification - Grievance Portal'
  };

  return subjects[type] || 'Notification from Grievance Redressal Portal';
};