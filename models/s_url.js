const { default: mongoose } = require("mongoose");

const user = require("./user")

//schema for user collection
const schema = new mongoose.Schema({
    url: {
        type: String,
        requried: true,
    },
    short_id: {
        type: String,
        requried: true,
        unique: true
    }
    ,
    name: {
        type: String,
        requried: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        requried: true
    },
    clicks: {
        type: Number,
        default: 0
    }
}, { timestamps: true })



const s_url = mongoose.model("s_url", schema)

// async function delAll() {
//     await s_url.deleteMany()
// }
// delAll()

module.exports = s_url