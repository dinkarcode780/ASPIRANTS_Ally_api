import mongoose  from "mongoose";

const appointmentSchema = mongoose.Schema({

   name: {
     type: String,
     trim: true, 
     },
   number: {
   type: Number,
   trim: true,
   },
  email: {
   type: String,
  trim: true, 
 },
	
  state: {
	  type: mongoose.Schema.Types.ObjectId,
    ref:"State"
  },
	
  sessionType: {
    type: String,
    enum: ['Office Visit', 'On Call', 'Video Call'],
    required: true,
  },
	 status: {
    type: String,
    enum: ['Pending', 'Schedule', 'Completed'],
    default: 'Pending',
  },
  type: {
    type: String,
    enum: ['UG', 'PG'],
    required: true,
  },
     metaTitle: {
    type: String,
    trim: true,
  },
  metaDescription: {
    type: String,
    trim: true,
  },
  metaKey: {
    type: [String],
    default: [],
  },
  bookedAt: { type: Date, default: Date.now }


}, 
{timestamps:true}
)

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;




