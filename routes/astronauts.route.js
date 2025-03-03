const { Router } = require('express');
const { 
    createAstrounautController,
    listAstrounautsController, 
    getAstrounautController,
    updateAstrounautController,
    deleteAstrounautController
} = require('../controllers/astronauts.controller');


const router = Router({
    mergeParams: true
});

router.route("/").post(createAstrounautController).get(listAstrounautsController)
router.route("/:id").get(getAstrounautController).patch(updateAstrounautController).delete(deleteAstrounautController)

module.exports = router;
