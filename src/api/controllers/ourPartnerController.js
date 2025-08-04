import OurPartner from "../../models/ourPartnersModel.js";

export const createPartners = async(req,res)=>{
    const brandImage = req.file? req.file.location:"";
    try{
      
    if(!brandImage){
        return res.status(400).json({
            success:false,
            message:"BrandImage is required !"
        })
    }

    const data = await OurPartner.create({
        brandImage
    })

    return res.status(201).json({
        success:true,
        message:"Our Partner Created Successfully",
        data:data
    })
    }catch(error){
       return res.status(500).json({
        success:false,
        message:error.message
       })
    }
}

export const updatePartners = async(req,res)=>{
    const {brandId} = req.body;
    const brandImage = req.file? req.file.location:"";
    try{
      
    if(!brandId){
        return res.status(400).json({
            success:false,
            message:"brandId is required !"
        })
    }

    const data = await OurPartner.findByIdAndUpdate(brandId,{
        brandImage
    }, {new:true})

    return res.status(200).json({
        success:true,
        message:"Our Partner Updated Successfully",
        data:data
    })
    }catch(error){
       return res.status(500).json({
        success:false,
        message:error.message
       })
    }
}

export const getAllPartners = async(req,res)=>{

    try{
        const data = await OurPartner.find({disable:false});
        return res.status(200).json({
            success:true,
            message:"Get All Partners Successfully",
            data:data
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const disablePartners = async(req,res)=>{
    const {brandId, disable} = req.body;
    try{
      
    if(!brandId){
        return res.status(400).json({
            success:false,
            message:"brandId and disable are required !"
        })
    }

    const data = await OurPartner.findByIdAndUpdate(brandId,{
        disable
    }, {new:true})

    return res.status(200).json({
        success:true,
        message: data.disable ==true?"Our Partner Disabled Successfully":"Our Partner Enabled Successfully"
    })
    }catch(error){
       return res.status(500).json({
        success:false,
        message:error.message
       })
    }
}



// filter all partner
export const filterAllPartners = async(req,res)=>{
const {page =1, limit =20, sort =-1, disable} = req.query;
const skip = (Number(page)-1)*limit;
const filter ={
    ...(disable &&{disable})
}
    try{
        const data = await OurPartner.find(filter).sort({createdAt:parseInt(sort)}).skip(skip).limit(limit);
       const total = await OurPartner.countDocuments(filter);

        return res.status(200).json({
            success:true,
            message:"Get All Partners Successfully",
            data:data,
            currentPage:Number(page),
            page:Math.ceil(total/limit)

        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}