import Session from '../../models/appointmentModel.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const getAllAppointment = async (req, res) => {
  try {
    const sessions = await Session.find().populate("state");
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getByIdAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.query;
    if (!appointmentId) return res.status(400).json({ message: 'appointmentId is required' });

    const session = await Session.findById(appointmentId);
    if (!session) return res.status(404).json({ message: 'Session not found' });

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const { name, number, email, state, sessionType, type } = req.body;
    console.log("req.body",req.body);

    if (!name || !number || !email || !state || !sessionType || !type) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!/^\+?[\d\s-]{10,}$/.test(number)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }

    if (!['Office Visit', 'On Call', 'Video Call'].includes(sessionType)) {
      return res.status(400).json({ message: 'Invalid session type' });
    }

    if (!['UG', 'PG'].includes(type)) {
      return res.status(400).json({ message: 'Invalid type (must be UG or PG)' });
    }

    const session = new Session({ name, number, email, state, sessionType, type });
    await session.save();
    res.status(201).json({ message: 'Session booked successfully', session });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateAppointMentStatus = asyncHandler(async(req,res)=>{

  const { appointmentId, status } = req.body;

  if (!appointmentId || !status) {
    return res.status(400).json({
      success: false,
      message: "appointmentId and status are required",
    });
  }

  const appointment = await Session.findById(appointmentId);

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: "Appointment not found",
    });
  }
  
   appointment.status = status;

   await appointment.save();

   res.status(200).json({success:true,message:"updateAppointMentStatus successfully",data:appointment})

})
