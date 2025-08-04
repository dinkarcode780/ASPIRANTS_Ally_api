import mongoose from "mongoose";

const mentorshipVideoSchema = new mongoose.Schema({

    videoUrl:{
        type:String,
    },
    videoType:{
        type:String,
        enum: ["MENTORS", "CUTOFFANDALLOTMENT", "SEATMATRIX","COLLAGE_COMPARE"],
        default: "OTHERS"
    }
},{timestamps:true});

const MENTORSHIPVIDEO = mongoose.model("MentorshipVideo", mentorshipVideoSchema);

export default MENTORSHIPVIDEO;