// src/services/authService.js
import { authAPI } from './api';

// Authentication service
class AuthService {
  // Login user
  login = async (email, password, role) => {
    try {
      const response = await authAPI.login({ email, password, role });
      
      if (response.token) {
        this.storeAuthData(response.token, response.user);
        return {
          success: true,
          data: response.user,
          message: 'Login successful'
        };
      }
      
      return {
        success: false,
        message: response.message || 'Login failed'
      };
    } catch (error) {
      console.error('Login failed:', error);
      return {
        success: false,
        message: error.message || 'Login failed. Please try again.'
      };
    }
  };

  // Signup user
  signup = async (userData) => {
    try {
      const response = await authAPI.signup(userData);
      
      if (response.token) {
        this.storeAuthData(response.token, response.user);
        return {
          success: true,
          data: response.user,
          message: 'Registration successful'
        };
      }
      
      return {
        success: false,
        message: response.message || 'Registration failed'
      };
    } catch (error) {
      console.error('Signup failed:', error);
      return {
        success: false,
        message: error.message || 'Registration failed. Please try again.'
      };
    }
  };

  // Store authentication data
  storeAuthData = (token, user) => {
    // Store token
    localStorage.setItem('authToken', token);
    
    // Store user data
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userEmail', user.email);
      
      // Store additional user info if available
      if (user.avatar) localStorage.setItem('userAvatar', user.avatar);
      if (user.department) localStorage.setItem('userDepartment', user.department);
      if (user.position) localStorage.setItem('userPosition', user.position);
    }
    
    // Set login timestamp
    localStorage.setItem('loginTime', new Date().toISOString());
  };

  // Logout user
  logout = () => {
    // Clear all auth related storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('userDepartment');
    localStorage.removeItem('userPosition');
    localStorage.removeItem('loginTime');
    
    // Clear session storage
    sessionStorage.clear();
    
    // Redirect to login page
    window.location.href = '/login';
  };

  // Get current user from localStorage
  getCurrentUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };

  // Get auth token
  getToken = () => {
    return localStorage.getItem('authToken');
  };

  // Check if user is authenticated
  isAuthenticated = () => {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!token && !!user;
  };

  // Verify token with server
  verifyToken = async () => {
    try {
      const token = this.getToken();
      if (!token) return false;

      const response = await authAPI.verifyToken();
      return response.valid === true;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  };

  // Refresh token
  refreshToken = async () => {
    try {
      const response = await authAPI.refreshToken();
      if (response.token) {
        const user = this.getCurrentUser();
        this.storeAuthData(response.token, user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  };

  // Change password
  changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await authAPI.changePassword({
        currentPassword,
        newPassword,
      });
      
      return {
        success: response.success || false,
        message: response.message || 'Password changed successfully'
      };
    } catch (error) {
      console.error('Password change failed:', error);
      return {
        success: false,
        message: error.message || 'Password change failed'
      };
    }
  };

  // Forgot password
  forgotPassword = async (email) => {
    try {
      const response = await authAPI.forgotPassword(email);
      
      return {
        success: response.success || false,
        message: response.message || 'Password reset instructions sent to your email'
      };
    } catch (error) {
      console.error('Forgot password failed:', error);
      return {
        success: false,
        message: error.message || 'Failed to process forgot password request'
      };
    }
  };

  // Reset password
  resetPassword = async (token, newPassword) => {
    try {
      const response = await authAPI.resetPassword(token, newPassword);
      
      return {
        success: response.success || false,
        message: response.message || 'Password reset successful'
      };
    } catch (error) {
      console.error('Reset password failed:', error);
      return {
        success: false,
        message: error.message || 'Password reset failed'
      };
    }
  };

  // Check user role
  hasRole = (requiredRole) => {
    const user = this.getCurrentUser();
    return user && user.role === requiredRole;
  };

  // Check if user is admin
  isAdmin = () => {
    return this.hasRole('admin');
  };

  // Check if user is staff
  isStaff = () => {
    return this.hasRole('staff');
  };

  // Check if user is regular user
  isUser = () => {
    return this.hasRole('user');
  };

  // Get user role
  getUserRole = () => {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  };

  // Get user ID
  getUserId = () => {
    const user = this.getCurrentUser();
    return user ? user.id : null;
  };

  // Get user name
  getUserName = () => {
    const user = this.getCurrentUser();
    return user ? user.name : 'User';
  };

  // Get user email
  getUserEmail = () => {
    const user = this.getCurrentUser();
    return user ? user.email : '';
  };

  // Get user department
  getUserDepartment = () => {
    const user = this.getCurrentUser();
    return user ? user.department : null;
  };

  // Get user position
  getUserPosition = () => {
    const user = this.getCurrentUser();
    return user ? user.position : null;
  };

  // Get user avatar
  getUserAvatar = () => {
    return localStorage.getItem('userAvatar') || null;
  };

  // Get login time
  getLoginTime = () => {
    return localStorage.getItem('loginTime');
  };

  // Get user session duration in minutes
  getSessionDuration = () => {
    const loginTime = this.getLoginTime();
    if (!loginTime) return 0;
    
    const loginDate = new Date(loginTime);
    const now = new Date();
    const diffMs = now - loginDate;
    return Math.floor(diffMs / (1000 * 60)); // Convert to minutes
  };

  // Get user dashboard route based on role
  getDashboardRoute = () => {
    const role = this.getUserRole();
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'staff':
        return '/staff/dashboard';
      case 'user':
        return '/user/dashboard';
      default:
        return '/login';
    }
  };

  // Get login redirect route
  getLoginRedirectRoute = () => {
    const role = this.getUserRole();
    switch (role) {
      case 'admin':
        return '/admin';
      case 'staff':
        return '/staff';
      case 'user':
        return '/user';
      default:
        return '/';
    }
  };

  // Handle authentication errors
  handleAuthError = (error) => {
    const errorMessage = error.message || '';
    
    // Check for authentication related errors
    if (errorMessage.includes('401') || 
        errorMessage.includes('Unauthorized') || 
        errorMessage.includes('Invalid token') ||
        errorMessage.includes('Token expired')) {
      
      // Try to refresh token first
      this.refreshToken().then(refreshSuccess => {
        if (!refreshSuccess) {
          // If refresh fails, logout
          this.logout();
        }
      }).catch(() => {
        this.logout();
      });
      
      return true;
    }
    
    return false;
  };

  // Update user profile in localStorage
  updateUserProfile = (updatedData) => {
    try {
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        const updatedUser = { ...currentUser, ...updatedData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Update individual fields for compatibility
        if (updatedData.name) {
          localStorage.setItem('userName', updatedData.name);
        }
        if (updatedData.email) {
          localStorage.setItem('userEmail', updatedData.email);
        }
        if (updatedData.avatar) {
          localStorage.setItem('userAvatar', updatedData.avatar);
        }
        if (updatedData.department) {
          localStorage.setItem('userDepartment', updatedData.department);
        }
        if (updatedData.position) {
          localStorage.setItem('userPosition', updatedData.position);
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to update user profile:', error);
      return false;
    }
  };

  // Clear all auth data without redirect
  clearAuthData = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('userDepartment');
    localStorage.removeItem('userPosition');
    localStorage.removeItem('loginTime');
  };

  // Get user permissions based on role
  getUserPermissions = () => {
    const role = this.getUserRole();
    
    const permissions = {
      admin: {
        canViewDashboard: true,
        canManageUsers: true,
        canManageStaff: true,
        canManageComplaints: true,
        canAssignComplaints: true,
        canEscalateComplaints: true,
        canViewReports: true,
        canExportData: true,
        canManageSettings: true,
        canReviewEmployeeRequests: true,
        canCreateAnnouncements: true,
      },
      staff: {
        canViewDashboard: true,
        canManageUsers: false,
        canManageStaff: false,
        canManageComplaints: true,
        canAssignComplaints: false,
        canEscalateComplaints: true,
        canViewReports: true,
        canExportData: false,
        canManageSettings: false,
        canReviewEmployeeRequests: false,
        canCreateAnnouncements: false,
      },
      user: {
        canViewDashboard: true,
        canManageUsers: false,
        canManageStaff: false,
        canManageComplaints: false,
        canAssignComplaints: false,
        canEscalateComplaints: false,
        canViewReports: false,
        canExportData: false,
        canManageSettings: false,
        canReviewEmployeeRequests: false,
        canCreateAnnouncements: false,
        canSubmitComplaints: true,
        canViewOwnComplaints: true,
        canSubmitEmployeeRequest: true,
      }
    };
    
    return permissions[role] || permissions.user;
  };

  // Check if user has specific permission
  hasPermission = (permission) => {
    const permissions = this.getUserPermissions();
    return permissions[permission] || false;
  };

  // Get user session info
  getSessionInfo = () => {
    return {
      isAuthenticated: this.isAuthenticated(),
      role: this.getUserRole(),
      userId: this.getUserId(),
      userName: this.getUserName(),
      userEmail: this.getUserEmail(),
      department: this.getUserDepartment(),
      position: this.getUserPosition(),
      loginTime: this.getLoginTime(),
      sessionDuration: this.getSessionDuration(),
      dashboardRoute: this.getDashboardRoute(),
      permissions: this.getUserPermissions()
    };
  };

  // Validate user session
  validateSession = async () => {
    if (!this.isAuthenticated()) {
      return {
        valid: false,
        message: 'User not authenticated'
      };
    }

    // Check if token is valid
    const tokenValid = await this.verifyToken();
    if (!tokenValid) {
      this.clearAuthData();
      return {
        valid: false,
        message: 'Session expired'
      };
    }

    // Check session duration (optional: you can set a max session time)
    const sessionDuration = this.getSessionDuration();
    const maxSessionMinutes = 480; // 8 hours
    
    if (sessionDuration > maxSessionMinutes) {
      this.logout();
      return {
        valid: false,
        message: 'Session timeout'
      };
    }

    return {
      valid: true,
      message: 'Session valid',
      user: this.getCurrentUser(),
      sessionInfo: this.getSessionInfo()
    };
  };

  // Get user initials for avatar
  getUserInitials = () => {
    const name = this.getUserName();
    if (!name) return 'U';
    
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get user color for avatar based on name
  getUserAvatarColor = () => {
    const name = this.getUserName();
    if (!name) return 'bg-blue-600';
    
    const colors = [
      'bg-gradient-to-r from-blue-600 to-indigo-600',
      'bg-gradient-to-r from-green-600 to-emerald-600',
      'bg-gradient-to-r from-purple-600 to-pink-600',
      'bg-gradient-to-r from-orange-600 to-red-600',
      'bg-gradient-to-r from-teal-600 to-cyan-600',
      'bg-gradient-to-r from-yellow-600 to-amber-600'
    ];
    
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };
}

export default new AuthService();