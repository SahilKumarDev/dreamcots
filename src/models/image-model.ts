import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  publicId: { type: String, required: true },
  url: { type: String, required: true },
  format: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.models.Image || mongoose.model("Image", ImageSchema);
export default Image;
