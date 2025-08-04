import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
	 index:{
      type:Number
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
    disable:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

const OurService = mongoose.model("OurService", serviceSchema);

export default OurService;