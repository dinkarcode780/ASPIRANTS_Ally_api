import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State", 
    },
    image: {
      type: String,
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
  },
  { timestamps: true }
);

const City = mongoose.model("City", citySchema);

export default City;