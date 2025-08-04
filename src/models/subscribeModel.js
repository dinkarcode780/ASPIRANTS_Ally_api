import mongoose from "mongoose";

const subscribeModel = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
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

const Subscribe = mongoose.model("Subscribe",subscribeModel);

export default Subscribe;