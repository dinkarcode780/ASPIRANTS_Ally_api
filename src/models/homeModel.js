import mongoose from "mongoose";

const  homeSchema = new mongoose.Schema({
    image:[
        {
         type:String,
        trim:true
        },
    ],
    title:{
        type:String,
        trim:true,
    },
    subTitle:{
        type:String,
        trim:true
    },
    homeCounts:[
        {
            title:String,
            count:String
        },
    ],
    topCountries:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Country"
        },
    ],
    topColleges:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"College"
        }
    ],
    bottomImage:[
        {
            type:String,
            trim:true
        }
    ],
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
googleReview: {
  rating: {
    type: String,
    default: "4.6",
  },
  outOf: {
    type: String,
    default: "5",
  },
  totalReviews: {
    type: String,
    default: "120",
  },
},
	
	
	jdReview: {
  rating: {
    type: String,
    default: "5",
  },
  outOf: {
    type: String,
    default: "5",
  },
  totalReviews: {
    type: String,
    default: "24",
  },
},

ISODes:{
  type:String,
  trim:true,
  default:"ISO CERTIFIED ORGANIZATION ISO 9001:2015"
},
	
scoreBooster:[
 {
  title: {
    type: String,
    trim:true,
  
  },
  description: {
    type: String,
    trim:true,
  },
  image: {
    type: String,
   
  },
  slug:{
    type:String
  }
 }

]	
	
}, {timestamps:true}
);

const Home = mongoose.model("Home", homeSchema);
export default Home;


const defaultHome = async () => {
    const existingHome = await Home.findOne();
    if (!existingHome) {
      await Home.create({
        image: [
          "https://leadkart.in-maa-1.linodeobjects.com/ATTACH_IMAGE/IMAGE/1748590732523_f3dfe294220318eacff936d0791f53fae9c6f3f7.png",
          "https://leadkart.in-maa-1.linodeobjects.com/ATTACH_IMAGE/IMAGE/1748590785285_a8544360f7ce08d6c3b0772d276d3c7efc0061a9.png",
          "https://leadkart.in-maa-1.linodeobjects.com/ATTACH_IMAGE/IMAGE/1748590829744_09528d35effe6a9feae7959be1f4ca9c509cc979.png",
          "https://leadkart.in-maa-1.linodeobjects.com/ATTACH_IMAGE/IMAGE/1748590862885_26ce267cd3f689cf78156f8ea39ac129b2ab20a5.png"
        ],
        title: "Complete Handholding for NEET Counselling Guidance",
        subTitle: "23,33,863 students in India aspire to study MBBS and BDS & AYUSH. Only 8.3% could achieve it in 2024.",
        homeCounts: [
          { title: "Seminars & Webinars", count: "1000+" },
          { title: "Admissions", count: "500k+" },
          { title: "Counselling Sessions", count: "120k+" },
          { title: "Successful Clients", count: "45k+" },
        ],
        topCountries: [
           
        ],
        topColleges: [

        ],
        bottomImage: [
          "https://leadkart.in-maa-1.linodeobjects.com/ATTACH_IMAGE/IMAGE/1748590940467_9d2c252026e179b5d2b936168e13cc716b204670.png",
          "https://leadkart.in-maa-1.linodeobjects.com/ATTACH_IMAGE/IMAGE/1748590990899_dee4ab0a23d8e16dbcdf0b0b5d64492fb7247db4.png",
          "https://leadkart.in-maa-1.linodeobjects.com/ATTACH_IMAGE/IMAGE/1748591037692_9b2c4a5fdf2138da424589ecc2b39d06013d3621.png",
          "https://leadkart.in-maa-1.linodeobjects.com/ATTACH_IMAGE/IMAGE/1748591075472_1cf639002fdca68179a66a65eb41b2568e334eac.png",
          "https://leadkart.in-maa-1.linodeobjects.com/ATTACH_IMAGE/IMAGE/1748591110756_2f6bfcab882667c4341bee6666fb6e360f9dc941.png",
          "https://leadkart.in-maa-1.linodeobjects.com/ATTACH_IMAGE/IMAGE/1748591153989_783d15f879654c9630a4d287e9640c84beafc757.png"
        ],
		  
		 googleReview: {
        rating: "4.6",
        outOf: "5",
        totalReviews: "4406",
      },
		  
		jdReview:{
        rating: "4.5",
        outOf: "5",
        totalReviews: "4406",
      },

      ISODes:"ISO CERTIFIED ORGANIZATION ISO 9001:2015",
		  
		  
	scoreBooster:[
         {
        title: "Plan Like NEET Toppers",
        description: "Exclusive counselling advice and weekly review sessions from NEET Toppers across top medical colleges",
        image: "image.exmple.jpg"
        },
         {
        title: "Practice. Master. Excel.",
        description: "Enhanced NEET Exam performance through constant practice, real-time NEET score evaluation, and targeted improvement with         our AI-based NEET Score Booster.",
        image: "image.exmple.jpg"
        },

         {
        title: "Hello Mentor Webinars and Seminars",
        description: "Hello Mentor's NEET Counselling Guidance & Study Booster Workshops turbo-charges your exam preparation with winning            strategies, smart hacks, and techniques.",
        image: "image.example.jpg"
        },

      ]	  
		  
      });
      console.log("Default home data created.");
    } else {
      console.log("Home data already exists.");
    }
};

export {defaultHome};