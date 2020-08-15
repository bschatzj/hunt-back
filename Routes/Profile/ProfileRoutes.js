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

    res.status(200).json({ "gameList": games })
})

router.get('/profile/:id', async (req, res) => {
    const id = req.params.id
    const user = await db('users')
        .where('user_id', id)
        .first()

    res.status(200).json({profile: user})
})

router.put('/update/:id', async (req, res) => {
    const id = req.params
    console.log(req.body)
    await db('users')
    .where('user_id', id)
    .first()
    .update(req.body)
    .then(res.status(200).json("update complete"))
    .catch(err => {res.status(500).json(err)})
})