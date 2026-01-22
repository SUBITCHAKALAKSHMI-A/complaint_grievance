const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

// Generate unique complaint ID
const generateComplaintId = () => {
    const date = moment().format('YYYYMMDD');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${date}-${random}`;
};

// Format date for display
const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

// Calculate time difference in hours
const hoursDifference = (date1, date2) => {
    return moment(date2).diff(moment(date1), 'hours');
};

// Validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate phone number
const isValidPhone = (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// Sanitize input
const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    return input.trim().replace(/[<>]/g, '');
};

// Pagination helper
const getPagination = (page, limit) => {
    const offset = (page - 1) * limit;
    return { offset, limit: parseInt(limit) };
};

// Pagination response formatter
const formatPaginationResponse = (data, page, limit, total) => {
    const totalPages = Math.ceil(total / limit);
    return {
        data,
        pagination: {
            current_page: parseInt(page),
            total_pages: totalPages,
            total_records: total,
            has_next: page < totalPages,
            has_prev: page > 1
        }
    };
};

// Generate status update message
const generateStatusMessage = (status, complaintId) => {
    const messages = {
        'new': `Complaint ${complaintId} has been submitted successfully.`,
        'under_review': `Complaint ${complaintId} is now under review.`,
        'in_progress': `Complaint ${complaintId} is being processed.`,
        'escalated': `Complaint ${complaintId} has been escalated to higher authority.`,
        'resolved': `Complaint ${complaintId} has been resolved.`,
        'rejected': `Complaint ${complaintId} has been rejected.`
    };
    return messages[status] || `Complaint ${complaintId} status updated to ${status}.`;
};

// Calculate resolution time
const calculateResolutionTime = (createdAt, resolvedAt) => {
    if (!resolvedAt) return null;
    return hoursDifference(createdAt, resolvedAt);
};

// Format complaint data for API response
const formatComplaint = (complaint) => {
    return {
        ...complaint,
        created_at: formatDate(complaint.created_at),
        updated_at: formatDate(complaint.updated_at),
        resolved_at: complaint.resolved_at ? formatDate(complaint.resolved_at) : null,
        resolution_time: calculateResolutionTime(complaint.created_at, complaint.resolved_at)
    };
};

// Export data to CSV format
const exportToCSV = (data, headers) => {
    const csvHeaders = headers.join(',');
    const csvRows = data.map(row => 
        headers.map(header => {
            const value = row[header] || '';
            return `"${value.toString().replace(/"/g, '""')}"`;
        }).join(',')
    );
    return [csvHeaders, ...csvRows].join('\n');
};

// Error response formatter
const formatErrorResponse = (message, code = 500, details = null) => {
    const response = {
        error: message,
        status_code: code,
        timestamp: new Date().toISOString()
    };
    
    if (details && process.env.NODE_ENV === 'development') {
        response.details = details;
    }
    
    return response;
};

module.exports = {
    generateComplaintId,
    formatDate,
    hoursDifference,
    isValidEmail,
    isValidPhone,
    sanitizeInput,
    getPagination,
    formatPaginationResponse,
    generateStatusMessage,
    calculateResolutionTime,
    formatComplaint,
    exportToCSV,
    formatErrorResponse
};
