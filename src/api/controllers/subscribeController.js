import Subscribe from '../../models/subscribeModel.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const getAll = async (req, res) => {
  try {
    const subscribers = await Subscribe.find();
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createSubcribe = async (req, res) => {
  try {
    const { email, metaTitle,metaDescription,metaKey } = req.body;
     const parsedMetaKey = typeof metaKey ==="string"? JSON.parse(metaKey):metaKey;


    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const existingSubscriber = await Subscribe.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    const subscriber = new Subscribe({ email, metaTitle,metaDescription,metaKey:parsedMetaKey });
    await subscriber.save();
    res.status(201).json({ message: 'Subscribed successfully', subscriber });
  } catch (error) {
    res.status(500).json({sucess:false, error:error.message});
  }
};



export const getSubCribeById = asyncHandler(async(req,res)=>{
  
     const {subscribeId}=req.query  

      if (!subscribeId) {
    return res.status(400).json({ success: false, message: "subscribeId is required" });
  }

     const subscribeDta = await Subscribe.findById(subscribeId);

     res.status(200).json({success:true,message:"Fetched subscribe data sucessfully",data:subscribeDta})
})

export const unSubsctribe = asyncHandler(async(req,res)=>{

  const {subscribeId} = req.query;

 if (!subscribeId) {
    return res.status(400).json({ success: false, message: "subscribeId is required" });
  }
  const unSubscribeData = await Subscribe.findByIdAndDelete(subscribeId);
 
   if (!unSubscribeData) {
    return res.status(404).json({ success: false, message: "Subscriber not found" });
  }

  res.status(200).json({ success:true,message:"Unsubscribe successfully",data:unSubscribeData});

});

