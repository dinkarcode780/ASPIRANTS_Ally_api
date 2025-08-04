import asyncHandler from "../../utils/asyncHandler.js";
import warningModel from "../../models/warnigModel.js"


export const createWarning = asyncHandler(async (req, res) => {
  let warnings = req.body;

  if (!Array.isArray(warnings)) {
    warnings = [warnings];
  }

  const invalid = warnings.some(w => !w.title || !w.description);
  if (invalid) {
    return res.status(400).json({
      success: false,
      message: "Each warning must have a title and description.",
    });
  }


  const warningData = await warningModel.create(warnings);

  res.status(201).json({
    success: true,
    message: warnings.length > 1 ? "Warnings created successfully" : "Warning created successfully",
    data: warningData,
  });
});




export const updateWarning = asyncHandler(async(req,res)=>{
  
    const { warningId, title, description } = req.body;
    
    if (!warningId) {
        return res.status(400).json({
            success: false,
            message: "Warning ID is required",
        });
    }
    const updatedData = {
        ...(title && { title }), 
        ...(description && { description }) 
     };
    const updatedWarning = await warningModel.findByIdAndUpdate(warningId, updatedData, {
        new: true,
    });
    if (!updatedWarning) {
        return res.status(404).json({
            success: false,
            message: "Warning not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Warning updated successfully",
        data: updatedWarning,
    });

});


export const getWarningById = asyncHandler(async(req,res)=>{

    const { warningId } = req.query;
    if (!warningId) {
        return res.status(400).json({
            success: false,
            message: "Warning ID is required",
        });
    }
    const warning = await warningModel.findById(warningId);
    if (!warning) {
        return res.status(404).json({
            success: false,
            message: "Warning not found",
        });
    }
    res.status(200).json({
        success: true,
        message: "Warning retrieved successfully",
        data: warning,
    });
});


export const getWarningByFilter = asyncHandler(async (req, res) => {
  const { page =1, search = "" , limit =20, sort =-1} = req.query;
const skip = (Number(page)-1)*limit;

  const filter = {};


  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
  }

  let warnings;
  let total;


    warnings = await warningModel
      .find(filter)
      .sort({ createdAt: parseInt(sort) }).skip(skip).limit(limit);

    total = await warningModel.countDocuments(filter);

  res.status(200).json({
    success: true,
    message: "Warnings fetched successfully",
    data: warnings,
    currentPage:Number(page),
    page: Math.ceil(total/limit)
  });
});

export const deleteWarning = asyncHandler(async(req,res)=>{
  
    const { warningId } = req.query;
    if (!warningId) {
        return res.status(400).json({
            success: false,
            message: "Warning ID is required",
        });
    }
    const deletedWarning = await warningModel.findByIdAndDelete(warningId);
    if (!deletedWarning) {
        return res.status(404).json({
            success: false,
            message: "Warning not found",
        });
    }
    res.status(200).json({
        success: true,
        message: "Warning deleted successfully",
        data: deletedWarning,
    });

})

