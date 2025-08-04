import webinarModel from "../../models/webinarModel.js";
import asyncHandler from "../../utils/asyncHandler.js";



export const createWabinar = asyncHandler(async (req, res) => {

  const {videoUrl, metaTitle,metaDescription,metaKey} = req.body;
   const thumbnail  = req.file?.location || null;
   const parsedMetaKey = typeof metaKey ==="string"? JSON.parse(metaKey):metaKey;


  if (!videoUrl) {
    return res.status(400).json({
      success: false,
      message: "videoUrl is required",
    });
  }

  const newWabinar = await webinarModel.create({videoUrl,thumbnail, metaTitle,metaDescription,metaKey:parsedMetaKey});

  res.status(201).json({
    success: true,
    message: "Wabinar created successfully",
    data: newWabinar,
  });
});



export const updateWabinar = asyncHandler(async (req, res) => {
  const { webinarId, videoUrl, metaTitle,metaDescription,metaKey} = req.body;
     const parsedMetaKey = typeof metaKey ==="string"? JSON.parse(metaKey):metaKey;


  if (!webinarId) {
    return res.status(400).json({
      success: false,
      message: "webinarId is required", 
    });
  }

  const thumbnail  = req.file?.location || null;

 const thumbnailImage = await webinarModel.findById(webinarId);

  if (thumbnail && thumbnailImage.image) {
         await deleteFileFromObjectStorage(thumbnailImage.thumbnail);
     }
     
  const updatedData = {
    ...(videoUrl && { videoUrl }),
    ...(thumbnail && { thumbnail }),
  };

  updatedData.metaTitle = metaTitle? metaTitle:thumbnailImage.metaTitle;
  updatedData.metaDescription = metaDescription? metaDescription:thumbnailImage.metaDescription;
  updatedData.metaKey = metaKey? parsedMetaKey:thumbnailImage.metaKey;


  const updated = await webinarModel.findByIdAndUpdate(
    webinarId,
    updatedData,
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Webinar updated successfully", 
    data: updated,
  });
});


export const deleteWabinar = asyncHandler(async (req, res) => {
  const { webinarId } = req.query;

  if (!webinarId) {
    return res.status(404).json({
      success: false,
      message: "webinarId is required",
    });
  }

  const deleted = await webinarModel.findByIdAndDelete(webinarId);

  res.status(200).json({
    success: true,
    message: "Webinar deleted successfully",
    data: deleted,
  });
});


export const getWabinarById = asyncHandler(async (req, res) => {
  const { wabinarId } = req.query;

  const wabinar = await webinarModel.findById(wabinarId);

  if (!wabinar) {
    return res.status(404).json({
      success: false,
      message: "Wabinar not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Wabinar fetched successfully",
    data: wabinar,
  });
});


export const getWabinarsByFilter = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  const query = {};

  if (search) {
    query.videoUrl = { $regex: search, $options: "i" };
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [data, total] = await Promise.all([
    webinarModel.find(query).skip(skip).limit(parseInt(limit)),
    webinarModel.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    message: "Wabinars fetched successfully",
    data,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    },
  });
});