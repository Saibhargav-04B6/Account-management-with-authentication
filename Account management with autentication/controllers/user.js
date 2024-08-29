const Account = require('../models/account');

exports.getUserAccounts = (req, res) => {
    const userId = req.user.id;
    
    Account.findAll( (err, accounts) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        res.json(accounts);
    });
};
exports.createAccount = (req, res) => {

    console.log(req.body)

    var body=req.body;
    Account.create(body,(err, accounts) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        res.json(accounts);
    });
};

exports.getAccountById = (req, res) => {
    const accountId = req.params.accountId;

    Account.findByUserId(accountId, (err, accounts) => {
        if (err || accounts.length === 0) return res.status(404).json({ error: 'Account not found.' });
        res.json(accounts);
    });

};
exports.updateAccount=(req,res)=>{
    const accountId = req.params.accountId;
    const body=req.body;
    console.log('hello namaste');
    console.log(body);
    Account.updateAccount(body,accountId,(err,account)=>{
        if(err)
        {
            return res.status(404).json({error:"Account not Updated"})
        }
        console.log(account);
        res.json({status:"Account Updated succesfully"});
    })

}

exports.deleteAccount=(req,res)=>{
    var accountId=req.params.accountId;
    console.log('hello');
    Account.deleteAccount(accountId,(err,account)=>{
        if(err)
        {
            return res.status(404).json({error:"Account not deleted"})
        }
        res.json({status:"Account deleted"});
    })
}