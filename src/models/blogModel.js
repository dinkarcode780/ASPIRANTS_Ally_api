import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
    },
	slug: {
    type: String,
    
  },

    description:{
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

    image:{
        type:String,
    }
},{timestamps:true});

const Blog = mongoose.model("Blog",blogSchema);

export default Blog;