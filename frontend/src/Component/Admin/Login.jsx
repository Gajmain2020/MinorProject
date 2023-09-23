/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Alert, Snackbar } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import animationData from "../../assets/adminData.json";
import { useLottie } from "lottie-react";
import jwtDecode from "jwt-decode";
import { loginAdmin } from "../../../api/admin";

export default function Login({ token, setToken }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiCalled, setApiCalled] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Admin Login";
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

  function handleDataChange(e) {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleLoginClick() {
    setApiCalled(true);
    loginAdmin(data)
      .then((res) => {
        if (!res.success) {
          setErrorMessage(res.message);
          setApiCalled(false);
          return;
        }
        localStorage.setItem("authToken", JSON.stringify(res.token));
        setToken(res.token);
        navigate(`/admin/${res.department}/${res.id}`);
        return;
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  return (
    <>
      <Snackbar
        open={errorMessage !== ""}
        autoHideDuration={4000}
        onClose={() => setErrorMessage("")}
      >
        <Alert
          onClose={() => setErrorMessage("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <div className="w-4/5 flex justify-between border-rounded p-2 lg:mt-16 md:mt-16 sm:mt-4 lg:flex-row md:flex-row xs:flex-col xs:mt-4 ">
        <div className="lg:w-2/3 bg-blue-200/80 p-8 flex  flex-col">
          <h2 className="text-black text-4xl text-center font-main">
            LOGIN AS ADMIN
          </h2>
          <p className="text-slate-800 text-center font-display">
            Online ERP Module Of BIT Durg
          </p>
          <p className=" w-1/2 m-auto">{View}</p>
        </div>

        <div className="lg:w-1/3 bg-gray-300/80 p-6">
          <h2 className="text-2xl text-center text-slate-800 font-medium font-main border-b-2 border-neutral-950 mb-3 mt-0">
            ADMIN LOGIN
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email*</label>
            <TextField
              required
              fullWidth
              value={data.email}
              onChange={handleDataChange}
              label="Email"
              placeholder="jone.doe@mail.com"
              name="email"
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
                value={data.password}
                name="password"
                onChange={handleDataChange}
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
            disabled={apiCalled}
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
