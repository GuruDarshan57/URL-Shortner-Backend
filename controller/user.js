//model
const users = require("../models/user")

//signup route handler
const signup = async (req, res) => {
    const { username, email, password } = req.body
    // console.log("POST : /signup " + username, email, password)
    try {
        const resp = await users.create({
            username: username, email: email, password: password
        })
        res.json({ msg: "created" })
    }
    catch (err) {
        if (err.code === 11000) {
            console.error("User already present.");
            res.status(400).json({ msg: "duplicate" })
        } else {
            console.error("Error inserting document:", err.message);
            res.status(500).json({ msg: "error" })
        }
    }
}

module.exports = { signup }