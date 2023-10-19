import { useLocation, useNavigate } from "react-router-dom";
import Library from "./Library/Library";
import { useEffect } from "react";
import Academic from "./Academic/Academic";

export default function DeptRoute({ setToken, token }) {
  const location = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (location === "Library") {
    return (
      <>
        <Library setToken={setToken} />
      </>
    );
  }
  if (location === "Academics") {
    return (
      <>
        <Academic setToken={setToken} />
      </>
    );
  }
  return <div>hello</div>;
}
