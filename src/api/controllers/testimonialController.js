import testimonialModel from "../../models/testimonialModel.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { deleteFileFromObjectStorage } from "../middlewares/multerS3.js";


export const createTestimonial = asyncHandler(async (req, res) => {
  const { name, designation, countryId, description, metaTitle,metaDescription,metaKey } = req.body;
  const image = req.file?.location || null;
 const parsedMetaKey = typeof metaKey ==="string"? JSON.parse(metaKey):metaKey;

  const testimonial = await testimonialModel.create({
    name,
    designation,
    countryId,
    description,
    image,
    metaTitle,metaDescription,metaKey:parsedMetaKey
  });

  res.status(201).json({
    success: true,
    message: "Testimonial created successfully",
    data: testimonial,
  });
});


export const updateTestimonial = asyncHandler(async (req, res) => {
  const { testimonialId, name, designation, description,countryId, disable, metaTitle,metaDescription,metaKey } = req.body;
  const image = req.file?.location || null;
 const parsedMetaKey = typeof metaKey ==="string"? JSON.parse(metaKey):metaKey;

 

  if (!testimonialId) {
    return res.status(400).json({ success: false, message: "testimonialId is required" });
  }

    const imageData = await testimonialModel.findById(testimonialId);

      if (image && imageData.image) {
        await deleteFileFromObjectStorage(imageData.image);
    }


    const updatedData = {
    ...(name && { name }),
      ...(designation && { designation }),
      ...(description && { description }),
		...(countryId && { countryId }),
      ...(typeof disable !== "null" && { disable }),
      ...(image && { image }),
    }

  updatedData.metaTitle = metaTitle? metaTitle:imageData.metaTitle;
  updatedData.metaDescription = metaDescription? metaDescription:imageData.metaDescription;
  updatedData.metaKey = metaKey? parsedMetaKey:imageData.metaKey;


  const updated = await testimonialModel.findByIdAndUpdate(
    testimonialId,
    updatedData,
    { new: true }
  );


  res.status(200).json({
    success: true,
    message: "Testimonial updated successfully",
    data: updated,
  });
});

export const disableTestimonial = async (req, res) => {
  const { testimonialId } = req.query;
  try {
    if (!testimonialId) {
      return res.status(400).json({
        success: false,
        message: "testimonial Id is required",
      });
    }
    const service = await testimonialModel.findById(testimonialId);
    const data = await testimonialModel.findByIdAndUpdate(testimonialId, {disable:!service.disable},{ new: true });

    return res.status(200).json({
      success: true,
      message: data.disable == true? "Our testimonial Disable true": "Our testimonial Disable false",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getTestimonialById = asyncHandler(async (req, res) => {
  const { testimonialId } = req.query;

  const testimonial = await testimonialModel.findById(testimonialId).populate("countryId");

  if (!testimonial) {
    return res.status(404).json({ success: false, message: "Testimonial not found" });
  }

  res.status(200).json({
    success: true,
    message: "Testimonial fetched successfully",
    data: testimonial,
  });
});



export const getTestimonialsByFilter = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = "", countryId = "",disable= false } = req.query;

  let query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { designation: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (countryId) {
    query.countryId = countryId;
  }
	
	if(disable != null){
    query.disable = disable
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [data, total] = await Promise.all([
    testimonialModel.find(query).populate("countryId").skip(skip).limit(parseInt(limit)),
    testimonialModel.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    message: "Testimonials fetched successfully",
    data,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    },
  });
});