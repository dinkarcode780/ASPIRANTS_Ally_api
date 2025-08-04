import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    logo: {
      type: String,
      trim: true,
    },
	footerIcon:{
      type: String,
      trim: true,
    },
    aboutUs: {
      type: String,
      trim: true,
    },
    privacyPolicy: {
      type: String,
      trim: true,
    },
    termsAndConditions: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    whatsappNumber: {
      type: Number,
      default: null,
    },
    number: {
      type: Number,
      default: null,
    },
    email: {
      type: String,
      trim: true,
    },
    contactUsDescription: {
      type: String,
      trim: true,
    },
	   instagramUrl: {
      type: String,
      trim: true,
    },
    facebookUrl: {
      type: String,
      trim: true,
    },
    twitterUrl: {
      type: String,
      trim: true,
    },
    youtubeUrl: {
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
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);
export default Company;

const defaultCompany = async () => {
  const existingCompany = await Company.findOne();
  if (!existingCompany) {
    await Company.create({
      name: "SPIRANT'S ALLY",
      logo: "https://leadkart.in-maa-1.linodeobjects.com/ATTACH_IMAGE/IMAGE/1748591615549_cb6391475579bde22aedc732f293cff604f2670a.png",
      aboutUs: "This is e-learning plateform",
      privacyPolicy: "This is default privacy policy",
      termsAndConditions: "This is default terms and condition",
      address: "Archana Tower Sector C, Indrapuri, Bhopal",
      whatsappNumber: 1234567890,
      number: 1234567890,
      email: "spirants@gmail.com",
      contactUsDescription: "This is default contact us description",
	  instagramUrl: "https://instagram.com/spirantsally",
      facebookUrl: "https://facebook.com/spirantsally",
      twitterUrl: "https://twitter.com/spirantsally",
      youtubeUrl: "https://youtube.com/spirantsally",	
    });
    console.log("Default Company data created.");
  } else {
    console.log("Company data already exists.");
  }
};

export { defaultCompany };
