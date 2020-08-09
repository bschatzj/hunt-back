
const db = require('../../../data/db-config')

addAdmin = async newUser => {
  await db('users').insert({
    email: newUser.email,
    first_name: newUser.first_name,
  })
  return await db('users')
    .where('email', newUser.email)
    .first()
}

module.exports = { addAdmin }