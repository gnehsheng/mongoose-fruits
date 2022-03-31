//Dependencies
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const methodOverride = require("method-override");
const fruitsController = require("./controllers/fruits.js");
const usersController = require("./controllers/UsersController.js");
const session = require('express-session')

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {}, () => {
    console.log("connected to mongodb")
})
const app = express();
const PORT = process.env.PORT ?? 2000;

//Middleware
app.use(morgan("tiny"))
app.use(
    session({
        secret: "iamsimon", //a random string do not copy this value or your stuff will get hacked
        resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
        saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
    })
);
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use("/fruits", fruitsController);
app.use("/users", usersController);

app.get('/', (req, res)=>{
    res.send('hello')
})

//Listener
app.listen(PORT, () => {
    console.log("express started on " + PORT)
});