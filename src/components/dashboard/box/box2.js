import { GroupedBarChart} from "@carbon/charts-react"
import { Box, BoxArea, BoxHeader } from "./box"
import { useState } from "react"
import { MonthYearDropdown } from "../dropdowns/monthYear"
import BarOptions from "../chartOptions/barOptions"
import GenerateGroupedBarChart from "../functions/generateGroupedBarChart"


export const Box2=({data,boxheading,dashtype,className,boxnumber})=>{
    const [month2,setMonth2]=useState(new Date().getMonth()+1);
    const [year2,setYear2]=useState(new Date().getFullYear());
    return(
        <Box className={"box box2 "+className} link={`/dashnew?a=${dashtype}&b=${boxnumber}&c=&d=`}>
            <BoxHeader>{boxheading}</BoxHeader>
            <BoxArea>
                <MonthYearDropdown setMonth={setMonth2} setYear={setYear2}/>
                <GroupedBarChart data={GenerateGroupedBarChart(data,month2,year2)} options={BarOptions}/>
            </BoxArea>
        </Box>
    )
}