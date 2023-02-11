import React, { useRef } from 'react';
import Globe from 'react-globe.gl';
import Labels from './labels'
import locations from './location-data';

const World = () => {
    const globeEl = useRef();
    return (
        <div>
            <Globe
                pointOfView
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

                //labels
                labelsData={locations.map(loc => ({
                    lng: loc.lng,
                    lat: loc.lat,
                    name: loc.country,
                    size: 0.3,
                    color: "white"
                }))}
                labelLat={(d) => d.lat}
                labelLng={(d) => d.lng}
                labelText={(d) => d.name}
                labelSize={(d) => 0.5 + d.size}
                labelDotRadius={(d) => 0.5 + d.size}
                labelColor={() => "rgba(255, 255, 255, 0.9)"}
                labelResolution={2}
            />
        </div>
    )
};

export default World;