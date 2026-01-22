/**
 * Validation utilities for form inputs
 */

/**
 * Validate email format
 * @param {string} email 
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password 
 * @returns {Object}
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[@$!%*?&]/.test(password)) {
    errors.push('Password must contain at least one special character (@$!%*?&)');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate complaint data
 * @param {Object} complaintData 
 * @returns {Object}
 */
export const validateComplaint = (complaintData) => {
  const errors = {};
  
  if (!complaintData.title || complaintData.title.trim().length < 10) {
    errors.title = 'Title must be at least 10 characters long';
  }
  
  if (!complaintData.description || complaintData.description.trim().length < 50) {
    errors.description = 'Description must be at least 50 characters long';
  }
  
  if (!complaintData.category) {
    errors.category = 'Please select a category';
  }
  
  if (!complaintData.priority) {
    errors.priority = 'Please select priority level';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate employee request data
 * @param {Object} requestData 
 * @returns {Object}
 */
export const validateEmployeeRequest = (requestData) => {
  const errors = {};
  
  if (!requestData.qualification || requestData.qualification.trim().length < 10) {
    errors.qualification = 'Please provide your qualification details';
  }
  
  if (!requestData.experience) {
    errors.experience = 'Please provide your experience details';
  }
  
  if (!requestData.reason || requestData.reason.trim().length < 50) {
    errors.reason = 'Please explain why you want to become staff';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate file upload
 * @param {File} file 
 * @returns {Object}
 */
export const validateFile = (file) => {
  const errors = [];
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (file.size > maxSize) {
    errors.push('File size must be less than 5MB');
  }
  
  if (!allowedTypes.includes(file.type)) {
    errors.push('File type not allowed. Please upload images, PDFs, or Word documents');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Format validation error messages
 * @param {Object} errors 
 * @returns {string}
 */
export const formatValidationErrors = (errors) => {
  if (typeof errors === 'string') return errors;
  if (Array.isArray(errors)) return errors.join(', ');
  if (typeof errors === 'object') {
    return Object.values(errors).join(', ');
  }
  return 'Validation error';
};