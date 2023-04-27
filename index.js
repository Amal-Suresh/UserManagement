const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/user_management")

const express = require("express")
const app = express()
const nocache = require('nocache')

var path = require('path');
const hbs=require('express-handlebars')
app.use(nocache())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs.engine({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: __dirname + "/views/layout/",
  partialsDir: __dirname + "/views/partials/"
}))


//for user routes
const userRoute = require('./routes/userRoute')
app.use('/',userRoute)


//for admin routes
const adminRoute = require('./routes/adminRoute')
app.use('/',adminRoute)

app.listen(3000,()=>{
    console.log("server is running")
})
