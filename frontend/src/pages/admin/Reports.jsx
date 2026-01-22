import React, { useState, useEffect } from 'react';
import '../../../src/styles/tables.css';
import '../../../src/styles/dashboard.css';

const Reports = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [exportFormat, setExportFormat] = useState('csv');

  // Sample data for charts and reports
  const analyticsData = {
    totalComplaints: 1247,
    resolved: 892,
    pending: 245,
    escalated: 110,
    averageResolutionTime: '2.5 days',
    satisfactionRate: '84%'
  };

  const categoryData = [
    { category: 'Infrastructure', count: 320, resolved: 280 },
    { category: 'Academic', count: 285, resolved: 240 },
    { category: 'Administrative', count: 198, resolved: 150 },
    { category: 'Financial', count: 156, resolved: 120 },
    { category: 'Technical', count: 288, resolved: 102 },
  ];

  const trendData = [
    { month: 'Jan', complaints: 120, resolved: 85 },
    { month: 'Feb', complaints: 135, resolved: 102 },
    { month: 'Mar', complaints: 98, resolved: 78 },
    { month: 'Apr', complaints: 156, resolved: 132 },
    { month: 'May', complaints: 178, resolved: 156 },
    { month: 'Jun', complaints: 210, resolved: 180 },
    { month: 'Jul', complaints: 195, resolved: 159 },
  ];

  const staffPerformance = [
    { name: 'John Doe', assigned: 45, resolved: 42, avgTime: '1.2 days' },
    { name: 'Jane Smith', assigned: 38, resolved: 35, avgTime: '1.8 days' },
    { name: 'Robert Johnson', assigned: 52, resolved: 48, avgTime: '1.5 days' },
    { name: 'Sarah Williams', assigned: 41, resolved: 39, avgTime: '1.3 days' },
    { name: 'Michael Brown', assigned: 36, resolved: 32, avgTime: '2.1 days' },
  ];

  useEffect(() => {
    // In real app, fetch data based on filters
    console.log('Fetching data for:', { timeRange, categoryFilter });
  }, [timeRange, categoryFilter]);

  const handleExport = () => {
    alert(`Exporting report in ${exportFormat.toUpperCase()} format...`);
    // In real app, trigger export API call
  };

  const calculatePercentage = (part, total) => {
    return ((part / total) * 100).toFixed(1);
  };

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>Analytics & Reports Dashboard</h1>
        <p>Comprehensive insights and performance metrics</p>
      </div>

      {/* Filter Controls */}
      <div className="filter-controls">
        <div className="filter-group">
          <label>Time Range:</label>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="filter-select"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Category:</label>
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="academic">Academic</option>
            <option value="administrative">Administrative</option>
            <option value="financial">Financial</option>
            <option value="technical">Technical</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Export Format:</label>
          <div className="export-options">
            <button 
              className={`export-btn ${exportFormat === 'csv' ? 'active' : ''}`}
              onClick={() => setExportFormat('csv')}
            >
              CSV
            </button>
            <button 
              className={`export-btn ${exportFormat === 'pdf' ? 'active' : ''}`}
              onClick={() => setExportFormat('pdf')}
            >
              PDF
            </button>
            <button 
              className="export-action-btn"
              onClick={handleExport}
            >
              Export Now
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="analytics-grid">
        <div className="analytics-card card-gradient-1">
          <h3>Total Complaints</h3>
          <div className="analytics-number">{analyticsData.totalComplaints}</div>
          <p className="analytics-trend">↑ 12% from last month</p>
        </div>

        <div className="analytics-card card-gradient-2">
          <h3>Resolved</h3>
          <div className="analytics-number">{analyticsData.resolved}</div>
          <p className="analytics-trend">Resolution Rate: {calculatePercentage(analyticsData.resolved, analyticsData.totalComplaints)}%</p>
        </div>

        <div className="analytics-card card-gradient-3">
          <h3>Pending</h3>
          <div className="analytics-number">{analyticsData.pending}</div>
          <p className="analytics-trend">↓ 8% from last month</p>
        </div>

        <div className="analytics-card card-gradient-1">
          <h3>Average Resolution Time</h3>
          <div className="analytics-number">{analyticsData.averageResolutionTime}</div>
          <p className="analytics-trend">Faster by 0.5 days</p>
        </div>

        <div className="analytics-card card-gradient-2">
          <h3>Escalated Cases</h3>
          <div className="analytics-number">{analyticsData.escalated}</div>
          <p className="analytics-trend">↑ 5% from last month</p>
        </div>

        <div className="analytics-card card-gradient-3">
          <h3>Satisfaction Rate</h3>
          <div className="analytics-number">{analyticsData.satisfactionRate}</div>
          <p className="analytics-trend">↑ 3% from last month</p>
        </div>
      </div>

      {/* Charts and Tables Section */}
      <div className="reports-content">
        
        {/* Category Distribution */}
        <div className="report-section">
          <h2>Complaints by Category</h2>
          <div className="category-distribution">
            {categoryData.map((item, index) => (
              <div key={index} className="category-item">
                <div className="category-header">
                  <span className="category-name">{item.category}</span>
                  <span className="category-count">{item.count}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${calculatePercentage(item.resolved, item.count)}%`,
                      background: 'linear-gradient(90deg, #42047E 0%, #07F49E 100%)'
                    }}
                  ></div>
                </div>
                <div className="category-stats">
                  <span>Resolved: {item.resolved}</span>
                  <span>Pending: {item.count - item.resolved}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trend Chart */}
        <div className="report-section">
          <h2>Monthly Trend Analysis</h2>
          <div className="trend-chart">
            <div className="chart-container">
              <div className="chart-bars">
                {trendData.map((item, index) => (
                  <div key={index} className="chart-bar-group">
                    <div className="chart-label">{item.month}</div>
                    <div className="bars">
                      <div 
                        className="bar total-bar"
                        style={{ height: `${(item.complaints / 250) * 100}%` }}
                        title={`Total: ${item.complaints}`}
                      ></div>
                      <div 
                        className="bar resolved-bar"
                        style={{ height: `${(item.resolved / 250) * 100}%` }}
                        title={`Resolved: ${item.resolved}`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color total-color"></div>
                  <span>Total Complaints</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color resolved-color"></div>
                  <span>Resolved</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Performance */}
        <div className="report-section">
          <h2>Staff Performance Metrics</h2>
          <div className="performance-table">
            <table>
              <thead>
                <tr>
                  <th>Staff Member</th>
                  <th>Assigned</th>
                  <th>Resolved</th>
                  <th>Resolution Rate</th>
                  <th>Avg. Time</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {staffPerformance.map((staff, index) => {
                  const resolutionRate = calculatePercentage(staff.resolved, staff.assigned);
                  return (
                    <tr key={index}>
                      <td className="staff-name">{staff.name}</td>
                      <td>{staff.assigned}</td>
                      <td>{staff.resolved}</td>
                      <td>{resolutionRate}%</td>
                      <td>{staff.avgTime}</td>
                      <td>
                        <div className="performance-indicator">
                          <div 
                            className="performance-bar"
                            style={{ width: `${resolutionRate}%` }}
                          ></div>
                          <span className="performance-text">
                            {parseFloat(resolutionRate) > 90 ? 'Excellent' : 
                             parseFloat(resolutionRate) > 75 ? 'Good' : 
                             parseFloat(resolutionRate) > 60 ? 'Average' : 'Needs Improvement'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-card">
            <h3>Peak Complaint Hours</h3>
            <div className="stat-value">10 AM - 12 PM</div>
            <p>Most complaints are submitted during morning hours</p>
          </div>
          
          <div className="stat-card">
            <h3>Most Common Issue</h3>
            <div className="stat-value">Network Connectivity</div>
            <p>28% of all technical complaints</p>
          </div>
          
          <div className="stat-card">
            <h3>Fastest Resolution</h3>
            <div className="stat-value">4 hours</div>
            <p>Emergency maintenance requests</p>
          </div>
          
          <div className="stat-card">
            <h3>User Satisfaction</h3>
            <div className="stat-value">4.2/5.0</div>
            <p>Based on 892 feedback responses</p>
          </div>
        </div>

        {/* Export Options */}
        <div className="export-section">
          <h2>Generate Custom Report</h2>
          <div className="export-forms">
            <div className="export-form-group">
              <label>Report Type:</label>
              <select className="export-select">
                <option>Comprehensive Summary</option>
                <option>Performance Analysis</option>
                <option>Category Breakdown</option>
                <option>Time-based Analysis</option>
              </select>
            </div>
            
            <div className="export-form-group">
              <label>Date Range:</label>
              <div className="date-inputs">
                <input type="date" className="date-input" />
                <span>to</span>
                <input type="date" className="date-input" />
              </div>
            </div>
            
            <div className="export-form-group">
              <label>Include Charts:</label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Yes, include visual charts</span>
                </label>
              </div>
            </div>
            
            <button className="generate-report-btn">
              Generate Custom Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;