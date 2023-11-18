import { LollipopChart } from "@carbon/charts-react"
import { Box, BoxArea, BoxHeader } from "./box"
import PadXAxis from "../functions/padXAxis"
import LollipopOptions from "../chartOptions/lollipopOptions"

export const Box4=({data,boxheading,dashtype,boxnumber,className})=>{
    const groupname=boxnumber===1?"Onboarding":"Separated"
    data=PadXAxis(data,groupname)
    return(
        <Box className={"box box4 "+className} link={`/dashnew?a=${dashtype}&b=${boxnumber}&c=&d=`}>
            <BoxHeader>{boxheading}</BoxHeader>
            <BoxArea>
                {data.length===0?
                    (
                        <div style={{display:"flex",height:"100%",alignItems:"center",justifyContent:"center"}}>
                            No information available
                        </div>
                    )
                    :
                    (
                        
                        <LollipopChart data={data} options={LollipopOptions ("Timescale")}/>
                    )
                }
            </BoxArea>
        </Box>
    )
}