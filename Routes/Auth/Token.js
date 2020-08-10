const jwt = require('jsonwebtoken'),
JWT_SECRET = process.env.JWT_SECRET,


authenticate = async (req, res, next) => {
const token = req.headers.Authorization
if (!token)
  return res
    .status(401)
    .json({ message: 'Authentication Failure', token: false })
jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
  if (err)
    return res
      .status(401)
      .json({ message: 'Authentication Failure', token: false })
  req.decodedToken = decodedToken
  next()
})
}


const generateToken = user => {
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(JWT_SECRET, options)
}

module.exports = { authenticate, generateToken }
