const router = require('express').Router()
const Login = require('./Auth/Login/Login')
const Register = require ('./Auth/Register/Register')

router.use('/login' , Login)
router.use('/register', Register)


module.exports = router