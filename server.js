import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import {userRouter} from './routes/users.js'
import {postsRouter} from './routes/posts.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use("/auth", userRouter)
app.use("/posts", postsRouter)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })