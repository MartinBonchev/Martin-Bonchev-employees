function getObject(fileLines) {
  let allData = [];
  let newData = {};
  let singleData = {};
  let id = 0;
  let arrayData = [];
  fileLines.forEach((line) => {
    let lineElements = line.split(",");
    singleData["EmpID"] = lineElements[0];
    singleData["ProjectID"] = lineElements[1];
    singleData["DateFrom"] = lineElements[2];
    singleData["DateTo"] = lineElements[3];
    id++;
    newData["id"] = id;
    newData["line"] = singleData;
    allData.push(newData);
    newData = {};
    arrayData.push(singleData);
    singleData = {};
  });
  return allData;
}
export default getObject;
