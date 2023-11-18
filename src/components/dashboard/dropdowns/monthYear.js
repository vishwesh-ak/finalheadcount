import MonthDropdown from "./month"
import YearDropdown from "./year"

export const MonthYearDropdown=({setMonth,setYear})=>{
    return(
        <div className="datemonthflex">
            <MonthDropdown setMonth={setMonth}/>
            <YearDropdown setYear={setYear}/>
        </div>
    )
}