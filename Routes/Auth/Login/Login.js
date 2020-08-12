const router = require('express-promise-router')(),
  { valBody, validatePassword } = require('./MiddleAuth'),
  { generateToken } = require('../Token')
  db = require('../../../data/db')

module.exports = router

router.post('/', valBody, validatePassword, async (req, res) => {
  const { email , password } = req.body
  const token = generateToken(req.body)

  const user = await db('users')
  .where('email', email)
  .first()

  res.json({ 'user': user , token })
})

router.use((err, req, res, next) =>
  res.status(500).json({
    message: 'Login Failure',
    error: err.message.replace(/\\/g, ''),
    token: false,
  })
)