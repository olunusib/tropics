import React, { useRef } from 'react';
import Globe from 'react-globe.gl';
import locations from '../location-data';

const handleLabelClick = ({ name, size, lat, lng, color }) => {

    window.open(`climateprofile/${name}`, '_blank')

}

const World = () => {
    const globeEl = useRef();

    const neededLocations = locations.map(loc => ({
        lng: loc.lng,
        lat: loc.lat,
        name: loc.country,
        size: 0.3,
        color: "white",
        country: loc.country,
        subregion: loc.subregion,
        density: loc.density,
        fullyTropical: loc.fullyTropical,
        landAreaKm: loc.landAreaKm,
        pop2023: loc.pop2023
    }))

    const getTooltip = d => `
        <div style="background-color: black; padding: 10px; border-radius: 5px; opacity:0.7; color:white">
            <h3 style="margin: 0; font-size: 16px; font-weight: bold;">${d.name}, ${d.subregion}</h3>
            <ul style="margin: 0; padding: 0; list-style: none;">
            <li style="margin: 10px 0;">${d.fullyTropical ? `Fully tropical` : `Not fully tropical`}</li>
            <li style="margin: 10px 0;">Density: ${d.density}</li>
            <li style="margin: 10px 0;">Population: ${d.pop2023}</li>
            </ul>
            <p style="margin: 0; font-size: 14px;">Area: ${d.landAreaKm} km</p>
        </div>
        `

    return (
        <div>
            <Globe
                pointOfView
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

                //labels
                labelsData={neededLocations}

                labelLat={(d) => d.lat}
                labelLng={(d) => d.lng}
                labelText={(d) => d.name}
                labelSize={(d) => 0.5 + d.size}
                labelDotRadius={(d) => 0.5 + d.size}
                labelColor={() => "rgba(255, 255, 255, 0.9)"}
                labelResolution={2}
                onLabelClick={(label_details, event) => handleLabelClick(label_details)}

                labelLabel={getTooltip}
            />
        </div>
    )
};

export default World;