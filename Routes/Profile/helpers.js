const db = require("../../data/db");


module.exports = {
    update,
}

function update(id, update) {
    db('users')
        .where('user_id', update.user_id)
        .update('icon', update.icon)
        .then(console.log('working!!!'))
        .catch(err => { console.log(err) })
}