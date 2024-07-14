const express = require("express")

//nanoid to generate shortid
const { nanoid } = require("nanoid")

//Short URL Model
const s_url = require("../models/s_url")

const Router = express.Router();

Router.route("/generate").post(async (req, res) => {
    try {
        const { l_url, name } = req.body
        const s_id = nanoid(10)
        await s_url.create({
            url: l_url,
            short_id: s_id,
            name: name,
            createdBy: req.user.uid
        })
        res.json({ masg: s_id })
    } catch (err) {
        console.log(err.message)
    }
})



module.exports = Router