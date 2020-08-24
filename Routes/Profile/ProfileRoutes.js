const router = require('express-promise-router')(),
    db = require('../../data/db');
const { authenticate } = require('../Auth/Token');
const {update} = require('./helpers')



module.exports = router



router.get('/games/:id', authenticate, async (req, res) => {
    const id = req.params.id
    console.log(id)
    const games = await db('list')
        .where('user', id)
    console.log(games)

    res.status(200).json({ "gameList": games })
})

router.get('/profile/:id', authenticate, async (req, res) => {
    const id = req.params.id
    const user = await db('users')
        .where('user_id', id)
        .first()

    res.status(200).json({profile: user})
})

router.put('/update/:id', authenticate, (req, res) => {
    const id = req.params
    const newInfo = req.body
    update(id, newInfo)

    res.status(200)
})

