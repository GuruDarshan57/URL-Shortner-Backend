const { default: mongoose } = require("mongoose");
const { createHmac, randomBytes } = require("crypto")

const schema = new mongoose.Schema({
    username: {
        type: String,
        requried: true,
    },
    email: {
        type: String,
        requried: true,
        unique: true
    }, salt: {
        type: String
    }
    ,
    password: {
        type: String,
        requried: true
    },
    role: {
        type: String,
        //enum let's you restrict variable to a set of values.
        enum: ["User", "Admin"],
        default: "User"
    }
}, { timestamps: true })

schema.pre("save", async function () {
    const user = this

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex")

    this.salt = salt
    this.password = hashedPassword
})

schema.static("matchPassword", async function (email, password) {
    const user = await this.findOne({ email })
    if (!user) return

    const realPassword = user.password
    const inputPassword = createHmac("sha256", user.salt).update(password).digest("hex")

    return realPassword === inputPassword ? { ...user, salt: undefined, password: undefined } : "incorrect password"
})

const users = mongoose.model("users", schema)

module.exports = users