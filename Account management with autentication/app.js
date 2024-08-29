const express = require('express');
const bodyParser = require('body-parser');
const dotenv=require('dotenv');
const path = require('path');


const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
