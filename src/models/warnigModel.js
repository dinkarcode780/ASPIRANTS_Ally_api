import mongoose from "mongoose";

const warningSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    }

},{timestamps:true});

const Warning = mongoose.model("Warning",warningSchema);

export default Warning;




