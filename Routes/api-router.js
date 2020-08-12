const router = require('express').Router()
const Login = require('./Auth/Login/Login')
const Register = require ('./Auth/Register/Register')
const NewGame = require ('./Games/GameRoutes')
const Email = require ('./Invite/email')
const Profile = require ('./Profile/ProfileRoutes')


router.use('/login' , Login)
router.use('/register', Register)
router.use('/game', NewGame)
router.use('/email', Email)
router.use('/profile', Profile)


module.exports = router