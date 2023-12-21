import React, { useState, useEffect } from 'react';
import {
  Datagrid,
  useDatagrid,
  useInlineEdit,
  useFiltering,  
  useSelectRows
} from '@carbon/ibm-products';
import DatagridPagination from './datagridPagination';
import { pkg } from '@carbon/ibm-products/lib/settings';
 import axios from 'axios';
import './emppage.scss';
 import { DatagridActions } from './datagridActions';
import Papa from 'papaparse';  
import { Content, Button } from '@carbon/react';

 const defaultHeader = [
  {
    Header: 'EmployeeSerial',
    accessor: 'EmployeeSerial#',
    filter: 'number',
  },
  {
    Header: 'Emp Name',
    accessor: 'Emp Name',
    filter: 'dropdown',
   },
  {
    Header: 'Dept Code',
    accessor: 'DeptCode',
   },
  {
    Header: ' Dept Name',
    accessor: 'Dept Name',
  },
  {
    Header: 'IsManager',
    accessor: 'IsManager?',
  },
  {
    Header: 'Emp Type',
    accessor: 'Emp Type',
  },
  {
    Header: 'Location Blue pages',
    accessor: 'Location Blue pages',
  },
  {
    Header: 'Mgr Name',
    accessor: 'Mgr Name',
  },
  {
    Header: ' Leader Name',
    accessor: 'Leader Name',
    inlineEdit: {
      type: 'text',
       validator: (n) => n.length >= 40,
       inputProps: {
        invalidText: 'Invalid text, character count must be less than 40',
      },
    },
  },
  {
    Header: ' Diversity',
    accessor: 'Diversity',
    inlineEdit: {
      type: 'text',
       validator: (n) => n.length >= 40,
       inputProps: {
        invalidText: 'Invalid text, character count must be less than 40',
      },
    },
  },
  {
    Header: 'Work Location',
    accessor: 'Work location',
  },
  {
    Header: 'Date of Joining',
    accessor: 'Date of Joining',
   
  },
  {
    Header: 'Date of Leaving',
    accessor: 'Date of Leaving',
   
  },
  {
    Header: ' Remarks',
    accessor: 'Remarks',
    inlineEdit: {
      type: 'text',
       validator: (n) => n.length >= 40,
       inputProps: {
        invalidText: 'Invalid text, character count must be less than 40',
      },
    },
  },
  {
    Header: 'Employee Status',
    accessor: 'Employee Status',

  },
];

 export const EmpPage = () => {

  var columns = React.useMemo(function () {
     
    return defaultHeader;
    }, []);

  pkg.feature['Datagrid.useInlineEdit'] = true;

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null); 
  const [httpError, setHttpError] = useState(null);
 
  var getBatchActions = function getBatchActions() {
    return [{
      label: 'Delete',
      onClick: Delete
    }]
  }
  
  const Delete = (rows) =>{
    var lis=[],k
    for(var i=0;i<rows.length;i++)
    {
      k=parseInt(rows[i].id)
      lis.push(data[k])
    }
    console.log("setup")
    console.log(lis)
    console.log(rows)
    console.log(data)
    axios
      .post('http://localhost:5000/api/deleteEmployees', { docsToDelete: lis})
      .then((response) => {
        console.log(response.data.message);
        return axios.get('http://localhost:5000/api/getEmployees')
      })
      .then((response) => {
        setData(response.data);
        console.log("deleted version:")
        console.log(data)
      })
      .catch((error) => {
        console.error('Error deleting employees:', error);
      });
    console.log("ok")
    // axios
    //   .get('http://localhost:5000/api/getEmployees')
    //   .then((response) => {
    //     setData(response.data);
    //   })
      // .catch((error) => {
      //   setHttpError(error);
      //   console.error('Error fetching data:', error);
      // });
      console.log(data.length)
      console.log(data)
  }

//datagridState//
  const datagridState = useDatagrid({
    columns: columns,
    data: filteredData.length > 0 ? filteredData : data,
    initialState: {
      pageSize: 50,
      pageSizes: [5, 10, 25, 50],
    },
    toolbarBatchActions:getBatchActions(),
    onDataUpdate: setData,
    DatagridPagination: DatagridPagination,
    filterProps: {
      variation: 'panel',  
      updateMethod: 'instant',  
      primaryActionLabel: 'Apply',  
      secondaryActionLabel: 'Cancel',  
      panelIconDescription: 'Open filters', 
      closeIconDescription: 'Close Panel',
      sections: [
        {categoryTitle : 'Employee Serial',
      hasAccordion: true,
    filters: [
      { filterLabel:'Date of Joining',
      filter:{
        type: 'number',
        column: 'Date of Joining',
        props: {
          NumberInput: {
            min: 0,
            id: 'Date-Serial-input',
            invalidText: 'A valid value is required',
            label: 'Date of Joining',
            placeholder: 'Type Date of Joining',
           },
        },
      },
      },
      {filterLabel:'Employee Name',
      filter:{
        type: 'dropdown',
        column: 'Emp Name',
        props: {
          Dropdown: {
            id: 'Employee Name-dropdown',
            ariaLabel: 'Employee Name dropdown',
            items: ['Alice Johnson', 'John Doe', ],
            label: 'Employee Name',
            titleText: 'Employee Name'
          },
        },
      },
    },
    ]} 
      ],
      shouldClickOutsideToClose: false,  
     },
    DatagridActions,
      batchActions: true,
   }, useInlineEdit, useFiltering,useSelectRows);
   useEffect(() => {
    axios.get('http://localhost:5000/api/getEmployees')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setHttpError(error);
        console.error('Error fetching data:', error);
      });
      console.log("Got data")
      console.log(data)
  }, []);

  
  const handleFilterEmployees = () => {
    const searchText = document.getElementById('filterInput').value.toLowerCase();

    const filteredEmployees = data.filter((employee) => {
      for (const key in employee) {
        if (employee[key] && employee[key].toString().toLowerCase().includes(searchText)) {
          return true;
        }
      }
      return false;
    });

    setFilteredData(filteredEmployees);
  };

  const handleSaveEdits = () => {
    console.log("Received drata is")
    console.log(data)
    axios
      .post('http://localhost:5000/api/updateEmployees', { employees: data })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error('Error updating employees:', error);
      });
  };

  const SyncUp = () =>{
    console.log("Syncing......")
    var data1=[]
    data1.push({
      "EmployeeSerial#": "1123",
      "Emp Name": "Cindy Crawford",
      "DeptCode": "IT",
      "Dept Name": "IT Department",
      "IsManager?": "no",
      "Emp Type": "Full-Time",
      "Location Blue pages": "Location ALA",
      "Mgr Name": "Melissa Smith",
      "Leader Name": "Liliana Lambert",
      "Diversity": "No",
      "Work location": "Building 776",
      "Date of Joining": "2022-07-19",
      "Date of Leaving": "",
      "Remarks": "IT expert",
      "Employee Status": "Y"
    },{ 
      "EmployeeSerial#": "1123",
      "Emp Name": "Daniel Dawson",
      "DeptCode": "IT",
      "Dept Name": "IT Department",
      "IsManager?": "no",
      "Emp Type": "Full-Time",
      "Location Blue pages": "Location ALA",
      "Mgr Name": "Melissa Smith",
      "Leader Name": "Levi Lambert",
      "Diversity": "No",
      "Work location": "Building 776",
      "Date of Joining": "2022-07-19",
      "Date of Leaving": "",
      "Remarks": "IT expert",
      "Employee Status": "Y"
    })
    console.log(data1)
    console.log("api")
    axios
      .post("http://localhost:5000/api/addEmployees",{ employees: data1})
      .then(response=> {
        console.log(response.data.message);
        console.log("Updating,..............")
        return axios.get('http://localhost:5000/api/getEmployees')
      })
      .then(response => {
        setData(response.data);
        console.log("insertted version:")
        console.log(data)
      })
      .catch((error) => {
        console.error('Error inserting employees:', error);
      });
    console.log("endd")
  }


  return (
    <Content>
      <h1 className="home__heading">Blue Page SyncUp</h1>
 
      

      <div>
        {httpError ? (
          <p>HTTP Error: {httpError.message}</p>
        ) : error ? (
          <p>Error fetching data: {error}</p>
        ) : (
          <Datagrid datagridState={{ ...datagridState }} 
          />

        )} 
        {error && <p>Error fetching data: {error}</p>}  
    {/* <Button 
      kind="secondary"
      onClick={handleSaveEdits}>Save Edits</Button> */}
      </div>
    <div className='buttonsdiv'>
      <Button onClick={SyncUp}>Sync</Button>
      <Button onClick={handleSaveEdits}>Save Edits</Button>
    </div>
    </Content>
  );
};

export default EmpPage;


