const db = require('../../data/db')

NewGame = async newGame => {
    await db('game').insert({
        game_title: newGame.title,
        password: newGame.password,
        private: newGame.private,
    })
    return await db('game')
      .where('game_title', newGame.title)
      .first()
  }
  



module.exports= {NewGame}