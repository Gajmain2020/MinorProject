import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Teachers from "../models/teacher.js";
import Students from "../models/student.js";

export const loginTeacher = async (req, res) => {
  try {
    const data = req.body;
    const user = await Teachers.findOne({ email: data.email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid Credentials. Please try again.",
        success: false,
      });
    }
    const passCheck = await bcrypt.compare(data.password, user.password);
    if (!passCheck) {
      return res.status(403).json({
        message: "Invalid Credentials. Please try again.",
        success: false,
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        userType: "teacher",
        name: user.name,
        department: user.department,
      },
      process.env.JWT_SECRET_KEY_TEACHER,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "Login Successful.",
      success: true,
      department: user.department,
      id: user._id,
      token,
    });
  } catch (error) {
    console.log(`err`, error);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};
export const fetchStudentByTG = async (req, res) => {
  try {
    const id = req.params.id;
    const teacherInDB = await Teachers.findOne({ _id: id });
    if (!teacherInDB) {
      return res.status(404).json({
        message: "Teacher with specified ID not found.",
        success: true,
      });
    }
    return res.status(200).json({
      message: "Students sent successfully.",
      students: teacherInDB.TGOf,
      tg: teacherInDB.name + "-" + teacherInDB.empId,
      success: true,
    });
  } catch (error) {
    console.log(`error`, error);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};

export const validateMultipleStudents = async (req, res) => {
  try {
    const { selectedStudents, TG } = req.body;
    const tgId = TG.split("-")[1];
    for (let i = 0; i < selectedStudents.length; i++) {
      const studentInDB = await Students.findOne({
        urn: selectedStudents[i].urn,
      });
      studentInDB.isVerified = true;
      await studentInDB.save();
    }
    const tgInDB = await Teachers.findOne({ empId: tgId });
    const temp = tgInDB.TGOf;
    tgInDB.TGOf = [];
    console.log("selected Student", selectedStudents);
    console.log("temp", temp);
    tgInDB.TGOf = temp.map((st) => {
      if (selectedStudents.includes(st)) {
        return { ...st, isVerified: true };
      }
      return st;
    });
    await tgInDB.save();
    return res.status(200).json({
      message: `${selectedStudents.length} has been verified successfully.`,
      success: true,
    });
  } catch (error) {
    console.log(`err`, error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};
export const validateSingleStudent = async (req, res) => {
  try {
    const { student, TG } = req.body;
    const tgId = TG.split("-")[1];
    const studentInDB = await Students.findOne({ urn: student.urn });
    studentInDB.isVerified = true;
    await studentInDB.save();
    const tgInDB = await Teachers.findOne({ empId: tgId });

    const temp = tgInDB.TGOf;
    tgInDB.TGOf = [];
    tgInDB.TGOf = temp.map((st) => {
      if (st.urn === student.urn) {
        return { ...st, isVerified: true };
      }
      return st;
    });
    await tgInDB.save();
    return res.status(200).json({
      message: `${student.name} has been verified successfully.`,
      success: true,
    });
  } catch (error) {
    console.log(`err`, error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

export const fetchClasses = async (req, res) => {
  try {
    const id = req.query.id;
    const teacherInDB = await Teachers.findById(id);
    if (!teacherInDB) {
      return res
        .status(404)
        .json({ message: "No Teacher found with given id.", success: false });
    }
    return res.status(200).json({
      message: "Classes sent successfully.",
      classes: teacherInDB.classesTaken,
      success: true,
    });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};

export const fetchStudents = async (req, res) => {
  try {
    const { dept, semester, section } = req.query;
    console.log(dept, semester, section);

    const students = await Students.find({
      department: dept,
      section: "A",
    });
    console.log(students);
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};
