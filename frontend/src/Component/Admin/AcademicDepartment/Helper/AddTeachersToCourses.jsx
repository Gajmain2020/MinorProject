import { useState } from "react";
import ErrorSnackbar from "../../../Common/ErrorSnackbar";
import SuccessSnackbar from "../../../Common/SuccessSnackbar";
import Heading from "../../../Common/Heading";

//!!!!! start to work here now
export default function AddTeachersToCourses() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  return (
    <>
      <ErrorSnackbar
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <SuccessSnackbar
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
      />
      <div className="w-4/5 flex justify-middle align-middle border-rounded p-2 lg:mt-8 md:mt-16 sm:mt-16 flex-col xs:mt-8 gap-8 ">
        <Heading headingTitle={"Add Teachers To Courses"} />
        hello world this is gajendra sahu and add
      </div>
    </>
  );
}
