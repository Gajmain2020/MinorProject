import { useState, useEffect } from "react";

import Heading from "../../Common/Heading";
import ErrSuccSnackbar from "../../Common/ErrSuccSnackbar";
import { useLocation } from "react-router-dom";
import { fetchStudentBySectionAndSemester } from "../../../../api/teacher";

export default function AddAttandanceClass() {
  const url = useLocation().pathname.split("/");

  const cls = url[5];
  const dept = url[2];
  const [subjectShortName, section, semester] = url[5].split("_");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [students, setStudents] = useState([]);
  useEffect(() => {
    document.title = `Add Attandace For ${cls}`;
  }, []);

  useEffect(() => {
    fetchStudentBySectionAndSemester(dept, section, semester).then((res) => {
      if (!res.success) {
        setErrorMessage(res.message);
        return;
      }
      setStudents(res.students);
    });
  }, []);

  return (
    <>
      <ErrSuccSnackbar
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <div
        className="w-4/5 flex justify-middle align-middle border-rounded p-2
      lg:mt-4 md:mt-16 sm:mt-16 flex-col xs:mt-8 gap-8 "
      >
        <Heading headingTitle={`Add Attandance To ${cls}`} />
      </div>
    </>
  );
}
