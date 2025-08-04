import Home from "../../models/homeModel.js";
import { deleteFileFromObjectStorage } from "../middlewares/multerS3.js";
import OurService from "../../models/ourServicesModel.js";
import Wabinar from "../../models/webinarModel.js";
import Testimonial from "../../models/testimonialModel.js";
import Blog from "../../models/blogModel.js";
import announceMent from "../../models/announceMentModel.js";
import Warning from "../../models/warnigModel.js";
import mentorshipVideo from "../../models/mentorshipVideoModel.js";
import Faq from "../../models/faqModel.js";
import OurPartner from "../../models/ourPartnersModel.js";
import Franchise from "../../models/franchiseModel.js";



export const getHomePage = async (req, res) => {
  try {
    const home = await Home.findOne()
      .populate("topCountries")
      .populate({
        path: "topColleges",
        match: { disable: false },
        populate: {
          path: "countryId",
          model: "Country",
        },
      });

    const faq = await Faq.find({ disable: false }).sort({ createdAt: -1 });

    const mentorship = await mentorshipVideo.find();

    const announce = await announceMent.find();
    const warn = await Warning.find();
    const OurSe = await OurService.find({ disable: false }).sort({ index: 1 });
    const Wab = await Wabinar.find();
    const Testimo = await Testimonial.find({ disable: false });
    const Blo = await Blog.find();
	const partners = await OurPartner.find({disable:false});
	const franchise = await Franchise.find({disable:false});



    home._doc.faq = faq;
    home._doc.mentorVideo = mentorship;
    home._doc.announceMent = announce;
    home._doc.Warning = warn;
    home._doc.OurService = OurSe;
    home._doc.Wabinar = Wab;
    home._doc.Testimonial = Testimo;
    home._doc.Blog = Blo;
	home._doc.ourPartners = partners;
	home._doc.franchise = franchise;



    return res.status(200).json({
      success: true,
      message: "Home Page Data Fetched Successfully",
      data: home,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



//=================dynamic Change==========//


// export const updateHomePage = async (req, res) => {
//   try {
//     const {
//       homeId,
//       title,
//       subTitle,
//       metaTitle,
//       metaDescription,
//       metaKey,
//       ISODes,
//       googleReview,
//       jdReview,
//       homeCountsIndex,
//       imageIndex,
//       bottomImageIndex,
//       scoreBoosterIndex,
//       topCountries,
//       topColleges
//     } = req.body;

//     if (!homeId) {
//       return res.status(400).json({ success: false, message: "Home ID required" });
//     }

//     const home = await Home.findById(homeId);
//     if (!home) {
//       return res.status(404).json({ success: false, message: "Home not found" });
//     }

//     // Parsed Fields
//     const parsedMetaKey = typeof metaKey === "string" ? JSON.parse(metaKey) : metaKey;
//     const parsedGoogleReview = typeof googleReview === "string" ? JSON.parse(googleReview) : googleReview;
//     const parsedJdReview = typeof jdReview === "string" ? JSON.parse(jdReview) : jdReview;

//     const updatedData = {
//       title,
//       subTitle,
//       metaTitle,
//       metaDescription,
//       metaKey: parsedMetaKey,
//       ISODes,
//       googleReview: parsedGoogleReview,
//       jdReview: parsedJdReview,
//       topCountries: typeof topCountries === "string" ? JSON.parse(topCountries) : topCountries,
//       topColleges: typeof topColleges === "string" ? JSON.parse(topColleges) : topColleges,
//     };

//     /* ----------------------- Dynamic Image[] Update ----------------------- */
//     if (imageIndex !== undefined) {
//       const index = Number(imageIndex);
//       const newImageFile = req.files?.find((f) => f.fieldname === "image");
//       const newImage = newImageFile?.location;
//       const oldImage = home.image[index];

//       if (newImage && oldImage) deleteFileFromObjectStorage(oldImage);

//       const updatedImageArray = [...home.image];
//       updatedImageArray[index] = newImage || oldImage;
//       updatedData.image = updatedImageArray;
//     }

//     /* ----------------------- Dynamic bottomImage[] Update ----------------------- */
//     if (bottomImageIndex !== undefined) {
//       const index = Number(bottomImageIndex);
//       const newBottomImageFile = req.files?.find((f) => f.fieldname === "bottomImage");
//       const newBottomImage = newBottomImageFile?.location;
//       const oldBottomImage = home.bottomImage[index];

//       if (newBottomImage && oldBottomImage) deleteFileFromObjectStorage(oldBottomImage);

//       const updatedBottomImageArray = [...home.bottomImage];
//       updatedBottomImageArray[index] = newBottomImage || oldBottomImage;
//       updatedData.bottomImage = updatedBottomImageArray;
//     }

//     /* ----------------------- Dynamic homeCounts[] Update ----------------------- */
//     if (homeCountsIndex !== undefined) {
//       const index = Number(homeCountsIndex);
//       const parsedHomeCounts = [...home.homeCounts];

//       parsedHomeCounts[index] = {
//         title: req.body["homeCounts.title"] ?? parsedHomeCounts[index]?.title,
//         count: req.body["homeCounts.count"] ?? parsedHomeCounts[index]?.count,
//       };

//       updatedData.homeCounts = parsedHomeCounts;
//     }

//     /* ----------------------- Dynamic scoreBooster[] Update ----------------------- */
//    if (scoreBoosterIndex !== undefined) {
//   const index = Number(scoreBoosterIndex);
//   const scoreBooster = [...(home.scoreBooster || [])];

//   // File upload check
//   const newImageFile = req.files?.find(
//     (f) => f.fieldname === `scoreBooster[${index}].image`
//   );
//   const newImage = newImageFile?.location;
//   const oldImage = scoreBooster[index]?.image;

//   if (newImage && oldImage) deleteFileFromObjectStorage(oldImage);

//   scoreBooster[index] = {
//     title: req.body.title ?? scoreBooster[index]?.title,
//     description: req.body.description ?? scoreBooster[index]?.description,
//     image: newImage || oldImage,
//     slug: scoreBooster[index]?.slug || null, // slug preserve
//   };

//   updatedData.scoreBooster = scoreBooster;
// }


//     /* ----------------------- Update DB ----------------------- */
//     const updatedHome = await Home.findByIdAndUpdate(homeId, updatedData, { new: true });

//     res.status(200).json({
//       success: true,
//       message: "Home Page updated successfully",
//       data: updatedHome,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };




   

export const updateHomePage = async (req, res) => {
  const {
    homeId,
    title,
    subTitle,
    index,
    topCountries,
    topColleges,
    metaTitle,
    metaDescription,
    ISODes,
    googleReview,
    jdReview,
    homeCounts,
    metaKey,
  } = req.body;
  const parsedMetaKey =
    typeof metaKey === "string" ? JSON.parse(metaKey) : metaKey;

  const parsedHomeCounts = typeof homeCounts === "string" ? JSON.parse(homeCounts) : homeCounts;
  const parsedGoogleReview = typeof googleReview === "string" ? JSON.parse(googleReview) : googleReview;
  const parsedJdReview = typeof jdReview === "string" ? JSON.parse(jdReview) : jdReview;

  const updatedData = {
    title,
    subTitle,
    metaTitle,
    metaDescription,
    metaKey: parsedMetaKey,
     ISODes,
    googleReview: parsedGoogleReview,
    jdReview: parsedJdReview,
    homeCounts: parsedHomeCounts,
  };
  try {
    if (!homeId) {
      return res.status(400).json({
        success: false,
        message: "Home Id is  required",
      });
    }
    const home = await Home.findById(homeId);
    const image = req.files?.image?.[0]?.location || home.image[index];
    const bottomImage =
      req.files?.bottomImage?.[0]?.location || home.bottomImage[index];
    if (image && home?.image[index]) {
      deleteFileFromObjectStorage(home.image[index]);
    }

    if (bottomImage && home?.bottomImage[index]) {
      deleteFileFromObjectStorage(home.bottomImage[index]);
    }

    const newImageArray = [...home.image];
    const newBottomImageArray = [...home.bottomImage];
    newImageArray[index] = image;
    newBottomImageArray[index] = bottomImage;

    updatedData.image = newImageArray;
    updatedData.bottomImage = newBottomImageArray;

    updatedData.topCountries =
      typeof topCountries == "string" ? JSON.parse(topCountries) : topCountries;
    updatedData.topColleges =
      typeof topColleges == "string" ? JSON.parse(topColleges) : topColleges;



const scoreBooster = [...(home.scoreBooster || [])];

for (let i = 0; i < 10; i++) {
  const title = req.body[`scoreBooster[${i}].title`];
  const description = req.body[`scoreBooster[${i}].description`];
  const imageFile = req.files?.[`scoreBooster[${i}].image`] || [];
  const newImage = imageFile[0]?.location;

  
  if (!title && !description && !newImage && !scoreBooster[i]) continue;

  
  const oldImage = scoreBooster[i]?.image;
  if (newImage && oldImage) {
    deleteFileFromObjectStorage(oldImage);
  }


  scoreBooster[i] = {
    title: title ?? scoreBooster[i]?.title ?? null,
    description: description ?? scoreBooster[i]?.description ?? null,
    image: newImage || oldImage || null,
    slug: scoreBooster[i]?.slug ?? null
  };
}


updatedData.scoreBooster = scoreBooster;

	  
	  


    const bannerTitle = req.body["homeBanner[title]"];
    const bannerDescription = req.body["homeBanner[description]"];
    const bannerImageFile = req.files?.["homeBanner[image]"] || [];
    const newBannerImage = bannerImageFile[0]?.location;

    const oldBanner = home.homeBanner || {};
    const oldBannerImage = oldBanner.image;

    if (newBannerImage && oldBannerImage && newBannerImage !== oldBannerImage) {
      deleteFileFromObjectStorage(oldBannerImage);
    }

    updatedData.homeBanner = {
      title: bannerTitle || oldBanner.title || "",
      description: bannerDescription || oldBanner.description || "",
      image: newBannerImage || oldBannerImage || "",
    };

    const data = await Home.findByIdAndUpdate(homeId, updatedData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Home Data Updated Successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






// export const updateHomePage = async (req, res) => {
//   try {
//     const { homeId } = req.body;

//     if (!homeId) {
//       return res.status(400).json({
//         success: false,
//         message: "Home ID is required"
//       });
//     }

//     const home = await Home.findById(homeId);
//     if (!home) {
//       return res.status(404).json({
//         success: false,
//         message: "Home data not found"
//       });
//     }

//     // ---------------- SAFE BODY FIELDS ----------------
//     const allowedFields = [
//       "title",
//       "subTitle",
//       "metaTitle",
//       "metaDescription",
//       "metaKey",
//       "ISODes",
//       "googleReview",
//       "jdReview",
//       "homeCounts",
//       "topCountries",
//       "topColleges"
//     ];

//     const updatedData = {};
//     for (const field of allowedFields) {
//       if (req.body[field] !== undefined) {
//         updatedData[field] = req.body[field];
//       }
//     }

//     // ---------------- FILE MAP ----------------
//     const fileMap = {};
//     req.files.forEach(file => {
//       fileMap[file.fieldname] = file.location;
//     });

//     /* ---- Dynamic scoreBooster Update ---- */
//     if (req.body.scoreBoosterIndex !== undefined) {
//       const index = Number(req.body.scoreBoosterIndex);
//       const boosters = [...(home.scoreBooster || [])];

//       boosters[index] = {
//         title: req.body["scoreBooster.title"] ?? boosters[index]?.title,
//         description: req.body["scoreBooster.description"] ?? boosters[index]?.description,
//         image: fileMap[`scoreBooster[${index}].image`] || boosters[index]?.image,
//         slug: boosters[index]?.slug // preserve slug
//       };

//       updatedData.scoreBooster = boosters;
//     }

//     /* ---- Dynamic image Update ---- */
//     if (req.body.imageIndex !== undefined) {
//       const idx = Number(req.body.imageIndex);
//       const images = [...home.image];
//       images[idx] = fileMap["image"] || images[idx];
//       updatedData.image = images;
//     }

//     /* ---- Dynamic bottomImage Update ---- */
//     if (req.body.bottomImageIndex !== undefined) {
//       const idx = Number(req.body.bottomImageIndex);
//       const bottoms = [...home.bottomImage];
//       bottoms[idx] = fileMap["bottomImage"] || bottoms[idx];
//       updatedData.bottomImage = bottoms;
//     }

//     /* ---- Dynamic homeBanner Update ---- */
//     if (
//       req.body["homeBanner.title"] !== undefined ||
//       req.body["homeBanner.description"] !== undefined ||
//       fileMap["homeBanner[image]"]
//     ) {
//       updatedData.homeBanner = {
//         title: req.body["homeBanner.title"] ?? home.homeBanner?.title ?? "",
//         description: req.body["homeBanner.description"] ?? home.homeBanner?.description ?? "",
//         image: fileMap["homeBanner[image]"] || home.homeBanner?.image || ""
//       };
//     }

//     const updatedHome = await Home.findByIdAndUpdate(homeId, updatedData, {
//       new: true
//     });

//     return res.json({
//       success: true,
//       message: "Home Data Updated Successfully",
//       data: updatedHome
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };


