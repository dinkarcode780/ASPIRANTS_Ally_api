import express from "express";
import { createWarning, deleteWarning, getWarningByFilter, getWarningById, updateWarning } from "../controllers/warningController.js";

const router = express.Router();

router.post("/admin/createWarning",createWarning);

router.put("/admin/updateWarning",updateWarning);

router.get("/admin/getWarningById",getWarningById);
router.get("/users/getWarningById",getWarningById);

router.get("/admin/getWarningByFilter",getWarningByFilter);
router.get("/users/getWarningByFilter",getWarningByFilter);

router.delete("/admin/deleteWarning",deleteWarning);




export default router;