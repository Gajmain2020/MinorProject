import axios from "axios";

const AdminUrl = "http://localhost:3001/api/admin";
const LibUrl = "http://localhost:3001/api/admin/library";

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

//! !!!!!!!!!! LIBRARY APIS OVER HERE !!!!!!
export async function addSingleBook(data) {
  try {
    const response = await axios({
      headers,
      url: LibUrl + "/add-single-book",
      method: "POST",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function addMultipleBooks(data) {
  try {
    const response = await axios({
      headers,
      url: LibUrl + "/add-multiple-books",
      method: "POST",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
