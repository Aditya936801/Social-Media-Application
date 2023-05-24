import express from "express"
import cors from "cors"
import multer from "multer"
import dotenv from "dotenv"
import helmet from "helmet"
import mongoose, { Mongoose } from "mongoose"
import morgan  from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import {register} from "./controllers/auth.js"
import {createPost} from "./controllers/posts.js"
import { verifyToken } from "./middleware/auth.js"

/* Configuration */ 
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use("/assets",express.static(path.join(__dirname,"public/assets")))

/* Storage */

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"public/assets")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)

    }
})

const upload = multer({storage})

/* Routes */
app.post("/auth/register",upload.single("picture"),register)
app.post("/posts",verifyToken,upload.single("picture"),createPost)

app.use("/auth",authRoutes)
app.use("/users",userRoutes)
app.use("/posts",postRoutes)

/* Moongose */
const PORT = process.env.PORT || 3001
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>{console.log(`Server Port : ${PORT}`)})
}).catch((err)=>console.log(err))