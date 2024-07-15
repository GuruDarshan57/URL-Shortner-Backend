
const { verifyToken } = require("../services/user")

//middleware to check authentication(soft check)
const authentication = (req, res, next) => {
    if (req.cookies) {
        const resp = verifyToken(req.cookies.token)
        resp != -1 ? req.user = resp : ""
    }
    next()
}

//middleware to authorize user
const authorize = (auth_list) => {
    return (req, res, next) => {
        if (req.user) {
            if (auth_list.includes(req.user.role)) {
                next()
            }
            else {
                res.status(400).json({ msg: "Invalid credentials" })
            }
        }
        else {
            res.status(400).json({ msg: "Please SignIn to Use" })
        }
    }
}

module.exports = { authentication, authorize }