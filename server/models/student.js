import mongoose from "mongoose";

const reqString = { type: String, required: true };

const studentSchema = mongoose.Schema({
  name: reqString,
  department: reqString,
  email: reqString,
  urn: reqString,
  password: reqString,
  phoneNumber: String,
  year: String,
  semester: String,
  section: String,
  crn: String,
  TG: { type: String, default: "" },
  isVerified: { type: Boolean, default: false },
  libraryCurrentIssues: [
    {
      bookId: String,
      bookName: String,
      bookIssueDate: Date,
    },
  ],
  libraryIssues: [
    {
      bookId: String,
      bookName: String,
      bookIssueDate: Date,
      bookReturnDate: Date,
      fine: Number,
    },
  ],
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export default mongoose.model("Student", studentSchema);
