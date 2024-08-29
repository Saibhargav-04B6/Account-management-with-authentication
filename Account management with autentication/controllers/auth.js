const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        User.create(username, email, hashedPassword, (err, result) => {
            console.log("hello");
            if (err) return res.status(500).json({ error: 'Database error.' });
            res.status(201).json({ message: 'User registered successfully.' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error.' });
    }
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, async (err, users) => {
        if (err || users.length === 0) return res.status(401).json({ error: 'Authentication failed.' });
        const user = users[0];
        // localStorage.setItem('userid',user.id);
        console.log(user);
        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) return res.status(401).json({ error: 'Authentication failed.' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role,id:user.id });
    });
};
exports.hash = async (req, res) => {
    const {password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    return res.json({hp:hashedPassword});
}
