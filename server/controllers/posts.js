import Post from "../modles/Post.js";
import User from "../modles/User.js";

//CREATE
//the below function in index.js
export const createPost =async (req,res)=>{
    try{
        const {userId,description,picturePath}= req.body;
        const user = await User.findById(userId);
        const newPost = new Post ({
            userId,
            firstNmae: user.firstNmae,
            lastName: user.lastName,
            location : user.location,
            description,
            userPicturePath : user.picturePath,
            picturePath,
            likes:{},
            Comment:[]
        })
        await newPost.save();

        const post = await Post.find();
        
        res.status(201).json(post);

    }catch(err){
        res.status(409).json({message:err.message})
    }
}