import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    collegeName: {
      type: String,
      trime: true,
    },

    title: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    establishedYear: {
      type: Number,
    },
    medium: {
      type: String,
      trim: true,
    },
    whatsappNumber: {
      type: Number,
      trim: true,
    },
	  disable:{
      type:Boolean,
      default:false
    },

    mobileNumber: {
      type: Number,
      trim: true,
    },
    aboutUs: {
      type: String,
      trim: true,
    },
    image: [
      {
        type: String,
      },
    ],
    quickOverView: [],

    feeStructure: [
      {
        year: String,
        tuitionFee: String,
        hostelFee: String,
        totalCost: String,
      },
    ],

    whyChooseThisUniversity: {
      type: String,
      trim: true,
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
	slug: {
    type: String,
    
  },
  },
  { timestamps: true }
);

const College = mongoose.model("College", collegeSchema);

export default College;
