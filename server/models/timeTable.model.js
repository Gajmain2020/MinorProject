import mongoose from "mongoose";

const timeTableSchema = new mongoose.Schema(
  {
    section: String,
    semester: String,
    department: String,
    time_table: [
      {
        timeSlot: String,
        subject: String,
        teacher: String,
        subjectCode: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("TimeTable", timeTableSchema);
