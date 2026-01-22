const express = require('express');
const { query, run, transaction } = require('../config/database');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');
const { 
    generateComplaintId, 
    formatComplaint, 
    getPagination, 
    formatPaginationResponse,
    generateStatusMessage,
    sanitizeInput
} = require('../utils/helpers');

const router = express.Router();

// Get all complaints (with optional filters)
router.get('/', optionalAuth, async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            status, 
            category_id, 
            priority,
            user_id,
            start_date,
            end_date 
        } = req.query;

        let whereClause = 'WHERE 1=1';
        const params = [];

        // Add filters
        if (status) {
            whereClause += ' AND c.status = ?';
            params.push(status);
        }

        if (category_id) {
            whereClause += ' AND c.category_id = ?';
            params.push(category_id);
        }

        if (priority) {
            whereClause += ' AND c.priority = ?';
            params.push(priority);
        }

        // Non-admin users can only see their own complaints
        if (req.user && req.user.role === 'user') {
            whereClause += ' AND c.user_id = ?';
            params.push(req.user.id);
        }

        // Date range filter
        if (start_date) {
            whereClause += ' AND DATE(c.created_at) >= ?';
            params.push(start_date);
        }

        if (end_date) {
            whereClause += ' AND DATE(c.created_at) <= ?';
            params.push(end_date);
        }

        // Get total count
        const countQuery = `
            SELECT COUNT(*) as total
            FROM complaints c
            ${whereClause}
        `;
        const countResult = await query(countQuery, params);
        const total = countResult[0].total;

        // Pagination
        const { limitValue, offset } = getPagination(page, limit);

        // Get complaints
        const complaintsQuery = `
            SELECT 
                c.*,
                cat.name as category_name,
                u.full_name as user_name,
                u.email as user_email,
                assigned.full_name as assigned_to_name,
                escalated.full_name as escalated_to_name
            FROM complaints c
            LEFT JOIN categories cat ON c.category_id = cat.id
            LEFT JOIN users u ON c.user_id = u.id
            LEFT JOIN users assigned ON c.assigned_to = assigned.id
            LEFT JOIN users escalated ON c.escalated_to = escalated.id
            ${whereClause}
            ORDER BY c.created_at DESC
            LIMIT ? OFFSET ?
        `;

        const complaints = await query(complaintsQuery, [...params, limitValue, offset]);
        const formattedComplaints = complaints.map(formatComplaint);

        res.json(formatPaginationResponse(formattedComplaints, page, limitValue, total));
    } catch (error) {
        console.error('Get complaints error:', error);
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
});

// Get single complaint by ID
router.get('/:id', optionalAuth, async (req, res) => {
    try {
        const { id } = req.params;

        const complaintsQuery = `
            SELECT 
                c.*,
                cat.name as category_name,
                u.full_name as user_name,
                u.email as user_email,
                assigned.full_name as assigned_to_name,
                escalated.full_name as escalated_to_name
            FROM complaints c
            LEFT JOIN categories cat ON c.category_id = cat.id
            LEFT JOIN users u ON c.user_id = u.id
            LEFT JOIN users assigned ON c.assigned_to = assigned.id
            LEFT JOIN users escalated ON c.escalated_to = escalated.id
            WHERE c.id = ?
        `;

        const complaints = await query(complaintsQuery, [id]);
        
        if (complaints.length === 0) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        const complaint = formatComplaint(complaints[0]);

        // Check access permissions
        if (req.user) {
            // Admins can see all complaints
            if (['admin', 'super_admin'].includes(req.user.role)) {
                // Allow access
            }
            // Users can only see their own complaints
            else if (complaint.user_id !== req.user.id) {
                return res.status(403).json({ error: 'Access denied' });
            }
        } else {
            // Non-authenticated users can only see anonymous complaints or their own
            if (!complaint.is_anonymous) {
                return res.status(403).json({ error: 'Access denied' });
            }
        }

        // Get attachments
        const attachments = await query(`
            SELECT * FROM complaint_attachments 
            WHERE complaint_id = ? 
            ORDER BY uploaded_at DESC
        `, [id]);

        // Get timeline
        const timeline = await query(`
            SELECT 
                ct.*,
                u.full_name as created_by_name
            FROM complaint_timeline ct
            LEFT JOIN users u ON ct.created_by = u.id
            WHERE ct.complaint_id = ?
            ORDER BY ct.created_at ASC
        `, [id]);

        // Get admin notes (only for admins)
        let adminNotes = [];
        if (req.user && (req.user.role === 'admin' || req.user.role === 'super_admin')) {
            adminNotes = await query(`
                SELECT 
                    an.*,
                    u.full_name as created_by_name
                FROM admin_notes an
                LEFT JOIN users u ON an.created_by = u.id
                WHERE an.complaint_id = ?
                ORDER BY an.created_at DESC
            `, [id]);
        }

        res.json({
            complaint,
            attachments,
            timeline,
            admin_notes: adminNotes
        });
    } catch (error) {
        console.error('Get complaint error:', error);
        res.status(500).json({ error: 'Failed to fetch complaint' });
    }
});

// Create new complaint
router.post('/', upload.array('attachments', 5), handleUploadError, async (req, res) => {
    try {
        const {
            category_id,
            subject,
            description,
            priority = 'medium',
            is_anonymous = false,
            user_email,
            user_name
        } = req.body;

        // Validation
        if (!category_id || !subject || !description) {
            return res.status(400).json({ error: 'Category, subject, and description are required' });
        }

        // Handle user ID (authenticated or anonymous)
        let userId = null;
        if (req.user) {
            userId = req.user.id;
        } else if (!is_anonymous && user_email && user_name) {
            // Create temporary user record for anonymous complaints with contact info
            const tempUserResult = await run(
                'INSERT INTO users (email, full_name, role) VALUES (?, ?, ?)',
                [user_email.toLowerCase(), sanitizeInput(user_name), 'user']
            );
            userId = tempUserResult.id;
        }

        // Generate complaint ID
        const complaintId = generateComplaintId();

        // Create complaint
        const result = await transaction(async (connection) => {
            const complaintResult = await connection.execute(`
                INSERT INTO complaints (
                    complaint_id, user_id, is_anonymous, category_id, subject, 
                    description, priority, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, 'new')
            `, [
                complaintId,
                userId,
                is_anonymous === 'true' || is_anonymous === true ? 1 : 0,
                category_id,
                sanitizeInput(subject),
                sanitizeInput(description),
                priority
            ]);

            const complaintIdDb = complaintResult[0] ? complaintResult[0].id : complaintResult.id;

            // Add initial timeline entry - only if we have a valid complaint ID
            if (complaintIdDb) {
                await connection.execute(`
                    INSERT INTO complaint_timeline (complaint_id, status, comment, is_public)
                    VALUES (?, 'new', 'Complaint submitted successfully', 1)
                `, [complaintIdDb]);
            }

            // Handle file attachments
            if (req.files && req.files.length > 0 && complaintIdDb) {
                for (const file of req.files) {
                    await connection.execute(`
                        INSERT INTO complaint_attachments (
                            complaint_id, file_name, file_path, file_size, mime_type
                        ) VALUES (?, ?, ?, ?, ?)
                    `, [
                        complaintIdDb,
                        file.originalname,
                        `/uploads/complaints/${file.filename}`,
                        file.size,
                        file.mimetype
                    ]);
                }
            }

            return complaintIdDb;
        });

        // Get created complaint
        const complaints = await query('SELECT * FROM complaints WHERE id = ?', [result]);
        const complaint = formatComplaint(complaints[0]);

        res.status(201).json({
            message: 'Complaint submitted successfully',
            complaint
        });
    } catch (error) {
        console.error('Create complaint error:', error);
        res.status(500).json({ error: 'Failed to submit complaint' });
    }
});

// Update complaint status
router.put('/:id/status', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status, comment, is_public = true } = req.body;

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        // Check if complaint exists
        const complaint = await query('SELECT * FROM complaints WHERE id = ?', [id]);
        if (complaint.length === 0) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        // Update complaint
        await query(`
            UPDATE complaints 
            SET status = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `, [status, id]);

        // Add to timeline
        await query(`
            INSERT INTO complaint_timeline (complaint_id, status, comment, is_public, created_by)
            VALUES (?, ?, ?, ?, ?)
        `, [id, status, comment, is_public ? 1 : 0, req.user.id]);

        res.json({
            message: 'Status updated successfully',
            status: generateStatusMessage(status)
        });
    } catch (error) {
        console.error('Update status error:', error);
        res.status(500).json({ error: 'Failed to update status' });
    }
});

// Add admin note
router.post('/:id/notes', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { note } = req.body;

        if (!note) {
            return res.status(400).json({ error: 'Note is required' });
        }

        // Check if complaint exists
        const complaint = await query('SELECT * FROM complaints WHERE id = ?', [id]);
        if (complaint.length === 0) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        // Add admin note
        await query(`
            INSERT INTO admin_notes (complaint_id, note, created_by)
            VALUES (?, ?, ?)
        `, [id, sanitizeInput(note), req.user.id]);

        res.status(201).json({
            message: 'Admin note added successfully'
        });
    } catch (error) {
        console.error('Add admin note error:', error);
        res.status(500).json({ error: 'Failed to add admin note' });
    }
});

// Get categories
router.get('/categories/list', async (req, res) => {
    try {
        const categories = await query(`
            SELECT id, name, description 
            FROM categories 
            WHERE is_active = 1 
            ORDER BY name ASC
        `);

        res.json(categories);
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

module.exports = router;
