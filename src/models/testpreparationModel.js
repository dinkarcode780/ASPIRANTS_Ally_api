import mongoose from "mongoose";

const testpreparationSchema = new mongoose.Schema({
 
    testName:{
        type:String,
        trim:true
    },

    title:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    testAbout:{
        type:String,
        trim:true
    },

    testIcon:{
        type:String
    },
    slug:{
        type:String
    }

},{ timestamps: true });

const TestPreparation = mongoose.model("TestPreparation", testpreparationSchema);

export default TestPreparation;