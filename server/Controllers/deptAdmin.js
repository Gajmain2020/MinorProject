import Teachers from "../models/teacher.js";
import Students from "../models/student.js";

//! TG CONTROLLER
export const fetchDeptTeacher = async (req, res) => {
  const department = req.params.dept;
  try {
    const teachers = await Teachers.find({ department });
    const teachersToSend = [];
    for (let i = 0; i < teachers.length; i++) {
      teachersToSend.push({
        name: teachers[i].name,
        department: teachers[i].department,
        isTG: teachers[i].isTG ? teachers[i].isTG : false,
        empId: teachers[i].empId,
        email: teachers[i].email,
      });
    }
    return res.status(200).json({
      teachers: teachersToSend,
      message: "Teachers sent successfully.",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};
export const assignSingleTG = async (req, res) => {
  try {
    const teacher = req.body;
    const dbTeacher = await Teachers.findOne({ empId: teacher.empId });
    if (!dbTeacher) {
      return res
        .status(404)
        .json({ message: "Teacher not found", success: false });
    }
    dbTeacher.isTG = true;
    dbTeacher.save();
    return res.status(200).json({
      message: `Teacher with Emp ID ${teacher.empId} has been successfully assigned as TG.`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};
export const assignMultipleTG = async (req, res) => {
  try {
    const teachers = req.body;
    for (let i = 0; i < teachers.length; i++) {
      const dbTeacher = await Teachers.findOne({ empId: teachers[i].empId });
      if (!dbTeacher) {
        return res
          .status(404)
          .json({ message: "Teacher not found", success: false });
      }
      dbTeacher.isTG = true;
      dbTeacher.save();
    }
    return res.status(200).json({
      message: `${teachers.length} Teachers assigned as TG.`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};
export const removeSingleTG = async (req, res) => {
  try {
    const teacher = req.body;
    const dbTeacher = await Teachers.findOne({ empId: teacher.empId });
    if (!dbTeacher) {
      return res
        .status(404)
        .json({ message: "Teacher not found", success: false });
    }
    dbTeacher.isTG = false;
    dbTeacher.save();
    return res.status(200).json({
      message: `Teacher with Emp ID ${teacher.empId} has been successfully removed as TG.`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};
export const removeMultipleTG = async (req, res) => {
  try {
    const teachers = req.body;
    for (let i = 0; i < teachers.length; i++) {
      const dbTeacher = await Teachers.findOne({ empId: teachers[i].empId });
      if (!dbTeacher) {
        return res
          .status(404)
          .json({ message: "Teacher not found", success: false });
      }
      dbTeacher.isTG = false;
      dbTeacher.save();
    }
    return res.status(200).json({
      message: `${teachers.length} Teachers removed as TG.`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};
export const fetchDeptTGs = async (req, res) => {
  try {
    const dept = await req.params.dept;
    const tgs = await Teachers.find({ department: dept, isTG: true });
    const tgsToSend = [];
    for (let i = 0; i < tgs.length; i++) {
      tgsToSend.push({
        name: tgs[i].name,
        department: tgs[i].department,
        empId: tgs[i].empId,
        email: tgs[i].email,
      });
    }
    return res.status(200).json({
      tgs: tgsToSend,
      message: "TGs sent successfully.",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};

//! Student CONTROLLER
export const fetchDeptStudents = async (req, res) => {
  try {
    const dept = req.params.dept;
    const dbStudents = await Students.find({ department: dept });
    const students = [];
    for (let i = 0; i < dbStudents.length; i++) {
      students.push({
        name: dbStudents[i].name,
        department: dbStudents[i].department,
        urn: dbStudents[i].urn,
        tgAssigned: dbStudents[i].TG,
        email: dbStudents[i].email,
        semester: dbStudents[i].semester,
        section: dbStudents[i].section,
        crn: dbStudents[i].crn,
      });
    }
    return res.status(200).json({
      message: "Students sent successfully....",
      students,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};
export const assignTgToStudents = async (req, res) => {
  try {
    console.log(req.body);
    const students = req.body.selectedStudents;
    const commonTG = req.body.commonTG;
    const name = commonTG.split("-")[0];
    const empId = commonTG.split("-")[1];
    const addToTeacher = [];
    const teacherInDB = await Teachers.findOne({ empId });
    for (let i = 0; i < students.length; i++) {
      const studentInDB = await Students.findOneAndUpdate(
        { urn: students[i].urn },
        { TG: commonTG }
      );
      // await studentInDB.save();
      addToTeacher.push({
        name: students[i].name,
        email: students[i].email,
        department: students[i].department,
        urn: students[i].urn,
        section: students[i].section,
        classRollNumber: students[i].classRollNumber,
        semester: students[i].semester,
        year: students[i].year,
      });
      // await studentInDB.save();
    }
    teacherInDB.TGOf = [...teacherInDB.TGOf, ...addToTeacher];
    await teacherInDB.save();
    return res.status(200).json({
      message: `${name} has been assigned as TG for ${students.length} student(s).`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};
export const assignTgToStudent = async (req, res) => {
  try {
    const student = req.body.student;
    const commonTG = req.body.student.selectedTG;

    const empId = commonTG.split("-")[1];
    const name = commonTG.split("-")[0];

    const prevTG = student.tgAssigned;
    if (prevTG !== null && prevTG !== "") {
      const prevTGInDB = await Teachers.findOne({
        empId: prevTG.split("-")[1],
      });
      const temp = prevTGInDB.TGOf;
      prevTGInDB.TGOf = [];
      prevTGInDB.TGOf = temp.filter((st) => st.urn !== student.urn);
      await prevTGInDB.save();
    }

    //* adding tg to student database
    const studentInDB = await Students.findOneAndUpdate(
      { urn: student.urn },
      { TG: commonTG }
    );
    if (!studentInDB) {
      return res.status(404).json({
        message: "Specified student or teacher is not found. Please try again.",
        success: false,
      });
    }

    //* adding student to teacher database
    const teacherInDB = await Teachers.findOne({ empId });
    const addToTeacher = {
      name: student.name,
      email: student.email,
      department: student.department,
      urn: student.urn,
      crn: student.crn,
      section: student.section,
      classRollNumber: student.classRollNumber,
      semester: student.semester,
      year: student.year,
    };
    teacherInDB.isTG = true;
    teacherInDB.TGOf = [...teacherInDB.TGOf, { ...addToTeacher }];
    teacherInDB.save();

    return res.status(200).json({
      message: `${name} has been assigned as TG for ${student.name}.`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};
