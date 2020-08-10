
const bcrypt = require('bcryptjs'),
    db = require('../../../data/db')

const valBody = (req, res, next) => {
    if (!req.body.email && !req.body.password)
        throw new Error('Must send both an email and a password')
    if (!req.body.email) throw new Error('Must send an email')
    if (!req.body.password) throw new Error('Must send a password')
    next()
}

const validatePassword = async (req, res, next) => {
    console.log('working')
    const user = await db('users as u')
        .where('email', req.body.email)
        .first()
        console.log('right password')
    if (!user || !bcrypt.compareSync(req.body.password, user.password))
        return res
            .status(401)
            .json({ message: 'Authorization failed!', token: false })
    next()
}

module.exports = { valBody, validatePassword }