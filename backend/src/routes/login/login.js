const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Create a database connection pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventorymanagement',
    port: '3306'
});

// Login Route
router.post('/', async (req, res) => {  // ✅ Route is now correctly mounted under '/api/login'
    try {
        const { username, password, role } = req.body;
        console.log('🔍 Login attempt:', { username, role });

        const query = 'SELECT id, fullName, role, password FROM users WHERE username = ? AND role = ?';
        const [results] = await db.query(query, [username, role]);

        if (results.length === 0) {
            console.log('No user found with provided username and role');
            return res.status(401).json({ message: 'Invalid username or role' });
        }

        const user = results[0];

        // Simple password check (⚠️ Use bcrypt for hashing in production)
        if (password === user.password) {
            res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    role: user.role,
                },
            });
        } else {
            console.log('Invalid password attempt');
            res.status(401).json({ message: 'Invalid password' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
