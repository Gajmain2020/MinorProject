import mongoose from "mongoose";

const reqString = { type: String, required: true };

const studentSchema = mongoose.Schema({
  name: reqString,
  department: reqString,
  email: reqString,
  urn: reqString,
  password: reqString,
  phoneNumber: reqString,
  semester: String,
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export default mongoose.model("Student", studentSchema);
