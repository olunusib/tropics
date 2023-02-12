

export const convertToNivoFormat = (rawData) => {
    let mydata = Object.keys(rawData).map(key => {
        let ar = rawData[key]
        ar.key = key     
        return ar
     })


    const final = [
        {
            id: "Sea Level (ft)",
            data: []
        },{
            id: "Humidity (g/kg)",
            data: []
        },{
            id: "Temperature (K)",
            data: []
        },{
            id: "Elevation (ft)",
            data: []
        }
    ]

    for(const data of mydata){
        final[0]["data"].push({x:data.key, y:data.sea_level})
        final[1]["data"].push({x:data.key, y:data.humidity})
        final[2]["data"].push({x:data.key, y:data.temp})
        final[3]["data"].push({x:data.key, y:data.ground_level})
    }

    return final;
}