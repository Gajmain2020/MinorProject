/* eslint-disable react/prop-types */
import { Backdrop, Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { getStudentDetails } from "../../../../../api/student";
import { useNavigate } from "react-router-dom";

function IssueBook() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [data, setData] = useState(null);
  useEffect(() => {
    document.title = "Issue Books";
  }, []);
  const [openBackdrop, setOpenBackdrop] = useState(true);
  return (
    <div className="text-white flex flex-col w-full">
      {openBackdrop && (
        <StudentBackdrop
          data={data}
          setData={setData}
          openBackdrop={openBackdrop}
          setOpenBackdrop={setOpenBackdrop}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
        />
      )}
      {data && (
        <div className="">
          <StudentDetails data={data} />
        </div>
      )}
    </div>
  );
}

function StudentDetails({ data }) {
  return (
    <div className="bg-gray-200/80 w-1/2 mx-auto text-center font-main shadow-md rounded-lg p-4 m-4">
      <h2 className="text-2xl text-black font-semibold mb-1">{data.name}</h2>
      <div className="text-gray-600 mb-1">
        <p>
          <span className="font-semibold">URN:</span> {data.urn}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {data.email}
        </p>
        <p>
          <span className="font-semibold">Department:</span> {data.department}
        </p>
        <p>
          <span className="font-semibold">Phone Number:</span>
          {data.phoneNumber}
        </p>
      </div>
    </div>
  );
}

function StudentBackdrop({
  openBackdrop,
  data,
  setData,
  setOpenBackdrop,
  setErrorMessage,
}) {
  const [urn, setUrn] = useState("");

  function handleSearch() {
    getStudentDetails(urn).then((res) => {
      if (!res.success) {
        setErrorMessage(res.message);
        return;
      }
      setData(res.data);
      return;
    });
  }

  return (
    <div>
      <Modal open={openBackdrop} onClose={() => setOpenBackdrop(false)}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <div className="w-1/3 sm:w-4/5 xs:w-4/5 p-10 rounded-lg lg:h-3/4 sm:h-2/3 xs:h-2/3 relative bg-gray-200/80 flex justify-center flex-wrap align-center gap-3">
            <div className="flex flex-col gap-4 w-full">
              {data === null ? (
                <>
                  <TextField
                    onChange={(e) => setUrn(e.target.value)}
                    placeholder="Ex. 123123123123"
                    fullWidth
                    label="University Roll Number"
                  />
                  <Button
                    onClick={handleSearch}
                    variant="outlined"
                    fullWidth
                    color="warning"
                  >
                    Search
                  </Button>
                </>
              ) : (
                <>
                  <TextField
                    label="University Roll Number"
                    disabled
                    value={data.urn}
                  />
                  <TextField label="Name" disabled value={data.name} />
                  <TextField label="Email" disabled value={data.email} />
                  <TextField
                    label="Department"
                    disabled
                    value={data.department}
                  />
                  <TextField
                    label="Phone Number"
                    disabled
                    value={data.phoneNumber}
                  />
                  <Button
                    onClick={() => {
                      setData(data);
                      setOpenBackdrop(false);
                    }}
                    fullWidth
                    variant="contained"
                    color="success"
                  >
                    Proceed
                  </Button>
                  <Button
                    onClick={() => setData(null)}
                    fullWidth
                    variant="outlined"
                    color="error"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </Backdrop>
      </Modal>
    </div>
  );
}

export default IssueBook;
