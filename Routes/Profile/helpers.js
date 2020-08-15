const db = require("../../data/db");

module.exports = {
    update,
}

function update(id, update) {
    return db('users')
    .where('user_id', id)
    .update(update)
}