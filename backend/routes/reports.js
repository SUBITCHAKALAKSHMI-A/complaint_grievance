const express = require('express');
const { query } = require('../config/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { exportToCSV, formatDate } = require('../utils/helpers');

const router = express.Router();

// Apply admin middleware to all routes
router.use(authenticateToken, requireAdmin);

// Get comprehensive report data
router.get('/data', async (req, res) => {
    try {
        const { 
            start_date, 
            end_date, 
            category_id, 
            status, 
            priority,
            group_by = 'month'
        } = req.query;

        let whereClause = 'WHERE 1=1';
        const params = [];

        if (start_date) {
            whereClause += ' AND DATE(c.created_at) >= ?';
            params.push(start_date);
        }

        if (end_date) {
            whereClause += ' AND DATE(c.created_at) <= ?';
            params.push(end_date);
        }

        if (category_id) {
            whereClause += ' AND c.category_id = ?';
            params.push(category_id);
        }

        if (status) {
            whereClause += ' AND c.status = ?';
            params.push(status);
        }

        if (priority) {
            whereClause += ' AND c.priority = ?';
            params.push(priority);
        }

        // Determine date format for grouping
        let dateFormat;
        switch (group_by) {
            case 'day':
                dateFormat = '%Y-%m-%d';
                break;
            case 'week':
                dateFormat = '%Y-%u';
                break;
            case 'month':
                dateFormat = '%Y-%m';
                break;
            case 'year':
                dateFormat = '%Y';
                break;
            default:
                dateFormat = '%Y-%m';
        }

        // Get time series data
        const timeSeriesQuery = `
            SELECT 
                DATE_FORMAT(c.created_at, '${dateFormat}') as period,
                COUNT(*) as count,
                SUM(CASE WHEN c.status = 'resolved' THEN 1 ELSE 0 END) as resolved
            FROM complaints c
            ${whereClause}
            GROUP BY DATE_FORMAT(c.created_at, '${dateFormat}')
            ORDER BY period ASC
        `;

        // Get status breakdown
        const statusQuery = `
            SELECT 
                c.status,
                COUNT(*) as count,
                ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM complaints c ${whereClause}), 2) as percentage
            FROM complaints c
            ${whereClause}
            GROUP BY c.status
        `;

        // Get priority breakdown
        const priorityQuery = `
            SELECT 
                c.priority,
                COUNT(*) as count,
                ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM complaints c ${whereClause}), 2) as percentage
            FROM complaints c
            ${whereClause}
            GROUP BY c.priority
        `;

        // Get category breakdown
        const categoryQuery = `
            SELECT 
                cat.name as category_name,
                COUNT(*) as count,
                ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM complaints c ${whereClause}), 2) as percentage
            FROM complaints c
            LEFT JOIN categories cat ON c.category_id = cat.id
            ${whereClause}
            GROUP BY cat.name
            ORDER BY count DESC
        `;

        // Get resolution time statistics
        const resolutionTimeQuery = `
            SELECT 
                AVG(TIMESTAMPDIFF(HOUR, c.created_at, c.resolved_at)) as avg_hours,
                MIN(TIMESTAMPDIFF(HOUR, c.created_at, c.resolved_at)) as min_hours,
                MAX(TIMESTAMPDIFF(HOUR, c.created_at, c.resolved_at)) as max_hours,
                COUNT(*) as resolved_count
            FROM complaints c
            ${whereClause}
            AND c.resolved_at IS NOT NULL
        `;

        // Get escalation statistics
        const escalationQuery = `
            SELECT 
                COUNT(*) as escalated_count,
                ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM complaints c ${whereClause}), 2) as escalation_rate
            FROM complaints c
            ${whereClause}
            AND c.status = 'escalated'
        `;

        const [
            timeSeries,
            statusBreakdown,
            priorityBreakdown,
            categoryBreakdown,
            resolutionStats,
            escalationStats
        ] = await Promise.all([
            query(timeSeriesQuery, params),
            query(statusQuery, params),
            query(priorityQuery, params),
            query(categoryQuery, params),
            query(resolutionTimeQuery, params),
            query(escalationQuery, params)
        ]);

        res.json({
            time_series: timeSeries,
            status_breakdown: statusBreakdown,
            priority_breakdown: priorityBreakdown,
            category_breakdown: categoryBreakdown,
            resolution_stats: {
                average_hours: Math.round((resolutionStats[0]?.avg_hours || 0) * 10) / 10,
                min_hours: resolutionStats[0]?.min_hours || 0,
                max_hours: resolutionStats[0]?.max_hours || 0,
                resolved_count: resolutionStats[0]?.resolved_count || 0
            },
            escalation_stats: escalationStats[0] || { escalated_count: 0, escalation_rate: 0 }
        });
    } catch (error) {
        console.error('Get report data error:', error);
        res.status(500).json({ error: 'Failed to fetch report data' });
    }
});

// Export complaints to CSV
router.get('/export/csv', async (req, res) => {
    try {
        const { 
            start_date, 
            end_date, 
            category_id, 
            status, 
            priority 
        } = req.query;

        let whereClause = 'WHERE 1=1';
        const params = [];

        if (start_date) {
            whereClause += ' AND DATE(c.created_at) >= ?';
            params.push(start_date);
        }

        if (end_date) {
            whereClause += ' AND DATE(c.created_at) <= ?';
            params.push(end_date);
        }

        if (category_id) {
            whereClause += ' AND c.category_id = ?';
            params.push(category_id);
        }

        if (status) {
            whereClause += ' AND c.status = ?';
            params.push(status);
        }

        if (priority) {
            whereClause += ' AND c.priority = ?';
            params.push(priority);
        }

        const exportQuery = `
            SELECT 
                c.complaint_id,
                c.subject,
                c.description,
                cat.name as category,
                c.priority,
                c.status,
                u.full_name as user_name,
                u.email as user_email,
                assigned.full_name as assigned_to,
                c.created_at,
                c.updated_at,
                c.resolved_at,
                TIMESTAMPDIFF(HOUR, c.created_at, COALESCE(c.resolved_at, NOW())) as duration_hours,
                c.resolution_details
            FROM complaints c
            LEFT JOIN categories cat ON c.category_id = cat.id
            LEFT JOIN users u ON c.user_id = u.id
            LEFT JOIN users assigned ON c.assigned_to = assigned.id
            ${whereClause}
            ORDER BY c.created_at DESC
        `;

        const complaints = await query(exportQuery, params);

        // Format data for CSV
        const formattedData = complaints.map(complaint => ({
            'Complaint ID': complaint.complaint_id,
            'Subject': complaint.subject,
            'Description': complaint.description,
            'Category': complaint.category,
            'Priority': complaint.priority,
            'Status': complaint.status,
            'User Name': complaint.user_name || 'Anonymous',
            'User Email': complaint.user_email || 'N/A',
            'Assigned To': complaint.assigned_to || 'Unassigned',
            'Created At': formatDate(complaint.created_at),
            'Updated At': formatDate(complaint.updated_at),
            'Resolved At': complaint.resolved_at ? formatDate(complaint.resolved_at) : 'N/A',
            'Duration (Hours)': complaint.duration_hours,
            'Resolution Details': complaint.resolution_details || 'N/A'
        }));

        const csv = exportToCSV(formattedData, Object.keys(formattedData[0] || {}));

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="complaints_${new Date().toISOString().split('T')[0]}.csv"`);
        res.send(csv);
    } catch (error) {
        console.error('Export CSV error:', error);
        res.status(500).json({ error: 'Failed to export CSV' });
    }
});

// Get summary statistics for dashboard
router.get('/summary', async (req, res) => {
    try {
        const { period = '30' } = req.query; // default last 30 days

        const [
            totalComplaints,
            resolvedComplaints,
            escalatedComplaints,
            avgResolutionTime,
            topCategories,
            recentTrend
        ] = await Promise.all([
            // Total complaints in period
            query(`
                SELECT COUNT(*) as count 
                FROM complaints 
                WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
            `, [period]),

            // Resolved complaints in period
            query(`
                SELECT COUNT(*) as count 
                FROM complaints 
                WHERE resolved_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
            `, [period]),

            // Escalated complaints in period
            query(`
                SELECT COUNT(*) as count 
                FROM complaints 
                WHERE status = 'escalated' 
                AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
            `, [period]),

            // Average resolution time
            query(`
                SELECT AVG(TIMESTAMPDIFF(HOUR, created_at, resolved_at)) as avg_hours
                FROM complaints 
                WHERE resolved_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
            `, [period]),

            // Top categories
            query(`
                SELECT 
                    cat.name,
                    COUNT(*) as count
                FROM complaints c
                LEFT JOIN categories cat ON c.category_id = cat.id
                WHERE c.created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
                GROUP BY cat.name
                ORDER BY count DESC
                LIMIT 5
            `, [period]),

            // Recent trend (last 7 days)
            query(`
                SELECT 
                    DATE(created_at) as date,
                    COUNT(*) as count
                FROM complaints 
                WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
                GROUP BY DATE(created_at)
                ORDER BY date ASC
            `)
        ]);

        res.json({
            total_complaints: totalComplaints[0].count,
            resolved_complaints: resolvedComplaints[0].count,
            escalated_complaints: escalatedComplaints[0].count,
            avg_resolution_time: Math.round((avgResolutionTime[0].avg_hours || 0) * 10) / 10,
            top_categories: topCategories,
            recent_trend: recentTrend,
            resolution_rate: totalComplaints[0].count > 0 
                ? Math.round((resolvedComplaints[0].count / totalComplaints[0].count) * 100) 
                : 0
        });
    } catch (error) {
        console.error('Get summary error:', error);
        res.status(500).json({ error: 'Failed to fetch summary statistics' });
    }
});

module.exports = router;
