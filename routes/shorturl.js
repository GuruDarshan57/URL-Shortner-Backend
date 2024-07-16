const express = require("express")

const Router = express.Router();

//controllers
const { redirectToOriginal } = require("../controller/shorturl")

Router.route("/:id").get(redirectToOriginal)

module.exports = Router