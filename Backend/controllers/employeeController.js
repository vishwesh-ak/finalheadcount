
const nano = require('nano')(process.env.DATABASE_URL);
const db = nano.use(process.env.DATABASE_NAME);

const addEmployee = (req, res) => {
  const employeeData = req.body;

  db.insert(employeeData, (err, body) => {
    if (err) {
      console.error('Error inserting document:', err);
      res.status(500).json({ message: 'Error inserting document' });
    } else {
      console.log('Document inserted:', body);
      res.status(200).json({ message: 'Document inserted successfully' });
    }
  });
};

const updateEmployees = (req, res) => {
  const { employees } = req.body;
  const updatePromises = employees.map((emp) => {
    return new Promise((resolve, reject) => {
      
      console.log(`Existing revision ID for ${emp._id}: ${emp._rev}`);

      db.insert(emp, emp._id, (err, body) => {
        if (err) {
          if (err.statusCode === 409) {
            
            console.error(`Conflict updating document ${emp._id}:`, err);

            
            db.get(emp._id, (fetchErr, doc) => {
              if (fetchErr) {
                console.error(`Error fetching document ${emp._id} after conflict:`, fetchErr);
                reject(fetchErr);
              } else {
                
                console.log(`Actual revision ID for ${emp._id} in the database: ${doc._rev}`);

                // Retry the update
                emp._rev = doc._rev;
                db.insert(emp, emp._id, (retryErr, retryBody) => {
                  if (retryErr) {
                    console.error(`Error retrying update for document ${emp._id}:`, retryErr);
                    reject(retryErr);
                  } else {
                    // new revision ID after retry
                    const newRevId = retryBody.rev;
                    console.log(`Document ${emp._id} updated after conflict. New revision ID: ${newRevId}`);
                    resolve({ employee: emp, newRevId });
                  }
                });
              }
            });
          } else {
            // Log other errors
            console.error(`Error updating document ${emp._id}:`, err);
            reject(err);
          }
        } else {
          // new revision ID
          const newRevId = body.rev;
          // Update the employee object 
          emp._rev = newRevId;
          // Logging the new revision ID 
          console.log(`Document ${emp._id} updated. New revision ID: ${newRevId}`);

          // Resolve the promise with the updated employee object and new revision ID
          resolve({ employee: emp, newRevId });
        }
      });
    });
  });

  Promise.all(updatePromises)
    .then((results) => {
      // Extract the updated employee objects
      const updatedEmployees = results.map(result => result.employee);
      const newRevIds = results.map(result => result.newRevId);
      // updated response
      res.status(200).json({
        message: 'Employees updated successfully',
        updatedEmployees,
        newRevIds
      });
    })
    .catch((error) => {
      console.error('Error updating employees:', error);
      res.status(500).json({ message: 'Error updating employees' });
    });
};

const getEmployees = (req, res) => {
  db.list({ include_docs: true }, (err, body) => {
    if (err) {
      console.error('Error fetching documents:', err);
      res.status(500).json({ message: 'Error fetching documents' });
    } else {
      const employees = body.rows
        .filter(row => !row.doc.views && !row.doc.language) // unwanted documents
        .map(row => row.doc);

      res.status(200).json(employees);
    }
  });
};

module.exports = {
  addEmployee,
  updateEmployees,
  getEmployees,
};

