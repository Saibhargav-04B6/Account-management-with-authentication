const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { verifyToken } = require('../middleware/auth');

router.get('/accounts', verifyToken, userController.getUserAccounts);
router.post('/accounts', userController.createAccount);
router.get('/accounts/:accountId', userController.getAccountById);
router.put('/accounts/:accountId', userController.updateAccount);
router.delete('/accounts/:accountId', userController.deleteAccount);

module.exports = router;
