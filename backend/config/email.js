const nodemailer = require('nodemailer');
require('dotenv').config();

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send email function
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `${process.env.EMAIL_FROM || 'Complaint Portal'} <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

// Email templates
const emailTemplates = {
  complaintSubmitted: (complaintId, subject) => ({
    subject: `Complaint Submitted Successfully - ${complaintId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
          <h2 style="color: #1a73e8; margin-bottom: 20px;">Complaint Submitted Successfully</h2>
          <p>Thank you for submitting your complaint. Your complaint has been received and will be processed shortly.</p>
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Complaint ID:</strong> ${complaintId}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <p>You can track the status of your complaint by logging into your account.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #666;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      </div>
    `,
    text: `Your complaint ${complaintId} has been submitted successfully. Subject: ${subject}`,
  }),

  statusUpdate: (complaintId, status, comment) => ({
    subject: `Complaint Status Update - ${complaintId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
          <h2 style="color: #1a73e8; margin-bottom: 20px;">Complaint Status Update</h2>
          <p>Your complaint status has been updated.</p>
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Complaint ID:</strong> ${complaintId}</p>
            <p><strong>New Status:</strong> ${status.replace('_', ' ').toUpperCase()}</p>
            ${comment ? `<p><strong>Comment:</strong> ${comment}</p>` : ''}
          </div>
          <p>You can view more details by logging into your account.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #666;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      </div>
    `,
    text: `Your complaint ${complaintId} status has been updated to ${status}. ${comment ? `Comment: ${comment}` : ''}`,
  }),

  escalation: (complaintId, reason) => ({
    subject: `Complaint Escalated - ${complaintId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; border: 1px solid #ffeaa7;">
          <h2 style="color: #856404; margin-bottom: 20px;">Complaint Escalated</h2>
          <p>Your complaint has been escalated to a higher authority for further review.</p>
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Complaint ID:</strong> ${complaintId}</p>
            <p><strong>Escalation Reason:</strong> ${reason}</p>
          </div>
          <p>The escalated authority will review your complaint and take appropriate action.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #666;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      </div>
    `,
    text: `Your complaint ${complaintId} has been escalated. Reason: ${reason}`,
  }),

  resolution: (complaintId, resolutionDetails) => ({
    subject: `Complaint Resolved - ${complaintId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #d4edda; padding: 20px; border-radius: 8px; border: 1px solid #c3e6cb;">
          <h2 style="color: #155724; margin-bottom: 20px;">Complaint Resolved</h2>
          <p>Good news! Your complaint has been resolved.</p>
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Complaint ID:</strong> ${complaintId}</p>
            ${resolutionDetails ? `<p><strong>Resolution Details:</strong> ${resolutionDetails}</p>` : ''}
          </div>
          <p>Thank you for your patience. We hope the resolution meets your expectations.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #666;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      </div>
    `,
    text: `Your complaint ${complaintId} has been resolved. ${resolutionDetails ? `Resolution: ${resolutionDetails}` : ''}`,
  }),
};

// Send notification email
const sendNotificationEmail = async (to, type, data) => {
  try {
    const template = emailTemplates[type];
    if (!template) {
      throw new Error(`Email template not found for type: ${type}`);
    }

    const emailOptions = template(data.complaintId, data.subject || data.reason || data.resolutionDetails);
    
    await sendEmail({
      to,
      subject: emailOptions.subject,
      html: emailOptions.html,
      text: emailOptions.text,
    });

    console.log(`Notification email sent to ${to} for type: ${type}`);
  } catch (error) {
    console.error('Failed to send notification email:', error);
    throw error;
  }
};

module.exports = {
  sendEmail,
  sendNotificationEmail,
  emailTemplates,
};
