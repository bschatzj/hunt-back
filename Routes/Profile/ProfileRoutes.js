const router = require('express-promise-router')(),
    db = require('../../data/db');
const { authenticate } = require('../Auth/Token');
const {update} = require('./helpers')



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

router.put('/update/:id', (req, res) => {
    const id = req.params
    const newInfo = req.body
    update(id, newInfo)

    res.status(200)
})


router.post('/profiles', async (req, res) => {
    const ids = req.body.ids
    console.log(ids)
    const users = await db('users')
        .where ('user_id', ids)

    console.log(users)
    res.status(200).json({profile: users})
})