import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {UserModel} from '../models/Users.js'
const router = express.Router()


router.get('/getUsername/:id', async(req,res)=>{
    const user = await UserModel.findById({ _id: req.params.id });
    
    try{
        res.json(user.username)
    }
    catch(error){
        console.log(error)
    }
    
})




router.get('/getUsers', async(req,res)=>{
    const users = await UserModel.find({})
    try{
        res.json(users)
    }
    catch(error){
        console.log(error)
    }
    
})


router.post('/register', async (req,res) => {
    const {username, password} = req.body

    const user = await UserModel.findOne({username}) 
  
    if (user) {
        return res.json({message: 'User already exists, please choose a different name'})
    }


    else if(!user){
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({username, password: hashedPassword})
    await newUser.save()

    res.json({message: 'Registration complete, please log in'})
    }

    

})

router.post('/login', async(req,res) => {
    const {username, password} = req.body

    const user = await UserModel.findOne({username})

    if(!user){
        return res.json({message: 'User does not exist'})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.json({message: 'invalid credentials'})
    }

    const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: '2d'})
    res.json({token, userID: user._id})

})

export {router as userRouter}


export const verifyToken = (req,res,next) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, process.env.SECRET, (err)=>{
            if (err) return res.sendStatus(403);
            next()
        })
    } else {
        res.sendStatus(401)
    }
}