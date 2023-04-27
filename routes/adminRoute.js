const express = require("express")

const admin_route = express()
const nocache=require("nocache")


const session = require('express-session')
const config = require('../config/config')
admin_route.use(session({secret:config.sessionSecret,resave: true,saveUninitialized: true}))

const bodyParser=require('body-parser')

admin_route.use(bodyParser.json())
admin_route.use(bodyParser.urlencoded({extended:true}))

admin_route.set('view engine','hbs')
admin_route.set('views','./views/admin')

const auth = require('../middleware/adminAuth')

const adminContoller = require('../contollers/adminContoller')

admin_route.get('/admin',nocache(),auth.isLogout,adminContoller.Loadlogin)

admin_route.post('/adminlogin',adminContoller.verifyLogin)

admin_route.get('/adhome',auth.isLogin,adminContoller.loadDashboard)

admin_route.get('/adlogout',auth.isLogin,adminContoller.logout)

admin_route.get('/adduser',auth.isLogin,adminContoller.newUserLoad)
admin_route.post('/adduser',adminContoller.addUser)

admin_route.get('/edituser',auth.isLogin,adminContoller.editUserLoad)
admin_route.post('/edituser',adminContoller.updateUsers)

admin_route.get('/deleteuser',adminContoller.deleteUser)


module.exports = admin_route



