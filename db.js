const mysql = require('mysql2');
const { config } = require('dotenv')

config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const connectToDB = () => {
    return new Promise((resolve, reject) => {
        db.connect(err => {
            if (err) {
                reject(`Connection to database failed. Fail reason: (${err.message})`)
            } else {
                resolve(db)  
            }
        });      
    })
}


module.exports = {
    connectToDB,
    db
};
