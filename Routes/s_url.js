const express = require("express")

const Router = express.Router();

//controllers
const { genrateSurl, getRecent, analytics } = require("../controller/s_url")

Router.route("/generate").post(genrateSurl)

Router.route("/getRecent").get(getRecent)

Router.route("/analytics").get(analytics)

module.exports = Router