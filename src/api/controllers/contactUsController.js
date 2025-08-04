import Contact from '../../models/contactUsModel.js';

export const getAllContact = async (req, res) => {
 try {
    const { search, page = 1, limit = 10 } = req.query;
    const query = search
      ? {
          $or: [
            { firstName: { $regex: search, $options: 'i' } },
            { lastName: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
            { message: { $regex: search, $options: 'i' } },
            { metaTitle: { $regex: search, $options: 'i' } },
            { metaDescription: { $regex: search, $options: 'i' } },
            { metaKey: { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Contact.countDocuments(query);
    const contactData = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      message: "Filtered contacts fetched successfully",
      data: contactData,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getByIdContact = async (req, res) => {
  try {
    const { contactId } = req.query;
    if (!contactId) return res.status(400).json({ message: 'contactId is required' });

    const contactData = await Contact.findById(contactId);
    if (!contactData) return res.status(404).json({ message: 'Contact not found' });

    res.status(200).json({success:true,message:"Fetched contactUs successfully",data:contactData});
  } catch (error) {
    res.status(500).json({ success:false, error:error.message });
  }
};

export const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ message: 'First name, last name, email, and message are required' });
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (phone && !/^\+?[\d\s-]{10,}$/.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }
    
    const contactData = await Contact.create({
      firstName, lastName, email, phone, message 
    })
   
    res.status(201).json({ message: 'Contact created successfully',data:contactData });
  } catch (error) {
    res.status(500).json({ success:true, error:error.message });
  }
};