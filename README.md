# carbon_headcount

## Step 1: Creating a root folder
-> Create a folder and open it in a code editor

## Step 2: CouchDB database creation

Structure of the document:

<pre>
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
</pre>

## Step 3: CouchDB view creation

Design Name: getInfo

Note: The reducing function for all the views is **_count**

1. View Name: fulldata
<pre>
      function (doc) {
  emit([
    doc["EmployeeSerial#"],doc["Emp Name"],doc["DeptCode"],doc["Dept Name"],
    doc["IsManager?"],doc["Emp Type"],doc["Location Blue pages"],
    doc["Mgr Name"],doc["Leader Name"],doc["Diversity"],doc["Work location"],
    doc["Date of Joining"],doc["Date of Leaving"],doc["Remarks"],doc["Employee Status"]
    ],1);
}
</pre>

2. View Name: DOL
<pre>
      function(doc) {
  var d = new Date(doc["Date of Leaving"]);
  var month = d.getMonth() + 1; // 0 - 11
  var year = d.getFullYear();
  emit([year,month],1);
}
</pre>

3. View Name: DOJ
<pre>
      function(doc) {
  var d = new Date(doc["Date of Joining"]);
  var month = d.getMonth() + 1; // 0 - 11
  var year = d.getFullYear();
  emit([year,month],1);
}
</pre>

4. View Name:  diversityview
<pre>
      function(doc) {
  var j = new Date(doc["Date of Joining"]);
  var month_j = j.getMonth() + 1; // 0 - 11
  var year_j = j.getFullYear();
  
  var l = new Date(doc["Date of Leaving"]);
  var month_l = l.getMonth() + 1; // 0 - 11
  var year_l = l.getFullYear();
  emit([year_j, month_j, year_l, month_l, doc["Diversity"], doc["Leader Name"]],1);
}
</pre>

5. View Name: emptyview
<pre>
      function(doc) {
  var j = new Date(doc["Date of Joining"]);
  var month_j = j.getMonth() + 1; // 0 - 11
  var year_j = j.getFullYear();
  
  var l = new Date(doc["Date of Leaving"]);
  var month_l = l.getMonth() + 1; // 0 - 11
  var year_l = l.getFullYear();
  emit([year_j, month_j, year_l, month_l, doc["Emp Type"], doc["Leader Name"]],1);
}
</pre>

6. View Name: locationview
<pre>
      function(doc) {
  var j = new Date(doc["Date of Joining"]);
  var month_j = j.getMonth() + 1; // 0 - 11
  var year_j = j.getFullYear();
  
  var l = new Date(doc["Date of Leaving"]);
  var month_l = l.getMonth() + 1; // 0 - 11
  var year_l = l.getFullYear();
  emit([year_j, month_j, year_l, month_l, doc["Work location"], doc["Leader Name"]],1);
}
</pre>

7. View Name: dept_locationview
<pre>
      function(doc) {
  var j = new Date(doc["Date of Joining"]);
  var month_j = j.getMonth() + 1; // 0 - 11
  var year_j = j.getFullYear();
  
  var l = new Date(doc["Date of Leaving"]);
  var month_l = l.getMonth() + 1; // 0 - 11
  var year_l = l.getFullYear();
  emit([year_j,month_j,year_l,month_l,doc["Work location"],doc["Dept Name"]],1);
}
</pre>

8. View Name: dept_diversityview
<pre>
      function(doc) {
  var j = new Date(doc["Date of Joining"]);
  var month_j = j.getMonth() + 1; // 0 - 11
  var year_j = j.getFullYear();
  
  var l = new Date(doc["Date of Leaving"]);
  var month_l = l.getMonth() + 1; // 0 - 11
  var year_l = l.getFullYear();
  emit([year_j,month_j,year_l,month_l,doc["Diversity"],doc["Dept Name"]],1);
}
</pre>

9. View Name: dept_emptypeview
<pre>
      function(doc) {
  var j = new Date(doc["Date of Joining"]);
  var month_j = j.getMonth() + 1; // 0 - 11
  var year_j = j.getFullYear();
  
  var l = new Date(doc["Date of Leaving"]);
  var month_l = l.getMonth() + 1; // 0 - 11
  var year_l = l.getFullYear();
  emit([year_j,month_j,year_l,month_l,doc["Emp Type"],doc["Dept Name"]],1);
}
</pre>


## Step 3: Set up the backend server
-> Add Backend/server.js to the root folder<br>
-> In the server.js file make the following changes:<br>
In Line 2: Replace username, password of CouchDB database with your own, in the format: http://username:password@localhost:5984 <br>
In Line 7: Replace database name with your own pre-exisiting database name: const dbName = 'database-name'; <br>

<pre>
      npm install
      npm install express nano body-parser cors
      npm install --legacy-peer-deps
      npm install express express-rate-limit
      npm install dotenv
      npm install web-vitals
      npm install winston  
      npm install papaparse
</pre>

-> Making the .env file<br>
Replace username, password of CouchDB database with your own, in the format: http://username:password@localhost:5984 <br>
<pre>
      DATABASE_URL=http://admin:password@localhost:5984
      DATABASE_NAME=employee-form
      RATE_LIMIT_WINDOW_MS=60000
      RATE_LIMIT_MAX_REQUESTS=2
      SERVER_PORT=5000

</pre>

## Step 4: Set up the Frontend
-> For the Bluepage
<pre>
      npm install
      npm install axios
      npm install @carbon/react
</pre>


## Step 5: Dashboard Dependencies
<pre>
      "@carbon/charts-react": "^1.13.6",
      "@carbon/ibm-products": "^2.10.2",
      "@carbon/react": "^1.39.0",
      "axios": "^1.5.1",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-router-dom": "^6.16.0",
      "react-scripts": "5.0.1",
      "web-vitals": "^2.1.4"

</pre>

## Step 6: Execution
-> Split the terminal in the code editor (one for backend, one for frontend) 
<pre>
     cd folder-name
     cd app-name
</pre>
-> To execute the backend:
<pre>
    cd Backend
    node server.js
</pre>
->To execute the front end: 
<pre>
    npm start
</pre>
