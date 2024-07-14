const jwt = require("jsonwebtoken")

//Secret Key for jwt
const secKey = process.env.secKey

//Function to create jwt 
const createToken = (user) => {
    const payload = {
        uid: user._id,
        name: user.username,
        email: user.email,
        role: user.role
    }
    const token = jwt.sign(payload, secKey)

    return token
}

//Function to verify token
const verifyToken = (token) => {
    try {
        const resp = jwt.verify(token, process.env.secKey)
        return resp;
    }
    catch (err) {
        console.log(err.message)
        return -1;
    }
}

module.exports = { createToken, verifyToken }