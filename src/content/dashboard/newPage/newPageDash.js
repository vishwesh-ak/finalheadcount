import { useLocation } from "react-router-dom";
import GetData from "../../../data/getData";
import { Box1 } from "../../../components/dashboard/box/box1";
import { Box2 } from "../../../components/dashboard/box/box2";
import { Box3 } from "../../../components/dashboard/box/box3"
import "./styles.css"
import { Box4 } from "../../../components/dashboard/box/box4";

export default function NewPageDash(){
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const DashType = params.get('a');
    const BoxNumber = parseInt(params.get('b'));
    
    var data;
    if(DashType!=="OnboardingSeparation"){
        if(BoxNumber===1){
            //should be GetData("FullData") to get detailed complex chart
            data=GetData(DashType)      
            return <Box1 className="newpagebox" data={data} boxheading={"Box1"} dashtype={DashType} charttype={"complex"}/>
        }
        if(BoxNumber===2){
            data=GetData("Dept_"+DashType)
            return <Box2 className="newpagebox" data={data} boxheading={"Box2"} dashtype={DashType}/>
        }
        if(BoxNumber===3){
            data=GetData(DashType)
            return <Box3 className="newpagebox" data={data} boxheading={"Box3"} dashtype={DashType}/>
        }
        return <ErrorMessage/>                       
    }
    else{
        if(BoxNumber===1)
        {
            data=GetData("DOJ")
            return <Box4 className="newpagebox" data={data} boxheading={"Onboarding"} dashtype={DashType} boxnumber={1}/>
        }
        if(BoxNumber===2)
        {
            data=GetData("DOL OnlyAbsentees")
            return <Box4 className="newpagebox" data={data} boxheading={"Onboarding"} dashtype={DashType} boxnumber={1}/>
        }
        return <ErrorMessage/>
    }
}

const ErrorMessage=()=>{
    return(
        <div style={{justifyContent:"center",color:"red",backgroundColor:"#ff000055",textAlign:"center",
                                    padding:"10px",width:"40vw",position:"absolute",left:"50%",transform:"translateX(-50%)",
                                    margin:"10px"}}>
                        This is an invalid link
                    </div>
    )
}