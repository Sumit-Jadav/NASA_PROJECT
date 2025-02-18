import mongoose from "mongoose";

const planetsSchema = new mongoose.Schema({
  kepler_name: {
    type: String,
    required: true,
  },
});

//! Connect planetsSchema with planets collection
export default mongoose.model("Planet", planetsSchema);
