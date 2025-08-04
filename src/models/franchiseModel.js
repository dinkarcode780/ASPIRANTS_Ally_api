import mongoose from "mongoose"

const franchiseSchema = mongoose.Schema({

    franchiseImage:{
        type:String,
        trim:true
    },
    disable:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}
);

const Franchise = mongoose.model("Franchise", franchiseSchema);
export default Franchise;