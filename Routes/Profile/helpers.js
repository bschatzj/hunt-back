const db = require("../../data/db");


module.exports = {
    update,
}

function update(id, update) {
    console.log(update)
    db('users')
    .where('user_id', parseInt(id))
    .update('icon', update.icon)
    .then(console.log('working!!!'))
}