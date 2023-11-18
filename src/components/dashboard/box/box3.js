import { useState } from "react"
import { MonthYearDropdown } from "../dropdowns/monthYear"
import { DonutChart } from "@carbon/charts-react";
import { Box, BoxArea, BoxHeader } from "./box";
import makeDonutValues from "../functions/makeDonutValues";
import DonutOptions from "../chartOptions/donutOptions";


export const Box3=({data,boxheading,dashtype,boxnumber,className=""})=>{
    const [month3,setMonth3]=useState(null);
    const [year3,setYear3]=useState(null);
    return(
        <Box className={"box box3 "+className} link={`/dashnew?a=${dashtype}&b=${boxnumber}&c=${month3}&d=${year3}`}>
            <BoxHeader>{boxheading}</BoxHeader>
            <BoxArea>
                <MonthYearDropdown setMonth={setMonth3} setYear={setYear3}/>
                <DonutChart data={makeDonutValues(data,month3,year3)} options={DonutOptions("Employees")}/>
            </BoxArea>
        </Box>
    )
}