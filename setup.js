const { connectToDB, db } = require("./db")

const createUsersTable = async () => {
    const statement = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL
    );
  `;
  return new Promise((resolve, reject) => {
    db.query(statement, (err, result) => {
        if (err) {
            
        }
        console.log("Users table created")
        resolve()
    })
  })
}

const createAstronautsTable = async () => {
    const statement = `
    CREATE TABLE IF NOT EXISTS astronauts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        dob DATE NOT NULL,
        nationality VARCHAR(100) NOT NULL
    );
  `;
  return new Promise((resolve, reject) => {
    db.query(statement, (err, result) => {
        if (err) {
            
        }
        console.log("Astronauts table created")
        resolve()
    })
  })
}

const createMissionsTable = async () => {
    const statement = `
    CREATE TABLE IF NOT EXISTS missions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        launch_date DATE NOT NULL,
        status VARCHAR(100) NOT NULL,
        description TEXT
    );
  `;
  return new Promise((resolve, reject) => {
    db.query(statement, (err, result) => {
        if (err) {
            
        }
        console.log("Missions table created")
        resolve()
    })
  })
}

const createCraftsTable = async () => {
    const statement = `
    CREATE TABLE IF NOT EXISTS spacecrafts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(100) NOT NULL,
        capacity INT NOT NULL
    );
  `;
  return new Promise((resolve, reject) => {
    db.query(statement, (err, result) => {
        if (err) {
            
        }
        console.log("Space crafts table created")
        resolve()
    })
  })
}


(async () => {
    await connectToDB()
    await createUsersTable()
    await createAstronautsTable()
    await createMissionsTable()
    await createCraftsTable()
    process.exit()
})()