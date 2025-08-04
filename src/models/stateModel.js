import mongoose from "mongoose";
const stateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
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

const State = mongoose.model("State", stateSchema);

export default State;