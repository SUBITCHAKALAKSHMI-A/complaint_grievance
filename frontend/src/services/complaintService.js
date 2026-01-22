// src/services/complaintService.js
import { complaintAPI, uploadAPI } from './api';

// Complaint service
class ComplaintService {
  // Get all complaints
  getAllComplaints = async (filters = {}) => {
    try {
      const params = {};
      
      if (filters.status) params.status = filters.status;
      if (filters.category) params.category = filters.category;
      if (filters.priority) params.priority = filters.priority;
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;
      if (filters.search) params.search = filters.search;
      if (filters.assignedTo) params.assignedTo = filters.assignedTo;
      if (filters.userId) params.userId = filters.userId;
      
      return await complaintAPI.getAllComplaints(params);
    } catch (error) {
      console.error('Failed to fetch complaints:', error);
      throw error;
    }
  };

  // Get complaint by ID
  getComplaintById = async (complaintId) => {
    try {
      return await complaintAPI.getComplaintById(complaintId);
    } catch (error) {
      console.error(`Failed to fetch complaint ${complaintId}:`, error);
      throw error;
    }
  };

  // Create new complaint
  createComplaint = async (complaintData, files = []) => {
    try {
      // Handle file uploads if any
      if (files && files.length > 0) {
        const fileUploadPromises = files.map(file => 
          uploadAPI.uploadFile(file, 'complaint')
        );
        const uploadedFiles = await Promise.all(fileUploadPromises);
        complaintData.attachments = uploadedFiles.map(file => file.url);
      }

      return await complaintAPI.createComplaint(complaintData);
    } catch (error) {
      console.error('Failed to create complaint:', error);
      throw error;
    }
  };

  // Update complaint
  updateComplaint = async (complaintId, complaintData) => {
    try {
      return await complaintAPI.updateComplaint(complaintId, complaintData);
    } catch (error) {
      console.error(`Failed to update complaint ${complaintId}:`, error);
      throw error;
    }
  };

  // Update complaint status
  updateStatus = async (complaintId, status, note = '') => {
    try {
      return await complaintAPI.updateStatus(complaintId, { status, note });
    } catch (error) {
      console.error(`Failed to update status for complaint ${complaintId}:`, error);
      throw error;
    }
  };

  // Add note to complaint
  addNote = async (complaintId, note, isInternal = false) => {
    try {
      return await complaintAPI.addNote(complaintId, { note, isInternal });
    } catch (error) {
      console.error(`Failed to add note to complaint ${complaintId}:`, error);
      throw error;
    }
  };

  // Escalate complaint
  escalateComplaint = async (complaintId, reason, level = 1) => {
    try {
      return await complaintAPI.escalateComplaint(complaintId, { reason, level });
    } catch (error) {
      console.error(`Failed to escalate complaint ${complaintId}:`, error);
      throw error;
    }
  };

  // Assign complaint to staff
  assignComplaint = async (complaintId, staffId, note = '') => {
    try {
      return await complaintAPI.assignComplaint(complaintId, { staffId, note });
    } catch (error) {
      console.error(`Failed to assign complaint ${complaintId}:`, error);
      throw error;
    }
  };

  // Mark complaint as resolved
  markAsResolved = async (complaintId, resolution) => {
    try {
      return await complaintAPI.markAsResolved(complaintId, resolution);
    } catch (error) {
      console.error(`Failed to resolve complaint ${complaintId}:`, error);
      throw error;
    }
  };

  // Get complaint timeline
  getComplaintTimeline = async (complaintId) => {
    try {
      return await complaintAPI.getComplaintTimeline(complaintId);
    } catch (error) {
      console.error(`Failed to fetch timeline for complaint ${complaintId}:`, error);
      throw error;
    }
  };

  // Add comment to complaint
  addComment = async (complaintId, comment) => {
    try {
      return await complaintAPI.addComment(complaintId, comment);
    } catch (error) {
      console.error(`Failed to add comment to complaint ${complaintId}:`, error);
      throw error;
    }
  };

  // Get user complaints
  getUserComplaints = async (userId) => {
    try {
      return await complaintAPI.getUserComplaints(userId);
    } catch (error) {
      console.error(`Failed to fetch complaints for user ${userId}:`, error);
      throw error;
    }
  };

  // Get staff assigned complaints
  getStaffAssignedComplaints = async (staffId) => {
    try {
      return await complaintAPI.getStaffAssignedComplaints(staffId);
    } catch (error) {
      console.error(`Failed to fetch assigned complaints for staff ${staffId}:`, error);
      throw error;
    }
  };

  // Search complaints
  searchComplaints = async (searchTerm, filters = {}) => {
    try {
      const searchParams = {
        search: searchTerm,
        ...filters
      };
      return await complaintAPI.searchComplaints(searchParams);
    } catch (error) {
      console.error('Failed to search complaints:', error);
      throw error;
    }
  };

  // Delete complaint
  deleteComplaint = async (complaintId) => {
    try {
      return await complaintAPI.deleteComplaint(complaintId);
    } catch (error) {
      console.error(`Failed to delete complaint ${complaintId}:`, error);
      throw error;
    }
  };

  // Get complaint statistics
  getComplaintStats = async (timeRange = 'month') => {
    try {
      const complaints = await this.getAllComplaints();
      
      const now = new Date();
      let startDate;
      
      switch (timeRange) {
        case 'day':
          startDate = new Date(now.setDate(now.getDate() - 1));
          break;
        case 'week':
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'month':
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case 'year':
          startDate = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
        default:
          startDate = new Date(now.setMonth(now.getMonth() - 1));
      }

      const filteredComplaints = complaints.filter(complaint => 
        new Date(complaint.createdAt) >= startDate
      );

      const stats = {
        total: filteredComplaints.length,
        pending: filteredComplaints.filter(c => c.status === 'pending').length,
        inProgress: filteredComplaints.filter(c => c.status === 'in-progress').length,
        resolved: filteredComplaints.filter(c => c.status === 'resolved').length,
        escalated: filteredComplaints.filter(c => c.status === 'escalated').length,
        byCategory: {},
        byPriority: {},
        byDay: {}
      };

      // Calculate category stats
      filteredComplaints.forEach(complaint => {
        stats.byCategory[complaint.category] = (stats.byCategory[complaint.category] || 0) + 1;
        stats.byPriority[complaint.priority] = (stats.byPriority[complaint.priority] || 0) + 1;
        
        const day = new Date(complaint.createdAt).toLocaleDateString();
        stats.byDay[day] = (stats.byDay[day] || 0) + 1;
      });

      return stats;
    } catch (error) {
      console.error('Failed to get complaint stats:', error);
      throw error;
    }
  };

  // Format complaint for display
  formatComplaint = (complaint) => {
    return {
      id: complaint.id,
      title: complaint.title,
      description: complaint.description,
      category: complaint.category,
      priority: complaint.priority,
      status: complaint.status,
      createdAt: complaint.createdAt,
      updatedAt: complaint.updatedAt,
      userId: complaint.userId,
      userName: complaint.userName,
      assignedTo: complaint.assignedTo,
      assignedToName: complaint.assignedToName,
      attachments: complaint.attachments || [],
      notes: complaint.notes || [],
      timeline: complaint.timeline || []
    };
  };

  // Get status options
  getStatusOptions = () => {
    return [
      { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
      { value: 'in-progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
      { value: 'resolved', label: 'Resolved', color: 'bg-green-100 text-green-800' },
      { value: 'escalated', label: 'Escalated', color: 'bg-red-100 text-red-800' },
      { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-800' }
    ];
  };

  // Get priority options
  getPriorityOptions = () => {
    return [
      { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
      { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
      { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
      { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800' }
    ];
  };

  // Get category options
  getCategoryOptions = () => {
    return [
      { value: 'technical', label: 'Technical', color: 'bg-blue-100 text-blue-800' },
      { value: 'service', label: 'Service', color: 'bg-green-100 text-green-800' },
      { value: 'finance', label: 'Finance', color: 'bg-purple-100 text-purple-800' },
      { value: 'hr', label: 'Human Resources', color: 'bg-pink-100 text-pink-800' },
      { value: 'facilities', label: 'Facilities', color: 'bg-yellow-100 text-yellow-800' },
      { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-800' }
    ];
  };
}

export default new ComplaintService();