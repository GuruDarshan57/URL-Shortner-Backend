require("dotenv").config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")

const establish_connection = require("./connection")
const connection_string = process.env.base
try { establish_connection(connection_string).then(() => { console.log("Connection with DB established.") }) }
catch (err) { console.log(" DB conection error : " + err) }

const port = process.env.port
app.listen(port, () => {
    console.log(`Server started at Port ${port}.`)
})