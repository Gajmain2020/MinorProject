import axios from "axios";

const URL = "http://localhost:3001/api/";
const URL_2 = "http://localhost:3001/api/department/";

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

export async function fetchDeptTeachers(dept) {
  try {
    const response = await axios({
      headers,
      url: URL + dept + "/fetch-teachers/" + dept,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function fetchDeptTGs(dept) {
  try {
    const response = await axios({
      headers,
      url: URL + dept + "/fetch-tgs/" + dept,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function fetchDeptStudents(dept) {
  try {
    const response = await axios({
      headers,
      url: URL + dept + "/fetch-students/" + dept,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function assignSingleTG(data) {
  try {
    const response = await axios({
      headers,
      url: URL_2 + "assign-single-tg",
      method: "PATCH",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function removeSingleTG(data) {
  try {
    const response = await axios({
      headers,
      url: URL_2 + "remove-single-tg",
      method: "PATCH",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function removeMultipleTG(data) {
  try {
    const response = await axios({
      headers,
      url: URL_2 + "remove-multiple-tg",
      method: "PATCH",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function assignMultipleTG(data) {
  try {
    const response = await axios({
      headers,
      url: URL_2 + "assign-multiple-tg",
      method: "PATCH",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function assignMultipleStudentsTG(data) {
  try {
    const response = await axios({
      headers,
      url: URL_2 + "assign-students-to-tg",
      method: "PATCH",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function assignSingleStudentTG(data) {
  try {
    const response = await axios({
      headers,
      url: URL_2 + "assign-student-to-tg",
      method: "PATCH",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
