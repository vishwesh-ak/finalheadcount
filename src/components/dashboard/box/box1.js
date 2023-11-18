
import { GroupedBarChart } from "@carbon/charts-react";
import { MonthYearDropdown } from "../dropdowns/monthYear";
import {Box,BoxArea,BoxHeader} from "./box"
import '@carbon/charts-react/styles.css'
import { useState } from "react";

import GenerateGroupedBarChart from "../functions/generateGroupedBarChart"
import BarOptions from "../chartOptions/barOptions";

export const Box1=({className,data,boxheading,dashtype,boxnumber,charttype="simple"})=>{
    const [month1,setMonth1]=useState(new Date().getMonth() +1);
    const [year1,setYear1]=useState(new Date().getFullYear());
    if(charttype==="simple"){
        return(
            <Box className={"box box1 "+className} link={`/dashnew?a=${dashtype}&b=${boxnumber}&c=${month1}&d=${year1}`}>
                <BoxHeader>{boxheading}</BoxHeader>
                <BoxArea>
                    <MonthYearDropdown setMonth={setMonth1} setYear={setYear1}/>
                    <GroupedBarChart data={GenerateGroupedBarChart(data,month1,year1)} options={BarOptions}/>
                </BoxArea>
            </Box>
        )
    }
    if(charttype==="complex"){
        return(
            <Box className={"box box1 "+className}>
                <BoxHeader>{boxheading}</BoxHeader>
                <BoxArea>
                    {/* <GroupedBarChart data={GenerateComplexBarChart(data,dashtype)} options={BarOptions}/> */}
                    <MonthYearDropdown setMonth={setMonth1} setYear={setYear1}/>
                    <GroupedBarChart data={GenerateGroupedBarChart(data,month1,year1)} options={BarOptions}/>   
                </BoxArea>
            </Box>
        )
    }
    return(
        <Box className="box box1">
            <BoxHeader>{boxheading}</BoxHeader>
            <BoxArea>
                Wrong Attribute Provided
            </BoxArea>
        </Box>
    )
}
