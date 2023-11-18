import { Dropdown } from "@carbon/react"
import { useEffect} from "react"
import "./styles.css"

const MonthDropdown=({setMonth})=>{
    const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const currentmonth=new Date().getMonth()
    
    useEffect(() => {
        {setMonth(currentmonth)}
      }, []);

    return(
        <Dropdown 
            id="monthdropdown" 
            label="Month" 
            items={[
                {id:1,label:"Jan"},{id:2,label:"Feb"},{id:3,label:"Mar"},{id:4,label:"Apr"},
                {id:5,label:"May"},{id:6,label:"Jun"},{id:7,label:"Jul"},{id:8,label:"Aug"},
                {id:9,label:"Sep"},{id:10,label:"Oct"},{id:11,label:"Nov"},{id:12,label:"Dec"}
            ]}
            initialSelectedItem={{id:currentmonth+1,label:months[currentmonth]}}
            onChange={(event)=>{setMonth(event.selectedItem.id)}}
        />
    )
}
export default MonthDropdown;