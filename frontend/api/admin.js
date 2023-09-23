import axios from "axios";

const AdminUrl = "http://localhost:3001/api/admin";

export async function loginAdmin(data) {
  try {
    const response = await axios({
      url: AdminUrl + "/login",
      method: "POST",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
