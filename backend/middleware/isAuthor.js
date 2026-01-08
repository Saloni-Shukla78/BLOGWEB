const { Post }= require('../models/post.js')

const isAuthor=async(req,res,next)=>{
    const post = await Post.findById(req.params.id);
    if(!post){
        return res.status(404).json({
            message:'Post not found.',
        })
    }
    if(post.author.toString() !== req.user.id){
        return res.status(403).json({
            message:'You are not author of post.'
        })
    }
    next();

}

module.exports = isAuthor;