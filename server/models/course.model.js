import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
  courseName: { type: String, required: true },
  courseShortName: { type: String, required: true },
  taughtBy: [
    {
      teacherName: String,
      teacherId: String,
    },
  ],
  semester: {
    type: String,
    required: true,
    enum: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"],
  },
  department: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export default mongoose.model("Course", courseSchema);
