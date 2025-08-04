import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  teamMembers: [
    {
      name: {
        type: String,
        trim: true,
      },
      role: {
        type: String,
        trim: true,
      },
      designation: {
        type: String,
        trim: true,
      },
      image: {
        type: String,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
    },
  ],
  sectionTitle: {
    type: String,
    trim: true,
  },
  aboutText: {
    type: String,
    trim: true,
  },
  mission: {
    type: String,
    trim: true,
  },
  vision: {
    type: String,
    trim: true,
  },
  coreValues: [
    {
      title: {
        type: String,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
	  coreImage:{
        type:String,
        trim:true
      }
    },
  ],
  trustPoints: [
    {
      type: String,
      trim: true,
    },
  ],
	makeAspirants: [
    {
      type: String,
      trim: true,
    },
  ],
meetOurMentor:[
  {
    name:{
      type:String,
      trim:true
    },
   image:{
    type:String
   }

  }
],

image:{
  type:String,
}


}, { timestamps: true });

const AboutModel = mongoose.model("About", aboutSchema);

export default AboutModel;


const createDefaultAbout = async () => {
  const existing = await AboutModel.findOne();
  if (!existing) {
    const aboutData = {
      teamMembers: [
        {
          name: "Ritesh Singh Rajput",
          role: "Founder & Director",
          designation: "Founder",
          image: "https://aspirantsally.com/images/team/ritesh.jpg", // replace with actual
          description:
            "At Aspirants Ally, we believe every dream to become a doctor deserves the strongest foundation.",
        },
        {
          name: "Dr. Ramesh Khare",
          role: "Founder & Director",
          designation: "Founder",
          image: "https://aspirantsally.com/images/team/ramesh.jpg", // replace with actual
          description:
            "At Aspirants Ally, every medical aspiration is a seed with the power to grow into something extraordinary.",
        },
        {
          name: "Ms. Shruti Nikarje",
          role: "Overseas Admissions Expert",
          designation: "Admissions Expert",
          image: "https://aspirantsally.com/images/team/shruti.jpg", 
          description:
            "I'm here to guide you confidently through every step of your MBBS abroad journey and licensing exams.",
        },
        {
          name: "Mohit Singh",
          role: "Senior Admission Consultant",
          designation: "Admission Consultant",
          image: "https://aspirantsally.com/images/team/mohit.jpg", 
          description:
            "I'm dedicated to helping you secure the best admission opportunities, guiding you smoothly through each step.",
        },
      ],
      sectionTitle: "About Aspirants Ally",
      aboutText:
        "Aspirants Ally is a student-first MBBS abroad consultancy, built on trust, expertise, and a deep understanding of what it takes to become a doctor in today’s world. With over 5 years of experience, we guide students toward their dream of studying medicine abroad, partnering with top universities in Russia, Georgia, Nepal, and more. From metros to towns, we pave the way for future doctors with clarity and confidence.",
      mission:
        "To simplify and strengthen the journey of studying MBBS abroad for Indian students by offering transparent advice, trusted university options, and complete support — from career counselling to international campus life.",
      vision:
        "To become India's most respected and dependable medical studies abroad guidance platform — one that students trust not just for admissions, but for life-changing support and results.",
      coreValues: [
        {
          title: "Clarity Over Confusion",
          description: "We show the real picture — clearly and honestly.",
        },
        {
          title: "Student First, always",
          description: "Every step is made with the student's best interest in mind.",
        },
        {
          title: "Nationwide Access, Global Reach",
          description: "Linking Indian students to the world's top medical institutions.",
        },
        {
          title: "Commitment That Lasts",
          description: "Guidance continues well after students go abroad.",
        },
        {
          title: "Integrity in Every Interaction",
          description: "Ethical, reliable guidance that builds trust.",
        },
      ],
      trustPoints: [
        "Personalized counselling that actually listens",
        "Strong tie-ups and official collaborations with reputed international universities",
        "On-ground support across India",
        "Visa, documentation, travel — all taken care of",
        "Lifetime academic and emotional support",
      ],

       meetOurMentor: [
        {
          name: "Dr. Surendar Jatoth",
          image:
            "https://leadkart.in-maa-1.linodeobjects.com/SPIRANTS/IMAGE/1751281957329_WhatsApp%20Image%202025-06-30%20at%2016.12.12_b5b7dbe7.jpg",
        },

         {
                name: "Dr. Dhruv Kamlesh Patel",
                image: "https://leadkart.in-maa-1.linodeobjects.com/SPIRANTS/IMAGE/1751282596547_shma.jpg"
            },

             {
                name: "Dr. Zishan Ahmad",
                image: "https://leadkart.in-maa-1.linodeobjects.com/ATTACH_IMAGE/IMAGE/1752129888165_dddd.jpg"
            },

             {
                name: "Dr. Muskan Joshi",
                image: "https://leadkart.in-maa-1.linodeobjects.com/ATTACH_IMAGE/IMAGE/1752127799424_muskan%20joshi.jpg"
           }

      ],
     
      image:"https://leadkart.in-maa-1.linodeobjects.com/about%20(1).png",


    };

    await AboutModel.create(aboutData);
    console.log("Default About created successfully.");
  } else {
    console.log("Default About  already exists.");
  }
};

export { createDefaultAbout };

