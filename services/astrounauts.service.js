const { db } = require("../db");

const createAstrounauts = async ({
    name,
    dob,
    nationality
}) => {
    const statement = `INSERT INTO astronauts VALUES (NULL, ?, ?, ?)`;
    const result = new Promise((resolve, reject) => {
        db.query(statement, [name, dob, nationality], (err, result) => {
            if (err) {
                reject(`Failed to insert astronauts. Error: ${err.message}`)
            }
            resolve(result)
        })
    })
    return result
}

const listAstrounauts = async () => {
    const statement = `SELECT * FROM astronauts`;
    const result = new Promise((resolve, reject) => {
        db.query(statement, [], (err, result) => {
            if (err) {
                reject(`Failed to list astronauts. Error: ${err.message}`)
            }
            resolve(result)
        })
    })
    return result
}

const getAstrounaut = async (id) => {
    const statement = `SELECT * FROM astronauts WHERE id=?`;
    const result = new Promise((resolve, reject) => {
        db.query(statement, [id], (err, result) => {
            if (err) {
                reject(`Failed to get astronauts. Error: ${err.message}`)
            }
            resolve(result[0])
        })
    })
    return result
}

const updateAstrounaut = async (id, { name, dob, nationality }) => {
    const statement = `UPDATE astronauts SET name = ?, dob = ?, nationality = ? WHERE id=?`;
    const result = new Promise((resolve, reject) => {
        db.query(statement, [name, dob, nationality, id], (err, result) => {
            if (err) {
                reject(`Failed to update astronauts. Error: ${err.message}`)
            }
            resolve(result)
        })
    })
    return result
}

const deleteAstrounaut = async (id, { name, dob, nationality }) => {
    const statement = `DELETE FROM astronauts WHERE id=?`;
    const result = new Promise((resolve, reject) => {
        db.query(statement, [id], (err, result) => {
            if (err) {
                reject(`Failed to update astronauts. Error: ${err.message}`)
            }
            resolve(result)
        })
    })
    return result
}

module.exports = {
    createAstrounauts,
    listAstrounauts,
    getAstrounaut,
    updateAstrounaut,
    deleteAstrounaut
}