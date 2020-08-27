const router = require('express-promise-router')(),
  { valBody, hashPassword } = require('./MiddleAuth'),
  { addAdmin } = require('./helper'),
  { generateToken } = require('../Token')

module.exports = router

router.post('/', valBody, hashPassword, async (req, res) => {
  const admin = await addAdmin(req.body)
  const token = generateToken(admin)
  console.log(admin)
  res.status(201).json({ 'id': admin.user_id, token })
})

router.use((err, req, res, next) =>
  res.status(500).json({
    message: 'Registration Failure',
    error: err.message.replace(/\\/g, ''),
    token: false,
  })
)