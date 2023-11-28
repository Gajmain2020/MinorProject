import mongoose from "mongoose";

const complainSchema = mongoose.Schema({
  complainText: String,
  department: String,
  email: String,
  phoneNumber: String,
  name: String,
  resolved: { type: Boolean, default: false },
  userType: String,

  postedAt: { type: Date, default: new Date() },
  resolvedAt: Date,
});

export default mongoose.model("Complain", complainSchema);
