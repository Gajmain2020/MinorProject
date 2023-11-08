import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import Students from "../models/student.js";
import Teachers from "../models/teacher.js";

export const getStudentDetails = async (req, res) => {
  const { urn } = req.query;
  try {
    const student = await Students.findOne({ urn });
    if (!student) {
      return res.status(404).json({
        message: `Student with URN '${urn}' not found.`,
        success: false,
      });
    }
    return res.status(200).json({
      data: {
        name: student.name,
        urn: student.urn,
        department: student.department,
        phoneNumber: student.phoneNumber,
        email: student.email,
      },
      message: `Student with URN ${urn} found.`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};

export const loginStudent = async (req, res) => {
  try {
    const data = req.body;
    const user = await Students.findOne({ email: data.email });
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
        userType: "student",
        name: user.name,
        department: user.department,
      },
      process.env.JWT_SECRET_KEY_STUDENT,
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

export const fetchStudentDetails = async (req, res) => {
  try {
    const urn = req.query.urn;
    const studentInDB = await Students.findOne({ urn });
    if (!studentInDB) {
      return res.status(404).json({
        message: "Student with given URN is not found. Please try again.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Student with given URN is found.",
      student: studentInDB,
      success: true,
    });
  } catch (error) {
    console.log("Database Error: " + error);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};

export const saveStudentDetails = async (req, res) => {
  try {
    const { image, details, student } = req.body;
    const studentInDB = await Students.findById(student._id);
    studentInDB.detailsFilled = true;
    studentInDB.details = { ...details, profilePhoto: image };
    await studentInDB.save();

    const tg = studentInDB.TG;

    const tgInDB = await Teachers.findOne({ empId: tg.split("-")[1] });

    tgInDB.TGOf = tgInDB.TGOf.map((t) => {
      if (t.urn === studentInDB.urn) {
        return { ...t, detailsFilled: true };
      }
      return t;
    });
    await tgInDB.save();

    return res.status(200).json({
      message:
        "Your data have been saved successfully. Waiting for verification.",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};
