/**
 * Utilities for exporting data in various formats
 */

/**
 * Convert data to CSV format
 * @param {Array} data 
 * @param {Array} columns 
 * @returns {string}
 */
export const convertToCSV = (data, columns) => {
  const headers = columns.map(col => `"${col.header}"`).join(',');
  const rows = data.map(item => {
    return columns.map(col => {
      let value = item[col.key];
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      return `"${String(value || '').replace(/"/g, '""')}"`;
    }).join(',');
  });
  
  return [headers, ...rows].join('\n');
};

/**
 * Download CSV file
 * @param {string} csvContent 
 * @param {string} fileName 
 */
export const downloadCSV = (csvContent, fileName) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Generate PDF content for complaint
 * @param {Object} complaint 
 * @returns {string}
 */
export const generateComplaintPDFContent = (complaint) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { text-align: center; margin-bottom: 30px; }
        .title { color: #42047E; font-size: 24px; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 14px; }
        .section { margin: 20px 0; }
        .section-title { color: #07F49E; font-size: 18px; margin-bottom: 10px; border-bottom: 2px solid #07F49E; padding-bottom: 5px; }
        .detail { margin: 8px 0; }
        .label { font-weight: bold; color: #42047E; }
        .status { 
          display: inline-block; 
          padding: 4px 12px; 
          border-radius: 12px; 
          font-size: 12px; 
          font-weight: bold; 
          margin-left: 10px; 
        }
        .status-new { background-color: #FF6B6B; color: white; }
        .status-review { background-color: #4ECDC4; color: white; }
        .status-resolved { background-color: #06D6A0; color: white; }
        .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="title">Grievance Redressal Portal</div>
        <div class="subtitle">Complaint Report - Generated on ${new Date().toLocaleDateString()}</div>
      </div>
      
      <div class="section">
        <div class="section-title">Complaint Details</div>
        <div class="detail"><span class="label">Complaint ID:</span> ${complaint.id}</div>
        <div class="detail"><span class="label">Title:</span> ${complaint.title}</div>
        <div class="detail"><span class="label">Category:</span> ${complaint.category}</div>
        <div class="detail"><span class="label">Priority:</span> ${complaint.priority}</div>
        <div class="detail">
          <span class="label">Status:</span> ${complaint.status}
          <span class="status status-${complaint.status.toLowerCase().replace(' ', '-')}">
            ${complaint.status}
          </span>
        </div>
        <div class="detail"><span class="label">Submitted On:</span> ${new Date(complaint.createdAt).toLocaleString()}</div>
      </div>
      
      <div class="section">
        <div class="section-title">Description</div>
        <div>${complaint.description}</div>
      </div>
      
      ${complaint.updates && complaint.updates.length > 0 ? `
      <div class="section">
        <div class="section-title">Status Updates</div>
        ${complaint.updates.map(update => `
          <div class="detail">
            <span class="label">${new Date(update.date).toLocaleDateString()}:</span>
            ${update.status} - ${update.comments || 'No comments'}
          </div>
        `).join('')}
      </div>
      ` : ''}
      
      ${complaint.resolution ? `
      <div class="section">
        <div class="section-title">Resolution</div>
        <div>${complaint.resolution}</div>
        <div class="detail"><span class="label">Resolved On:</span> ${new Date(complaint.resolvedAt).toLocaleString()}</div>
        <div class="detail"><span class="label">Resolved By:</span> ${complaint.resolvedBy}</div>
      </div>
      ` : ''}
      
      <div class="footer">
        <p>This is an auto-generated report from Grievance Redressal Portal.</p>
        <p>© ${new Date().getFullYear()} Grievance Redressal Portal. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
};

/**
 * Generate analytics report
 * @param {Object} analyticsData 
 * @returns {Object}
 */
export const generateAnalyticsReport = (analyticsData) => {
  const report = {
    summary: {
      totalComplaints: analyticsData.totalComplaints || 0,
      resolvedComplaints: analyticsData.resolvedComplaints || 0,
      pendingComplaints: analyticsData.pendingComplaints || 0,
      escalatedComplaints: analyticsData.escalatedComplaints || 0,
      resolutionRate: analyticsData.resolutionRate || 0,
      averageResolutionTime: analyticsData.averageResolutionTime || 0
    },
    byCategory: analyticsData.byCategory || {},
    byPriority: analyticsData.byPriority || {},
    byStatus: analyticsData.byStatus || {},
    timeline: analyticsData.timeline || [],
    generatedAt: new Date().toISOString()
  };
  
  return report;
};

/**
 * Format data for chart display
 * @param {Object} data 
 * @param {string} chartType 
 * @returns {Object}
 */
export const formatChartData = (data, chartType = 'bar') => {
  switch (chartType) {
    case 'pie':
      return {
        labels: Object.keys(data),
        datasets: [{
          data: Object.values(data),
          backgroundColor: [
            '#84FFC9', '#AAB2FF', '#F0A6FF', '#FF9F1C', '#E63946',
            '#2A9D8F', '#1D3557', '#42047E', '#07F49E', '#1ED7B5'
          ]
        }]
      };
      
    case 'bar':
      return {
        labels: Object.keys(data),
        datasets: [{
          label: 'Count',
          data: Object.values(data),
          backgroundColor: 'rgba(66, 4, 126, 0.7)',
          borderColor: 'rgba(66, 4, 126, 1)',
          borderWidth: 1
        }]
      };
      
    case 'line':
      return {
        labels: data.map(d => d.label),
        datasets: [{
          label: 'Trend',
          data: data.map(d => d.value),
          borderColor: '#07F49E',
          backgroundColor: 'rgba(7, 244, 158, 0.1)',
          fill: true
        }]
      };
      
    default:
      return data;
  }
};