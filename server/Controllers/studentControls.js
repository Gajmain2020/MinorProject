import Students from "../models/student.js";

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
