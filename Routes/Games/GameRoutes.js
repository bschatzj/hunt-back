const router = require('express-promise-router')(),
{ NewGame } = require('./Helpers');

module.exports = router

router.post('/newgame', (req, res) => {
    const Game = NewGame(req.body)

    res.status(200).json({ message: `Game ${req.body.title} was succesfully created`, gameId: Game.game_id })

})
router.use((err, req, res, next) =>
    res.status(500).json({
        message: 'Game Failed',
        error: err.message.replace(/\\/g, ''),
    })
)