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
      crn: String,
      section: String,
      classRollNumber: String,
      email: String,
      detailsFilled: { type: Boolean, default: false },
      isVerified: { type: Boolean, default: false },
    },
  ],
  subjectsTaken: [
    {
      subjectName: String,
      subjectCode: String,
      semester: String,
    },
  ],
  classesTaken: [
    {
      subjectShortName: String,
      semester: String,
      section: String,
    },
  ],
  isTG: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export default mongoose.model("Teacher", teacherSchema);
