const { connectToDB, db } = require("./db")

const dropTables = async () => {
    const statement = `DROP TABLE IF EXISTS users,missions,astronauts,spacecrafts`;
  return new Promise((resolve, reject) => {
    db.query(statement, (err, result) => {
        if (err) {
            
        }
        console.log("Database is clean now. Please run the setup script to setup your database")
        resolve()
    })
  })
}


(async () => {
    await connectToDB()
    await dropTables();
    process.exit()
})()