const { Router } = require('express');
const { 
    createMissionController,
    listMissionsController, 
    getMissionController,
    updateMissionController,
    deleteMissionController
} = require('../controllers/missions.controller');

const router = Router({
    mergeParams: true
});

router.route("/").post(createMissionController).get(listMissionsController);
router.route("/:id").get(getMissionController).patch(updateMissionController).delete(deleteMissionController);

module.exports = router;
