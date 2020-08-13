const db = require('../../data/db')

module.exports = {
  NewGame
}

function NewGame(gameInfo) {
  return db('game').insert(gameInfo)
    .then(id => {
      console.log(id)
      return db('game').where('game_id', id)
        .first()
    })
}
