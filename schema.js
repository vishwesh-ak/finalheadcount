
function validateEmployeeDocument(doc) {
    const expectedKeys = [
      "_id",
      "_rev",
      "EmployeeSerial#",
      "Emp Name",
      "DeptCode",
      "Dept Name",
      "IsManager?",
      "Emp Type",
      "Location Blue pages",
      "Mgr Name",
      "Leader Name",
      "Diversity",
      "Work location",
      "Date of Joining",
      "Date of Leaving",
      "Remarks",
      "Employee Status"
    ];
  
    
    for (const key of expectedKeys) {
      if (!(key in doc)) {
        return false;
      }
    }
  
    return true;
  }
  
  module.exports = {
    validateEmployeeDocument,
  };
  