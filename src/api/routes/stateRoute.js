import express from "express";
import { createState, deleteState, getStateByFilter, getStateById, updateState } from "../controllers/stateController.js";
import { upload } from "../middlewares/multerS3.js";


const router = express.Router();

router.post("/admin/createState", upload.single("image"),createState);
router.put("/admin/updateState", upload.single("image"), updateState);
router.delete("/admin/deleteState", deleteState);
router.get("/admin/getStateById", getStateById);
router.get("/users/getStateByFilter",getStateByFilter);
router.get("/admin/getStateByFilter",getStateByFilter);


export default router;