import countrymodel from "../../models/countryModel.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { deleteFileFromObjectStorage } from "../middlewares/multerS3.js";
import { generateTransactionId } from "../../utils/slugGenerated.js";




export const createCountry = asyncHandler(async(req,res)=>{
   
   const {name, metaTitle,metaDescription,metaKey } = req.body;
    const parsedMetaKey = typeof metaKey ==="string"? JSON.parse(metaKey):metaKey;

  const image = req.file?.location || null;
 const slug = await generateTransactionId("CUNTRY");

   console.log("image",image);
   console.log("req.file", req.file);

    
   const countryData = await countrymodel.create({
    name,image, metaTitle,metaDescription,metaKey:parsedMetaKey, slug
   })

   res.status(201).json({success:true,message:"create country successfully",data:countryData});


});

export const updateCountry = asyncHandler(async (req, res) => {
  const { countryId, name, metaTitle,metaDescription,metaKey } = req.body;
      const parsedMetaKey = typeof metaKey ==="string"? JSON.parse(metaKey):metaKey;


  const image = req.files?.image?.[0]?.location || null;
  const pdfDownloadLink = req.files?.pdfDownloadLink?.[0]?.location || null;

  const imageData = await countrymodel.findById(countryId);
  if (!imageData) {
    return res.status(404).json({ success: false, message: "Country not found" });
  }

 
  if (image && imageData.image) {
    await deleteFileFromObjectStorage(imageData.image);
  }

  if (pdfDownloadLink && imageData.pdfDownloadLink) {
    await deleteFileFromObjectStorage(imageData.pdfDownloadLink);
  }

  const updatedData = {
    ...(name && { name }),
    ...(image && { image }),
    ...(pdfDownloadLink && { pdfDownloadLink }),
  };


  updatedData.metaTitle = metaTitle? metaTitle:imageData.metaTitle;
  updatedData.metaDescription = metaDescription? metaDescription:imageData.metaDescription;
  updatedData.metaKey = metaKey? parsedMetaKey:imageData.metaKey;

  const updatedCountry = await countrymodel.findByIdAndUpdate(countryId, updatedData, { new: true });

  res.status(200).json({
    success: true,
    message: "Updated country successfully",
    data: updatedCountry,
  });
});




// get by id
export const getCountryById = asyncHandler(async(req,res)=>{
    const {countryId,slug} = req.query;

     if (!countryId && !slug) {
    return res.status(400).json({
      success: false,
      message: " countryId or slug is required",
    });
     }

     
  let country;

  if (countryId) {
    country = await countrymodel.findById(countryId);
  } else if (slug) {
    country = await countrymodel.findOne({ slug:slug });
  }

  if (!country) {
    return res.status(404).json({
      success: false,
      message: "Country not found",
    });
  }
    

    // const conteryData = await countrymodel.findById(countryId);
    res.status(200).json({success:true, message:"Fetched country succesfully",data:conteryData});
})



// get filter
export const getCounteryByfilter = asyncHandler(async (req, res) => {
  const { page = 1, search = "", disable = false } = req.query;

  let query = {};

  if (search) {
    query.name = { $regex: search, $options: "i" }; 
  }

  if (disable != null) {
    query.disable = disable;
  }

  const skip = (parseInt(page) - 1) * 10; 

  const [countries, total] = await Promise.all([
    countrymodel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip),
    countrymodel.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    message: "All countries fetched successfully",
    data: countries,
    pagination: {
      total,
      page: parseInt(page),
      limit: total, 
      totalPages: 1, 
    },
  });
});


// disableCountry
export const disableCountry = async(req,res)=>{
  try {
    const {countryId} = req.query;
    let countryData = await countrymodel.findById(countryId);
     countryData.disable = !countryData?.disable
     await countryData.save();

    res.status(200).json({success:true,message:countryData.disable == true? "Country disable true successfully": "Country disable false successfully"})

  } catch (error) {
    res.status(500).json({success:false,error:error.message});
  }
}


export const getCounteryByBoucher = asyncHandler(async (req, res) => {
  const { disable = false } = req.query;
  let query = {};
  if (disable != null) {
    query.disable = disable;
  }

  // Find countries where pdfDownloadLink is not null or undefined
  query.pdfDownloadLink = { $ne: null, $exists: true };

  const countries = await countrymodel.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "All countries fetched successfully",
    data: countries,
  });
});
