import { Dropdown } from "@carbon/react"
import { useEffect, useState } from "react";

const YearDropdown=({setYear})=>{
    const startyear=1999;
    const currentyear=new Date().getFullYear();
    var [items,setItems]=useState([])
    useEffect(() => {
        setYear(currentyear)
        var list=[]
        for(var i=currentyear;i>=startyear;i--){
            list.push({id:i,label:i.toString()});
            console.log(i)
        }
        setItems(list)
      }, []);
    console.log(items)
    return(
        <Dropdown 
            id="yeardropdown" 
            label="Year"  
            items={items}
            initialSelectedItem={{id:currentyear,label:currentyear.toString()}}
            onChange={(event)=>{setYear(event.selectedItem.id)}}
        />
    )
}
export default YearDropdown;