const { createSpacecraft, listSpacecrafts, getSpacecraft, updateSpacecraft, deleteSpacecraft } = require("../services/crafts.service");

const createSpacecraftController = async (req, res, next) => {
    try {
        const { name, type, capacity } = req.body;
        const spacecraft = await createSpacecraft({
            name,
            type,
            capacity
        });
        res.status(201).json({
            "status": 201,
            "response": spacecraft,
            "message": "Spacecraft created successfully"
        });
    } catch (err) {
        next(err);
    }
}

const listSpacecraftsController = async (req, res, next) => {
    try {
        const spacecrafts = await listSpacecrafts();
        res.json({
            "status": 200,
            "response": spacecrafts
        });
    } catch (err) {
        next(err);
    }
}

const getSpacecraftController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const spacecraft = await getSpacecraft(id);
        if (!spacecraft) {
            const error = new Error("Spacecraft not found");
            error.statusCode = 404;
            throw error;
        }
        res.json({
            "status": 200,
            "response": spacecraft
        });
    } catch (err) {
        next(err);
    }
}

const updateSpacecraftController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, type, capacity } = req.body;
        const spacecraft = await getSpacecraft(id);
        if (!spacecraft) {
            const error = new Error("Spacecraft not found");
            error.statusCode = 404;
            throw error;
        }
        await updateSpacecraft(id, {
            name: name || spacecraft.name,
            type: type || spacecraft.type,
            capacity: capacity || spacecraft.capacity
        });
        res.json({
            "status": 200,
            "response": spacecraft
        });
    } catch (err) {
        next(err);
    }
}

const deleteSpacecraftController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const spacecraft = await getSpacecraft(id);
        if (!spacecraft) {
            const error = new Error("Spacecraft not found");
            error.statusCode = 404;
            throw error;
        }
        await deleteSpacecraft(id);
        res.json({
            "status": 200,
            "response": "Spacecraft deleted"
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createSpacecraftController,
    listSpacecraftsController,
    getSpacecraftController,
    updateSpacecraftController,
    deleteSpacecraftController
};
