require("dotenv").config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const cookieparser = require("cookie-parser")

const { authentication } = require("./middlewares/middlewares")

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

app.use(cors(corsOptions));


//connecting to db.
const establish_connection = require("./connection")
const connection_string = process.env.Mongo_URL
try { establish_connection(connection_string).then(() => { console.log("Connection with DB established.") }) }
catch (err) { console.log(" DB conection error : " + err.message) }

//middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieparser())
app.use(authentication)
// app.use(cors())

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server started at Port ${port}.`)
})

//SignIn and SignUp Routes.
const Auth = require("./routes/user")
app.use("/user", Auth)

//Short URL Routes
const S_URL = require("./routes/s_url")
const { authorize } = require("./middlewares/middlewares")
app.use("/s_url", authorize(["User", "Admin"]), S_URL)