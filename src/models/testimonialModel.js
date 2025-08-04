import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
    },
    countryId:{
      type: mongoose.Schema.Types.ObjectId,
       ref:"Country"
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String, 
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
	  
   disable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;