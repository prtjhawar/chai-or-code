import { Router } from "express";
import { registerUser} from "../conrollers/user.controller.js";
import {upload} from "../middlewares/multer.middlewares.js"

const router = Router()

// router.post("/register",uploadFields,registerUser)
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    )

// .route("/register").post(
//     upload.fields(
//         [
//             {
//                 name:"avatar",
//                 maxCount: 1
//             },
//             {
//                 name:"coverImage",
//                 maxCount: 1
//             }
//         ]
//     ),
//     registerUser
// )


export default router ;