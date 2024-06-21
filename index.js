require("dotenv").config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require('cors');


//connecting to db.
const establish_connection = require("./connection")
const connection_string = process.env.base
try { establish_connection(connection_string).then(() => { console.log("Connection with DB established.") }) }
catch (err) { console.log(" DB conection error : " + err.message) }

//middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors())

const port = process.env.port
app.listen(port, () => {
    console.log(`Server started at Port ${port}.`)
})

//SignIn and SignUp Routes.
const Auth = require("./Routes/user")
app.use("/", Auth)

//just for fun
const users = require("./models/user")
async function delAll() {
    await users.deleteMany({})
}

// delAll()