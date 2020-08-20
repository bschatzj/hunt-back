const router = require('express-promise-router')(),
    { NewGame } = require('./Helpers');
const { authenticate } = require('../Auth/Token');
const db = require('../../data/db');



module.exports = router

router.post('/newgame', async (req, res) => {
    await db('game').insert({
        game_title: req.body.title,
        password: req.body.password,
        private: req.body.private
    })
        .then(info => {
            res.status(200).json({ message: "Game was made successfully!", title: req.body.title })
        })
        .catch(err => {
            res.status(500).json(err)
        })

})

router.post('/newtask/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.body)
    await db('tasks').insert({
        game_id: id,
        title: req.body.title,
        description: req.body.description
    })

    res.status(200).json( 'task added!' )
})

router.get('/alltasks/:id', async (req, res) => {
    const { id } = req.params
    const allTasks = await db('tasks')
        .where('game_id', id)

    res.status(200).json({ tasks: allTasks })
})

router.post('/joingame', async (req, res) => {

    console.log(req.body)
    db('list').insert({
        game: req.body.game,
        user: req.body.user,
        display_name: req.body.name
    })
        .then(info => { res.status(200).json({ info }) })
        .catch(err => { res.status(500).json(err) })
})

router.get('/game/:name', async (req, res) => {
    const { name } = req.params
    console.log(name)
    const GameInfo = await db('game')
        .where('game_title', name)
        .first()

    const Players = await db('list')
        .where('game', name)
    

    res.status(201).json({ gameInfo: GameInfo, Players: Players})
})

router.post('/submit/:id', async (req, res) => {
    const { id } = req.params

    db('submissions').insert({
        task: id,
        user: req.body.user,
        photo: req.body.photo,
        description: req.body.description,
        title: req.body.title
    })

    const submissions = db('submissions')
        .where(task, id)

    res.status(200).json(submissions)
})

router.get('/subs/:id', (req, res) => {
    const { task } = req.params

    const posts = db('submissions')
        .where('task', task)

    res.status(200).json({ posts: posts })
})

router.get('/games/all', async (req, res) => {
    games = await db('game')
    .where('private', false)

    res.status(200).json({'games': games})
})


router.get('/task/:id', async (req, res) => {
    const {id} = req.params
    const task = await db('tasks')
    .where('task_id', id)
    .first()

    res.status(200).json({'task': task})
})


router.use((err, req, res, next) =>
    res.status(500).json({
        message: 'Uh Oh! 500 Error!',
        error: err.message.replace(/\\/g, ''),
    })
)
