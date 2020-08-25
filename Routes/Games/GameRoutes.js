const router = require('express-promise-router')(),
    { NewGame } = require('./Helpers');
const { authenticate } = require('../Auth/Token');
const db = require('../../data/db');



module.exports = router

router.post('/newgame', authenticate, async (req, res) => {
    console.log(req.body)
    await db('game').insert({
        game_title: req.body.title,
        password: req.body.password,
        private: req.body.private,
        end_date: req.body.end_date
    })
        .then(info => {
            res.status(200).json({ message: "Game was made successfully!", title: req.body.title })
        })
        .catch(err => {
            res.status(500).json(err)
        })

})

router.post('/newtask/:id', authenticate, async (req, res) => {
    const { id } = req.params
    console.log(req.body)
    await db('tasks').insert({
        game_id: id,
        title: req.body.title,
        description: req.body.description
    })

    res.status(200).json( 'task added!' )
})

router.get('/alltasks/:id', authenticate, async (req, res) => {
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

router.get('/game/:name',authenticate, async (req, res) => {
    const { name } = req.params
    console.log(name)
    const GameInfo = await db('game')
        .where('game_title', name)
        .first()

    const Players = await db('list')
        .where('game', name)
    
    const subs = await db('submissions')
        .where('game', name)
    

    res.status(201).json({ gameInfo: GameInfo, Players: Players, Subs: subs})
})

router.post('/submit/:id', authenticate, async (req, res) => {
    const { id } = req.params
    console.log(req.body)

    await db('submissions')
        .insert({
        task: parseInt(id),
        user: parseInt(req.body.user),
        photo: req.body.photo,
        description: req.body.description,
        title: req.body.title,
        game: req.body.game
    })

    res.status(200).json('success')
})

router.get('/subs/:id',authenticate, async (req, res) => {
    const { id } = req.params
    console.log( id )
    const posts = await db('submissions')
        .where('task', id)

    const votes = await db('votes')
        .where('task', id)
    
    console.log(posts)
    res.status(200).json({ posts, votes})
})

router.get('/games/all', authenticate, async (req, res) => {
    games = await db('game')
    .where('private', false)

    res.status(200).json({'games': games})
})


router.post('/task/:id', authenticate, async (req, res) => {
    const {id} = req.params
    const game = req.body.game
    const task = await db('tasks')
    .where('task_id', id)
    .first()

    const votes = await db ('votes')
    .where('task',id)
 
    const users = await db ('list')
    .where('game', game)
    res.status(200).json({'task': task, 'users': users, 'votes':votes })
})

router.get('/gamesubs/:title', authenticate, async (req, res) => {
    const {title} = req.params

    const subs = await db('submissions')
    .where(game, title)

    res.status(200).json(subs)
})

router.post('/vote/:id', async (req, res ) => {
    const {id} = req.params

    await db('votes')
    .insert({
        'user': parseInt(req.body.id),
        'task': parseInt(id)
    })
    res.status(200).json('Vote Cast')
})


router.use((err, req, res, next) =>
    res.status(500).json({
        message: 'Uh Oh! 500 Error!',
        error: err.message.replace(/\\/g, ''),
    })
)
