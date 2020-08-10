const router = require('express-promise-router')(),
  { valBody, validatePassword } = require('./MiddleAuth'),
  { generateToken } = require('../Token')

module.exports = router

router.post('/', valBody, validatePassword, (req, res) => {
  const { email , password } = req.body
  const token = generateToken(req.body)
  res.json({ email , token })
})

router.use((err, req, res, next) =>
  res.status(500).json({
    message: 'Login Failure',
    error: err.message.replace(/\\/g, ''),
    token: false,
  })
)