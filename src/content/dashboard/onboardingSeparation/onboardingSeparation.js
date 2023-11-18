import { Box4 } from "../../../components/dashboard/box/box4";
import { SubDash } from "../../../components/dashboard/subDash/subDash";
import GetData from "../../../data/getData";

export default function OnboardingSeparation(){
    const DOJData=GetData("DOJ")
    const DOLData=GetData("DOL OnlyAbsentees")
    const dashtype="OnboardingSeparation";
    return(
        <>
            <SubDash dashheading={"Onboarding / Separation"}>
                <div className="gridbg">
                    <Box4 data={DOJData} boxheading={"Onboarding"} dashtype={dashtype} boxnumber={1}/>
                    <Box4 data={DOLData} boxheading={"Separation"} dashtype={dashtype} boxnumber={2}/>
                </div>
            </SubDash>
        </>
    )
}