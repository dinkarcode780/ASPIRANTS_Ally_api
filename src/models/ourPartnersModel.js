import mongoose from "mongoose"

const ourPartnerSchema = mongoose.Schema({

    brandImage:{
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

const OurPartner = mongoose.model("OurPartner", ourPartnerSchema);
export default OurPartner;