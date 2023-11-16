import mongoose from "mongoose";

const timeTableSchema = new mongoose.Schema(
  {
    section: String,
    semester: String,
    department: String,
    time_table: [
      {
        day: String,
        details: [
          {
            subject: String,
            teacher: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("TimeTable", timeTableSchema);
