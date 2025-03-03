const { createMission, listMissions, getMission, updateMission, deleteMission } = require("../services/missions.service");

const createMissionController = async (req, res, next) => {
    try {
        const { name, launch_date, status, description } = req.body;
        const mission = await createMission({
            name,
            launch_date,
            status,
            description
        });
        res.status(201).json({
            "status": 201,
            "response": mission,
            "message": "Mission created successfully"
        });
    } catch (err) {
        next(err);
    }
}

const listMissionsController = async (req, res, next) => {
    try {
        const missions = await listMissions();
        res.json({
            "status": 200,
            "response": missions
        });
    } catch (err) {
        next(err);
    }
}

const getMissionController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const mission = await getMission(id);
        if (!mission) {
            const error = new Error("Mission not found");
            error.statusCode = 404;
            throw error;
        }
        res.json({
            "status": 200,
            "response": mission
        });
    } catch (err) {
        next(err);
    }
}

const updateMissionController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, launch_date, status, description } = req.body;
        const mission = await getMission(id);
        if (!mission) {
            const error = new Error("Mission not found");
            error.statusCode = 404;
            throw error;
        }
        await updateMission(id, {
            name: name || mission.name,
            launch_date: launch_date || mission.launch_date,
            status: status || mission.status,
            description: description || mission.description
        });
        res.json({
            "status": 200,
            "response": mission
        });
    } catch (err) {
        next(err);
    }
}

const deleteMissionController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const mission = await getMission(id);
        if (!mission) {
            const error = new Error("Mission not found");
            error.statusCode = 404;
            throw error;
        }
        await deleteMission(id);
        res.json({
            "status": 200,
            "response": "Mission deleted"
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createMissionController,
    listMissionsController,
    getMissionController,
    updateMissionController,
    deleteMissionController
};
