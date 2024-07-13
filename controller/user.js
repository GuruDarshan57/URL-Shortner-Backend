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
const signin = async (req, res) => {
    const { email, password } = req.body
    // console.log("POST : /signin " + email, password)
    if (!email || !password) {
        res.status(400).json({ msg: "email password required" })
    } else {
        try {
            const resp = await users.matchPassword(email, password)
            if (resp) {
                resp != -1 ? res.cookie("token", resp) : ""
                res.json({ msg: resp === -1 ? "Incorrect Password" : "Log in Succesfull", token: resp === -1 ? -1 : resp })

            }
            else {
                res.status(400).json({ msg: "User not Found." })
            }
        }
        catch (err) {
            console.error("Error", err.message);
            res.status(500).json({ msg: "error" })
        }
    }
}

const signout = (req, res) => {
    res.clearCookie("token").json({ msg: "done" })
}

module.exports = { signup, signin, signout }