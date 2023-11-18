import { Content } from "@carbon/react";
import EmpType from "./empType/empType";
import Diversity from "./diversity/diversity"
import Location from "./location/location"
import OnboardingSeparation from "./onboardingSeparation/onboardingSeparation";


export default function Dashboard(){
    return(
        <Content>
            <h1 className="home__heading">Dashboards</h1>
            <EmpType/>
            <Diversity/>
            <Location/>
            <OnboardingSeparation/>
        </Content>
    )
}