// src/services/api.js

// API Base URL - Can be configured based on environment
const getApiBaseUrl = () => {
  // Check for environment-specific URLs
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8080/api';
  }
  // For production, you can set this in a config file or use relative URLs
  return '/api'; // Using relative URL for production
};

const API_BASE_URL = getApiBaseUrl();

// Alternative: If you want to use a config file approach
// Create a config.js file in src with:
// export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
// Then import it here

// Common headers for API requests
const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Generic API request handler
const apiRequest = async (endpoint, method = 'GET', data = null, includeAuth = true) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: getHeaders(includeAuth),
  };

  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      let errorMessage = `API request failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return await response.text();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Auth endpoints
export const authAPI = {
  login: (credentials) => apiRequest('/auth/login', 'POST', credentials, false),
  signup: (userData) => apiRequest('/auth/signup', 'POST', userData, false),
  verifyToken: () => apiRequest('/auth/verify', 'GET'),
  logout: () => apiRequest('/auth/logout', 'POST'),
  changePassword: (passwordData) => apiRequest('/auth/change-password', 'POST', passwordData),
  refreshToken: () => apiRequest('/auth/refresh', 'POST'),
  forgotPassword: (email) => apiRequest('/auth/forgot-password', 'POST', { email }, false),
  resetPassword: (token, newPassword) => apiRequest('/auth/reset-password', 'POST', { token, newPassword }, false),
};

// User endpoints
export const userAPI = {
  getProfile: () => apiRequest('/users/profile', 'GET'),
  updateProfile: (userData) => apiRequest('/users/profile', 'PUT', userData),
  getAllUsers: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiRequest(`/users${queryParams ? `?${queryParams}` : ''}`, 'GET');
  },
  getUserById: (userId) => apiRequest(`/users/${userId}`, 'GET'),
  updateUser: (userId, userData) => apiRequest(`/users/${userId}`, 'PUT', userData),
  deleteUser: (userId) => apiRequest(`/users/${userId}`, 'DELETE'),
  toggleUserStatus: (userId, status) => apiRequest(`/users/${userId}/status`, 'PATCH', { status }),
  updateUserRole: (userId, role) => apiRequest(`/users/${userId}/role`, 'PATCH', { role }),
  getActivityLogs: (userId) => apiRequest(`/users/${userId}/activity-logs`, 'GET'),
};

// Staff endpoints
export const staffAPI = {
  getAllStaff: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiRequest(`/staff${queryParams ? `?${queryParams}` : ''}`, 'GET');
  },
  getStaffById: (staffId) => apiRequest(`/staff/${staffId}`, 'GET'),
  createStaff: (staffData) => apiRequest('/staff', 'POST', staffData),
  updateStaff: (staffId, staffData) => apiRequest(`/staff/${staffId}`, 'PUT', staffData),
  deleteStaff: (staffId) => apiRequest(`/staff/${staffId}`, 'DELETE'),
  getStaffPerformance: (staffId) => apiRequest(`/staff/${staffId}/performance`, 'GET'),
  assignComplaints: (assignments) => apiRequest('/staff/assign-complaints', 'POST', assignments),
  getStaffWorkload: () => apiRequest('/staff/workload', 'GET'),
  getAvailableStaff: (department) => {
    const queryParams = department ? `?department=${department}` : '';
    return apiRequest(`/staff/available${queryParams}`, 'GET');
  },
};

// Complaint endpoints
export const complaintAPI = {
  getAllComplaints: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiRequest(`/complaints${queryParams ? `?${queryParams}` : ''}`, 'GET');
  },
  getComplaintById: (complaintId) => apiRequest(`/complaints/${complaintId}`, 'GET'),
  createComplaint: (complaintData) => apiRequest('/complaints', 'POST', complaintData),
  updateComplaint: (complaintId, complaintData) => apiRequest(`/complaints/${complaintId}`, 'PUT', complaintData),
  deleteComplaint: (complaintId) => apiRequest(`/complaints/${complaintId}`, 'DELETE'),
  updateStatus: (complaintId, statusData) => apiRequest(`/complaints/${complaintId}/status`, 'PATCH', statusData),
  addNote: (complaintId, noteData) => apiRequest(`/complaints/${complaintId}/notes`, 'POST', noteData),
  escalateComplaint: (complaintId, escalationData) => apiRequest(`/complaints/${complaintId}/escalate`, 'POST', escalationData),
  assignComplaint: (complaintId, assignmentData) => apiRequest(`/complaints/${complaintId}/assign`, 'POST', assignmentData),
  getUserComplaints: (userId) => apiRequest(`/users/${userId}/complaints`, 'GET'),
  getStaffAssignedComplaints: (staffId) => apiRequest(`/staff/${staffId}/assigned-complaints`, 'GET'),
  searchComplaints: (searchParams) => apiRequest('/complaints/search', 'POST', searchParams),
  getComplaintTimeline: (complaintId) => apiRequest(`/complaints/${complaintId}/timeline`, 'GET'),
  addComment: (complaintId, comment) => apiRequest(`/complaints/${complaintId}/comments`, 'POST', { comment }),
  markAsResolved: (complaintId, resolution) => apiRequest(`/complaints/${complaintId}/resolve`, 'POST', { resolution }),
};

// Employee Request endpoints (for qualification requests)
export const employeeRequestAPI = {
  getAllRequests: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiRequest(`/employee-requests${queryParams ? `?${queryParams}` : ''}`, 'GET');
  },
  getRequestById: (requestId) => apiRequest(`/employee-requests/${requestId}`, 'GET'),
  createRequest: (requestData) => apiRequest('/employee-requests', 'POST', requestData),
  updateRequest: (requestId, requestData) => apiRequest(`/employee-requests/${requestId}`, 'PUT', requestData),
  reviewRequest: (requestId, reviewData) => apiRequest(`/employee-requests/${requestId}/review`, 'POST', reviewData),
  approveRequest: (requestId, notes = '') => apiRequest(`/employee-requests/${requestId}/approve`, 'POST', { notes }),
  rejectRequest: (requestId, reason) => apiRequest(`/employee-requests/${requestId}/reject`, 'POST', { reason }),
  getUserRequests: (userId) => apiRequest(`/users/${userId}/employee-requests`, 'GET'),
  getPendingRequests: () => apiRequest('/employee-requests/pending', 'GET'),
  assignTest: (requestId, testDetails) => apiRequest(`/employee-requests/${requestId}/assign-test`, 'POST', testDetails),
  submitTestResults: (requestId, results) => apiRequest(`/employee-requests/${requestId}/submit-test`, 'POST', results),
};

// Analytics endpoints
export const analyticsAPI = {
  getDashboardStats: (timeRange = 'month') => apiRequest(`/analytics/dashboard?timeRange=${timeRange}`, 'GET'),
  getComplaintTrends: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiRequest(`/analytics/complaint-trends${queryParams ? `?${queryParams}` : ''}`, 'GET');
  },
  getCategoryStats: () => apiRequest('/analytics/categories', 'GET'),
  getPerformanceStats: () => apiRequest('/analytics/performance', 'GET'),
  getEscalationStats: () => apiRequest('/analytics/escalations', 'GET'),
  exportData: (exportType, params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiRequest(`/analytics/export/${exportType}${queryParams ? `?${queryParams}` : ''}`, 'GET');
  },
  getUserActivity: (userId) => apiRequest(`/analytics/user-activity/${userId}`, 'GET'),
  getSystemMetrics: () => apiRequest('/analytics/system-metrics', 'GET'),
  getStaffEfficiency: () => apiRequest('/analytics/staff-efficiency', 'GET'),
};

// File upload endpoint
export const uploadAPI = {
  uploadFile: (file, type = 'complaint') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const url = `${API_BASE_URL}/upload`;
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: formData,
    };

    return fetch(url, options).then(response => response.json());
  },
  deleteFile: (fileId) => apiRequest(`/upload/${fileId}`, 'DELETE'),
  getFile: (fileId) => apiRequest(`/upload/${fileId}`, 'GET'),
  listFiles: (complaintId) => apiRequest(`/upload/complaint/${complaintId}`, 'GET'),
};

// Utility functions
export const APIUtils = {
  // Format query parameters
  formatQueryParams: (params) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
    );
    return new URLSearchParams(filteredParams).toString();
  },

  // Handle API errors consistently
  handleError: (error, fallbackMessage = 'An error occurred') => {
    console.error('API Error:', error);
    
    if (error.message) {
      throw new Error(error.message);
    }
    
    throw new Error(fallbackMessage);
  },

  // Check if response is successful
  isSuccess: (response) => {
    return response && (response.success !== false);
  },

  // Extract error message from response
  getErrorMessage: (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
    return error.message || 'An unexpected error occurred';
  },
};

// Export the API base URL for reference
export { API_BASE_URL };

export default {
  authAPI,
  userAPI,
  staffAPI,
  complaintAPI,
  employeeRequestAPI,
  analyticsAPI,
  uploadAPI,
  APIUtils,
};