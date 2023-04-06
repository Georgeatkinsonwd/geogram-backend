import mongoose from 'mongoose'


const PostSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
    },
    imgUrl : {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: false,
    },
    likes: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const PostModel = mongoose.model("Posts", PostSchema)