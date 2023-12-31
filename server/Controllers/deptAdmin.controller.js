import Teachers from "../models/teacher.model.js";
import Students from "../models/student.model.js";
import Courses from "../models/course.model.js";
import TimeTables from "../models/timeTable.model.js";

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
        subjectsTaken: teachers[i].subjectsTaken,
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

//!! course controllers
export const addCourse = async (req, res) => {
  try {
    const data = req.body;
    const courseExisting = await Courses.findOne({
      courseCode: data.courseCode,
    });

    if (courseExisting) {
      return res.status(403).json({
        message: `Course with code ${data.courseCode} already exists in the database.`,
        success: false,
      });
    }
    await Courses.create({ ...data });
    return res.status(200).json({
      message: `Course with code ${data.courseCode} has been added successfully.`,
      success: true,
    });
  } catch (error) {
    console.error("SERVER ERROR", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};

export const fetchCoursesByDept = async (req, res) => {
  try {
    const dept = req.query.dept;
    const courses = await Courses.find({ department: dept });
    return res.status(200).json({
      message: "Courses Sent Successfully.",
      courses,
      success: true,
    });
  } catch (error) {
    console.log("SERVER ERROR", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const id = req.query.courseId;
    const course = await Courses.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: `${course.courseName} course deleted successfully.`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const course = req.body;
    const courseInDB = await Courses.findByIdAndUpdate(course._id);
    if (course.courseCode !== courseInDB.courseCode) {
      const isCourseCodeTaken = await Courses.findOne({
        courseCode: course.courseCode,
      });
      if (isCourseCodeTaken) {
        return res.status(403).json({
          success: false,
          message: `Course ${course.courseCode} is already existing in database. Try different Course Code.`,
        });
      }
      courseInDB.courseCode = course.courseCode;
      courseInDB.courseName = course.courseName;
      courseInDB.courseShortName = course.courseShortName;
      courseInDB.semester = course.semester;
      courseInDB.updatedAt = new Date();
      await courseInDB.save();
      return res.status(200).json({
        success: true,
        message: `Course ${course.courseCode} has been updated successfully.`,
      });
    }
    if (course.courseCode === courseInDB.courseCode) {
      courseInDB.courseName = course.courseName;
      courseInDB.courseShortName = course.courseShortName;
      courseInDB.semester = course.semester;
      courseInDB.updatedAt = new Date();
      await courseInDB.save();
      return res.status(200).json({
        success: true,
        message: `Course ${course.courseCode} has been updated successfully.`,
      });
    }
  } catch (error) {
    console.error("ERROR::::", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
    });
  }
};

export const addTeacherToCourse = async (req, res) => {
  try {
    const courseId = req.query.courseId;

    const teachers = req.body;
    const courseInDB = await Courses.findById(courseId);

    let taughtBy = courseInDB.taughtBy;

    for (let i = 0; i < teachers.length; i++) {
      if (
        !taughtBy.includes({
          teacherName: teachers[i].name,
          teacherId: teachers[i].empId,
        })
      ) {
        taughtBy = [
          ...taughtBy,
          {
            teacherName: teachers[i].name,
            teacherId: teachers[i].empId,
          },
        ];
      }

      const teacherInDB = await Teachers.findOne({
        empId: teachers[i].empId,
      });
      teacherInDB.subjectsTaken = [
        ...teacherInDB.subjectsTaken,
        {
          subjectName: courseInDB.courseName,
          subjectCode: courseInDB.courseCode,
          semester: courseInDB.semester,
        },
      ];
      await teacherInDB.save();
    }
    courseInDB.taughtBy = taughtBy;
    await courseInDB.save();
    return res.status(200).json({
      message: `${teachers.length} has been assigned as teacher for ${courseInDB.courseCode}`,
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

export const getTimeTable = async (req, res) => {
  try {
    const { section, semester, department } = req.query;
    const timeTableInDB = await TimeTables.findOne({
      semester,
      section,
      department,
    });
    if (!timeTableInDB) {
      return res.status(404).json({
        message: "No time table for give data. Create One Now.",
        success: true,
        timeTableExists: false,
      });
    }
    return res.status(200).json({
      message: "Time table exists for the given data.",
      timeTable: timeTableInDB,
      success: true,
      timeTableExists: true,
    });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again",
      success: false,
    });
  }
};

export const getCoursesByDeptAndSemester = async (req, res) => {
  try {
    const { semester, department } = req.query;

    const coursesInDB = await Courses.find({
      semester,
      department,
    });
    return res.status(200).json({
      courses: coursesInDB,
      success: true,
      message: "Courses sent successfully",
    });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TIME_SLOT = [
  "10:00 - 10:50",
  "10:50 - 11:40",
  "11:40 - 12:30",
  "12:30 - 01:20",
  "02:10 - 03:00",
  "03:00 - 03:50",
  "03:50 - 04:40",
];

export const addTimeTableToDB = async (req, res) => {
  try {
    const { semester, department, section } = req.query;
    const timeTable = req.body;
    const reconstructedTimeTable = [];

    //formatting the json for database
    for (let i = 0; i < DAYS.length; i++) {
      const tt = { day: DAYS[i], details: [] };
      for (let j = 0; j < timeTable[i].length; j++) {
        if (i === 0 && j === 4) continue;

        const teacherInDB = await Teachers.findOne({
          empId: timeTable[i][j].teacherId,
        });

        let classExists = false;
        for (let k = 0; k < teacherInDB.classesTaken.length; k++) {
          if (
            teacherInDB.classesTaken[k].subjectShortName ===
              timeTable[i][j].subjectShortName &&
            teacherInDB.classesTaken[k].semester === semester &&
            teacherInDB.classesTaken[k].section === section
          ) {
            classExists = true;
            break;
          }
        }

        if (!classExists) {
          teacherInDB.classesTaken.push({
            subjectShortName: timeTable[i][j].subjectShortName,
            semester,
            section,
          });
          await teacherInDB.save();
        }

        tt.details = [
          ...tt.details,
          {
            subject: timeTable[i][j].subjectShortName,
            teacher: timeTable[i][j].teacherName,
          },
        ];
      }
      reconstructedTimeTable.push(tt);
    }
    const timeTableInDB = await TimeTables.create({
      semester,
      section,
      department,
      time_table: reconstructedTimeTable,
    });
    return res.status(200).json({
      message: "Time Table created successfully.",
      timeTable: timeTableInDB,
      success: true,
    });
  } catch (error) {
    console.log("ERRROR:::", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};
