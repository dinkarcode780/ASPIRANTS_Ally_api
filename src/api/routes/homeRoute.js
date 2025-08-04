import express from "express";
import { getHomePage, updateHomePage } from "../controllers/homeController.js";
import { upload } from "../middlewares/multerS3.js";
const router = express.Router();

// for User 
router.get("/user/getHomePage", getHomePage);

// for Admin
router.get("/admin/getHomePage", getHomePage);

// dynamic change
// router.put(
//   "/admin/updateHomePage",
//   upload.any(), 
//   updateHomePage
// );



router.put("/admin/updateHomePage",upload.fields([{name:"image"}, {name:"bottomImage"}, { name: "scoreBooster[0].image", maxCount: 1 },
  { name: "scoreBooster[1].image",maxCount: 1 },
  { name: "scoreBooster[2].image",maxCount: 1 },
 { name: "homeBanner[image]",maxCount: 1 } ,]), updateHomePage);

 

export default router;