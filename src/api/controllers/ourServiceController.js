import Service from "../../models/ourServicesModel.js";
import { deleteFileFromObjectStorage } from "../middlewares/multerS3.js";


export const createService = async (req, res) => {
  const { title, description, index, metaTitle, metaDescription, metaKey } =
    req.body;

  const image = req.file ? req.file.location : null;
  const parsedMetaKey =
    typeof metaKey === "string" ? JSON.parse(metaKey) : metaKey;

  const parsedIndex = parseInt(index);

  if (isNaN(parsedIndex)) {
    return res.status(400).json({
      success: false,
      message: "Index must be a valid number",
    });
  }

  try {
   
    const data = await Service.create({
      title,
      description,
      image,
      index: parsedIndex,
      metaTitle,
      metaDescription,
      metaKey: parsedMetaKey,
    });


    

    return res.status(201).json({
      success: true,
      message: "Service Created Successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateService = async (req, res) => {
  const {
    serviceId,
    title,
    description,
    index,
    metaTitle,
    metaDescription,
    metaKey,
  } = req.body;

  const parsedMetaKey =
    typeof metaKey === "string" ? JSON.parse(metaKey) : metaKey;

  try {
    if (!serviceId) {
      return res.status(400).json({
        success: false,
        message: "Service Id is required",
      });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found!",
      });
    }

    let image = service.image;
    if (req.file?.location) {
      if (image) {
        deleteFileFromObjectStorage(image);
      }
      image = req.file.location;
    }

    service.title = title !== undefined ? title : service.title;
    service.description = description !== undefined ? description : service.description;
    service.image = image;

    if (index !== undefined) {
      const parsedIndex = parseInt(index);

      if (isNaN(parsedIndex)) {
        return res.status(400).json({
          success: false,
          message: "Index must be a valid number",
        });
      }

      
      service.index = parsedIndex;
    }

    service.metaTitle = metaTitle !== undefined ? metaTitle : service.metaTitle;
    service.metaDescription = metaDescription !== undefined ? metaDescription : service.metaDescription;
    service.metaKey = metaKey !== undefined ? parsedMetaKey : service.metaKey;

    const data = await service.save();

    return res.status(200).json({
      success: true,
      message: "Service Updated Successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// get by 

export const getServiceById = async (req, res) => {
  const { serviceId } = req.query;
  try {
    if (!serviceId) {
      return res.status(400).json({
        success: false,
        message: "Service Id is required",
      });
    }

    const data = await Service.findById(serviceId);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Service Not Found !",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service Data Feteched Successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const disableOurService = async (req, res) => {
  const { serviceId } = req.query;
  try {
    if (!serviceId) {
      return res.status(400).json({
        success: false,
        message: "Service Id is required",
      });
    }
    const service = await Service.findById(serviceId);
    const data = await Service.findByIdAndUpdate(
      serviceId,
      { disable: !service.disable },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message:
        data.disable == true
          ? "Our Service Disable true"
          : "Our Service Disable false",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// get all services
export const getAllServices = async (req, res) => {
  const {page =1, limit = 20, sort =-1, search,disable= false} = req.query;
  const skip = (Number(page)-1)*limit;

  const orFilters = [
    {title:new RegExp(search, "i")},
     {description:new RegExp(search, "i")}

  ];

  const filter ={
    ...(search && {$or:orFilters})
  }

   if(disable != null){
    filter.disable = disable
  }

  try {
    const data = await Service.find(filter).sort({ createdAt: parseInt(sort) }).skip(skip).limit(limit);
    const total = await Service.countDocuments(filter);
    // if (!data) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Service Not Found !",
    //   });
    // }

    return res.status(200).json({
      success: true,
      message: "Service Data Feteched Successfully",
      data: data,
      currentPage:Number(page),
      page:Math.ceil(total/limit)
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};