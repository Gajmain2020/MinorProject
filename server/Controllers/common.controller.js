import Complains from "../models/complains.model.js";

export const postComplaint = async (req, res) => {
  try {
    const postExists = await Complains.findOne({
      ...req.body,
      resolved: false,
    });
    if (postExists) {
      return res.status(403).json({
        success: false,
        message: "The given complain intactly exists in the database.",
      });
    }
    await Complains.create({ ...req.body });

    return res.status(200).json({
      message: "Complain raised successfully. Have a nice day!!!",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};
