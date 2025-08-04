import express from "express";
import { adminLogin, updateAdminProfile,getAdmin } from "../controllers/adminController.js";
import { upload } from "../middlewares/multerS3.js";
// import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/admin/adminLogin",adminLogin);

router.put("/admin/updateAdminProfile",upload.single("image"),updateAdminProfile);

router.get("/admin/getAdmin",getAdmin);


export default router;