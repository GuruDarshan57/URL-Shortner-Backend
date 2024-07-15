//nanoid to generate shortid
const { nanoid } = require("nanoid")

//Short URL Model
const s_url = require("../models/s_url")

const genrateSurl = async (req, res) => {
    try {
        const { l_url, name } = req.body
        const s_id = nanoid(10)
        await s_url.create({
            url: l_url,
            short_id: s_id,
            name: name,
            createdBy: req.user.uid
        })
        res.json({ msg: "Short URL successfully created", s_id: s_id })
    } catch (err) {
        console.log(err.message)
        res.json({ msg: "try again" })
    }
}

//Retrives recent 10 Short URL
const getRecent = async (req, res) => {
    try {
        const resp = await s_url.find({ createdBy: req.user.uid }, { url: 1, short_id: 1, name: 1 }).sort({ createdAt: -1 }).limit(5)
        res.json({ data: resp })
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = { genrateSurl, getRecent }