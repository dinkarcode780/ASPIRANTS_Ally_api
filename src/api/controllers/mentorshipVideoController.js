import asyncHandler from "../../utils/asyncHandler.js";
import mentorshipVideoModel from "../../models/mentorshipVideoModel.js";

export const createMentorShipVideo = asyncHandler(async(req,res)=>{

  const {videoUrl,videoType} = req.body;

    if (!videoUrl || !videoType) {
        return res.status(400).json({
        success: false,
        message: "Video URL and type are required",
        });
    }
  
    const videoData = await mentorshipVideoModel.create({
        videoUrl,
        videoType,
    });
    res.status(201).json({
        success: true,
        message: "Mentorship video created successfully",
        data: videoData,
    });

});


export const updateMentorShipVideo = asyncHandler(async(req,res)=>{

    const {videoId, videoUrl, videoType} = req.body;

    if (!videoId) {
        return res.status(400).json({
        success: false,
        message: "Video ID is required",
        });
    }


    const updatedData = {
        ...(videoUrl && { videoUrl }),
        ...(videoType && { videoType }),
    };

    const updatedVideo = await mentorshipVideoModel.findByIdAndUpdate(videoId, updatedData, {
        new: true,
    });
    if (!updatedVideo) {
        return res.status(404).json({
            success: false,
            message: "Mentorship video not found",
        });
    }
    res.status(200).json({
        success: true,
        message: "Mentorship video updated successfully",
        data: updatedVideo,
    });
});

export const getMentorShipVideo = asyncHandler(async(req,res)=>{

    const mentorshipVideos = await mentorshipVideoModel.find();
    if (!mentorshipVideos || mentorshipVideos.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No mentorship videos found",
        });
    }
  
    res.status(200).json({
        success: true,
        message: "Mentorship videos retrieved successfully",
        data: mentorshipVideos,
    });

});


export const getMentorShipVideoById = asyncHandler(async(req,res)=>{

    const { videoId } = req.query;

    if (!videoId) {
        return res.status(400).json({
            success: false,
            message: "Video ID is required",
        });
    }

    const mentorshipVideo = await mentorshipVideoModel.findById(videoId);
    
    if (!mentorshipVideo) {
        return res.status(404).json({
            success: false,
            message: "Mentorship video not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Mentorship video retrieved successfully",
        data: mentorshipVideo,
    });

});

export const deleteMentorShipVideo = asyncHandler(async(req,res)=>{

    const { videoId } = req.query;

    if (!videoId) {
        return res.status(400).json({
            success: false,
            message: "Video ID is required",
        });
    }

    const deletedVideo = await mentorshipVideoModel.findByIdAndDelete(videoId);
    
    if (!deletedVideo) {
        return res.status(404).json({
            success: false,
            message: "Mentorship video not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Mentorship video deleted successfully",
		data:deletedVideo
    });

});

