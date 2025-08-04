import mongoose from "mongoose";
import { hashValue } from "../utils/hashValue.js";

const adminSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true
    },

    email:{
        type:String,
        trim:true
    },

    password:{
        type:String,
        trime:true
    },
    image:{
      type:String,
    },

    userType:{
     type: String,
      enum: ["Admin","SubAdmin"],
      default: "Admin",
      trim: true,
    }
},{timestamps:true});

const Admin = mongoose.model("Admin",adminSchema);

export default Admin;



const createDefaultAdmin = async () => {
  const password = "admin1234";

  const existingAdmin = await Admin.findOne({ email: "admin@spirants.com" });

  if (!existingAdmin) {
    const hashedPassword = await hashValue(password);

    await Admin.create({
      name: "Spirants",
      email: "admin@spirants.com",
      password: hashedPassword,
      userType: "Admin",
    });

    console.log("Default admin created successfully");
  } else {
    console.log("Default admin already exists");
  }
};

export {createDefaultAdmin};

