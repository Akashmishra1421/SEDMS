const { createAstrounauts, listAstrounauts, getAstrounaut, updateAstrounaut, deleteAstrounaut } = require("../services/astrounauts.service")

const createAstrounautController = async (req, res, next) => {
    try {
        const { name, dob, nationality } = req.body
        const astrounaut = await createAstrounauts({
            name,
            dob,
            nationality
        })
        res.status(201).json({
            "status": 201,
            "response": astrounaut,
            "message": "Astronaut created successfully"
        })
    } catch (err) {
        next(err)
    }
}

const listAstrounautsController = async (req, res, next) => {
    try {
        const astrounauts = await listAstrounauts()
        res.json({
            "status": 200,
            "response": astrounauts
        })
    } catch (err) {
        next(err)
    }
}

const getAstrounautController = async (req, res, next) => {
    try {
        const { id } = req.params
        const astrounaut = await getAstrounaut(id)
        if (!astrounaut) {
            const error = new Error("Astronaut not found")
            error.statusCode = 404
            throw error
        }
        res.json({
            "status": 200,
            "response": astrounaut
        })
    } catch (err) {
        next(err)
    }
}

const updateAstrounautController = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, dob, nationality } = req.body
        const astrounaut = await getAstrounaut(id)
        if (!astrounaut) {
            const error = new Error("Astronaut not found")
            error.statusCode = 404
            throw error
        }
        await updateAstrounaut(id, {
            name: name || astrounaut.name,
            dob: dob || astrounaut.dob,
            nationality: nationality || astrounaut.nationality
        })
        res.json({
            "status": 200,
            "response": astrounaut
        })
    } catch (err) {
        next(err)
    }
}

const deleteAstrounautController = async (req, res, next) => {
    try {
        const { id } = req.params
        const astrounaut = await getAstrounaut(id)
        if (!astrounaut) {
            const error = new Error("Astronaut not found")
            error.statusCode = 404
            throw error
        }
        await deleteAstrounaut(id, {})
        res.json({
            "status": 200,
            "response": "Astronaut deleted"
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createAstrounautController,
    listAstrounautsController,
    getAstrounautController,
    updateAstrounautController,
    deleteAstrounautController
}