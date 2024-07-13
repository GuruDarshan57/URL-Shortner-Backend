const { default: mongoose } = require("mongoose");
const { createHmac, randomBytes } = require("crypto")

//services
const { createToken } = require("../services/user")
//schema for user collection
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

//presave to hash before saving
schema.pre("save", async function () {
    const user = this

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex")

    this.salt = salt
    this.password = hashedPassword
})

//matching password
schema.static("matchPassword", async function (email, password) {
    const user = await this.findOne({ email })
    if (!user) return

    const realPassword = user.password
    const inputPassword = createHmac("sha256", user.salt).update(password).digest("hex")

    const udata = { ...user._doc, salt: undefined, password: undefined }
    return realPassword === inputPassword ? createToken(udata) : -1
})

const users = mongoose.model("users", schema)

// async function delAll() {
//     await users.deleteMany()
// }
// delAll()

module.exports = users