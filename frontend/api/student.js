import axios from "axios";

const studentUrl = "http://localhost:3001/api/student";

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

export async function getStudentDetails(urn) {
  try {
    const response = await axios({
      headers,
      url: studentUrl + `/get-details?urn=${urn}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
