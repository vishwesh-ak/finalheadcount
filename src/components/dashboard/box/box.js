import { Link } from "react-router-dom"
import "./styles.css"

export const Box=({children,className,link=""})=>{
    return(
        <div className={className}>
            {
            link.length!==0
                ?
                <Link to={link} target="_blank">
                    <div style={{position:"absolute",margin:"5px",width:"20px",height:"20px",borderRadius:"50%",backgroundColor:"#77777777"}}/>
                </Link>
                :
                <></>
            }
            {children}    
        </div>
    )
}

export const BoxHeader=({children})=>{
    return(
        <div className="boxheader">
            {children}
        </div>
    )
}

export const BoxArea=({children})=>{
    return(
        <div className="boxarea">
            {children}
        </div>
    )
}