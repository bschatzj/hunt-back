const router = require('express-promise-router')(),
    { NewGame } = require('./Helpers');
db = require('../../data/db');
const {authenticate} = require('../Auth/Token');





module.exports = router

router.post('/newgame', async (req, res) => {
    await db('game').insert({
        game_title: req.body.title,
        password: req.body.password,
        private: req.body.private
    })
    .then(info => {
        res.status(200).json({message:"Game was made successfully!", title: req.body.title})
    })
    .catch(err => {
        res.status(500).json(err)
    })
    
})

router.post('/newtask/:id', async (req, res) => {
    const { id } = req.params
    await db('tasks').insert({
        game_id: id,
        title: req.body.title,
        description: req.body.description
    })
    const allTasks = await db('tasks')
        .where('game_id', id)

    res.status(200).json({ tasks: allTasks })
})

router.get('/alltasks/:id', async (req, res) => {
    const { id } = req.params
    const allTasks = await db('tasks')
        .where('game_id', id)

    res.status(200).json({ tasks: allTasks })
})

router.post('/joingame/:game', (req, res) => {
    const {name} = req.params
    const game = db('game')
    .where('game_title', name)
    .first()

    db('list').insert({
        game: game.game_id,
        user: req.body.user,
        display_name: req.body.name
    })

    res.status(200).json({game})
})

router.get('/game/:id', async (req, res) => {
    const {id} = req.params
    const GameInfo = await db('game')
        .where('game_id', id)
        .first()

    const Players = await db('list')
        .where('game', id)


    const allTasks = await db('tasks')
        .where('game_id', id)

    res.status(201).json({ gameInfo: GameInfo, Players: Players, tasks: allTasks})
})

router.post('/submit/:id', async (req, res) => {
   const {id} = req.params

   db('submissions').insert({
       task: id,
       user: req.body.user,
       photo: req.body.photo,
       description: req.body.description,
       title: req.body.title
   })

   const submissions = db('submissions')
   .where(task, id)

   res.status(200).json( submissions)
})

router.get('/subs/:id', (req, res) => {
    const {task} = req.params

    const posts = db('submissions')
    .where('task', task)

    res.status(200).json({posts: posts})
})



router.use((err, req, res, next) =>
    res.status(500).json({
        message: 'Uh Oh! 500 Error!',
        error: err.message.replace(/\\/g, ''),
    })
)
