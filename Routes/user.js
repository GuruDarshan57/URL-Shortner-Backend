const express = require("express")
const Router = express.Router()

//route handlers
const { signup, signin } = require("../controller/user")

Router.post("/signup", signup)

Router.post("/signin", signin)

module.exports = Router