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




router.get('/userPosts/:id', verifyToken, async(req,res)=>{
    try {
        const posts = await PostModel.find({ user: req.params.id }).lean();
        res.json(posts);
    
    } catch (error) {
        res.json(error)
    }
})


router.delete('/deletePost/:id', verifyToken, async(req,res)=>{
    try {
        await PostModel.findByIdAndDelete({_id:req.params.id},req.body)
        console.log('Post deleted')
        res.json('Post deleted')
    } catch (error) {
        res.json(error)
    }
})


router.put('/increaseLike/:id', verifyToken, async(req,res)=>{
    const post = await PostModel.findByIdAndUpdate({_id:req.params.id},req.body)
    try {
        const update = await PostModel.findOne({_id:req.params.id})
        console.log('post liked')
        res.json(update)
    } catch (error) {
        res.json(error)
    }
})

router.put('/decreaseLike/:id', verifyToken, async(req,res)=>{
    const post = await PostModel.findByIdAndUpdate({_id:req.params.id},req.body)
    try {
        const update = await PostModel.findOne({_id:req.params.id})
        console.log('liked removed')
        res.json(update)
    } catch (error) {
        res.json(error)
    }
})





export {router as postsRouter}