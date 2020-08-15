const router = require('express-promise-router')(),
    db = require('../../data/db');
const { authenticate } = require('../Auth/Token');
import {update} from './helpers'
import { up } from '../../data/migrations/02_users';


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
    const newInfo = req.body
    update(id, newInfo)
    .then(res => res.status(200).json(res))
    .catch(err => res.status(500).json(err))
})