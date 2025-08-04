import asyncHandler from "../../utils/asyncHandler.js";
import testpreparationModel from "../../models/testpreparationModel.js";
import { deleteFileFromObjectStorage } from "../middlewares/multerS3.js";
import { generateTransactionId } from "../../utils/slugGenerated.js";




export const createTestPreparation = asyncHandler(async(req,res)=>{


    const { testName, title, description, testAbout } = req.body;


    const testIcon = req.file?.location || null;

    const slug = await generateTransactionId("testpreparation");


    // const testIcon = req.files?.find(file => file.fieldname === "testIcon")?.location || null;
    
    if (!testName || !title || !description || !testAbout || !testIcon) {
        return res.status(400).json({
        success: false,
        message: "All fields are required",
        });
    }
    
    const newTestPreparation = await testpreparationModel.create({
        testName,
        title,
        description,
        testAbout,
        testIcon,
        slug
    });
    
    res.status(201).json({
        success: true,
        message: "Test preparation created successfully",
        data: newTestPreparation,
    });

});

// export const updateTestPreparation = asyncHandler(async(req,res)=>{
 
//     const { testpreparationId, testName, title, description, testAbout } = req.body;
//     //  const testIcon = req.file?.testIcon?.[0]?.location || null;

//     const testIcon = req.file?.testIcon?.location || null;

//     if (!testpreparationId) {
//         return res.status(400).json({
//             success: false,
//             message: "Test preparation ID is required",
//         });
//     }

//    const iconData = await testpreparationModel.findById(testpreparationId)

//    if (!iconData) {
//         return res.status(404).json({
//             success: false,
//             message: "Test preparation not found",
//         });
//     }

//     if (testIcon && iconData.testIcon) {
//         await deleteFileFromObjectStorage(iconData.testIcon);
//       }
   


//     const updateData = {
//         ...(testName && { testName }),
//         ...(title && { title }),
//         ...(description && { description }),
//         ...(testAbout && { testAbout }),
//         ...(testIcon && { testIcon }),
//     };

//     const updatedTestPreparation = await testpreparationModel.findByIdAndUpdate(
//         testpreparationId,
//         updateData,
//         { new: true }
//     );

//     if (!updatedTestPreparation) {
//         return res.status(404).json({
//             success: false,
//             message: "Test preparation not found",
//         });
//     }

//     res.status(200).json({
//         success: true,
//         message: "Test preparation updated successfully",
//         data: updatedTestPreparation,
//     });

// });



export const updateTestPreparation = asyncHandler(async (req, res) => {
  const { testpreparationId, testName, title, description, testAbout } = req.body;

 
  if (!testpreparationId) {
    return res.status(400).json({
      success: false,
      message: "Test preparation ID is required",
    });
  }

 
  const testPreparation = await testpreparationModel.findById(testpreparationId);

  if (!testPreparation) {
    return res.status(404).json({
      success: false,
      message: "Test preparation not found",
    });
  }

  
  const newTestIcon = req.file?.location || null;

  
  if (newTestIcon && testPreparation.testIcon) {
    await deleteFileFromObjectStorage(testPreparation.testIcon);
  }

 
  testPreparation.testName = testName || testPreparation.testName;
  testPreparation.title = title || testPreparation.title;
  testPreparation.description = description || testPreparation.description;
  testPreparation.testAbout = testAbout || testPreparation.testAbout;
  testPreparation.testIcon = newTestIcon || testPreparation.testIcon;

  await testPreparation.save();

  
  res.status(200).json({
    success: true,
    message: "Test preparation updated successfully",
    data: testPreparation,
  });
});




export const getTestPreparationById = asyncHandler(async(req,res)=>{
  
    const { testpreparationId,slug } = req.query;
    if (!testpreparationId && !slug) {
        return res.status(400).json({
            success: false,
            message: "Eather test preparation ID or slug is required",
        });
    }
     
    let testPreparation;

    if(testpreparationId){

       testPreparation = await testpreparationModel.findById(testpreparationId);
    }else if(slug){
      testPreparation = await testpreparationModel.findOne({ slug: slug });
    }

    if (!testPreparation) {
        return res.status(404).json({
            success: false,
            message: "Test preparation not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Test preparation retrieved successfully",
        data: testPreparation,
    });
})


export const getTestPreprationByFilter = asyncHandler(async (req, res) => {
  const {
    search = "",     
    page = 1,        
    limit = 10,     
  } = req.query;

  
  const currentPage = parseInt(page);
  const itemsPerPage = parseInt(limit);


  const filterQuery = {
    $or: [
      { testName: { $regex: search, $options: "i" } },
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { testAbout: { $regex: search, $options: "i" } },
    ],
  };

 
  const total = await testpreparationModel.countDocuments(filterQuery);

  const results = await testpreparationModel
    .find(filterQuery)
    .skip((currentPage - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Fetched All test preparation list",
    data: results,
    total,
    page: currentPage,
    limit: itemsPerPage,
    totalPages: Math.ceil(total / itemsPerPage),
  });
});


export const deteleteTestPreparation = asyncHandler(async(req,res)=>{

    const { testpreparationId } = req.query;
    
    if (!testpreparationId) {
        return res.status(400).json({
        success: false,
        message: "Test preparation ID is required",
        });
    }
    
    const testPreparation = await testpreparationModel.findByIdAndDelete(testpreparationId);
    
    if (!testPreparation) {
        return res.status(404).json({
        success: false,
        message: "Test preparation not found",
        });
    }
    
    // if (testPreparation.testIcon) {
    //     await deleteFileFromObjectStorage(testPreparation.testIcon);
    // }
    
    res.status(200).json({
        success: true,
        message: "Test preparation deleted successfully",
        data: testPreparation,
    });
})
