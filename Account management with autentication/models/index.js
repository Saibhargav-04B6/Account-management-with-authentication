const config=require('../config/config');
const mysql=require('mysql2');

const db=mysql.createConnection(
    {
        host:config.host,
        user:config.user,
        password:config.password,
        database:config.database
    }
)
db.connect((err)=>{
    if(err)
    {
        console.log("Database not connected")
        throw err;
    }
    console.log('Database is connected')
})
module.exports=db;
