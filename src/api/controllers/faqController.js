import Faq from "../../models/faqModel.js";

export const createFAQ = async(req,res)=>{
const {question, answer}= req.body;
try{
if(!question || !answer){
    return res.status(400).json({
        success:false,
        message:"All Fields are required !"
    })
}

const data = await Faq.create({question, answer});

return res.status(201).json({
    success:true,
    message:"FAQ created successfully.",
    data:data
})

}catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}

export const getAllFAQ = async(req,res)=>{
    const {page=1, limit=10, sort=-1} = req.query;
    const skip = (Number(page)-1)*limit;
    try{

        const data = await Faq.find().sort({createdAt:parseInt(sort)}).skip(skip).limit(limit);
        const total = await Faq.countDocuments();

        return res.status(200).json({
            success:true,
            message:"All FAQ Fetched Successfully.",
            data:data,
            currentPage:Number(page),
            page:Math.ceil(total/limit)
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const getFAQById = async(req,res)=>{
    const {faqId} = req.query;
    try{
        if(!faqId){
            return res.status(400).json({
                success:false,
                message:"faqId is required !"
            })
        }

        const faq = await Faq.findById(faqId);
        if(!faq){
            return res.status(404).json({
                success:false,
                message:"INVALID CREDENTIAL"
            })
        }

        return res.status(200).json({
            success:true,
            message:"FAQ Fetched Successfully.",
            data:faq
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


export const updateFaq = async(req,res)=>{
    const {faqId, question, answer} = req.body;
    try{
        if(!faqId){
            return res.status(400).json({
                success:false,
                message:"faqId is required !"
            })
        }

        const faq = await Faq.findById(faqId);
        if(!faq){
            return res.status(404).json({
                success:false,
                message:"FAQ not found !"
            })
        }

        faq.question = question || faq.question;
        faq.answer = answer || faq.answer;

        await faq.save();

        return res.status(200).json({
            success:true,
            message:"FAQ Updated Successfully.",
            data:faq
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


export const deleteFaq = async(req,res)=>{
    const {faqId} = req.query;
    try{
        if(!faqId){
            return res.status(400).json({
                success:false,
                message:"faqId is required !"
            })
        }

        const faq = await Faq.findByIdAndDelete(faqId);
        if(!faq){
            return res.status(404).json({
                success:false,
                message:"FAQ not found !"
            })
        }

        return res.status(200).json({
            success:true,
            message:"FAQ Deleted Successfully.",
            data:faq
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}


export const disableFaq = async(req,res)=>{
    const {faqId} = req.query;
    try{
        if(!faqId){
            return res.status(400).json({
                success:false,
                message:"faqId is required !"
            })
        }

        const faq = await Faq.findById(faqId);
        if(!faq){
            return res.status(404).json({
                success:false,
                message:"FAQ not found !"
            })
        }

        faq.disable = !faq.disable;
        await faq.save();

        return res.status(200).json({
            success:true,
            message: faq.disable ? "FAQ Disabled Successfully." : "FAQ Enabled Successfully.",
            data:faq
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}
