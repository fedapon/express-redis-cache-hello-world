import express from 'express'
import ioredis from 'ioredis'

const app = express()

process.env.PORT = '80'

app.get('/', function(req, res) {
    res.json({message: "hello"})
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})