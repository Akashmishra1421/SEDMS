const { Router } = require('express');
const { loginController, signUpController } = require('../controllers/auth.controller');

const router = Router({
    mergeParams: true
});

router.route("/login").post(loginController)
router.route("/signup").post(signUpController)

module.exports = router