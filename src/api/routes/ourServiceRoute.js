import express from "express";
import { createService, getAllServices, getServiceById, updateService, disableOurService } from "../controllers/ourServiceController.js";
import { upload } from "../middlewares/multerS3.js";

const router = express.Router();

router.post("/createOurService",upload.single("image"), createService);
router.get("/getAllOurServices", getAllServices);
router.get("/getOurServiceById", getServiceById);
router.put("/updateOurService",upload.single("image"), updateService);
router.put("/disableOurService", disableOurService);




export default router;