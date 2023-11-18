
export default function PadXAxis(data,groupname){
    if(data.length==0){
        return []
    }
    var a=[],i,j,k;
    var m1=data[0].key[1],y1=data[0].key[0]
    var m2,y2
    a.push({"group":groupname,"key":m1+"/"+y1,"value":data[0].value})
    for(i=1;i<data.length;i++){
        m2=data[i].key[1]
        y2=data[i].key[0]
        if(y1==y2){
            if(m1==m2){
                a[a.length-1].value++;
            }
            else{
                for(j=m1+1;j<m2;j++){
                    a.push({"group":groupname,"key":j+"/"+y1,"value":0})
                }
                a.push({"group":groupname,"key":m2+"/"+y1,"value":data[i].value})
            }
        }
        else{
            for(j=m1+1;j<=12;j++){
                a.push({"group":groupname,"key":j+"/"+y1,"value":0})
            }
            for(j=y1+1;j<y2;j++){
                for(k=1;k<=12;k++){
                    a.push({"group":groupname,"key":k+"/"+j,"value":0})
                }
            }
            for(j=1;j<m2;j++){
                a.push({"group":groupname,"key":j+"/"+y2,"value":0})
            }
            a.push({"group":groupname,"key":m2+"/"+y2,"value":data[i].value})
        }
        y1=y2;
        m1=m2;
    }
    return a
}