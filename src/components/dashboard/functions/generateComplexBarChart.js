export default function GenerateComplexBarChart(data,dashtype){
    /*var a=[],b={};
    var index_to_be_considered=Obtain_Chart_Variable(dashtype)
    for(var i=0;i<data.length;i++){
        if(b[data[i].key[8]])
            a.push({"group":data[i].key[index_to_be_considered],"key":data[i].key[8],"value":data[i].value})
        else
        {
            a.push({"group":data[i].key[index_to_be_considered],"key":data[i].key[8],"value":data[i].value})
            b[data[i].key[8]]=1
        }
    }
    return a
    */
    var a=[]
    var leadername="Melissa Smith";
    for(var i=0;i<data.length;i++){
        if(data[i].key[5]===leadername){
            a.push({key:new Date(data[i].key[0],data[i].key[1]-1,1),value:data[i].value})
        }
    }
    return a;

}

function Obtain_Chart_Variable(dashtype){
    if(dashtype==="EmpType"){
        return 5
    }
    if(dashtype==="Diversity"){
        return 9
    }
    if(dashtype==="Location"){
        return 10
    }
    return -1
}