const router = require('express-promise-router')(),
    { NewGame } = require('./Helpers');
const db = require('../../data/db')




module.exports = router

router.post('/newgame', (req, res) => {
    db('game').insert({
        game_title: req.body.title,
        password: req.body.password,
        private: req.body.private,
    })
    const GameInfo = db('game')
        .where('game_title', newGame.title)
        .first()

    res.status(200).json({ message: `Game ${req.body.title} was succesfully created`, gameId: GameInfo.game_id })
})
