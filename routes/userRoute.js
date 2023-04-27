const express =require("express")
const user_route = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const config = require("../config/config")
user_route.use(session({secret:config.sessionSecret,resave: true,saveUninitialized: true}))

const auth = require("../middleware/auth")

const nocache=require("nocache")


user_route.use(bodyParser.json())
user_route.use(bodyParser.urlencoded({extended:true}))



user_route.set('view engine','hbs')
user_route.set('views','./views/user')

const userContoller = require("../contollers/userContoller")

user_route.get('/register',auth.isLogout,userContoller.loadRegister)

user_route.post('/register',userContoller.insertUser)

user_route.get('/',nocache(),auth.isLogout,userContoller.loginLoad)
user_route.get('/login',auth.isLogout,userContoller.loginLoad)
user_route.post('/login',userContoller.verifyLogin)

user_route.get('/home',auth.isLogin,userContoller.loadHome)

user_route.get('/logout',auth.isLogin,userContoller.userLogout)




module.exports = user_route;
