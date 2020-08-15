const db = require("../../data/db");


module.exports = {
    update,
}

function update(id, update) {
    console.log(update)
    console.log(newId)
    const newId = parseInt(id)
    db('users')
    .where('user_id', newId)
    .update('icon', update.icon)
    .then(console.log('working!!!'))
    .catch(err => {console.log(err)})
}