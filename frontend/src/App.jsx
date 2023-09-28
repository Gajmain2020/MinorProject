import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import DeptRoute from "./Component/Admin/DeptRoute";
import AdminLogin from "./Component/Admin/Login";
import Homepage from "./Component/Homepage/Homepage";
import Navbar from "./Component/Navbar/Navbar";
import Complaints from "./Component/Constants/Complaints";
import Notfound from "./Component/Notfound/Notfound";
import ShowData from "./Component/ShowData/ShowData";
import IssueBook from "./Component/Admin/Library/Helper/IssueBook";

function App() {
  const [token, setToken] = useState("");

  return (
    <>
      <div className="background_only"></div>
      <Navbar token={token} setToken={setToken} />
      <div className="flex justify-center mb-10">
        <Routes>
          <Route path="/" element={<Homepage token={token} />} />
          <Route path="/complaint" element={<Complaints token={token} />} />
          <Route
            path="/admin-login"
            element={<AdminLogin token={token} setToken={setToken} />}
          />
          <Route path="/admin/:department/:id">
            <Route
              path=""
              element={<DeptRoute token={token} setToken={setToken} />}
            />
            <Route path="issue-book" element={<IssueBook />} />
          </Route>
          <Route path="/Contact" element={<>hello world</>} />
          <Route path="/show-data/:data" element={<ShowData />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
