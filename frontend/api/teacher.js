import axios from "axios";

const teacherUrl = "http://localhost:3001/api/teacher";

const headers = {
  "content-type": "application/json",
  token:
    localStorage.getItem("authToken") &&
    localStorage?.getItem("authToken") !== ""
      ? `Bearer ${localStorage
          .getItem("authToken")
          .substring(1, localStorage.getItem("authToken").length - 1)}`
      : "",
};

export async function loginTeacher(data) {
  try {
    const response = await axios({
      headers,
      url: teacherUrl + "/login",
      method: "POST",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function fetchStudentsByTG(data) {
  try {
    const response = await axios({
      headers,
      url: teacherUrl + `/fetch-student-tg/${data}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function verifyMultipleStudents(data) {
  try {
    const response = await axios({
      headers,
      url: teacherUrl + "/validate-students",
      method: "PATCH",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function verifySingleStudent(data) {
  try {
    const response = await axios({
      headers,
      url: teacherUrl + "/validate-student",
      method: "PATCH",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
