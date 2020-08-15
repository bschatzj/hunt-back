const db = require("../../data/db");


module.exports = {
    update,
}

function update(id, update) {
    const newId = parseInt(id)
    console.log(update)
    console.log(newId)
    db('users')
        .where('user_id', newId)
        .update('icon', update.icon)
        .then(console.log('working!!!'))
        .catch(err => { console.log(err) })
}