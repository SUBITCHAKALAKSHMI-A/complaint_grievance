const express = require('express');
const { query } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { getPagination, formatPaginationResponse } = require('../utils/helpers');

const router = express.Router();

// Get user's complaints
router.get('/complaints', authenticateToken, async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const { offset, limit: limitValue } = getPagination(page, limit);

        let whereClause = 'WHERE c.user_id = ?';
        const params = [req.user.id];

        if (status) {
            whereClause += ' AND c.status = ?';
            params.push(status);
        }

        // Get total count
        const countQuery = `
            SELECT COUNT(*) as total 
            FROM complaints c 
            ${whereClause}
        `;
        const countResult = await query(countQuery, params);
        const total = countResult[0].total;

        // Get complaints
        const complaintsQuery = `
            SELECT 
                c.*,
                cat.name as category_name
            FROM complaints c
            LEFT JOIN categories cat ON c.category_id = cat.id
            ${whereClause}
            ORDER BY c.created_at DESC
            LIMIT ? OFFSET ?
        `;

        const complaints = await query(complaintsQuery, [...params, limitValue, offset]);

        res.json(formatPaginationResponse(complaints, page, limitValue, total));
    } catch (error) {
        console.error('Get user complaints error:', error);
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
});

// Get user's notifications
router.get('/notifications', authenticateToken, async (req, res) => {
    try {
        const { page = 1, limit = 20, unread_only } = req.query;
        const { offset, limit: limitValue } = getPagination(page, limit);

        let whereClause = 'WHERE user_id = ?';
        const params = [req.user.id];

        if (unread_only === 'true') {
            whereClause += ' AND is_read = false';
        }

        // Get total count
        const countQuery = `
            SELECT COUNT(*) as total 
            FROM notifications 
            ${whereClause}
        `;
        const countResult = await query(countQuery, params);
        const total = countResult[0].total;

        // Get notifications
        const notificationsQuery = `
            SELECT 
                n.*,
                c.complaint_id,
                c.subject
            FROM notifications n
            LEFT JOIN complaints c ON n.complaint_id = c.id
            ${whereClause}
            ORDER BY n.created_at DESC
            LIMIT ? OFFSET ?
        `;

        const notifications = await query(notificationsQuery, [...params, limitValue, offset]);

        res.json(formatPaginationResponse(notifications, page, limitValue, total));
    } catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

// Mark notification as read
router.put('/notifications/:id/read', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        // Check if notification belongs to user
        const notifications = await query(
            'SELECT id FROM notifications WHERE id = ? AND user_id = ?',
            [id, req.user.id]
        );

        if (notifications.length === 0) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        await query(
            'UPDATE notifications SET is_read = true WHERE id = ?',
            [id]
        );

        res.json({ message: 'Notification marked as read' });
    } catch (error) {
        console.error('Mark notification read error:', error);
        res.status(500).json({ error: 'Failed to update notification' });
    }
});

// Mark all notifications as read
router.put('/notifications/read-all', authenticateToken, async (req, res) => {
    try {
        await query(
            'UPDATE notifications SET is_read = true WHERE user_id = ? AND is_read = false',
            [req.user.id]
        );

        res.json({ message: 'All notifications marked as read' });
    } catch (error) {
        console.error('Mark all notifications read error:', error);
        res.status(500).json({ error: 'Failed to update notifications' });
    }
});

// Get unread notification count
router.get('/notifications/unread-count', authenticateToken, async (req, res) => {
    try {
        const result = await query(
            'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = false',
            [req.user.id]
        );

        res.json({ unread_count: result[0].count });
    } catch (error) {
        console.error('Get unread count error:', error);
        res.status(500).json({ error: 'Failed to fetch unread count' });
    }
});

module.exports = router;
