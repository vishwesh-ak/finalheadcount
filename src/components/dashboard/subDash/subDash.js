import "./styles.css";

export const SubDash=({children,dashheading})=>{
    return(
        <div className="subdash">
            <div className="subdashheader">{dashheading}</div>
            {children}
        </div>
    )
}