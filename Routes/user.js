const express = require("express")
const Router = express.Router()

//route handlers
const { signup } = require("../controller/user")

Router.post("/signup", signup)

module.exports = Router