import State from "../../models/stateModel.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { deleteFileFromObjectStorage } from "../middlewares/multerS3.js";


export const createState = asyncHandler(async (req, res) => {
  const { name, countryId } = req.body;
  const image = req.file?.location || null;

  if (!name || !countryId) {
    return res.status(400).json({
      success: false,
      message: "Name and countryId are required",
    });

  }

  const state = await State.create({ name, countryId, image });

  res.status(201).json({
    success: true,
    message: "State created successfully",
    data: state,
  });
});


export const updateState = asyncHandler(async (req, res) => {
  const { stateId, name } = req.body;
  const image = req.file?.key || null;

   const imageData = await countrymodel.findById(countryId)
    if (image && imageData.image) {
        await deleteFileFromObjectStorage (imageData.image);
    }

  const updateData = {
    ...(name && { name }),
    ...(image && { image }),
  };

  const updatedState = await State.findByIdAndUpdate(stateId, updateData, {
    new: true,
  });

  if (!updatedState) {
    return res.status(404).json({
      success: false,
      message: "State not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "State updated successfully",
    data: updatedState,
  });
});


export const deleteState = asyncHandler(async (req, res) => {
  const { stateId } = req.query;

  const deletedState = await State.findByIdAndDelete(stateId);

  if (!deletedState) {
    return res.status(404).json({
      success: false,
      message: "State not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "State deleted successfully",
    data: deletedState,
  });
});


export const getStateById = asyncHandler(async (req, res) => {
  const { stateId } = req.query;

  const state = await State.findById(stateId).populate("countryId", "name");

  if (!state) {
    return res.status(404).json({
      success: false,
      message: "State not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "State fetched successfully",
    data: state,
  });
});

export const getStateByFilter = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = "", countryId } = req.query;

  const query = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  if (countryId) {
    query.countryId = countryId;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [states, total] = await Promise.all([
    State.find(query).sort({name:1})
      .populate("countryId", "name")
      .skip(skip)
      .limit(parseInt(limit)),
    State.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    message: "States fetched successfully",
    data: states,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    },
  });
});