// App Constants
export const APP_NAME = "Grievance Redressal Portal";
export const APP_VERSION = "1.0.0";

// User Roles
export const ROLES = {
  USER: 'user',
  STAFF: 'staff',
  ADMIN: 'admin'
};

// Complaint Status
export const COMPLAINT_STATUS = {
  NEW: 'New',
  UNDER_REVIEW: 'Under Review',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
  ESCALATED: 'Escalated',
  REJECTED: 'Rejected'
};

// Complaint Priority
export const COMPLAINT_PRIORITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  URGENT: 'Urgent'
};

// Complaint Categories
export const COMPLAINT_CATEGORIES = [
  'Academic',
  'Infrastructure',
  'Administrative',
  'Faculty',
  'Student Services',
  'Hostel',
  'Library',
  'Transport',
  'Canteen',
  'Sports',
  'Others'
];

// Employee Request Status
export const REQUEST_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  TEST_SCHEDULED: 'Test Scheduled',
  UNDER_REVIEW: 'Under Review'
};

// Test Types for Employee Qualification
export const TEST_TYPES = {
  TECHNICAL: 'Technical',
  APTITUDE: 'Aptitude',
  INTERVIEW: 'Interview',
  WRITTEN: 'Written'
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  SIGNUP: '/api/auth/signup',
  LOGOUT: '/api/auth/logout',
  REFRESH_TOKEN: '/api/auth/refresh',
  
  // User
  USER_PROFILE: '/api/user/profile',
  USER_COMPLAINTS: '/api/user/complaints',
  
  // Staff
  STAFF_PROFILE: '/api/staff/profile',
  ASSIGNED_COMPLAINTS: '/api/staff/complaints',
  UPDATE_COMPLAINT: '/api/staff/complaint',
  
  // Admin
  ADMIN_USERS: '/api/admin/users',
  ADMIN_STAFF: '/api/admin/staff',
  ALL_COMPLAINTS: '/api/admin/complaints',
  ASSIGN_COMPLAINT: '/api/admin/assign',
  ESCALATE_COMPLAINT: '/api/admin/escalate',
  
  // Employee Requests
  EMPLOYEE_REQUESTS: '/api/employee-requests',
  SUBMIT_REQUEST: '/api/employee-requests/submit',
  PROCESS_REQUEST: '/api/employee-requests/process',
  SCHEDULE_TEST: '/api/employee-requests/schedule-test',
  
  // Analytics
  ANALYTICS: '/api/analytics',
  REPORTS: '/api/reports'
};

// Color Themes
export const THEME_COLORS = {
  primary: '#42047E',
  secondary: '#07F49E',
  accent: '#84FFC9',
  warning: '#FF9F1C',
  danger: '#E63946',
  success: '#2A9D8F',
  info: '#1D3557',
  light: '#F8F9FA',
  dark: '#212529'
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD MMM YYYY, hh:mm A',
  SHORT: 'DD/MM/YYYY',
  TIME: 'hh:mm A'
};

// File Upload Constraints
export const FILE_CONSTRAINTS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  MAX_FILES: 5
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Escalation Timeframes (in days)
export const ESCALATION_TIMEFRAMES = {
  URGENT: 1,
  HIGH: 3,
  MEDIUM: 7,
  LOW: 14
};

// Dashboard Stats Labels
export const STATS_LABELS = {
  TOTAL_COMPLAINTS: 'Total Complaints',
  PENDING_COMPLAINTS: 'Pending',
  RESOLVED_COMPLAINTS: 'Resolved',
  ESCALATED_COMPLAINTS: 'Escalated',
  NEW_REQUESTS: 'New Employee Requests',
  ACTIVE_STAFF: 'Active Staff'
};

// Export Types
export const EXPORT_TYPES = {
  CSV: 'csv',
  PDF: 'pdf',
  EXCEL: 'excel'
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZES: [5, 10, 25, 50]
};