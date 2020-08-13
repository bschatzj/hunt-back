const router = require('express-promise-router')(),
    { NewGame } = require('./Helpers');
db = require('../../data/db');
const { authenticate } = require('../Auth/Token');





module.exports = router

router.post('/newgame', async (req, res) => {
    return db('game').insert(req.body)
    .then(id => {
      console.log(id)
      return db('game').where('game_id', id)
        .first()
    })
    .then(info => {
        res.status(200).json(info)
    })
    .catch(err => {
        res.status(500).json(err)
    })
    
    // const GameInfo = await db('game')
    //     .where('game_title', req.body.title)
    //     .first()
    //     .then()  
    //     await db('list').insert({
    //         display_name: req.body.name,
    //         user: req.body.id,
    //         game: gameInfo.game_id,
    //     })

    // const Players = await db('list')
    //     .where('game', GameInfo.game_id)
    //res.status(200).json({ message: `Game ${req.body.title} was succesfully created`, gameInfo: GameInfo})
})

router.post('/newtask/:id', authenticate, async (req, res) => {
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

router.get('/alltasks/:id', authenticate, async (req, res) => {
    const { id } = req.params
    const allTasks = await db('tasks')
        .where('game_id', id)

    res.status(200).json({ tasks: allTasks })
})

router.post('/joingame/:game', authenticate, (req, res) => {
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

router.get('/game/:id', authenticate, async (req, res) => {
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

router.post('/submit/:id', authenticate, async (req, res) => {
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

router.get('/subs/:id', authenticate, (req, res) => {
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
