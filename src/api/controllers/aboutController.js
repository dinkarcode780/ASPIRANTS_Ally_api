import asyncHandler from "../../utils/asyncHandler.js";
import AboutModel from "../../models/aboutModel.js";
import { deleteFileFromObjectStorage } from "../middlewares/multerS3.js";



// export const updateAbout = asyncHandler(async (req, res) => {
//   const {aboutId,
//     teamMembers,
//     sectionTitle,
//     aboutText,
//     mission,
//     vision,
//     coreValues,
//     trustPoints,
//   } = req.body;


//   if(!aboutId){
//     return res.status(400).json({
//       success: false,
//       message: "About ID is required",
//     });
//   }

//   const image = req.files?.location || null;;

//   let aboutDoc = await AboutModel.findById(aboutId);

  
//   if (!aboutDoc) {
//     aboutDoc = new AboutModel({});
//   }

  
//   if (image) {
//     if (aboutDoc.image) {
//       await deleteFileFromObjectStorage(aboutDoc.image);
//     }
//     aboutDoc.image = image;
//   }

  
//   if (teamMembers !== undefined) aboutDoc.teamMembers = teamMembers;
//   if (sectionTitle !== undefined) aboutDoc.sectionTitle = sectionTitle;
//   if (aboutText !== undefined) aboutDoc.aboutText = aboutText;
//   if (mission !== undefined) aboutDoc.mission = mission;
//   if (vision !== undefined) aboutDoc.vision = vision;
//   if (coreValues !== undefined) aboutDoc.coreValues = coreValues;
//   if (trustPoints !== undefined) aboutDoc.trustPoints = trustPoints;

//   const updatedAbout = await aboutDoc.save();

//   res.status(200).json({
//     success: true,
//     message: "About content updated successfully",
//     data: updatedAbout,
//   });
// });



// =========step1============


// export const updateAbout = asyncHandler(async (req, res) => {
//   const {
//     aboutId,
//     sectionTitle,
//     aboutText,
//     mission,
//     vision,
//     trustPoints,
// 	makeAspirants
//   } = req.body;

//   if (!aboutId) {
//     return res.status(400).json({
//       success: false,
//       message: "About ID is required",
//     });
//   }

//   const image = req.file?.location || null;
//   const aboutDoc = await AboutModel.findById(aboutId);
 


//    if (image && aboutDoc.image) {
//       await deleteFileFromObjectStorage(aboutDoc.image);
//     }




//   if (!aboutDoc) {
//     return res.status(404).json({
//       success: false,
//       message: "About document not found",
//     });
//   }

  


//   const updatedData = {
//     sectionTitle: sectionTitle || aboutDoc.sectionTitle,
//     aboutText: aboutText || aboutDoc.aboutText,
//     mission: mission || aboutDoc.mission,
//     vision: vision || aboutDoc.vision,
//     // trustPoints: trustPoints || aboutDoc.trustPoints,
//      trustPoints: trustPoints ? JSON.parse(trustPoints) : aboutDoc.trustPoints,
//      makeAspirants:makeAspirants? JSON.parse(makeAspirants):aboutDoc.makeAspirants,
// 	// makeAspirants: makeAspirants || aboutDoc.makeAspirants,
//     image:image || aboutDoc.image

//   };

//   // ---------- TEAM MEMBERS UPDATE ----------
//   const teamMembers = [];

//   for (let i = 0; i < 10; i++) {
//     const name = req.body[`teamMembers[${i}].name`];
//     const role = req.body[`teamMembers[${i}].role`];
//     const designation = req.body[`teamMembers[${i}].designation`];
//     const description = req.body[`teamMembers[${i}].description`];
//     const imageFile = req.files?.[`teamMembers[${i}].image`] || [];
//     const image = imageFile[0]?.location;

//     const oldMember = aboutDoc.teamMembers?.[i] || {};

//     if (!name && !role && !designation && !description && !image && Object.keys(oldMember).length === 0) {
//       break;
//     }

//     if (image && oldMember?.image) {
//       await deleteFileFromObjectStorage(oldMember.image);
//     }

//     teamMembers.push({
//       name: name || oldMember.name || '',
//       role: role || oldMember.role || '',
//       designation: designation || oldMember.designation || '',
//       description: description || oldMember.description || '',
//       image: image || oldMember.image || '',
//     });
//   }

//   updatedData.teamMembers = teamMembers.length > 0 ? teamMembers : aboutDoc.teamMembers;

//   // ---------- CORE VALUES UPDATE ----------
//   const coreValues = [];

//   for (let i = 0; i < 10; i++) {
//     const title = req.body[`coreValues[${i}].title`];
//     const description = req.body[`coreValues[${i}].description`];
//     const imageFile = req.files?.[`coreValues[${i}].coreImage`] || [];
//     const coreImage = imageFile[0]?.location;

//     const oldCore = aboutDoc.coreValues?.[i] || {};

//     if (!title && !description && !coreImage && Object.keys(oldCore).length === 0) {
//       break;
//     }

//     if (coreImage && oldCore?.coreImage) {
//       await deleteFileFromObjectStorage(oldCore.coreImage);
//     }

//     coreValues.push({
//       title: title || oldCore.title || '',
//       description: description || oldCore.description || '',
//       coreImage: coreImage || oldCore.coreImage || '',
//     });
//   }

//   updatedData.coreValues = coreValues.length > 0 ? coreValues : aboutDoc.coreValues;



//   // yaha se 


//   // const meetOurMentor = [];

//   // for (let i = 0; i < 10; i++) {
//   //   const name = req.body[`meetOurMentor[${i}].name`];
//   //   const imageFile = req.files?.[`meetOurMentor[${i}].image`] || [];
//   //   const image = imageFile[0]?.location;

//   //   const oldMentor = aboutDoc.meetOurMentor?.[i] || {};

//   //   if (!name && !image && Object.keys(oldMentor).length === 0) {
//   //     break;
//   //   }

//   //   if (image && oldMentor?.image) {
//   //     await deleteFileFromObjectStorage(oldMentor.image);
//   //   }

//   //   meetOurMentor.push({
//   //     name: name || oldMentor.name || '',
//   //     image: image || oldMentor.image || '',
//   //   });
//   // }

//   // updatedData.meetOurMentor = meetOurMentor.length > 0 ? meetOurMentor : aboutDoc.meetOurMentor;


// const meetOurMentor = [];

// const isInvalid = (val) =>
//   typeof val === "string" && val.trim().startsWith("req.body[") && val.trim().endsWith("]");

// for (let i = 0; i < 10; i++) {
//   let name = req.body[`meetOurMentor[${i}].name`];
//   const imageFile = req.files?.[`meetOurMentor[${i}].image`] || [];
//   const image = imageFile[0]?.location;

//   const oldMentor = aboutDoc.meetOurMentor?.[i] || {};

//   if (!name && !image && Object.keys(oldMentor).length === 0) {
//     break;
//   }

//   if (isInvalid(name)) {
//     name = ""; 
//   }

//   if (image && oldMentor?.image) {
//     await deleteFileFromObjectStorage(oldMentor.image);
//   }

//   meetOurMentor.push({
//     name: name || oldMentor.name || "",
//     image: image || oldMentor.image || "",
//   });
// }

// updatedData.meetOurMentor =
//   meetOurMentor.length > 0 ? meetOurMentor : aboutDoc.meetOurMentor;




//   // ---------- FINAL UPDATE ----------
//   const updatedAbout = await AboutModel.findByIdAndUpdate(aboutId, updatedData, { new: true });

//   res.status(200).json({
//     success: true,
//     message: "About content updated successfully",
//     data: updatedAbout.toObject(),
//   });
// });



// ======================//updateCode=========///



export const updateAbout = asyncHandler(async (req, res) => {
  const {
    aboutId,
    sectionTitle,
    aboutText,
    mission,
    vision,
    trustPoints,
    makeAspirants,
  } = req.body;

  if (!aboutId) {
    return res.status(400).json({
      success: false,
      message: "About ID is required",
    });
  }

  const aboutDoc = await AboutModel.findById(aboutId);

  if (!aboutDoc) {
    return res.status(404).json({
      success: false,
      message: "About document not found",
    });
  }

 
  const fileMap = {};
  req.files?.forEach((file) => {
    fileMap[file.fieldname] = file;
  });

 
  const newMainImage = fileMap["image"]?.location;
  if (newMainImage && aboutDoc.image) {
    await deleteFileFromObjectStorage(aboutDoc.image);
  }

  const updatedData = {
    sectionTitle: sectionTitle || aboutDoc.sectionTitle,
    aboutText: aboutText || aboutDoc.aboutText,
    mission: mission || aboutDoc.mission,
    vision: vision || aboutDoc.vision,
    trustPoints: trustPoints ? JSON.parse(trustPoints) : aboutDoc.trustPoints,
    makeAspirants: makeAspirants
      ? JSON.parse(makeAspirants)
      : aboutDoc.makeAspirants,
    image: newMainImage || aboutDoc.image,
  };

  // ----- TEAM MEMBERS (dynamic) -----
  const teamMembers = [];
  for (let i = 0; i < 30; i++) {
    const name = req.body[`teamMembers[${i}].name`];
    const role = req.body[`teamMembers[${i}].role`];
    const designation = req.body[`teamMembers[${i}].designation`];
    const description = req.body[`teamMembers[${i}].description`];
    const image = fileMap[`teamMembers[${i}].image`]?.location;

    const oldMember = aboutDoc.teamMembers?.[i] || {};

   if (!name && !role && !designation && !description && !image && Object.keys(oldMember).length === 0) {
    continue;  
  }

    if (image && oldMember?.image) {
      await deleteFileFromObjectStorage(oldMember.image);
    }

    teamMembers.push({
      name: name || oldMember.name || '',
      role: role || oldMember.role || '',
      designation: designation || oldMember.designation || '',
      description: description || oldMember.description || '',
      image: image || oldMember.image || '',
    });
  }

  updatedData.teamMembers = teamMembers.length > 0 ? teamMembers : aboutDoc.teamMembers;

  // ----- CORE VALUES (dynamic) -----
  const coreValues = [];
  for (let i = 0; i < 30; i++) {
    const title = req.body[`coreValues[${i}].title`];
    const description = req.body[`coreValues[${i}].description`];
    const coreImage = fileMap[`coreValues[${i}].coreImage`]?.location;

    const oldCore = aboutDoc.coreValues?.[i] || {};

    if (!title && !description && !coreImage && Object.keys(oldCore).length === 0) {
      break;
    }

    if (coreImage && oldCore?.coreImage) {
      await deleteFileFromObjectStorage(oldCore.coreImage);
    }

    coreValues.push({
      title: title || oldCore.title || '',
      description: description || oldCore.description || '',
      coreImage: coreImage || oldCore.coreImage || '',
    });
  }

  updatedData.coreValues = coreValues.length > 0 ? coreValues : aboutDoc.coreValues;

  // ----- MENTORS (dynamic) -----
  const meetOurMentor = [];
  const isInvalid = (val) =>
    typeof val === "string" && val.trim().startsWith("req.body[") && val.trim().endsWith("]");

  for (let i = 0; i < 30; i++) {
    let name = req.body[`meetOurMentor[${i}].name`];
    const image = fileMap[`meetOurMentor[${i}].image`]?.location;
    const oldMentor = aboutDoc.meetOurMentor?.[i] || {};

    if (!name && !image && Object.keys(oldMentor).length === 0) {
      break;
    }

    if (isInvalid(name)) {
      name = "";
    }

    if (image && oldMentor?.image) {
      await deleteFileFromObjectStorage(oldMentor.image);
    }

    meetOurMentor.push({
      name: name || oldMentor.name || "",
      image: image || oldMentor.image || "",
    });
  }

  updatedData.meetOurMentor = meetOurMentor.length > 0 ? meetOurMentor : aboutDoc.meetOurMentor;

  // ----- FINAL UPDATE -----
  const updatedAbout = await AboutModel.findByIdAndUpdate(aboutId, updatedData, { new: true });

  res.status(200).json({
    success: true,
    message: "About content updated successfully",
    data: updatedAbout.toObject(),
  });
});






export const getAbout = asyncHandler(async (req, res) => {
   
    
  const about = await AboutModel.findOne();
  if (!about) {
    return res.status(404).json({
      success: false,
      message: "About content not found",
    });
  }
  
  res.status(200).json({
    success: true,
    message: "About content retrieved successfully",
    data: about,
  });
});


export const getAboutById = asyncHandler(async(req,res)=>{

    const { aboutId } = req.query;
    
    if (!aboutId) {
        return res.status(400).json({
        success: false,
        message: "About ID is required",
        });
    }
    
    const about = await AboutModel.findById(aboutId);
    if (!about) {
        return res.status(404).json({
        success: false,
        message: "About content not found",
        });
    }
    
    res.status(200).json({
        success: true,
        message: "About content retrieved successfully",
        data: about,
    });
});






export const deleteAbout = asyncHandler(async (req, res) => {
  const { aboutId, index } = req.body;

  if (!aboutId) {
    return res.status(400).json({
      success: false,
      message: "aboutId is required",
    });
  }

  const about = await AboutModel.findById(aboutId);
  if (!about) {
    return res.status(404).json({
      success: false,
      message: "About document not found",
    });
  }

 
  if (index !== undefined) {
    if (index < 0 || index >= about.trustPoints.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid trustPoint index",
      });
    }

    about.trustPoints.splice(index, 1);
    await about.save();

    return res.status(200).json({
      success: true,
      message: `TrustPoint at index ${index} deleted successfully.`,
      updatedTrustPoints: about.trustPoints,
    });
  }

 
  await AboutModel.findByIdAndDelete(aboutId);

  return res.status(200).json({
    success: true,
    message: "Entire About document deleted successfully.",
  });
});



// export const deleteAbout = asyncHandler(async (req, res) => {
//   const { aboutId } = req.query;

//   if (!aboutId) {
//     return res.status(400).json({
//       success: false,
//       message: "About ID is required",
//     });
//   }

//   const about = await AboutModel.findByIdAndDelete(aboutId);
  
//   if (!about) {
//     return res.status(404).json({
//       success: false,
//       message: "About content not found",
//     });
//   }

//   if (about.image) {
//     await deleteFileFromObjectStorage(about.image);
//   }

//   res.status(200).json({
//     success: true,
//     message: "About content deleted successfully",
//   });
// });