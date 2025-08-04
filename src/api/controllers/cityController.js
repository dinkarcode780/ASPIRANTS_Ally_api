import cityModel from "../../models/cityModel.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { deleteFileFromObjectStorage } from "../middlewares/multerS3.js";

export const createCity = asyncHandler(async (req, res) => {
  const { name, stateId,metaTitle,metaDescription,metaKey } = req.body;
  const image = req.file?.location || null; 
  const parsedMetaKey = typeof metaKey ==="string"? JSON.parse(metaKey):metaKey;


  if (!name || !stateId) {
    return res.status(400).json({
      success: false,
      message: "Name and stateId are required",
    });
  }

  const city = await cityModel.create({
    name,
    stateId,
    image,
    metaTitle,metaDescription,metaKey:parsedMetaKey
  });

  res.status(201).json({
    success: true,
    message: "City created successfully",
    data: city,
  });
});


export const updateCity = asyncHandler(async (req, res) => {
  const { cityId, name, metaTitle,metaDescription,metaKey } = req.body;
  const image = req.file?.location || null;
    const parsedMetaKey = typeof metaKey ==="string"? JSON.parse(metaKey):metaKey;



   const imageData = await countrymodel.findById(countryId)
    if (image && imageData.image) {
        await deleteFileFromObjectStorage(imageData.image);
    }
  const updateData = {
    ...(name && { name }),
    ...(image && { image }),
  };


  updateData.metaTitle = metaTitle? metaTitle:imageData.metaTitle;
  updateData.metaDescription = metaDescription? metaDescription:imageData.metaDescription;
  updateData.metaKey = metaKey? parsedMetaKey:imageData.metaKey;

  const updatedCity = await cityModel.findByIdAndUpdate(cityId, updateData, {
    new: true,
  });

  if (!updatedCity) {
    return res.status(404).json({
      success: false,
      message: "City not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "City updated successfully",
    data: updatedCity,
  });
});


export const getCityById = asyncHandler(async (req, res) => {
  const { cityId } = req.query;

  const city = await cityModel.findById(cityId).populate("stateId", "name");

  if (!city) {
    return res.status(404).json({
      success: false,
      message: "City not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "City fetched successfully",
    data: city,
  });
});


export const deleteCity = asyncHandler(async (req, res) => {
  const { cityId } = req.query;

  const deletedCity = await cityModel.findByIdAndDelete(cityId);

  if (!deletedCity) {
    return res.status(404).json({
      success: false,
      message: "City not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "City deleted successfully",
    data: deletedCity,
  });
});




export const getCityByFilter = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  const query = {};

 
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);


  const [cities, total] = await Promise.all([
    cityModel.find(query)
      .populate("stateId", "name") 
      .skip(skip)
      .limit(parseInt(limit)),
    cityModel.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    message: "Cities fetched successfully",
    data: cities,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    },
  });
});