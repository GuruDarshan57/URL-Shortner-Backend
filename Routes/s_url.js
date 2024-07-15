const express = require("express")

const Router = express.Router();

//controllers
const { genrateSurl, getRecent } = require("../controller/s_url")

Router.route("/generate").post(genrateSurl)

Router.route("/getRecent").get(getRecent)



module.exports = Router