import { ROLES } from './constants';

/**
 * Check if user has specific role
 * @param {string} userRole - User's current role
 * @param {string|Array} requiredRole - Required role(s)
 * @returns {boolean}
 */
export const hasRole = (userRole, requiredRole) => {
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole);
  }
  return userRole === requiredRole;
};

/**
 * Check if user is admin
 * @param {string} userRole 
 * @returns {boolean}
 */
export const isAdmin = (userRole) => {
  return userRole === ROLES.ADMIN;
};

/**
 * Check if user is staff
 * @param {string} userRole 
 * @returns {boolean}
 */
export const isStaff = (userRole) => {
  return userRole === ROLES.STAFF;
};

/**
 * Check if user is regular user
 * @param {string} userRole 
 * @returns {boolean}
 */
export const isUser = (userRole) => {
  return userRole === ROLES.USER;
};

/**
 * Get dashboard route based on role
 * @param {string} role 
 * @returns {string}
 */
export const getDashboardRoute = (role) => {
  switch (role) {
    case ROLES.ADMIN:
      return '/admin/dashboard';
    case ROLES.STAFF:
      return '/staff/dashboard';
    case ROLES.USER:
      return '/user/dashboard';
    default:
      return '/';
  }
};

/**
 * Get navigation items based on role
 * @param {string} role 
 * @returns {Array}
 */
export const getNavItems = (role) => {
  const commonItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/profile', label: 'Profile', icon: 'person' }
  ];

  switch (role) {
    case ROLES.ADMIN:
      return [
        ...commonItems,
        { path: '/admin/users', label: 'Manage Users', icon: 'people' },
        { path: '/admin/staff', label: 'Manage Staff', icon: 'badge' },
        { path: '/admin/complaints', label: 'All Complaints', icon: 'list_alt' },
        { path: '/admin/requests', label: 'Employee Requests', icon: 'assignment' },
        { path: '/admin/assign', label: 'Assign Complaints', icon: 'assignment_turned_in' },
        { path: '/admin/escalations', label: 'Escalations', icon: 'priority_high' },
        { path: '/admin/reports', label: 'Reports', icon: 'assessment' },
        { path: '/admin/analytics', label: 'Analytics', icon: 'analytics' }
      ];

    case ROLES.STAFF:
      return [
        ...commonItems,
        { path: '/staff/assigned', label: 'Assigned Complaints', icon: 'assignment' },
        { path: '/staff/updates', label: 'Update Complaints', icon: 'update' },
        { path: '/staff/completed', label: 'Completed Work', icon: 'check_circle' },
        { path: '/staff/performance', label: 'Performance', icon: 'trending_up' }
      ];

    case ROLES.USER:
      return [
        ...commonItems,
        { path: '/user/complaints/new', label: 'New Complaint', icon: 'add_circle' },
        { path: '/user/complaints', label: 'My Complaints', icon: 'list' },
        { path: '/user/timeline', label: 'Timeline', icon: 'timeline' },
        { path: '/user/request', label: 'Become Employee', icon: 'work' },
        { path: '/user/status', label: 'Request Status', icon: 'hourglass_empty' },
        { path: '/user/escalations', label: 'Escalations', icon: 'escalator_warning' }
      ];

    default:
      return commonItems;
  }
};

/**
 * Get permissions for specific role
 * @param {string} role 
 * @returns {Object}
 */
export const getPermissions = (role) => {
  const basePermissions = {
    viewDashboard: true,
    viewProfile: true,
    updateProfile: true
  };

  switch (role) {
    case ROLES.ADMIN:
      return {
        ...basePermissions,
        manageUsers: true,
        manageStaff: true,
        viewAllComplaints: true,
        assignComplaints: true,
        escalateComplaints: true,
        generateReports: true,
        viewAnalytics: true,
        processEmployeeRequests: true,
        scheduleTests: true,
        changeUserRoles: true,
        deleteComplaints: false,
        exportData: true
      };

    case ROLES.STAFF:
      return {
        ...basePermissions,
        viewAssignedComplaints: true,
        updateComplaintStatus: true,
        addInternalNotes: true,
        replyToUsers: true,
        markAsResolved: true,
        requestEscalation: true,
        viewPerformance: true
      };

    case ROLES.USER:
      return {
        ...basePermissions,
        submitComplaints: true,
        viewOwnComplaints: true,
        trackComplaintStatus: true,
        viewTimeline: true,
        uploadFiles: true,
        escalateComplaint: true,
        submitEmployeeRequest: true,
        viewRequestStatus: true,
        deleteOwnComplaints: false,
        editOwnComplaints: true
      };

    default:
      return basePermissions;
  }
};

/**
 * Format role for display
 * @param {string} role 
 * @returns {string}
 */
export const formatRole = (role) => {
  switch (role) {
    case ROLES.ADMIN:
      return 'Administrator';
    case ROLES.STAFF:
      return 'Staff Member';
    case ROLES.USER:
      return 'User';
    default:
      return 'Guest';
  }
};

/**
 * Get role badge color
 * @param {string} role 
 * @returns {string}
 */
export const getRoleColor = (role) => {
  switch (role) {
    case ROLES.ADMIN:
      return 'bg-gradient-to-r from-purple-600 to-pink-500';
    case ROLES.STAFF:
      return 'bg-gradient-to-r from-blue-500 to-cyan-400';
    case ROLES.USER:
      return 'bg-gradient-to-r from-green-500 to-emerald-400';
    default:
      return 'bg-gradient-to-r from-gray-500 to-gray-400';
  }
};

/**
 * Check if user can access route
 * @param {string} userRole 
 * @param {string} route 
 * @returns {boolean}
 */
export const canAccessRoute = (userRole, route) => {
  const protectedRoutes = {
    '/admin': [ROLES.ADMIN],
    '/staff': [ROLES.STAFF, ROLES.ADMIN],
    '/user': [ROLES.USER, ROLES.STAFF, ROLES.ADMIN],
    '/dashboard': [ROLES.USER, ROLES.STAFF, ROLES.ADMIN]
  };

  for (const [path, allowedRoles] of Object.entries(protectedRoutes)) {
    if (route.startsWith(path)) {
      return allowedRoles.includes(userRole);
    }
  }

  return true; // Public routes
};