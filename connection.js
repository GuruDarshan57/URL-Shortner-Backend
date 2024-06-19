const mongoose = require("mongoose")

function establish_connection(con_str) {
    return mongoose.connect(con_str)
}
module.exports = establish_connection