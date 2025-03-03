const { Router } = require('express');
const router = Router();
const AstronautsRouter = require("./astronauts.route")
const MissionsRoute = require("./missions.route")
const CraftsRoute = require("./crafts.route")
const AuthRouter = require("./auth.route")

router.use("/astronauts", AstronautsRouter)
router.use("/missions", MissionsRoute)
router.use("/spacecrafts", CraftsRoute)
router.use("/auth", AuthRouter)
module.exports = router