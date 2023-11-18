import { Box1 } from "../../../components/dashboard/box/box1";
import { Box2 } from "../../../components/dashboard/box/box2";
import { Box3 } from "../../../components/dashboard/box/box3"
import { SubDash } from "../../../components/dashboard/subDash/subDash";
import GetData from "../../../data/getData";


export default function Diversity(){
    const DiversityData=GetData("Diversity");
    const DeptTypeData=GetData("Dept_Diversity");
    const dashtype="Diversity";
    return(
        <>
        <SubDash dashheading={"Diversity"}>
            <div className="gridbg">
                <Box1 data={DiversityData} boxheading={"Leader vs Diversity"} dashtype={dashtype} boxnumber={1}/>
                <Box2 data={DeptTypeData} boxheading={"Department vs Diversity"} dashtype={dashtype} boxnumber={2}/>
                <Box3 data={DiversityData} boxheading={"Diversity Distribution"} dashtype={dashtype} boxnumber={3}/>
            </div>
        </SubDash>
        </>
    )
}