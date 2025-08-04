import Franchise from "../../models/franchiseModel.js";

export const createFranchise = async(req,res)=>{
    const franchiseImage = req.file? req.file.location:"";
    try{
      
    if(!franchiseImage){
        return res.status(400).json({
            success:false,
            message:"franchiseImage is required !"
        })
    }

    const data = await Franchise.create({
        franchiseImage
    })

    return res.status(201).json({
        success:true,
        message:"Franchise Created Successfully",
        data:data
    })
    }catch(error){
       return res.status(500).json({
        success:false,
        message:error.message
       })
    }
}

export const updateFranchise = async(req,res)=>{
    const {franchiseId} = req.body;
    const franchiseImage = req.file? req.file.location:"";
    try{
      
    if(!franchiseId){
        return res.status(400).json({
            success:false,
            message:"franchiseId is required !"
        })
    }

    const data = await Franchise.findByIdAndUpdate(franchiseId,{
        franchiseImage
    }, {new:true})

    return res.status(200).json({
        success:true,
        message:"Franchise Updated Successfully",
        data:data
    })
    }catch(error){
       return res.status(500).json({
        success:false,
        message:error.message
       })
    }
}

export const getAllFranchise = async(req,res)=>{

    try{
        const data = await Franchise.find({disable:false});
        return res.status(200).json({
            success:true,
            message:"Get All Franchise Successfully",
            data:data
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const disableFranchise = async(req,res)=>{
    const {franchiseId, disable} = req.body;
    try{
      
    if(!franchiseId){
        return res.status(400).json({
            success:false,
            message:"franchiseId and disable are required !"
        })
    }

    const data = await Franchise.findByIdAndUpdate(franchiseId,{
        disable
    }, {new:true})

    return res.status(200).json({
        success:true,
        message: data.disable ==true?"Franchise Disabled Successfully":"Franchise Enabled Successfully"
    })
    }catch(error){
       return res.status(500).json({
        success:false,
        message:error.message
       })
    }
}


// filter all franchise

export const filterAllFranchise = async(req,res)=>{
const {page =1, limit =20, sort =-1, disable} = req.query;
const skip = (Number(page)-1)*limit;
const filter ={
    ...(disable &&{disable})
}
    try{
        const data = await Franchise.find(filter).sort({createdAt:parseInt(sort)}).skip(skip).limit(limit);
       const total = await Franchise.countDocuments(filter);

        return res.status(200).json({
            success:true,
            message:"Get All Franchise Successfully",
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