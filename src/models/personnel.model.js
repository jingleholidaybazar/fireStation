import mongoose from "mongoose";
const personnelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  badge: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
});
const personnel = mongoose.model("Personnel", personnelSchema);
export { personnel };
