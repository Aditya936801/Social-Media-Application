import express from "express"
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"


const usersRoutes = express.Router();

/* Read */
usersRoutes.get("/:id",verifyToken,getUser)
usersRoutes.get("/:id/friends", verifyToken,getUserFriends)

/* Update */
usersRoutes.patch("/:id/:friendId", verifyToken , addRemoveFriend)

export default usersRoutes
