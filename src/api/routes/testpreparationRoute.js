import express from "express";
import { createTestPreparation, deteleteTestPreparation, getTestPreparationById,  getTestPreprationByFilter, updateTestPreparation } from "../controllers/testpreparationController.js";
import { upload } from "../middlewares/multerS3.js";

const router = express.Router();

router.post("/admin/createTestPreparation",upload.single("testIcon"),createTestPreparation);

router.put("/admin/updateTestPreparation",upload.single("testIcon"),updateTestPreparation);

router.get("/admin/getTestPreparationById",getTestPreparationById);
router.get("/admin/getTestPreprationByFilter",getTestPreprationByFilter);

router.delete("/admin/deteleteTestPreparation",deteleteTestPreparation);


router.get("/users/getTestPreprationByFilter",getTestPreprationByFilter);
router.get("/users/getTestPreparationById",getTestPreparationById);



export default router;