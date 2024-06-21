const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    username: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        requried: true,
        unique: true
    },
    password: {
        type: String,
        requried: true
    }
}, { timestamps: true })

const users = mongoose.model("users", Schema)

module.exports = users