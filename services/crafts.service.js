const { db } = require("../db");

const createSpacecraft = async ({ name, type, capacity }) => {
    const statement = `INSERT INTO spacecrafts VALUES (NULL, ?, ?, ?)`;
    const result = new Promise((resolve, reject) => {
        db.query(statement, [name, type, capacity], (err, result) => {
            if (err) {
                reject(`Failed to insert spacecraft. Error: ${err.message}`);
            }
            resolve(result);
        });
    });
    return result;
}

const listSpacecrafts = async () => {
    const statement = `SELECT * FROM spacecrafts`;
    const result = new Promise((resolve, reject) => {
        db.query(statement, [], (err, result) => {
            if (err) {
                reject(`Failed to list spacecrafts. Error: ${err.message}`);
            }
            resolve(result);
        });
    });
    return result;
}

const getSpacecraft = async (id) => {
    const statement = `SELECT * FROM spacecrafts WHERE id=?`;
    const result = new Promise((resolve, reject) => {
        db.query(statement, [id], (err, result) => {
            if (err) {
                reject(`Failed to get spacecraft. Error: ${err.message}`);
            }
            resolve(result[0]);
        });
    });
    return result;
}

const updateSpacecraft = async (id, { name, type, capacity }) => {
    const statement = `UPDATE spacecrafts SET name = ?, type = ?, capacity = ? WHERE id=?`;
    const result = new Promise((resolve, reject) => {
        db.query(statement, [name, type, capacity, id], (err, result) => {
            if (err) {
                reject(`Failed to update spacecraft. Error: ${err.message}`);
            }
            resolve(result);
        });
    });
    return result;
}

const deleteSpacecraft = async (id) => {
    const statement = `DELETE FROM spacecrafts WHERE id=?`;
    const result = new Promise((resolve, reject) => {
        db.query(statement, [id], (err, result) => {
            if (err) {
                reject(`Failed to delete spacecraft. Error: ${err.message}`);
            }
            resolve(result);
        });
    });
    return result;
}

module.exports = {
    createSpacecraft,
    listSpacecrafts,
    getSpacecraft,
    updateSpacecraft,
    deleteSpacecraft
}
