// import mysql from 'mysql2';
const mysql = require('mysql2');
const db=   mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    database: process.env.DB_NAME, 
    
});

 db.connect(function(error){
    if (error)
    {
        console.log('error in connecting in database',error);

    }
    else
    {
        console.log('database connected successfully');

    }
    
    

})
// db.query(
//      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
//     (error, res)=>{
//         if (error)
//         {
//             console.log(error);
//             return 
//         }
//         console.log('Database created sucessfully or already exists');
//     }
// )
// db.query(`USE ${process.env.DB_NAME}`, (err) => {
//     if (err) {
//         console.log(err);
//         return;
//     }

//     console.log(`Using database ${process.env.DB_NAME}`);
// });

module.exports= db;
