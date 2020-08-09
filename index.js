const express = require("express");
const helmet = require('helmet');
const cors = require('cors');
const apiRouter = require('./Routes/api-router')
const app = express();

app.use(express.json());
app.use(helmet())
app.use(cors())


app.get('/', (req, res) => {
    res.status(200).json({ Server: 'Running' })
})

app.use('/api', apiRouter)

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
