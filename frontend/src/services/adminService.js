// src/services/adminService.js
import { userAPI, staffAPI, analyticsAPI, employeeRequestAPI } from './api';

// Admin service
class AdminService {
  // User management
  getUsers = async (filters = {}) => {
    try {
      const params = {};
      
      if (filters.status) params.status = filters.status;
      if (filters.role) params.role = filters.role;
      if (filters.search) params.search = filters.search;
      
      return await userAPI.getAllUsers(params);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  };

  getUserById = async (userId) => {
    try {
      return await userAPI.getUserById(userId);
    } catch (error) {
      console.error(`Failed to fetch user ${userId}:`, error);
      throw error;
    }
  };

  updateUser = async (userId, userData) => {
    try {
      return await userAPI.updateUser(userId, userData);
    } catch (error) {
      console.error(`Failed to update user ${userId}:`, error);
      throw error;
    }
  };

  deleteUser = async (userId) => {
    try {
      return await userAPI.deleteUser(userId);
    } catch (error) {
      console.error(`Failed to delete user ${userId}:`, error);
      throw error;
    }
  };

  toggleUserStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      return await userAPI.toggleUserStatus(userId, newStatus);
    } catch (error) {
      console.error(`Failed to toggle user status ${userId}:`, error);
      throw error;
    }
  };

  updateUserRole = async (userId, role) => {
    try {
      return await userAPI.updateUserRole(userId, role);
    } catch (error) {
      console.error(`Failed to update user role ${userId}:`, error);
      throw error;
    }
  };

  // Staff management
  getStaff = async (filters = {}) => {
    try {
      const params = {};
      
      if (filters.status) params.status = filters.status;
      if (filters.department) params.department = filters.department;
      if (filters.search) params.search = filters.search;
      
      return await staffAPI.getAllStaff(params);
    } catch (error) {
      console.error('Failed to fetch staff:', error);
      throw error;
    }
  };

  getStaffById = async (staffId) => {
    try {
      return await staffAPI.getStaffById(staffId);
    } catch (error) {
      console.error(`Failed to fetch staff ${staffId}:`, error);
      throw error;
    }
  };

  createStaff = async (staffData) => {
    try {
      return await staffAPI.createStaff(staffData);
    } catch (error) {
      console.error('Failed to create staff:', error);
      throw error;
    }
  };

  updateStaff = async (staffId, staffData) => {
    try {
      return await staffAPI.updateStaff(staffId, staffData);
    } catch (error) {
      console.error(`Failed to update staff ${staffId}:`, error);
      throw error;
    }
  };

  deleteStaff = async (staffId) => {
    try {
      return await staffAPI.deleteStaff(staffId);
    } catch (error) {
      console.error(`Failed to delete staff ${staffId}:`, error);
      throw error;
    }
  };

  getStaffPerformance = async (staffId) => {
    try {
      return await staffAPI.getStaffPerformance(staffId);
    } catch (error) {
      console.error(`Failed to fetch performance for staff ${staffId}:`, error);
      throw error;
    }
  };

  assignComplaints = async (assignments) => {
    try {
      return await staffAPI.assignComplaints(assignments);
    } catch (error) {
      console.error('Failed to assign complaints:', error);
      throw error;
    }
  };

  getAvailableStaff = async (department = null) => {
    try {
      return await staffAPI.getAvailableStaff(department);
    } catch (error) {
      console.error('Failed to fetch available staff:', error);
      throw error;
    }
  };

  // Employee requests (qualification requests)
  getEmployeeRequests = async (filters = {}) => {
    try {
      const params = {};
      
      if (filters.status) params.status = filters.status;
      if (filters.search) params.search = filters.search;
      
      return await employeeRequestAPI.getAllRequests(params);
    } catch (error) {
      console.error('Failed to fetch employee requests:', error);
      throw error;
    }
  };

  getEmployeeRequestById = async (requestId) => {
    try {
      return await employeeRequestAPI.getRequestById(requestId);
    } catch (error) {
      console.error(`Failed to fetch employee request ${requestId}:`, error);
      throw error;
    }
  };

  reviewRequest = async (requestId, reviewData) => {
    try {
      return await employeeRequestAPI.reviewRequest(requestId, reviewData);
    } catch (error) {
      console.error(`Failed to review request ${requestId}:`, error);
      throw error;
    }
  };

  approveRequest = async (requestId, notes = '') => {
    try {
      return await employeeRequestAPI.approveRequest(requestId, notes);
    } catch (error) {
      console.error(`Failed to approve request ${requestId}:`, error);
      throw error;
    }
  };

  rejectRequest = async (requestId, reason) => {
    try {
      return await employeeRequestAPI.rejectRequest(requestId, reason);
    } catch (error) {
      console.error(`Failed to reject request ${requestId}:`, error);
      throw error;
    }
  };

  assignTest = async (requestId, testDetails) => {
    try {
      return await employeeRequestAPI.assignTest(requestId, testDetails);
    } catch (error) {
      console.error(`Failed to assign test for request ${requestId}:`, error);
      throw error;
    }
  };

  submitTestResults = async (requestId, results) => {
    try {
      return await employeeRequestAPI.submitTestResults(requestId, results);
    } catch (error) {
      console.error(`Failed to submit test results for request ${requestId}:`, error);
      throw error;
    }
  };

  // Analytics and reports
  getDashboardStats = async (timeRange = 'month') => {
    try {
      return await analyticsAPI.getDashboardStats(timeRange);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      throw error;
    }
  };

  getComplaintTrends = async (filters = {}) => {
    try {
      return await analyticsAPI.getComplaintTrends(filters);
    } catch (error) {
      console.error('Failed to fetch complaint trends:', error);
      throw error;
    }
  };

  getCategoryStats = async () => {
    try {
      return await analyticsAPI.getCategoryStats();
    } catch (error) {
      console.error('Failed to fetch category stats:', error);
      throw error;
    }
  };

  getPerformanceStats = async () => {
    try {
      return await analyticsAPI.getPerformanceStats();
    } catch (error) {
      console.error('Failed to fetch performance stats:', error);
      throw error;
    }
  };

  getEscalationStats = async () => {
    try {
      return await analyticsAPI.getEscalationStats();
    } catch (error) {
      console.error('Failed to fetch escalation stats:', error);
      throw error;
    }
  };

  exportData = async (exportType, params = {}) => {
    try {
      return await analyticsAPI.exportData(exportType, params);
    } catch (error) {
      console.error(`Failed to export ${exportType} data:`, error);
      throw error;
    }
  };

  getSystemMetrics = async () => {
    try {
      return await analyticsAPI.getSystemMetrics();
    } catch (error) {
      console.error('Failed to fetch system metrics:', error);
      throw error;
    }
  };

  getStaffEfficiency = async () => {
    try {
      return await analyticsAPI.getStaffEfficiency();
    } catch (error) {
      console.error('Failed to fetch staff efficiency:', error);
      throw error;
    }
  };

  // Generate report
  generateReport = async (reportType, params = {}) => {
    try {
      const data = await this.getDashboardStats(params.timeRange || 'month');
      
      switch (reportType) {
        case 'summary':
          return this.generateSummaryReport(data);
        case 'detailed':
          return this.generateDetailedReport(data);
        case 'performance':
          return this.generatePerformanceReport(data);
        default:
          return this.generateSummaryReport(data);
      }
    } catch (error) {
      console.error(`Failed to generate ${reportType} report:`, error);
      throw error;
    }
  };

  // Generate summary report
  generateSummaryReport = (data) => {
    const report = {
      title: 'System Summary Report',
      generatedAt: new Date().toISOString(),
      summary: {
        totalUsers: data.totalUsers || 0,
        totalStaff: data.totalStaff || 0,
        totalComplaints: data.totalComplaints || 0,
        activeComplaints: data.activeComplaints || 0,
        resolvedComplaints: data.resolvedComplaints || 0,
        resolutionRate: data.resolutionRate || '0%',
        averageResolutionTime: data.averageResolutionTime || 'N/A'
      },
      trends: data.trends || [],
      recommendations: this.generateRecommendations(data)
    };
    
    return report;
  };

  // Generate detailed report
  generateDetailedReport = (data) => {
    const report = {
      title: 'Detailed System Report',
      generatedAt: new Date().toISOString(),
      overview: data.overview || {},
      byCategory: data.byCategory || {},
      byStatus: data.byStatus || {},
      byPriority: data.byPriority || {},
      performanceMetrics: data.performanceMetrics || {},
      staffPerformance: data.staffPerformance || [],
      escalationAnalysis: data.escalationAnalysis || {}
    };
    
    return report;
  };

  // Generate performance report
  generatePerformanceReport = (data) => {
    const report = {
      title: 'Performance Analysis Report',
      generatedAt: new Date().toISOString(),
      systemMetrics: data.systemMetrics || {},
      staffEfficiency: data.staffEfficiency || [],
      complaintTrends: data.complaintTrends || {},
      resolutionAnalysis: data.resolutionAnalysis || {},
      improvementAreas: this.identifyImprovementAreas(data)
    };
    
    return report;
  };

  // Generate recommendations
  generateRecommendations = (data) => {
    const recommendations = [];
    
    if (data.resolutionRate && parseFloat(data.resolutionRate) < 70) {
      recommendations.push('Improve complaint resolution rate by allocating more resources');
    }
    
    if (data.averageResolutionTime && data.averageResolutionTime > '48h') {
      recommendations.push('Reduce average resolution time by optimizing workflow');
    }
    
    if (data.escalatedComplaints && data.escalatedComplaints > data.totalComplaints * 0.1) {
      recommendations.push('Address root causes of frequent escalations');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('System performance is satisfactory. Continue current practices.');
    }
    
    return recommendations;
  };

  // Identify improvement areas
  identifyImprovementAreas = (data) => {
    const areas = [];
    
    if (data.performanceMetrics) {
      if (data.performanceMetrics.slowResponseRate > 0.2) {
        areas.push('Response Time');
      }
      if (data.performanceMetrics.escalationRate > 0.15) {
        areas.push('Escalation Management');
      }
      if (data.performanceMetrics.userSatisfaction < 4.0) {
        areas.push('User Satisfaction');
      }
    }
    
    return areas;
  };
}

export default new AdminService();