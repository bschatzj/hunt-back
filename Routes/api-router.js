const router = require('express').Router()
const Login = require('./Auth/Login/Login')
const Register = require ('./Auth/Register/Register')
const NewGame = require ('./Games/GameRoutes')
const Email = require ('./Invite/email')
router.use('/login' , Login)
router.use('/register', Register)
router.use('/game', NewGame)
router.use('/email', Email)


module.exports = router