import express from "express";
import { getAllContact, createContact, getByIdContact } from "../controllers/contactUsController.js";
const router = express.Router();

router.get("/users/getAllContact", getAllContact);
router.post("/users/createContact", createContact);
router.get("/users/getByIdContact", getByIdContact);

export default router;