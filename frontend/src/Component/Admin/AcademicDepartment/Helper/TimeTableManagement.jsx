import { useState } from "react";
import { useLocation } from "react-router-dom";
import ErrSuccSnackbar from "../../../Common/ErrSuccSnackbar";
import Heading from "../../../Common/Heading";
import { Button, MenuItem, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { fetchTimeTableAdmin } from "../../../../../api/deptAdmin";

const SECTION = ["A", "B", "DS", "AI"];
const SEMESTER = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export default function TimeTableManagement() {
  const dept = useLocation().pathname.split("/")[2];
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const [searchData, setSearchData] = useState({
    section: "",
    semester: "",
  });

  function handleSearchTimeTable() {
    if (searchData.section === "" || searchData.semester === "") {
      setErrorMessage("* All fields are requires.");
      return;
    }
    setSearchData({ ...searchData, department: dept });
    fetchTimeTableAdmin(searchData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <ErrSuccSnackbar
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
      />
      <div className="w-4/5 flex justify-middle align-middle border-rounded p-2 lg:mt-8 md:mt-16 sm:mt-16 flex-col xs:mt-8 gap-8 ">
        <Heading headingTitle={"Time Table Management"} />
        {!dataFetched && (
          <div className="flex gap-3 bg-gray-400 rounded-md px-10 py-5 lg:flex-nowrap md:flex-nowrap flex-wrap">
            <TextField
              label="Section"
              select
              fullWidth
              size="small"
              value={searchData.section}
              onChange={(e) =>
                setSearchData((searchData) => ({
                  ...searchData,
                  section: e.target.value,
                }))
              }
            >
              {SECTION.map((sec) => (
                <MenuItem key={sec} value={sec}>
                  {sec}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Semester"
              select
              fullWidth
              size="small"
              value={searchData.semester}
              onChange={(e) =>
                setSearchData((searchData) => ({
                  ...searchData,
                  semester: e.target.value,
                }))
              }
            >
              {SEMESTER.map((sem) => (
                <MenuItem key={sem} value={sem}>
                  {sem}
                </MenuItem>
              ))}
            </TextField>
            <div className="lg:w-1/4   xs:w-full sm:w-full flex justify-center align-middle">
              <Button
                startIcon={<SearchIcon />}
                variant="contained"
                fullWidth
                onClick={handleSearchTimeTable}
              >
                Search
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
