import mongoose from "mongoose";

const reqString = { type: String, required: true };

const teacherGuardianSchema = new mongoose.Schema(
  {
    teacherId: reqString,
    teacherEmpId: reqString,
    teacherName: reqString,

    studentsUnderTG: [
      {
        urn: String,
        id: String,
        name: String,
        semester: String,
        section: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Teacher Guardian", teacherGuardianSchema);
