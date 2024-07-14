const express = require("express")

//Short URL Model
const s_url = require("../models/s_url")

const Router = express.Router();

Router.route("/generate").post((req, res) => {
    console.log(req.user)
})



module.exports = Router