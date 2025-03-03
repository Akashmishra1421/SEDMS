const { loginUser, signupUser } = require("../services/auth.service")

const loginController = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await loginUser({
            username,
            password
        })
        if (!user) {
            const error = new Error("Invalid username / password")
            error.statusCode = 401
            throw error
        }
        res.json({
            "status": 200,
            "response": user
        })
    } catch (err) {
        next(err)
    }
}

const signUpController = async (req, res, next) => {
    try {
        const { username, password, email } = req.body
        const user = await signupUser({
            username,
            password,
            email
        })
        res.json({
            "status": 200,
            "response": user
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    loginController,
    signUpController
}