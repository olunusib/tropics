import React, { useRef } from 'react';
import Globe from 'react-globe.gl';
import Labels from './labels'

const World = () => {
    const globeEl = useRef();
    return (
        <div>
            <Globe
                //size
                width={1300}
                height={700}

                pointOfView
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

                //labels
                labelsData={Labels}
                labelLat={(d) => d.lat}
                labelLng={(d) => d.lng}
                labelText={(d) => d.name}
                labelSize={(d) => 0.5 + d.size}
                labelDotRadius={(d) => 0.5 + d.size}
                labelColor={() => "rgba(255, 165, 0, 0.75)"}
                labelResolution={2}
            />
        </div>
    )
};

export default World;