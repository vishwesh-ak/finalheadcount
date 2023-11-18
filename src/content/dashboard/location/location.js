import { Box1 } from "../../../components/dashboard/box/box1";
import { Box2 } from "../../../components/dashboard/box/box2";
import { Box3 } from "../../../components/dashboard/box/box3"
import { SubDash } from "../../../components/dashboard/subDash/subDash";
import GetData from "../../../data/getData";

export default function Location(){
    const LocationData=GetData("Location");
    const DeptTypeData=GetData("Dept_Location");
    const dashtype="Location";
    return(
        <>
            <SubDash dashheading={"Location"}>
                <div className="gridbg">
                    <Box1 data={LocationData} boxheading={"Leader vs Location"} dashtype={dashtype} boxnumber={1}/>
                    <Box2 data={DeptTypeData} boxheading={"Department vs Location"} dashtype={dashtype} boxnumber={2}/>
                    <Box3 data={LocationData} boxheading={"Location Distribution"} dashtype={dashtype} boxnumber={3}/>
                </div>
            </SubDash>
        </>
    )
}