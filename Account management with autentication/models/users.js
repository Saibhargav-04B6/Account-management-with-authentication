const db = require('./index');
const bcrypt=require('bcryptjs');
const User = {
    create: (username, email, hashedPassword, callback) => {
        var role="user";
        const sql = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`;
        db.query(sql, [username, email, hashedPassword, role], callback);
    },
    
    findByEmail: (email, callback) => {
        const sql = `SELECT * FROM users WHERE email = ?`;
        db.query(sql, [email], callback);
    },

    findById: (id, callback) => {
        const sql = `SELECT * FROM users WHERE id = ?`;
        db.query(sql, [id], callback);
    },
    makeadmin: (id, callback) => {
        console.log('hello');
        const sql = `update users set role="admin" where id=?`;
        db.query(sql, [id], callback);
    },

    findAll: (callback) => {
        const sql = `SELECT * FROM users where role="user"`;
        db.query(sql, callback);
    },
    findAllAdmins: (callback) => {
        const sql = `SELECT * FROM users where role="admin"`;
        db.query(sql, callback);
    },
    updateUser:async (body,id,callback)=>{
        const hashpassword=await bcrypt.hash(body.password, 10)
        const sql='update users set username=?,email=?,password=? where id=?';
        db.query(sql,[body.username,body.email,hashpassword,id],callback);
    },
    deleteUser:(id,callback)=>{
        const sql=`delete from users where id=?`
        db.query(sql,[id],callback);
    }
};

module.exports = User;
