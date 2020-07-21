import React, { useState } from "react";
import inputValidation from "../operations/InputValidation";
import getObject from "../operations/GetObject";

function daysForPerson(line) {
  let isNULL = /\d{4}-\d{2}-\d{2}/gm;
  let txtDateTO = line.DateTo;
  let txtDateFrom = line.DateFrom.split("-");
  let dateFrom = new Date(+txtDateFrom[0], +txtDateFrom[1], +txtDateFrom[2]);
  let dateTo = new Date();

  let days = 0;
  if (!isNULL.test(txtDateTO)) {
    dateTo = new Date();
  } else {
    txtDateTO = line.DateTo.split("-");
    dateTo = new Date(+txtDateTO[0], +txtDateTO[1], +txtDateTO[2]);
  }

  days = parseInt(
    (dateFrom.getTime() - dateTo.getTime()) / (1000 * 60 * 60 * 24),
    10
  );
  return Math.abs(days);
}

function finalResult(resultArray) {
  let sumDays = 0;
  let daysWorkedOnProject = 0;
  let people = [];
  let projectID = 0;
  for (const [key, el] of Object.entries(resultArray)) {
    if (el.dayArray.length > 1) {
      el.dayArray.sort(function (a, b) {
        return a.duration < b.duration;
      });
      sumDays = el.dayArray[0].duration + el.dayArray[1].duration;
      if (sumDays > daysWorkedOnProject) {
        daysWorkedOnProject = sumDays;
        people = [el.dayArray[0].empID, el.dayArray[1].empID];
        projectID = key;
      }
    }
  }
  return [people[0], people[1], projectID, daysWorkedOnProject];
}

function pairOfEmployees(allData) {
  let resultArray = [];
  let prID;
  let duration = 0;
  let durationObject = {};
  let empId = "";
  let result = [];

  allData.forEach((e) => {
    prID = e.line.ProjectID;
    duration = daysForPerson(e.line);
    empId = e.line.EmpID;
    durationObject = { empID: empId, duration: duration };
    if (resultArray[prID] === undefined) {
      resultArray[prID] = { dayArray: [durationObject] };
    } else {
      resultArray[prID].dayArray.push(durationObject);
    }
  });

  result = finalResult(resultArray);

  return result;
}

function UploadFile() {
  const [resultProps, setResult] = useState([]);
  const [fileValue, setValue] = useState([]);
  const [type, setType] = useState([]);

  const handleChange = (event) => {
    event.preventDefault();
    const fileType = event.target.files[0];
    setType(fileType);
    const reader = new FileReader();
    let data = {};
    let fResult = [];

    reader.onload = function () {
      let fileLines = this.result
        .replace(/\r/g, "")
        .split("\n")
        .filter((line) => line !== "");
      const filedata = fileLines;
      setValue(filedata);
      if (inputValidation(fileLines)) {
        data = getObject(fileLines);
        fResult = pairOfEmployees(data);
      } else {
        fResult = "Wrong format!";
      }
      setResult(fResult);
    };
    reader.readAsText(event.target.files[0]);
  };

  return (
    <div className="container">
      <div className="row text-white">
        <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
          <form method="post" action="#" id="#">
            <div className="justify-content-center">
              <label className="display-4 py-2 text-secondary">
                Upload Your File
              </label>
              <input
                type="file"
                className="form-control p-5"
                multiple=""
                accept=".txt"
                onChange={handleChange}
              />
              {resultProps.length === 0 && (
                <p className="text-secondary">No table data!</p>
              )}
              {resultProps.length > 4 && (
                <p className="text-secondary">
                  Choose text file with correct format!
                </p>
              )}
              {resultProps.length > 0 && (
                <h2 className="text-secondary">File data</h2>
              )}

              {resultProps.length !== 0 && type.type === "text/plain" && (
                <table className="table table-bordered table-striped">
                  <thead className="thead-dark">
                    <th>EmpID</th>
                    <th>ProjectID</th>
                    <th>Date from</th>
                    <th>Date to</th>
                  </thead>
                  <tbody>
                    {fileValue.map((employerWork) => (
                      <tr>
                        {employerWork
                          .split(", ")
                          .map((employerInfroForTheJob) => (
                            <td>{employerInfroForTheJob}</td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {resultProps.length === 4 && (
                <h2 className="text-secondary">datagrid</h2>
              )}

              {resultProps.length === 4 && (
                <table className="table table-bordered table-striped">
                  <thead className="thead-dark">
                    <th>EmpID#1</th>
                    <th>EmpID#2</th>
                    <th>Project ID</th>
                    <th>Days Worked</th>
                  </thead>
                  <tbody>
                    <tr>
                      {resultProps.map((result) => (
                        <td>{result}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadFile;
