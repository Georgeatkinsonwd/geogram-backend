import express from 'express'
import mongoose from 'mongoose'
import {PostModel} from '../models/Posts.js'
import {UserModel} from '../models/Users.js'
import {verifyToken} from './users.js'

const router = express.Router()

router.get('/', async(req,res) => {
    try {
        const response = await PostModel.find({})
        res.json(response)


    } catch (error) {
        res.json(error)
    }
})

router.post('/', verifyToken, async(req,res) => {
    const post = new PostModel(req.body)

    try {
        const response = await post.save()
        res.json(response)


    } catch (error) {
        res.json(error)
    }
})

router.put('/', async(req,res) => {
   

    try {
        const post = await PostModel.findById(req.body.postID)
        const user = await UserModel.findById(req.body.userID)
        user.likedPosts.push(post)
        await user.save()
        res.json({likedPosts : user.likedPosts})


    } catch (error) {
        res.json(error)
    }
})


router.get('/likedPosts/ids/userID', async(req,res)=>{
    try {
        const user = await UserModel.findById(req.body.userID)
        res.json({likedPosts: user?.likedPosts})
    } catch (error) {
        res.json(error)
    }
})

router.get('/userPosts/:id', verifyToken, async(req,res)=>{
    try {
        const posts = await PostModel.find({ user: req.params.id }).lean();
        res.json(posts);
    
    } catch (error) {
        res.json(error)
    }
})





export {router as postsRouter}