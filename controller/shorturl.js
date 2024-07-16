//Short URL Model
const s_url = require("../models/s_url")

const redirectToOriginal = async (req, res) => {
    try {
        const s_id = req.params.id
        const resp = await s_url.findOne({ short_id: s_id }, { url: 1 })
        if (resp) {
            res.redirect(resp.url)
        }
        else {
            res.status(400).json({ msg: "Inavlid Short URL" })
        }
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = { redirectToOriginal }