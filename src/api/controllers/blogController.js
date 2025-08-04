import blogModel from "../../models/blogModel.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { deleteFileFromObjectStorage } from "../middlewares/multerS3.js";
import { generateTransactionId } from "../../utils/slugGenerated.js";


export const createBlog = asyncHandler(async (req, res) => {
  const { title, description,metaTitle,metaDescription,metaKey } = req.body;
  const image = req.file?.location || null;
     const parsedMetaKey = typeof metaKey ==="string"? JSON.parse(metaKey):metaKey;
	const slug = await generateTransactionId("BLOG");


  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title and description are required",
    });
  }
	


  const blog = await blogModel.create({ title, description, image,metaTitle,metaDescription,metaKey:parsedMetaKey, slug });

  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    data: blog,
  });
});


export const updateBlog = asyncHandler(async (req, res) => {
  const { blogId, title, description,metaTitle,metaDescription,metaKey } = req.body;
  const image = req.file?.location || null;
     const parsedMetaKey = typeof metaKey ==="string"? JSON.parse(metaKey):metaKey;

  
     const imageData = await blogModel.findById(blogId)
      if (image && imageData.image) {
          await deleteFileFromObjectStorage(imageData.image);
      }


  const updateData = {
    ...(title && { title }),
    ...(description && { description }),
    ...(image && { image }),
    ...(metaTitle && { metaTitle }),
    ...(metaDescription && { metaDescription }),
    ...(metaKey && { metaKey: parsedMetaKey }),
  };

  const updatedBlog = await blogModel.findByIdAndUpdate(blogId, updateData, {
    new: true,
  });

  if (!updatedBlog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    data: updatedBlog,
  });
});


export const deleteBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.query;

  const deletedBlog = await blogModel.findByIdAndDelete(blogId);

  if (!deletedBlog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
    data: deletedBlog,
  });
});


// get by id
export const getBlogById = asyncHandler(async (req, res) => {
  const { blogId,slug } = req.query;


  if (!blogId && !slug) {
    return res.status(400).json({
      success: false,
      message: "Either blogId or slug is required",
    });
  }


let blog;
  if (blogId) {
    blog = await blogModel.findById(blogId);
  } else if (slug) {
    blog = await blogModel.findOne({ slug:slug });
  }

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Blog fetched successfully",
    data: blog,
  });
});



// get blog filter
export const getBlogsByFilter = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  const skip = (parseInt(page) - 1) * parseInt(limit);

 
  const orFilters = [
    { title: { $regex: search, $options: "i" } },
    { description: { $regex: search, $options: "i" } },
    { metaTitle: { $regex: search, $options: "i" } },
    { metaDescription: { $regex: search, $options: "i" } },
    { metaKey: { $elemMatch: { $regex: search, $options: "i" } } },
  ];

  const query = search ? { $or: orFilters } : {};

 
  const [blogs, total] = await Promise.all([
    blogModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit)),
    blogModel.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    message: "Blogs fetched successfully",
    data: blogs,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    },
  });
});