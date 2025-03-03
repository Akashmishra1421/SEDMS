const { db } = require("../db");

const createMission = async ({ name, launch_date, status, description }) => {
    const statement = `INSERT INTO missions VALUES (NULL, ?, ?, ?, ?)`;
    const result = new Promise((resolve, reject) => {
        db.query(statement, [name, launch_date, status, description], (err, result) => {
            if (err) {
                reject(`Failed to insert mission. Error: ${err.message}`);
            }
            resolve(result);
        });
    });
    return result;
}

const listMissions = async () => {
    const statement = `SELECT * FROM missions`;
    const result = new Promise((resolve, reject) => {
        db.query(statement, [], (err, result) => {
            if (err) {
                reject(`Failed to list missions. Error: ${err.message}`);
            }
            resolve(result);
        });
    });
    return result;
}

const getMission = async (id) => {
    const statement = `SELECT * FROM missions WHERE id=?`;
    const result = new Promise((resolve, reject) => {
        db.query(statement, [id], (err, result) => {
            if (err) {
                reject(`Failed to get mission. Error: ${err.message}`);
            }
            resolve(result[0]);
        });
    });
    return result;
}

const updateMission = async (id, { name, launch_date, status, description }) => {
    const statement = `UPDATE missions SET name = ?, launch_date = ?, status = ?, description = ? WHERE id=?`;
    const result = new Promise((resolve, reject) => {
        db.query(statement, [name, launch_date, status, description, id], (err, result) => {
            if (err) {
                reject(`Failed to update mission. Error: ${err.message}`);
            }
            resolve(result);
        });
    });
    return result;
}

const deleteMission = async (id) => {
    const statement = `DELETE FROM missions WHERE id=?`;
    const result = new Promise((resolve, reject) => {
        db.query(statement, [id], (err, result) => {
            if (err) {
                reject(`Failed to delete mission. Error: ${err.message}`);
            }
            resolve(result);
        });
    });
    return result;
}

module.exports = {
    createMission,
    listMissions,
    getMission,
    updateMission,
    deleteMission
}
