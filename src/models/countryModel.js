import mongoose from "mongoose"

const countrySchema = new  mongoose.Schema({
    name:{
        type:String,
        trime:true
    },

    image:{
        type:String,
    },
	
	  pdfDownloadLink:{
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
	 disable:{
        type:Boolean,
        default:false
    },
	
	slug: {
    type: String,
    
  },
},{timestamps:true});

const Country = mongoose.model("Country",countrySchema);

export default Country;