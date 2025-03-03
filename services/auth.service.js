const { db } = require("../db");

const loginUser = async ({ username, password }) => {
    const statement = `SELECT * FROM users WHERE username = ? AND password = ?`;
    const result = new Promise((resolve, reject) => {
        db.query(statement, [username, password], (err, result) => {
            if (err) {
                const error = new Error("Failed to login")
                error.statusCode = 500
                throw err
            }
            resolve(result[0])
        })
    })
    return result
}

const checkForExistingUser = ({ username, email }) => {
    const statement = `SELECT * FROM users WHERE username = ? OR email = ?`
    const result = new Promise((resolve, reject) => {
        db.query(statement, [username, email], (err, result) => {
            if (err) {
                reject(`Failed to query users. Error: ${err.message}`)
            }
            resolve(result[0])
        })
    })
    return result
}

const signupUser = async ({ username, password, email }) => {
    const statement = `INSERT INTO users VALUES (NULL, ?, ?, ?)`;
    const user = await checkForExistingUser({ username, email })
    if (user) {
        const error = new Error("User with same email or username already exists")
        error.statusCode = 409
        throw error
    }
    const result = new Promise((resolve, reject) => {
        db.query(statement, [username, password, email], (err, result) => {
            if (err) {
                reject(`Failed to create users. Error: ${err.message}`)
            }
            resolve(result)
        })
    })
    return result
}

module.exports = {
    loginUser,
    signupUser
}