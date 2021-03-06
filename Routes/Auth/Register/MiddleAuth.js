const bcrypt = require('bcryptjs')

const valBody = (req, res, next) => {
  if (!req.body.password) throw new Error('Must send a password!')
  if (!req.body.email) throw new Error('Must send an email address!')
  next()
}

const hashPassword = (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, 14)
  next()
}

module.exports = { valBody, hashPassword }