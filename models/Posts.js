import mongoose from 'mongoose'


const PostSchema = new mongoose.Schema({
    imgUrl : {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: false,
    },
    likedBy: 
        [{type: mongoose.Schema.Types.ObjectId, ref: "likedBy"}], 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const PostModel = mongoose.model("Posts", PostSchema)