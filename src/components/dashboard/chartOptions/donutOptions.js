const DonutOptions=(centerlabel)=>{
    var options={
        resizable: true,
        legend: {
            alignment: 'center'
        },
        donut: {
            center: {
                label: centerlabel   //'Browsers'
            },
            alignment: 'center'
        },
        height: '100%'
    } 
    return options;
}
export default DonutOptions;