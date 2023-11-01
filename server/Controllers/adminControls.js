import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import Students from "../models/student.js";
import Books from "../models/books.js";
import Teachers from "../models/teacher.js";
import { isValidObjectId } from "mongoose";

// ** Admin Controllers **
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
      message: "Sign Up success.",
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
        userType: "admin",
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

// ** Teachers Controllers ********************************
export const fetchAllTeachers = async (req, res) => {
  try {
    const teachers = await Teachers.find();
    const teacherData = teachers.map((teacher) => ({
      name: teacher.name,
      email: teacher.email,
      department: teacher.department,
      empId: teacher.empId,
    }));
    return res.status(200).json({
      message: "Teachers data sent successfully.",
      teachers: teacherData,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
      success: false,
    });
  }
};
export const updateSingleTeacher = async (req, res) => {
  try {
    const data = req.body;
    if (data.oldEmail === data.email) {
      delete data.oldEmail;
      await Teachers.findOneAndUpdate(
        { empId: data.empId },
        { ...data, updatedAt: new Date() }
      );
      return res.status(200).json({
        message: `Teacher with Emp ID ${data.empId} updated successfully.`,
        success: true,
      });
    }
    //check for email to already existance
    const emailExists = await Teachers.findOne({ email: data.email });
    if (emailExists) {
      return res.status(403).json({
        message: `Teacher with Email ${data.email} already exists in database.`,
        success: false,
      });
    }
    delete data.oldEmail;
    await Teachers.findOneAndUpdate(
      { urn: data.urn },
      { ...data, updatedAt: new Date() }
    );
    return res.status(200).json({
      message: `Teacher with Emp ID ${data.empId} updated successfully.`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
      success: false,
    });
  }
};
export const addIndividualTeacher = async (req, res) => {
  try {
    const data = req.body;

    const isTeacherAlreadyExisting = await Teachers.findOne({
      email: data.email,
    });
    const isEmpIdRegistered = await Teachers.findOne({ empId: data.empId });

    if (isTeacherAlreadyExisting || isEmpIdRegistered) {
      return res
        .status(400)
        .json({ message: "Email or EmpID elready exists.", success: false });
    }
    const password = await bcrypt.hash(data.email, 10);

    await Teachers.create({
      name: data.name,
      email: data.email,
      department: data.department,
      empId: data.empId,
      password,
    });
    return res
      .status(200)
      .json({ message: "Teacher added Successfully.", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
export const addMultipleTeachers = async (req, res) => {
  try {
    const added = [];
    const rejected = [];
    const teachers = req.body;

    for (let i = 0; i < teachers.length; i++) {
      console.log(teachers[i]);
      const { urn, empId, name, dept, email } = teachers[i];

      const studentAlreadyAdded = await Students.findOne({ urn });
      if (studentAlreadyAdded) {
        rejected.push(teachers[i]);
        continue;
      }
      const encryptedPassword = await bcrypt.hash(email, 10);
      await Teachers.create({
        name,
        empId,
        password: encryptedPassword,
        email,
        department: dept,
        profileComplete: false,
      });
      added.push(teachers[i]);
    }
    return res.status(200).json({
      data: { added, rejected },
      message: `Teachers Added Successfully. Out of ${teachers.length} - ${added.length} are Added and ${rejected.length} are Rejected.`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong.", success: false });
  }
};
export const deleteSingleTeacher = async (req, res) => {
  try {
    const empId = req.params.empId;

    await Teachers.findOneAndDelete({ empId });

    return res.status(200).json({
      success: true,
      message: "Successfully deleted teacher.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};

export const deleteMultipleTeacher = async (req, res) => {
  try {
    const teachers = req.body;

    for (let i = 0; i < teachers.length; i++) {
      await Teachers.findOneAndDelete({
        email: teachers[i].email,
        urn: teachers[i].urn,
      });
    }
    return res.status(200).json({
      message: `Successfully removed ${teachers.length} teacher${
        teachers.length > 1 && "s"
      }.`,
      success: "true",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};

// ** Student Controllers **
export const addIndividualStudent = async (req, res) => {
  try {
    const data = req.body;

    const isStudentAlreadyExisting = await Students.findOne({
      email: data.email,
    });
    const isRollNoRegistered = await Students.findOne({ urn: data.urn });

    if (isStudentAlreadyExisting || isRollNoRegistered) {
      return res
        .status(400)
        .json({ message: "Email or URN elready exists.", success: false });
    }
    console.log(data);
    const password = await bcrypt.hash(data.email, 10);

    await Students.create({
      name: data.name,
      email: data.email,
      department: data.department,
      phoneNumber: data.phoneNumber,
      urn: data.urn,
      password,
      year: data.year,
    });
    return res
      .status(200)
      .json({ message: "Student added Successfully.", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const addMultipleStudents = async (req, res) => {
  try {
    const added = [];
    const rejected = [];
    const students = req.body;
    for (let i = 0; i < students.length; i++) {
      const { urn, name, section, crn, semester, department, email } =
        students[i];

      const studentAlreadyAdded = await Students.findOne({ urn });
      if (studentAlreadyAdded) {
        rejected.push(students[i]);
        continue;
      }
      const encryptedPassword = await bcrypt.hash(email, 10);
      await Students.create({
        name,
        urn,
        password: encryptedPassword,
        email,
        department,
        semester,
        profileComplete: false,
        section,
        crn: section + "-" + crn,
      });
      added.push(students[i]);
    }
    return res.status(200).json({
      data: { added, rejected },
      message: `Students Added Successfully. Out of ${students.length} - ${added.length} are Added and ${rejected.length} are Rejected.`,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};

export const fetchAllStudents = async (req, res) => {
  try {
    const students = await Students.find();
    const studentData = students.map((student) => ({
      name: student.name,
      email: student.email,
      semester: student.semester,
      department: student.department,
      urn: student.urn,
      phoneNumber: student.phoneNumber,
    }));
    return res.status(200).json({
      message: "Students data sent successfully.",
      students: studentData,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};

export const deleteSingleStudent = async (req, res) => {
  try {
    const urn = req.params.urn;

    await Students.findOneAndDelete({ urn });

    return res.status(200).json({
      success: true,
      message: "Successfully deleted student.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};

export const deleteMultipleStudents = async (req, res) => {
  try {
    const students = req.body;

    for (let i = 0; i < students.length; i++) {
      await Students.findOneAndDelete({
        email: students[i].email,
        urn: students[i].urn,
      });
    }
    return res.status(200).json({
      message: `Successfully removed ${students.length} student${
        students.length > 1 && "s"
      }.`,
      success: "true",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};

export const updateSingleStudent = async (req, res) => {
  try {
    const data = req.body;
    if (data.oldEmail === data.email) {
      delete data.oldEmail;
      await Students.findOneAndUpdate(
        { urn: data.urn },
        { ...data, updatedAt: new Date() }
      );
      return res.status(200).json({
        message: `Student with URN ${data.urn} updated successfully.`,
        success: true,
      });
    }
    //check for email to already existance
    const emailExists = await Students.findOne({ email: data.email });
    if (emailExists) {
      return res.status(403).json({
        message: `Student with Email ${data.email} already exists in database.`,
        success: false,
      });
    }
    delete data.oldEmail;
    await Students.findOneAndUpdate(
      { urn: data.urn },
      { ...data, updatedAt: new Date() }
    );
    return res.status(200).json({
      message: `Student with URN ${data.urn} updated successfully.`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};

export const updateMultipleStudent = async (req, res) => {
  try {
    const { update, students } = req.body;
    if (update.semester === "") {
      delete update.semester;
    }
    if (update.department === "") {
      delete update.department;
    }

    for (let i = 0; i < students.length; i++) {
      const stu = await Students.findOne({ email: students[i].email });

      stu.semester = update?.semester || stu.semester;
      stu.department = update?.department || stu.department;

      stu.save();
    }
    return res.status(200).json({
      message: `Successfully updated ${students.length} student${
        students.length > 1 && "s"
      }.`,
      success: "true",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};
export const getStudentDetails = async (req, res) => {
  try {
    const urn = req.params.urn;
    const student = await Students.findOne({ urn });
    console.log(student);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};

// ** Library Controllers **
export const fetchBooks = async (req, res) => {
  try {
    const books = await Books.find().limit(50);
    return res.status(200).json({ books, success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};
export const searchBook = async (req, res) => {
  try {
    const bookId = req.query?.bookId;
    const bookName = req.query?.bookName;
    if (bookId) {
      const book = await Books.findOne({ bookId });
      if (!book) {
        return res.status(404).json({
          message: `No book with ID '${bookId}' found.`,
          successful: false,
        });
      }
      return res.status(200).json({ success: true, book });
    }

    if (bookName) {
      const book = await Books.findOne({ bookName });
      if (!book) {
        return res.status(404).json({
          message: `No book with name '${bookName}' found.`,
          successful: false,
        });
      }
      return res.status(200).json({ success: true, book });
    }
    return res.status(404).json({
      message: `Book Searched Is Not Found... Please Try Again.`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};
export const addSingleBook = async (req, res) => {
  try {
    const { bookName, bookAuthor, bookId, priceOfBook, numberOfBooks } =
      req.body;
    const isBookExisting = await Books.findOne({ bookId });
    if (isBookExisting) {
      return res
        .status(401)
        .json({ message: `Book ${bookId} already exists`, success: false });
    }
    await Books.create({
      bookName,
      bookAuthor,
      bookId,
      availableNumberOfBooks: numberOfBooks,
      priceOfBook,
      numberOfBooks,
    });
    return res.status(200).json({
      message: `Book with id ${bookId} added successfully`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};
export const addMultipleBooks = async (req, res) => {
  try {
    const added = [];
    const rejected = [];
    const books = req.body;
    for (let i = 0; i < books.length; i++) {
      const { bookId, bookName, bookAuthor, numberOfBooks, priceOfBook } =
        books[i];

      const bookAlreadyAdded = await Books.findOne({ bookId });
      if (bookAlreadyAdded) {
        rejected.push(books[i]);
        continue;
      }
      await Books.create({
        bookName,
        bookId,
        bookAuthor,
        availableNoOfBooks: numberOfBooks,
        priceOfBook,
        numberOfBooks,
      });
      added.push(books[i]);
    }
    return res.status(200).json({
      data: { added, rejected },
      message: "Books Added Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};
export const issueBooks = async (req, res) => {
  try {
    const { studentData, books } = req.body;
    const student = await Students.findOne({ urn: studentData.urn });
    for (let i = 0; i < books.length; i++) {
      const book = await Books.findById(books[i]._id);
      book.availaleNumberOfBooks = book.availableNumberOfBooks - 1;
      book.issuedTo.push({
        studentName: student.name,
        studentUrn: student.urn,
        issueDate: new Date(),
      });
      await book.save();
    }
    for (let i = 0; i < books.length; i++) {
      student.libraryCurrentIssues.push({
        bookId: books[i].bookId,
        bookName: books[i].bookName,
        bookIssueDate: new Date(),
      });
    }
    await student.save();
    return res
      .status(200)
      .json({ message: "Books issued successfully.", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};
export const returnBooks = async (req, res) => {
  try {
    const { studentData, books } = req.body;
    var student = await Students.findById(studentData.id);
    for (let i = 0; i < books.length; i++) {
      const book = await Books.findOne({
        bookId: books[i].bookId,
      });
      for (let j = 0; j < book.issuedTo.length; j++) {
        if (book.issuedTo[j].studentUrn === student.urn) {
          book.pastIssuedTo.push({
            studentRollNumber: studentData.rollNo,
            studentName: studentData.name,
            issueDate: book.issuedTo[j].issueDate,
            returnDate: new Date(),
          });
          book.availableNoOfBooks = parseInt(book.availableNoOfBooks) + 1;
          book.issuedTo.splice(j, 1);
        }
      }
      await book.save();
    }
    for (let i = 0; i < student.libraryCurrentIssues.length; i++) {
      for (let j = 0; j < books.length; j++) {
        if (student.libraryCurrentIssues[i].bookId === books[j].bookId) {
          student.libraryIssue.push({
            ...student.libraryCurrentIssues[i],
            returnDate: new Date(),
          });
          student.libraryCurrentIssues.splice(i, 1);

          student.save();
        }
      }
    }
    return res.status(200).json({
      message: "Books Received Succefully",
      success: true,
      returnBooks: student.libraryCurrentIssues,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};
export const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.query;
    await Books.findOneAndRemove({ bookId });

    return res.status(200).json({
      message: "Book Deleted successfully",
      successful: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};
export const editBook = async (req, res) => {
  try {
    const id = req.query.bookId;
    const book = req.body;
    await Books.findByIdAndUpdate(id, book);
    return res
      .status(200)
      .json({ successful: true, message: "Book Updated Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};

export const getBookDetails = async (req, res) => {
  try {
    const bookId = req.query.bookId;

    const book = await Books.findOne({ bookId });

    if (!book) {
      return res.status(404).json({ error: "Book not found", success: false });
    }
    return res.status(200).json({
      message: "Book found and sent successfully.",
      book,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};
