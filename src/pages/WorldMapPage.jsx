import React, { useEffect, useState } from 'react';
import ChartWrapper from '../components/WorldMap/ChartWrapper';
import { json } from 'd3';

function WorldMapPage() {
    const [cupData, cupDataLoader] = useState({ data: [] });

    useEffect(() => {
        json("https://raw.githubusercontent.com/ahebwa49/geo_mapping/master/src/world_cup_geo.json")
            .then(data => cupDataLoader({ data }))
            .catch(error => console.log(error))
    }, []);

    console.log('CUPDATA', cupData);

    return (    
        <div className="App">
            <h2>GeoJSON Wrapper Example</h2>
            <p>Historical FIFA World Cup Hosting Locations</p>
            <div className='graph-container'>
                <ChartWrapper cupData={cupData}/>
            </div>
        </div>
    );
}

export default WorldMapPage;