const User = require('../models/users');

exports.getAllUsers = (req, res) => {
    User.findAll((err, users) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        res.json(users);
    });
};
exports.getAllAdmins = (req, res) => {
    User.findAllAdmins((err, users) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        res.json(users);
    });
};
exports.getUserId = (req, res) => {
    var id=req.params.id;
    User.findById(id,(err, users) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        res.json(users);
    });
};
exports.makeadmin = (req, res) => {
    var id=req.params.id;
    User.makeadmin(id,(err, users) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        res.json(users);
    });
};
exports.updateUser = (req, res) => {
    let Body=req.body;
    
    let id=req.params.id;
    User.updateUser(Body,id,(err, users) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        res.json({status:"Updated Successfully"});
    });
};
exports.deleteUser = (req, res) => {
    var id=req.params.id;
    User.deleteUser(id,(err, user) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        res.json({status:'deleted successfully'});
    });
};

// Implement the audit trail functions as needed
