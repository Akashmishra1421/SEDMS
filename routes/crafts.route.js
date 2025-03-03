const { Router } = require('express');
const { 
    createSpacecraftController,
    listSpacecraftsController, 
    getSpacecraftController,
    updateSpacecraftController,
    deleteSpacecraftController
} = require('../controllers/crafts.controller');

const router = Router({
    mergeParams: true
});

router.route("/").post(createSpacecraftController).get(listSpacecraftsController);
router.route("/:id").get(getSpacecraftController).patch(updateSpacecraftController).delete(deleteSpacecraftController);

module.exports = router;
