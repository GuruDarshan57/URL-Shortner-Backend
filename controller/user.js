//model
const users = require("../models/user")

const jwt = require("jsonwebtoken")

//signup route handler
const signup = async (req, res) => {
    const { username, email, password } = req.body
    // console.log("POST : /signup " + username, email, password)
    if (!email || !username || !password) {
        res.status(400).json({ msg: "username email password required" })
    }
    else {
        try {
            const resp = await users.create({
                username: username, email: email, password: password
            })
            res.json({ msg: "created" })
        }
        catch (err) {
            if (err.code === 11000) {
                console.error("User already present." + err.message);
                res.status(400).json({ msg: "duplicate" })
            } else {
                console.error("Error inserting document:", err.message);
                res.status(500).json({ msg: "error" })
            }
        }
    }
}

//signin route handler
const seckey = "guru@123"
const signin = async (req, res) => {
    const { email, password } = req.body
    // console.log("POST : /signin " + email, password)
    if (!email || !password) {
        res.status(400).json({ msg: "email password required" })
    } else {
        try {
            const resp = await users.findOne({
                email: email
            })
            if (resp) {
                res.json({ msg: resp.password === password ? "logged in" : "incorrect password", accessToken: resp.password === password ? jwt.sign({ email: email }, seckey) : "" })
            }
            else {
                res.status(400).json({ msg: "user not found" })
            }
        }
        catch (err) {
            console.error("Error", err.message);
            res.status(500).json({ msg: "error" })
        }
    }
}

module.exports = { signup, signin }