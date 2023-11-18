
export default function makeDonutValues(data,month,year){
    var a={}
    var keys=[]
    for(var i=0;i<data.length;i++){
        if(data[i].key[0]==year && data[i].key[1]>month){
            continue;
        }
        if(data[i].key[0]>year){
            continue
        }
        
        if(data[i].key[2]==null && data[i].key[3]==null){
            if(a[data[i].key[4]]) {
                a[data[i].key[4]]+=data[i].value;
              } else {
                a[data[i].key[4]] = data[i].value;
                keys.push(data[i].key[4])
              }
        }
        if(data[i].key[2]==year && data[i].key[3]>=month){
            if(a[data[i].key[4]]) {
                a[data[i].key[4]]+=data[i].value;
              } else {
                a[data[i].key[4]] = data[i].value;
                keys.push(data[i].key[4])
              }
            continue;
        }
        if(data[i].key[2]>year){
            if(a[data[i].key[4]]) {
                a[data[i].key[4]]+=data[i].value;
              } else {
                a[data[i].key[4]] = data[i].value;
                keys.push(data[i].key[4])
              }
            }
    }
    var b=[]
    for(i=0;i<keys.length;i++){
        b.push({group:keys[i],value:a[keys[i]]})
    }
    return b
}
