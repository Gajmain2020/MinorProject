import mongoose from "mongoose";

const reqString = { type: String, required: true };

const teacherSchema = mongoose.Schema({
  name: reqString,
  department: reqString,
  email: reqString,
  empId: reqString,
  password: reqString,
  phoneNumber: String,
  TGOf: [
    {
      name: String,
      urn: String,
      semester: String,
      year: String,
      department: String,
      email: String,
    },
  ],
  subjectsTaken: [
    {
      subjectName: String,
      semester: String,
    },
  ],
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export default mongoose.model("Teacher", teacherSchema);
