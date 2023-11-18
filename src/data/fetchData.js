
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DatabaseAPI = (DataName) => {
    const [responseFromCouchDB, setResponseFromCouchDB] = useState({rows:[]});
    
    var API="http://localhost:5000/api/";
    if(DataName==="DOJ")
        API+="getDOJData"
    if(DataName==="DOL")
        API+="getDOLData"
    if(DataName==="EmpType")
        API+="getEmpTypeData"
    if(DataName==="Diversity")
        API+="getDiversityData"
    if(DataName==="Location")
        API+="getLocationData"
    if(DataName==="FullData")
        API+="getFullData"


    if(DataName==="Dept_EmpType")
        API+="getDeptEmpTypeData"
    if(DataName==="Dept_Diversity")
        API+="getDeptDiversityData"
    if(DataName==="Dept_Location")
        API+="getDeptLocationData"
    
    useEffect(() => {
        axios.get(API)
        .then((response) => {
            // Process the response and extract the data
            setResponseFromCouchDB(response.data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []); // Fetch data when the component mounts


    return responseFromCouchDB;
}
export default DatabaseAPI;