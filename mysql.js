const mysql = require('mysql2');
require('dotenv').config();



const poolConnection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST_DATABASE, 
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD_DATABASE, 
    database: process.env.DATABASE,
    port: process.env.PORT,
    maxIdle: 10,
    queueLimit: 0,

});



function doQuery(query, parameters) {


    return new Promise((resolve, reject) => {


        poolConnection.query({

            sql: query,
            values: [parameters]

        }, function(err, rows) {


            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });


    });
}



module.exports = { doQuery };