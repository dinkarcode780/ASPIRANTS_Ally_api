import mongoose from "mongoose";
import College from "../../models/collegeModel.js"; 
import { deleteFileFromObjectStorage } from "../middlewares/multerS3.js";
import { generateTransactionId } from "../../utils/slugGenerated.js";
import Country from "../../models/countryModel.js";



export const createCollege = async (req, res) => {
  try {
    const {
      collegeName,
      title,
      description,
      countryId,
      establishedYear,
      medium,
      metaTitle,metaDescription,metaKey,
      whatsappNumber,
      mobileNumber,
      aboutUs,
      quickOverView,
      feeStructure,
      whyChooseThisUniversity,
    } = req.body;

    const images = req.files?.image?.map((file) => file.location) || [];
   const parsedMetaKey = typeof metaKey ==="string"? JSON.parse(metaKey):metaKey;
	  const slug = await generateTransactionId("COLLEGE");

    const newCollege = await College.create({
      collegeName,
      title,
      description,
      countryId,
      establishedYear,
      medium,
      whatsappNumber,
      metaTitle,metaDescription,metaKey:parsedMetaKey,
      mobileNumber,
      aboutUs,
      image: images,
      quickOverView: typeof quickOverView === "string" ? JSON.parse(quickOverView) : quickOverView,
      feeStructure: typeof feeStructure === "string" ? JSON.parse(feeStructure) : feeStructure,
      whyChooseThisUniversity,
	  slug
    });

    return res.status(201).json({
      success: true,
      message: "College created successfully",
      data: newCollege,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCollege = async (req, res) => {
  try {
    const {
      collegeId,
      collegeName,
      title,
      description,
      countryId,
      establishedYear,
      metaTitle,metaDescription,metaKey,
      medium,
      whatsappNumber,
      mobileNumber,
      aboutUs,
      quickOverView,
      feeStructure,
      whyChooseThisUniversity,
      index,
    } = req.body;
   const parsedMetaKey = typeof metaKey ==="string"? JSON.parse(metaKey):metaKey;

    if (!collegeId) {
      return res.status(400).json({
        success: false,
        message: "College ID is required",
      });
    }

    const college = await College.findById(collegeId);

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    const newImage = req.files?.image?.[0]?.location;
    if (newImage && college.image[index]) {
      await deleteFileFromObjectStorage(college.image[index]);
    }

    const updatedImages = college.image;
    updatedImages[index] = newImage || updatedImages[index];

    const updatedCollege = await College.findByIdAndUpdate(
      collegeId,
      {
        collegeName,
        title,
        description,
        countryId,
        establishedYear,
        medium,
        whatsappNumber,
        metaTitle,metaDescription,metaKey:parsedMetaKey,
        mobileNumber,
        aboutUs,
        image: updatedImages,
        quickOverView:
          typeof quickOverView === "string"
            ? JSON.parse(quickOverView)
            : quickOverView,
        feeStructure:
          typeof feeStructure === "string"
            ? JSON.parse(feeStructure)
            : feeStructure,
        whyChooseThisUniversity,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "College updated successfully",
      data: updatedCollege,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// get college by id
export const getCollegeById = async (req, res) => {
  const { collegeId,slug } = req.query;
  try {
    if (!collegeId && !slug) {
      return res.status(400).json({
        success: false,
        message: "CollegeId or slug is required",
      });
    }

   
       let college;

    if (collegeId) {
      college = await College.findById(collegeId).populate("countryId");
    } else if (slug) {
      college = await College.findOne({ slug: slug }).populate("countryId");


      if (!college) {
      return res.status(404).json({
        success: false,
        message: "College Not Found",
      });
    }
    }



    return res.status(200).json({
      success: true,
      message: "College Data Fetched Successfully",
      data: college,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};


// disable

export const disableCollage = async(req,res)=>{
  try {
    const {collegeId} = req.query;
    let collegeData = await College.findById(collegeId);
     collegeData.disable = !collegeData?.disable
     await collegeData.save();

    res.status(200).json({success:true,message:collegeData.disable == true? "College disable true successfully": "College disable false successfully"})

  } catch (error) {
    res.status(500).json({success:false,error:error.message});
  }
}



export const filterAllCollege = async (req, res) => {
  const { page = 1, limit = 200, sort = -1, search, disable = false,slug} = req.query;
  const skip = (page - 1) * limit;
  const orFilters = [
    { collegeName: new RegExp(search, "i") },
    { title: new RegExp(search, "i") },
    { description: new RegExp(search, "i") },
    { medium: new RegExp(search, "i") },

  ];
  let countryId =  await Country.findOne({slug:slug}).select("_id");
  // console.log("countryId",countryId);

  if (mongoose.Types.ObjectId.isValid(search)) {
    orFilters.push({ countryId: search });
    orFilters.push({ cityId: search });
    orFilters.push({ stateId: search });
  }

  let filter = {
    ...(search && { $or: orFilters }),
  };
  if (countryId) {
    filter.countryId = countryId._id;
  }
 if(disable != null){
    filter.disable = disable
  }
	
  try {
    const data = await College.find(filter).populate("countryId")
      .sort({ createdAt: parseInt(sort) })
      .skip(skip)
      .limit(limit);
    const total = await College.countDocuments(filter);
    return res.status(200).json({
      success: true,
      message: "All College Data Fetched",
      data: data,
      currentPage: page,
      page: Math.ceil(total / limit),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const filterAllCollegeUser = async (req, res) => {
  const {  disable = false,countryId} = req.query;


  const filter = {
    ...(countryId &&  {countryId} ),
    ...(disable && {disable})
  };
  try {
    const data = await College.find(filter).populate("countryId")
      .sort({ createdAt: -1 })
    return res.status(200).json({
      success: true,
      message: "All College Data Fetched",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};