import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
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

    pdfLink: {
      type: String,
    },
  },
  { timestamps: true }
);

const Announcement = mongoose.model("Announcement", announcementSchema);
export default Announcement;

const createDefaultAnnouncement = async () => {
  const exstingAnnouncement = await Announcement.findOne();

  if (!exstingAnnouncement) {
    await Announcement.create({
      title: "NEET UG 2025 Result Announced",

      description: `MBBS Abroad 2025 - Start Your Journey with Aspirants Ally.
• Top MCI/NMC Approved Universities Worldwide
• End-to-End Admission Process (Application to Visa)
• Visit Us: SF 17, Aakriti Business Centre, Rohit Nagar Phase 1, Aakriti Ecocity, Salaiya, Bhopal, MP - 462026
• Call - 6232912440`,
      image: "aspirants09.jpg",

      pdfLink: "Download PDF",
    });

    console.log(" Announcement create successfully");
  } else {
    console.log("Announcement already exsit");
  }
};

export {createDefaultAnnouncement}