import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import { isValidObjectId } from "mongoose";

export const signUp = async (req, res) => {
  try {
    const data = req.body;
    if (data.secretKey !== process.env.SECRET_ADMIN_SIGNUP) {
      return res.status(403).json({
        message: "Given key is not correct. Please try again.",
        success: false,
      });
    }
    const admin = await Admin.findOne({ email: data.email });

    if (admin) {
      return res.status(403).json({
        message: "Given credentials are not allowed or they already exists.",
        success: false,
      });
    }
    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = await Admin.create({
      email: data.email,
      name: data.name,
      password: hashPassword,
      department: data.department,
      empId: data.empId,
      phoneNumber: data.phoneNumber,
    });

    const token = jwt.sign(
      { id: user._id, userType: "Admin", name: user.name },
      process.env.JWT_SECRET_KEY_ADMIN,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "Sign Up Successful.",
      success: true,
      id: user._id,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const data = req.body;
    const user = await Admin.findOne({ email: data.email });
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
        userType: "Admin",
        name: user.name,
        department: user.department,
      },
      process.env.JWT_SECRET_KEY_ADMIN,
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
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};

export const getDetails = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res
        .status(403)
        .json({ message: "Invalid ID provided.", success: false });
    }
    const user = await Admin.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", successful: false });
    }
    return res.status(200).json({
      id: user._id,
      name: user.name,
      department: user.department,
      phoneNumber: user.phoneNumber,
      empId: user.empId,
      email: user.email,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const userDetails = await Admin.findById(req.body.id);
    const isPassworMatch = await bcrypt.compare(
      req.body.password,
      userDetails.password
    );
    if (!isPassworMatch) {
      return res.status(400).json({
        message: "Invalid credentials. Please try again.",
        success: false,
      });
    }
    if (req.body.email !== "" && userDetails.email !== req.body.email) {
      userDetails.email = req.body.email;
      userDetails.updatedAt = new Date();
    }
    if (req.body.name !== "" && userDetails.name !== req.body.name) {
      userDetails.name = req.body.name;
      userDetails.updatedAt = new Date();
    }
    if (req.body.phoneNo !== "" && userDetails.phoneNo !== req.body.phoneNo) {
      userDetails.phoneNo = req.body.phoneNo;
      userDetails.updatedAt = new Date();
    }
    if (req.body.department !== userDetails.department) {
      userDetails.department = req.body.department;
      userDetails.updatedAt = new Date();
    }
    if (req.body.empId !== userDetails.empId) {
      userDetails.empId = req.body.empId;
      userDetails.updatedAt = new Date();
    }

    if (req.body.newPassword && req.body?.newPassword !== "") {
      userDetails.password = await bcrypt.hash(req.body.newPassword, 10);
      userDetails.updatedAt = new Date();
    }

    const token = jwt.sign(
      {
        userType: "admin",
        id: userDetails._id,
        department: userDetails.department,
        name: userDetails.name,
      },
      process.env.JWT_SECRET_KEY_ADMIN,
      { expiresIn: "1h" }
    );

    await userDetails.save();

    return res
      .status(200)
      .json({ token, message: "User updated successfully.", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
      success: false,
    });
  }
};
