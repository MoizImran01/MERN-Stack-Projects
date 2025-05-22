import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router();
// Image Storage Engine

const storage = multer.diskStorage({
    destination: "uploads", // destination specifies where the images would be stored
    filename:(req,file,cb)=>{
    return cb(null, `${Date.now()}${file.originalname}`) // here whenever we will upload an image, the file name would be unique because this method attaches unique timestamp to each new image that will be uploaded
}})

const upload = multer({storage:storage})


foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)


export default foodRouter;