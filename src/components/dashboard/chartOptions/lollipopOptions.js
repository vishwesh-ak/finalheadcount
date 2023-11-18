const LollipopOptions=(lollipoptitle)=>{
    return {
        title: lollipoptitle,
        axes: {
            bottom: {
                title: "TimeScale",
                scaleType: "labels",
                mapsTo: "key"
            },
            left: {
                mapsTo: "value"
            }
        },
        points: {
            radius: 4
        },
        height: "100%"
    }
}
export default LollipopOptions;