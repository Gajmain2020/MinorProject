import mongoose from "mongoose";

const reqString = { type: String, required: true };

const studentDetailsSchema = mongoose.Schema(
  {
    studentId: reqString,
    studentUrn: reqString,

    //details are listed below
    dob: Date,
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    admissionNumber: String,
    gender: String,
    studentMobileNumber: String,
    motherName: String,
    motherMobileNumber: String,
    fatherName: String,
    fatherMobileNumber: String,
    aadharNumber: String,
    category: String,
    permanentAddress: String,
    profilePhoto: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Student Detail", studentDetailsSchema);
