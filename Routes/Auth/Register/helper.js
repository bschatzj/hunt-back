
const db = require('../../../data/db')

addAdmin = async newUser => {
  await db('users').insert({
    email: newUser.email,
    password: newUser.password,
  })
  return await db('users')
    .where('email', newUser.email)
    .first()
}

module.exports = { addAdmin }