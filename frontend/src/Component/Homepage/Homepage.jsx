import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import jwtDecode from "jwt-decode";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import animationData from "../../assets/data.json";
import { useLottie } from "lottie-react";

// eslint-disable-next-line react/prop-types
export default function Homepage({ token }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("student");

  useEffect(() => {
    document.title = "Homepage";
  }, []);
  useEffect(() => {
    if (token !== "") {
      const decode = jwtDecode(token);
      navigate(`/${decode.userType}/${decode.department}/${decode.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const options = {
    animationData,
    loop: true,
  };

  const { View } = useLottie(options);

  function handleLoginClick() {}
  return (
    <>
      <div className="w-4/5 flex justify-between border-rounded p-2 lg:mt-16 md:mt-16 sm:mt-30 lg:flex-row md:flex-row xs:flex-col xs:mt-20 ">
        <div className="lg:w-2/3 bg-blue-200 p-8 flex flex-col">
          <h2 className="text-black text-4xl text-center font-main">
            Welcome BIT DURG
          </h2>
          <p className="text-slate-800 text-center font-display">
            Online ERP Module
          </p>
          <p className=" w-1/2 m-auto">{View}</p>
        </div>

        <div className="lg:w-1/3 bg-gray-300 p-6">
          <h2 className="text-2xl text-center text-slate-800 font-medium font-main border-b-2 border-neutral-950 mb-3 mt-0">
            LOGIN
          </h2>

          <div className="mb-4 flex gap-3 ">
            <div
              onClick={() => setUserType("teacher")}
              className={`transition-all delay-200 ease-in-out text-slate-950 font-semibold cursor-pointer border font-main rounded-lg text-center w-1/2 border-red-500 px-4 py-2 ${
                userType === "teacher" ? "bg-cyan-400 font-bold " : ""
              }`}
            >
              Teacher
            </div>
            <div
              onClick={() => setUserType("student")}
              className={`transition-all delay-200 ease-in-out text-slate-950 font-semibold cursor-pointer font-main border rounded-lg text-center w-1/2 border-red-500 px-4 py-2 ${
                userType === "student" ? "bg-cyan-400 font-bold" : ""
              }`}
            >
              Student
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email*</label>
            <TextField
              required
              fullWidth
              label="Email"
              placeholder="jone.doe@mail.com"
              className="text-slate-950 bg-white rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Password*
            </label>
            <div className="flex align-middle justify-center gap-1">
              <TextField
                required
                type={showPassword ? "text" : "password"}
                fullWidth
                label="Password"
                className="text-slate-950 bg-white rounded-lg"
              />
              <Button
                size="small"
                onClick={() => setShowPassword((pass) => !pass)}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </Button>
            </div>
          </div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleLoginClick}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
}
