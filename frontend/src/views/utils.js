

export const convertToNivoFormatWeather = (rawData) => {
    let mydata = Object.keys(rawData).map(key => {
        let ar = rawData[key]
        ar.key = key
        return ar
    })


    const final = [
        {
            id: "Sea Level (ft)",
            data: []
        }, {
            id: "Humidity (g/kg)",
            data: []
        }, {
            id: "Temperature (K)",
            data: []
        }, {
            id: "Elevation (ft)",
            data: []
        }
    ]

    for (const data of mydata) {
        final[0]["data"].push({ x: data.key, y: data.sea_level })
        final[1]["data"].push({ x: data.key, y: data.humidity })
        final[2]["data"].push({ x: data.key, y: data.temp })
        final[3]["data"].push({ x: data.key, y: data.ground_level })
    }

    return final;
}

export const convertToNivoFormatCarbon = (rawData) => {

    const firstValue = rawData["share_global_luc_co2"];
    const country = rawData["country"]

    var final = [
        {
            "id": "Others",
            "label": "Others",
            "value": 100 - Math.abs(firstValue),
            "color": "hsl(258, 70%, 50%)"
        },
        {
            "id": country,
            "label": country,
            "value": Math.abs(firstValue),
            "color": "hsl(159, 70%, 50%)"
        },

    ]

    return final;

}

export const convertToNivoFormatForestry = (rawData) => {

    const firstValue = rawData["score"];
    const country = rawData["country"];
    const image_src = rawData["image"];

    var final = [
        {
            "id": "Others",
            "label": "Others",
            "value": 100 - Math.abs(firstValue),
            "color": "hsl(245, 70%, 50%)"
        },
        {
            "id": country,
            "label": country,
            "value": Math.abs(firstValue),
            "color": "hsl(46, 70%, 50%)"
        },

    ]

    return {final, image_src};
}

