const { default: mongoose } = require("mongoose");

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
        type: mongoose.Types.ObjectId,
        requried: true
    },
    history: {
        type: Array,
        default: [String]
    }
}, { timestamps: true })



const s_url = mongoose.model("s-url", schema)

// async function delAll() {
//     await s_url.deleteMany()
// }
// delAll()

module.exports = s_url