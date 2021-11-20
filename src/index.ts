import express from "express"
import dotenv from "dotenv"
import ioredis from "ioredis"
import axios from "axios"

dotenv.config()
const app = express()
const redisClient = new ioredis(6379, "192.168.1.110")

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/:endpoint", async function (req, res) {
    try {
        console.log(req.params.endpoint)
        console.time("t1")

        const reply = await redisClient.get(req.params.endpoint)
        if (reply) {
            console.timeEnd("t1")
            return res.json({
                message: "from redis cache",
                data: reply,
            })
        }

        const response = await axios.get("http://" + req.params.endpoint)
        redisClient.set(req.params.endpoint, response.data, "ex", 3600)
        console.timeEnd("t1")
        return res.json({
            message: "from " + req.params.endpoint,
            data: response.data,
        })
        
    } catch (error) {
        console.log(error)
        return error
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
