import express from "express";
import { createWabinar, deleteWabinar, getWabinarById, getWabinarsByFilter, updateWabinar } from "../controllers/webinarController.js";
import { upload } from "../middlewares/multerS3.js";


const router = express.Router();

router.post("/admin/createWabinar",upload.single("thumbnail"),createWabinar);
router.put("/admin/updateWabinar",upload.single("thumbnail"),updateWabinar);
router.delete("/admin/deleteWabinar", deleteWabinar);
router.get("/admin/getWabinarById", getWabinarById);
router.get("/users/getWabinarsByFilter", getWabinarsByFilter);
router.get("/admin/getWabinarsByFilter", getWabinarsByFilter);



export default router;