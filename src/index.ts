import express from "express"
import path from 'path'
import dotenv from "dotenv"
import ioredis from "ioredis"
import axios, { AxiosError } from "axios"

dotenv.config()
const app = express()
const redisClient = new ioredis(6379, "redis")

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', express.static( path.resolve('./src/public') ))

app.get("/character", async function (req, res) {
    try {
        console.time("t1")
        const response = await cacheService('https://rickandmortyapi.com/api/character')
        console.log(`Successfully get url ${response.message}`)
        console.timeEnd("t1")
        return res.json(response)

    } catch ( error ) {
        const err = error as AxiosError
        console.log(err.message)
        console.timeEnd("t1")
        return res.json({
            message: err.message,
            data: {},
        })
    }
})

app.get("/location", async function (req, res) {
    try {
        console.time("t1")
        const response = await cacheService('https://rickandmortyapi.com/api/location')
        console.log(`Successfully get url ${response.message}`)
        console.timeEnd("t1")
        return res.json(response)

    } catch ( error ) {
        const err = error as AxiosError
        console.log(err.message)
        console.timeEnd("t1")
        return res.json({
            message: err.message,
            data: {},
        })
    }
})

app.get("/episode", async function (req, res) {
    try {
        console.time("t1")
        const response = await cacheService('https://rickandmortyapi.com/api/episode')
        console.log(`Successfully get url ${response.message}`)
        console.timeEnd("t1")
        return res.json(response)

    } catch ( error ) {
        const err = error as AxiosError
        console.log(err.message)
        console.timeEnd("t1")
        return res.json({
            message: err.message,
            data: {},
        })
    }
})

async function cacheService(url: string) {
    try {
        const reply = await redisClient.get(url)
        if (reply) {
            return {
                message: "from redis cache",
                data: JSON.parse(reply),
            }
        }
        const response = await axios.get(url)
        redisClient.set(url, JSON.stringify(response.data), "ex", 3600)
        return {
            message: "from website",
            data: response.data,
        }
    } catch (error) {
        throw error
    }
}

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
