const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.get('/users', verifyToken, isAdmin, adminController.getAllUsers);
router.get('/admins', verifyToken, isAdmin, adminController.getAllAdmins);
router.get('/users/:id',adminController.getUserId);
router.get('/make/:id',adminController.makeadmin);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// Add routes for the audit trail

module.exports = router;
