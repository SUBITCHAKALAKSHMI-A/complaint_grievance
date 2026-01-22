const express = require('express');
const { query, transaction } = require('../config/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { 
    formatComplaint, 
    getPagination, 
    formatPaginationResponse,
    hoursDifference
} = require('../utils/helpers');

const router = express.Router();

// Apply admin middleware to all routes
router.use(authenticateToken, requireAdmin);

// Get dashboard statistics
router.get('/dashboard/stats', async (req, res) => {
    try {
        // Get basic stats
        const [totalStats, statusStats, priorityStats, categoryStats, recentStats] = await Promise.all([
            // Total complaints
            query('SELECT COUNT(*) as total FROM complaints'),
            
            // Status breakdown
            query(`
                SELECT status, COUNT(*) as count 
                FROM complaints 
                GROUP BY status
            `),
            
            // Priority breakdown
            query(`
                SELECT priority, COUNT(*) as count 
                FROM complaints 
                GROUP BY priority
            `),
            
            // Category breakdown
            query(`
                SELECT c.name, COUNT(*) as count 
                FROM complaints comp
                JOIN categories c ON comp.category_id = c.id
                GROUP BY c.name
                ORDER BY count DESC
                LIMIT 10
            `),
            
            // Recent complaints (last 7 days)
            query(`
                SELECT DATE(created_at) as date, COUNT(*) as count 
                FROM complaints 
                WHERE created_at >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)
                GROUP BY DATE(created_at)
                ORDER BY date DESC
            `)
        ]);

        // Get average resolution time
        const resolutionTimeQuery = `
            SELECT AVG(TIMESTAMPDIFF(HOUR, created_at, resolved_at)) as avg_hours
            FROM complaints 
            WHERE resolved_at IS NOT NULL 
            AND created_at >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
        `;
        const resolutionResult = await query(resolutionTimeQuery);
        const avgResolutionTime = resolutionResult[0].avg_hours || 0;

        // Get overdue complaints (need escalation)
        const overdueQuery = `
            SELECT COUNT(*) as count
            FROM complaints c
            JOIN escalation_rules er ON (
                (er.category_id IS NULL OR er.category_id = c.category_id) AND
                (er.priority IS NULL OR er.priority = c.priority) AND
                er.is_active = true
            )
            WHERE c.status NOT IN ('resolved', 'rejected', 'escalated')
            AND TIMESTAMPDIFF(HOUR, c.created_at, NOW()) > er.hours_before_escalation
        `;
        const overdueResult = await query(overdueQuery);
        const overdueCount = overdueResult[0].count;

        res.json({
            overview: {
                total_complaints: totalStats[0].total,
                avg_resolution_time: Math.round(avgResolutionTime * 10) / 10,
                overdue_complaints: overdueCount
            },
            status_breakdown: statusStats,
            priority_breakdown: priorityStats,
            category_breakdown: categoryStats,
            recent_activity: recentStats
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
    }
});

// Get all users (for admin management)
router.get('/users', async (req, res) => {
    try {
        const { page = 1, limit = 20, search, role } = req.query;
        const { offset, limit: limitValue } = getPagination(page, limit);

        let whereClause = 'WHERE 1=1';
        const params = [];

        if (search) {
            whereClause += ' AND (full_name LIKE ? OR email LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        if (role) {
            whereClause += ' AND role = ?';
            params.push(role);
        }

        // Get total count
        const countQuery = `SELECT COUNT(*) as total FROM users ${whereClause}`;
        const countResult = await query(countQuery, params);
        const total = countResult[0].total;

        // Get users
        const usersQuery = `
            SELECT 
                id, email, full_name, phone, role, is_active, created_at, updated_at
            FROM users 
            ${whereClause}
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
        `;

        const users = await query(usersQuery, [...params, limitValue, offset]);

        res.json(formatPaginationResponse(users, page, limitValue, total));
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Assign complaint to staff
router.put('/complaints/:id/assign', async (req, res) => {
    try {
        const { id } = req.params;
        const { assigned_to } = req.body;

        if (!assigned_to) {
            return res.status(400).json({ error: 'Assigned user ID is required' });
        }

        // Check if assigned user exists and is admin
        const users = await query(
            'SELECT id, full_name, role FROM users WHERE id = ? AND role IN ("admin", "super_admin")',
            [assigned_to]
        );

        if (users.length === 0) {
            return res.status(400).json({ error: 'Invalid assigned user or user is not an admin' });
        }

        // Update complaint
        await transaction(async (connection) => {
            await connection.execute(
                'UPDATE complaints SET assigned_to = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                [assigned_to, id]
            );

            // Add timeline entry
            await connection.execute(`
                INSERT INTO complaint_timeline (complaint_id, status, comment, created_by, is_public)
                VALUES (?, 'under_review', ?, ?, true)
            `, [id, `Assigned to ${users[0].full_name}`, req.user.id]);
        });

        res.json({ message: 'Complaint assigned successfully' });
    } catch (error) {
        console.error('Assign complaint error:', error);
        res.status(500).json({ error: 'Failed to assign complaint' });
    }
});

// Escalate complaint
router.put('/complaints/:id/escalate', async (req, res) => {
    try {
        const { id } = req.params;
        const { escalated_to, escalation_reason } = req.body;

        if (!escalated_to) {
            return res.status(400).json({ error: 'Escalated user ID is required' });
        }

        if (!escalation_reason) {
            return res.status(400).json({ error: 'Escalation reason is required' });
        }

        // Check if escalated user exists and is super admin
        const users = await query(
            'SELECT id, full_name, role FROM users WHERE id = ? AND role = "super_admin"',
            [escalated_to]
        );

        if (users.length === 0) {
            return res.status(400).json({ error: 'Invalid escalated user or user is not a super admin' });
        }

        // Update complaint
        await transaction(async (connection) => {
            await connection.execute(`
                UPDATE complaints 
                SET status = 'escalated', escalated_to = ?, escalation_reason = ?, updated_at = CURRENT_TIMESTAMP 
                WHERE id = ?
            `, [escalated_to, escalation_reason, id]);

            // Add timeline entry
            await connection.execute(`
                INSERT INTO complaint_timeline (complaint_id, status, comment, created_by, is_public)
                VALUES (?, 'escalated', ?, ?, true)
            `, [id, `Escalated to ${users[0].full_name}: ${escalation_reason}`, req.user.id]);
        });

        // Get complaint details for notification
        const complaints = await query('SELECT complaint_id, user_id FROM complaints WHERE id = ?', [id]);
        if (complaints.length > 0 && complaints[0].user_id) {
            // Create notification for user
            await query(`
                INSERT INTO notifications (user_id, complaint_id, type, message)
                VALUES (?, ?, 'escalation', ?)
            `, [
                complaints[0].user_id,
                id,
                `Your complaint ${complaints[0].complaint_id} has been escalated to higher authority`
            ]);
        }

        res.json({ message: 'Complaint escalated successfully' });
    } catch (error) {
        console.error('Escalate complaint error:', error);
        res.status(500).json({ error: 'Failed to escalate complaint' });
    }
});

// Get overdue complaints that need escalation
router.get('/complaints/overdue', async (req, res) => {
    try {
        const overdueQuery = `
            SELECT 
                c.*,
                cat.name as category_name,
                u.full_name as user_name,
                er.hours_before_escalation,
                TIMESTAMPDIFF(HOUR, c.created_at, NOW()) as hours_open
            FROM complaints c
            JOIN categories cat ON c.category_id = cat.id
            LEFT JOIN users u ON c.user_id = u.id
            JOIN escalation_rules er ON (
                (er.category_id IS NULL OR er.category_id = c.category_id) AND
                (er.priority IS NULL OR er.priority = c.priority) AND
                er.is_active = true
            )
            WHERE c.status NOT IN ('resolved', 'rejected', 'escalated')
            AND TIMESTAMPDIFF(HOUR, c.created_at, NOW()) > er.hours_before_escalation
            ORDER BY hours_open DESC
        `;

        const overdueComplaints = await query(overdueQuery);
        const formattedComplaints = overdueComplaints.map(complaint => ({
            ...formatComplaint(complaint),
            hours_overdue: complaint.hours_open - complaint.hours_before_escalation
        }));

        res.json({ complaints: formattedComplaints });
    } catch (error) {
        console.error('Get overdue complaints error:', error);
        res.status(500).json({ error: 'Failed to fetch overdue complaints' });
    }
});

// Auto-escalate overdue complaints (can be called by cron job)
router.post('/auto-escalate', async (req, res) => {
    try {
        const overdueQuery = `
            SELECT 
                c.id,
                c.complaint_id,
                c.priority,
                er.hours_before_escalation
            FROM complaints c
            JOIN escalation_rules er ON (
                (er.category_id IS NULL OR er.category_id = c.category_id) AND
                (er.priority IS NULL OR er.priority = c.priority) AND
                er.is_active = true
            )
            WHERE c.status NOT IN ('resolved', 'rejected', 'escalated')
            AND TIMESTAMPDIFF(HOUR, c.created_at, NOW()) > er.hours_before_escalation
        `;

        const overdueComplaints = await query(overdueQuery);

        let escalatedCount = 0;

        for (const complaint of overdueComplaints) {
            // Find appropriate escalation target
            const targetRole = complaint.priority === 'urgent' ? 'super_admin' : 'admin';
            const targets = await query(
                'SELECT id FROM users WHERE role = ? AND is_active = true ORDER BY RAND() LIMIT 1',
                [targetRole]
            );

            if (targets.length > 0) {
                await transaction(async (connection) => {
                    await connection.execute(`
                        UPDATE complaints 
                        SET status = 'escalated', 
                            escalated_to = ?, 
                            escalation_reason = 'Auto-escalated due to timeout',
                            updated_at = CURRENT_TIMESTAMP 
                        WHERE id = ?
                    `, [targets[0].id, complaint.id]);

                    await connection.execute(`
                        INSERT INTO complaint_timeline (complaint_id, status, comment, is_public)
                        VALUES (?, 'escalated', 'Auto-escalated due to timeout', true)
                    `, [complaint.id]);
                });

                escalatedCount++;
            }
        }

        res.json({ 
            message: 'Auto-escalation completed',
            escalated_count: escalatedCount,
            total_overdue: overdueComplaints.length
        });
    } catch (error) {
        console.error('Auto-escalate error:', error);
        res.status(500).json({ error: 'Failed to auto-escalate complaints' });
    }
});

// Update user role (super admin only)
router.put('/users/:id/role', async (req, res) => {
    try {
        if (req.user.role !== 'super_admin') {
            return res.status(403).json({ error: 'Super admin access required' });
        }

        const { id } = req.params;
        const { role } = req.body;

        if (!['user', 'admin', 'super_admin'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }

        // Prevent self-role modification
        if (parseInt(id) === req.user.id) {
            return res.status(400).json({ error: 'Cannot modify your own role' });
        }

        await query('UPDATE users SET role = ? WHERE id = ?', [role, id]);

        res.json({ message: 'User role updated successfully' });
    } catch (error) {
        console.error('Update user role error:', error);
        res.status(500).json({ error: 'Failed to update user role' });
    }
});

// Toggle user active status
router.put('/users/:id/toggle', async (req, res) => {
    try {
        const { id } = req.params;

        // Prevent self-deactivation
        if (parseInt(id) === req.user.id) {
            return res.status(400).json({ error: 'Cannot deactivate your own account' });
        }

        const users = await query('SELECT is_active FROM users WHERE id = ?', [id]);
        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newStatus = !users[0].is_active;
        await query('UPDATE users SET is_active = ? WHERE id = ?', [newStatus, id]);

        res.json({ 
            message: `User ${newStatus ? 'activated' : 'deactivated'} successfully`,
            is_active: newStatus
        });
    } catch (error) {
        console.error('Toggle user status error:', error);
        res.status(500).json({ error: 'Failed to update user status' });
    }
});

module.exports = router;
