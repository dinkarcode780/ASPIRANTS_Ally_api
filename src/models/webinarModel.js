import mongoose from "mongoose";

const wabinarSchhema = new mongoose.Schema({
    videoUrl:{
        type:String,
    },
	 thumbnail:{
        type:String
    },
	   metaTitle: {
    type: String,
    trim: true,
  },
  metaDescription: {
    type: String,
    trim: true,
  },
  metaKey: {
    type: [String],
    default: [],
  },
},{timestamps:true});

const Wabinar = mongoose.model("Wabinar",wabinarSchhema);

export default Wabinar;