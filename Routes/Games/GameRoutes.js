const router = require('express-promise-router');
const { NewGame } = require('./Helpers');

module.exports = router

router.post('/newgame', (req, res) => {
    NewGame(req.body)

    res.status(200).json({ message: `Game ${req.body.title} was succesfully created` })

})
router.use((err, req, res, next) =>
    res.status(500).json({
        message: 'Game Failed',
        error: err.message.replace(/\\/g, ''),
    })
)