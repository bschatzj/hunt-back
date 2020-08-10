const router = require('express').Router()
const Login = require('./Auth/Login/Login')
const Register = require ('./Auth/Register/Register')
const NewGame = require ('./Games/GameRoutes')

router.use('/login' , Login)
router.use('/register', Register)
router.use('/game', NewGame)


module.exports = router