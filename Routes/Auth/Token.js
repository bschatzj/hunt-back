const jwt = require('jsonwebtoken'),
{ JWT_SECRET } = require('../../env')

const authenticate = async (req, res, next) => {
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
  const payload = {
    ...user,
  }
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = { authenticate, generateToken }
