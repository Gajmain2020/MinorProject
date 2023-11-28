import mongoose from "mongoose";

const reqString = { type: String, required: true };
const uniqueReqString = { type: String, required: true, unique: true };

const adminSchema = mongoose.Schema({
  name: reqString,
  department: reqString,
  email: uniqueReqString,
  empId: uniqueReqString,
  password: reqString,
  phoneNumber: reqString,
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export default mongoose.model("Admin", adminSchema);
