import asyncHandler from "../../utils/asyncHandler.js";
import announceMentModel from "../../models/announceMentModel.js";
import { deleteFileFromObjectStorage } from "../middlewares/multerS3.js";


export const updateAnnounceMent = asyncHandler(async (req, res) => {
  const { announcementId, title, description, metaTitle, metaDescription,metaKey } = req.body;

  if(!announcementId){
    return
  }
   const parsedMetaKey = typeof metaKey ==="string"? JSON.parse(metaKey):metaKey;

  const image = req.files?.image?.[0]?.location || null;
  const pdfLink = req.files?.pdfLink?.[0]?.location || null;

  const imageData = await announceMentModel.findById(announcementId);

  if (image && imageData.image) {
    await deleteFileFromObjectStorage(imageData.image);
  }

  if (pdfLink && imageData.pdfLink) {
    await deleteFileFromObjectStorage(imageData.pdfLink);
  }

  const updatedData = {
    ...(title && { title }),
    ...(description && { description }),
    ...(image && { image }),
    ...(pdfLink && { pdfLink }),
  };


  updatedData.metaTitle = metaTitle? metaTitle:imageData.metaTitle;
  updatedData.metaDescription = metaDescription? metaDescription:imageData.metaDescription;
  updatedData.metaKey = metaKey? parsedMetaKey:imageData.metaKey;

  const updatedAnnounceMent = await announceMentModel.findByIdAndUpdate(
    announcementId,
    updatedData,
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Announcement updated successfully",
    data: updatedAnnounceMent,
  });
});


export const getAnnounceMent = asyncHandler(async (req, res) => {
  const announcements = await announceMentModel.find();
  if (!announcements || announcements.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No announcements found",
    });
  }
  
  res.status(200).json({
    success: true,
    message: "Announcements retrieved successfully",
    data: announcements,
  });
});


export const getAnnounceMentById = asyncHandler(async (req, res) => {
  const { announcementId } = req.query;

  if (!announcementId) {
    return res.status(400).json({
      success: false,
      message: "Announcement ID is required",
    });
  }

  const announcement = await announceMentModel.findById(announcementId);
  
  if (!announcement) {
    return res.status(404).json({
      success: false,
      message: "Announcement not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Announcement retrieved successfully",
    data: announcement,
  });
});


export const deleteAnnounceMent = asyncHandler(async (req, res) => {
  const { announcementId } = req.query;

  if (!announcementId) {
    return res.status(400).json({
      success: false,
      message: "Announcement ID is required",
    });
  }

  const announcement = await announceMentModel.findByIdAndDelete(announcementId);
  
  if (!announcement) {
    return res.status(404).json({
      success: false,
      message: "Announcement not found",
    });
  }

  if (announcement.image) {
    await deleteFileFromObjectStorage(announcement.image);
  }

  if (announcement.pdfLink) {
    await deleteFileFromObjectStorage(announcement.pdfLink);
  }

  res.status(200).json({
    success: true,
    message: "Announcement deleted successfully",
  });
});
