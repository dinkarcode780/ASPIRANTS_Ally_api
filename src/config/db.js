import mongoose from "mongoose";
import { defaultHome } from "../models/homeModel.js";
import { defaultCompany } from "../models/CompanyModel.js";
import { createDefaultAdmin } from "../models/adminModel.js";
import { createDefaultAnnouncement } from "../models/announceMentModel.js";
import { createDefaultAbout } from "../models/aboutModel.js";




const databaseConnection = async () => {
  const DB_URL = process.env.DB_URL;

  await mongoose
    .connect(DB_URL)
    .then(async () => {
      console.log("Database Connected!");
      defaultHome();
      defaultCompany();
	  createDefaultAdmin();
	  createDefaultAnnouncement();
    createDefaultAbout();
    })
    .catch((error) => console.log(error.message));
};

export default databaseConnection;