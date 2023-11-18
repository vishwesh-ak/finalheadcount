
export default function GenerateGroupedBarChart(data,month,year){
    if(!data.toString()){
      return []
    }
    var a={},mapkey
    var chosendate=new Date(year,month-1,1);
    var startdate,enddate;

    for(var i=0;i<data.length;i++){
        mapkey=[data[i].key[4],data[i].key[5]]
        startdate=new Date(data[i].key[0],data[i].key[1]-1,1);
        if(data[i].key[2]===null && data[i].key[3]===null){
            if(startdate<=chosendate){
                if(a[mapkey]) {
                    a[mapkey]+=data[i].value
                    continue;
                }
                a[mapkey]=data[i].value
            }
            continue;
        }
        enddate=new Date(data[i].key[2],data[i].key[3]-1,1);
        if(startdate<=chosendate && chosendate<=enddate){
            if(startdate<=chosendate){
                if(a[mapkey]) {
                    a[mapkey]+=data[i].value
                    continue;
                }
                a[mapkey]=data[i].value
            }
        }
    }

    var b=[]
    var keys=Object.keys(a)
    for(i=0;i<keys.length;i++){
      mapkey=keys[i].split(",");
      b.push({group:mapkey[0],key:mapkey[1],value:a[mapkey]})
    }
    return b;
}
