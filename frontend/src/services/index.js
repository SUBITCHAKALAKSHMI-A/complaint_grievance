// src/services/index.js

// Export all services from a single file for easier imports
export { default as api } from './api';
export { default as authService } from './authService';
export { default as complaintService } from './complaintService';
export { default as adminService } from './adminService';
export { default as emailService } from './emailService';

// Export API endpoints directly for convenience
export { authAPI, userAPI, staffAPI, complaintAPI, employeeRequestAPI, analyticsAPI, uploadAPI, APIUtils } from './api';