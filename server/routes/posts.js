import express from "express"
import {
    getFeedPosts,
    getUsersPosts,
    likePost,
} from "../controllers/posts.js"
import {verifyToken} from "../middleware/auth.js"

const postsRoutes = express.Router()

postsRoutes.get("/",getFeedPosts)
postsRoutes.get("/:userId/posts", verifyToken ,getUsersPosts)

postsRoutes.patch("/:id/like",verifyToken,likePost)

export default postsRoutes