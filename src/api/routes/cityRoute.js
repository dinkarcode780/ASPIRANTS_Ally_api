import express from "express";
import { createCity, deleteCity, getCityByFilter, getCityById, updateCity } from "../controllers/cityController.js";
import { upload } from "../middlewares/multerS3.js";

const router = express.Router();

router.post("/admin/createCity", upload.single("image"), createCity);
router.put("/admin/updateCity", upload.single("image"), updateCity);
router.get("/user/getCityByid",getCityById);
router.delete("/admin/deleteCity", deleteCity);
router.get("/users/getCitybyFilter",getCityByFilter);


export default router;