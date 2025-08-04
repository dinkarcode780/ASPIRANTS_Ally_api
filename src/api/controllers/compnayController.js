import Company from "../../models/CompanyModel.js";
import { deleteFileFromObjectStorage } from "../middlewares/multerS3.js";

export const getCompany = async (req, res) => {
  try {
    const company = await Company.findOne();
    return res.status(200).json({
      success: true,
      message: "Company Data Fetched Successfully",
      data: company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCompany = async (req, res) => {
  const {
    companyId,
    name,
    aboutUs,
    termsAndConditions,
    address,
    whatsappNumber,
    number,
    email,
    metaTitle,metaDescription,metaKey,
    contactUsDescription,
	   instagramUrl,
    facebookUrl,
     twitterUrl,
     youtubeUrl
  } = req.body;
   const parsedMetaKey = typeof metaKey ==="string"? JSON.parse(metaKey):metaKey;
  const updatedData = {
    name,
    aboutUs,
    termsAndConditions,
    address,
    whatsappNumber,
    number,
    metaTitle,metaDescription,metaKey:parsedMetaKey,
    email,
    contactUsDescription,
	instagramUrl,
    facebookUrl,
    twitterUrl,
    youtubeUrl
  };
  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credential !",
      });
    }

    const logo = req.file ? req.file.location : company?.logo;
    updatedData.logo = logo;
    if (logo && company.logo) {
      deleteFileFromObjectStorage(company.logo);
    }

    const data = await Company.findByIdAndUpdate(companyId, updatedData, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "Company Data Updated Successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
