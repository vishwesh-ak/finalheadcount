
const nano = require('nano')(process.env.DATABASE_URL);
const db = nano.use(process.env.DATABASE_NAME);

const getRanHex = size => {
  let result = [];
  let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

  for (let n = 0; n < size; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  return result.join('');
}

const addEmployees = (req, res) => {
  /*const employeeData = req.body;
  for(var i=0;i<employeeData.length;i++){
  db.insert(employeeData[i], (err, body) => {
    if (err) {
      console.error('Error inserting document:', err);
      res.status(500).json({ message: 'Error inserting document' });
    } else {
      console.log('Document inserted:', body);
      res.status(200).json({ message: 'Document inserted successfully' });
    }
  });
  }*/
  const { employees } = req.body;
  const insertPromises = employees.map((doc) => {
    return new Promise((resolve, reject) => {
      try {
        doc._id=getRanHex(32)
        db.insert(doc, doc._id, (err, body) => {
          if (err) {
            console.error('Error inserting document:', err);
            reject(err)
          } else {
            console.log('Document inserted:', body);
            resolve({success:true})
          }
        });
      } catch (error) {
        console.error(`Error handling document ${doc._id}:`, error);
        reject(error);
      }
    });
  });

  Promise.all(insertPromises)
    .then((results) => {
      const successfulInsertions = results.filter(result => result.success);
      const failedInsertions = results.filter(result => !result.success);

      res.status(200).json({
        message: 'Insertion completed',
        successfulInsertions,
        failedInsertions,
      });
    })
    .catch((error) => {
      console.error('Error adding employees:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
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

/*
const deleteEmployees = (req,res) =>{
  console.log("yassssss")
  var doc=req.body;
  for(var i = 0; i < doc.length; i++) {
    var docId=doc[i]._id
    db.get(docId, (err, body) => {
      if (err) {
        console.error('Error getting document:', err);
        return;
      }
  
      db.destroy(docId,body._rev, (destroyErr, destroyBody) => {
        console.log("yayyyy")
        if (destroyErr) {
          // Handle 409 Conflict error
          if (destroyErr.statusCode === 409) {
            console.error('Conflict: Document has been modified since retrieval.');
          } else {
            console.error('Error deleting document:', destroyErr);
          }
          return;
        }
  
        console.log('Document deleted:', destroyBody);
      });
    });
  }
}
*/
/*
const deleteEmployees = async (req, res) => {
  try {
    const docsToDelete = req.body;

    const deletePromises = docsToDelete.map(async (doc) => {
      const docId = doc._id;

      try {
        const existingDoc = await db.get(docId);
        await db.destroy(docId, existingDoc._rev);
        console.log(`Document deleted: ${docId}`);
        return { success: true, docId };
      } catch (deleteErr) {
        if (deleteErr.statusCode === 404) {
          // Document not found, log and continue
          console.error(`Document not found for deletion: ${docId}`);
          return { success: false, docId, message: 'Document not found for deletion' };
        } else {
          // Log other errors and continue
          console.error(`Error deleting document ${docId}:`, deleteErr);
          return { success: false, docId, message: 'Error deleting document' };
        }
      }
    });

    const results = await Promise.all(deletePromises);

    // Extract successful deletions and failed deletions
    const successfulDeletions = results.filter(result => result.success);
    const failedDeletions = results.filter(result => !result.success);

    res.status(200).json({
      message: 'Deletion completed',
      successfulDeletions,
      failedDeletions,
    });
  } catch (error) {
    console.error('Error deleting employees:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

*/
// const deleteEmployees = (req, res) => {
//   const { docsToDelete } = req.body;
//   const deletePromises = docsToDelete.map((doc) => {
//     return new Promise((resolve, reject) => {
//           try {
//             db.get(doc._id, (fetchErr, doc2) => {
//               if (fetchErr) {
//                 console.error(`Error fetching document ${doc._id} after conflict:`, fetchErr);
//                 reject(fetchErr);
//               } else {
//                 /*
//                 console.log(`Actual revision ID for ${doc._id} in the database: ${doc2._rev}`);

//                 // Retry the update
//                 doc._rev = doc2._rev;
//                 db.insert(emp, emp._id, (retryErr, retryBody) => {
//                   if (retryErr) {
//                     console.error(`Error retrying update for document ${emp._id}:`, retryErr);
//                     reject(retryErr);
//                   } else {
//                     // new revision ID after retry
//                     const newRevId = retryBody.rev;
//                     console.log(`Document ${emp._id} updated after conflict. New revision ID: ${newRevId}`);
//                     resolve({ employee: emp, newRevId });
//                   }
//                 });
//                 */
//                 db.destroy(doc._id, doc2._rev, (err,body) => {
//                   if(err){
//                     console.error("Error deleting")
//                   }
//                   else{        
//                     console.log(`Document deleted: ${docId}`);
//                     return { success: true, docId };
//                   }
//                 })
//               }
//             });
//           } catch (deleteErr) {
//             if (deleteErr.statusCode === 404) {
//               // Document not found, log and continue
//               console.error(`Document not found for deletion: ${docId}`);
//               return { success: false, docId, message: 'Document not found for deletion' };
//             } else {
//               // Log other errors and continue
//               console.error(`Error deleting document ${docId}:`, deleteErr);
//               return { success: false, docId, message: 'Error deleting document' };
//             }
//           }
//         });
//       });

//   Promise.all(deletePromises)
//     .then((results) => {
//       // Extract the updated employee objects
//       const successfulDeletions = results.filter(result => result.success);
//       const failedDeletions = results.filter(result => !result.success);
  
//       // updated response
//       res.status(200).json({
//         message: 'Deletion completed',
//         successfulDeletions,
//         failedDeletions,
//       });
//     })
//     .catch((error) => {
//       console.error('Error deleting employees:', error);
//       res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     });
// };


const deleteEmployees = (req, res) => {
  const { docsToDelete } = req.body;
  const deletePromises = docsToDelete.map((doc) => {
    return new Promise((resolve, reject) => {
      try {
        db.get(doc._id, (fetchErr, doc2) => {
          if (fetchErr) {
            console.error(`Error fetching document ${doc._id} before deletion:`, fetchErr);
            reject(fetchErr);
          } else {
            db.destroy(doc._id, doc2._rev, (deleteErr, deleteBody) => {
              if (deleteErr) {
                console.error(`Error deleting document ${doc._id}:`, deleteErr);
                reject(deleteErr);
              } else {
                console.log(`Document deleted: ${doc._id}`);
                resolve({ success: true});
              }
            });
          }
        });
      } catch (error) {
        console.error(`Error handling document ${doc._id}:`, error);
        reject(error);
      }
    });
  });

  Promise.all(deletePromises)
    .then((results) => {
      const successfulDeletions = results.filter(result => result.success);
      const failedDeletions = results.filter(result => !result.success);

      res.status(200).json({
        message: 'Deletion completed',
        successfulDeletions,
        failedDeletions,
      });
    })
    .catch((error) => {
      console.error('Error deleting employees:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
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
}

module.exports = {
  addEmployees,
  updateEmployees,
  getEmployees,
  deleteEmployees
};

