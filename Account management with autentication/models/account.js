const { updateAccount } = require('../controllers/user');
const db = require('./index');

const Account = {
    findByUserId: (userId, callback) => {
        const sql = `SELECT * FROM accounts WHERE user_id = ?`;
        db.query(sql, [userId], callback);
    },

    findById: (accountId, callback) => {
        const sql = `SELECT * FROM accounts WHERE id = ?`;
        db.query(sql, [accountId], callback);
    },
    updateAccount:(body,accountId,callback)=>{
        console.log(body);
        const sql=`update accounts set ? where id = ?`;
        db.query(sql,[body,accountId],callback);

    },
    deleteAccount:(accountId,callback)=>{
        
        const sql=`delete from accounts where user_id=?`;
        db.query(sql,accountId,callback);
    },

    findAll: (callback) => {
        const sql = `SELECT * FROM accounts`;
        db.query(sql, callback);
    },

    create: (body, callback) => {
        // console.log(userId, accountNumber, accountName, accountType, balance, openingDate, status, branchName);
        const sql = `INSERT INTO accounts set ?`;
        db.query(sql, [body], callback);
    }
};

module.exports = Account;
