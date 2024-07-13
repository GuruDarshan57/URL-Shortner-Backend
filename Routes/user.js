const express = require("express")
const Router = express.Router()

//route handlers
const { signup, signin, signout } = require("../controller/user")

Router.post("/signup", signup)

Router.post("/signin", signin)

Router.post("/signout", signout)

module.exports = Router