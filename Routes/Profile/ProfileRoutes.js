const router = require('express-promise-router')(),
db = require('../../data/db');
const { authenticate } = require('../Auth/Token');



module.exports = router



router.get('/games/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    const games = await db('list')
    .where('user', id)
    console.log(games)
    const gameList = []
    games.forEach(game => {
        let gameInfo = db('game')
        .where('game_id', game.game)
        .first()

        gameList.push(gameInfo)
    })
    res.status(200).json({"gameList": games, "gameInfo": gameList})
})