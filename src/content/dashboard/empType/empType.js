import { Box1 } from "../../../components/dashboard/box/box1";
import { Box2 } from "../../../components/dashboard/box/box2";
import { Box3 } from "../../../components/dashboard/box/box3"
import { SubDash } from "../../../components/dashboard/subDash/subDash";

import '@carbon/charts-react/styles.css'
import "../styles.css"
import GetData from "../../../data/getData";

export default function EmpType(){
    const EmpTypeData=GetData("EmpType");
    const DeptTypeData=GetData("Dept_EmpType");
    const dashtype="EmpType";
    return(
        <>
        <SubDash dashheading={"Employee Type"}>
            <div className="gridbg">
                <Box1 data={EmpTypeData} boxheading={"Leader vs Employee Type"} dashtype={dashtype} boxnumber={1}/>
                <Box2 data={DeptTypeData} boxheading={"Department vs Employee Type"} dashtype={dashtype} boxnumber={2}/>
                <Box3 data={EmpTypeData} boxheading={"Employee Type Distribution"} dashtype={dashtype} boxnumber={3}/>
            </div>
        </SubDash>
        </>
    )
}