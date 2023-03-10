import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
// above 2 used to set path

import authRoutes from "./routes/auth.js";
//the above will be route path all the feature

import userRoutes from "./routes/users.js";

import postRoutes from "./routes/posts.js;"

import {register} from "./controllers/auth.js";

import {createPost} from "./controllers/posts.js"

import { verifyToken } from "./middleware/auth.js";

import User from "./modles/User.js";
import Post from "./modles/Post.js";
import { users, posts } from "./data/index.js";


// CONFIGURATION

// middle ware function or package

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// above will invoke the cross origine policy
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
// above will set the directry the images will store locally

// file storage
// the below code from multer github
// to save file when someone upload file on the website
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });


/* ROUTES WITH FILES */
app.post("/auth/register",upload.single("picture"),register);
// upload.single is the middle ware and register is a controller
app.post("/posts",verifyToken ,upload.single("picture"),createPost)

//ROUTES WITH FILES 
// app.post("/auth",authRoutes); // help to set up to route and keep organised the files



//ROUTES
app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/posts",postRoutes);



// mongoose setup
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port:${PORT}`));
    //ADD DATA ONE TIME when you need to add data in db uncomment and run it the comment it 
    // User.insertMany(users);
    // Post.insertMany(posts);

  })
  .catch((error) => console.log(`${error} did not connect`));
