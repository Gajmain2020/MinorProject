import mongoose from "mongoose";

const reqString = { type: String, required: true };

const studentSchema = mongoose.Schema({
  name: reqString,
  department: reqString,
  email: reqString,
  crn: String,
  urn: reqString,
  password: reqString,
  semester: String,
  section: String,
  TG: { type: String, default: "" },

  detailsFilled: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },

  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export default mongoose.model("Student", studentSchema);
