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
      section: String,
      classRollNumber: String,
      email: String,
    },
  ],
  subjectsTaken: [
    {
      subjectName: String,
      semester: String,
    },
  ],
  isTG: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export default mongoose.model("Teacher", teacherSchema);
