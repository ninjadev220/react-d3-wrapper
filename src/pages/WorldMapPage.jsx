import React from 'react';
import ChartWrapper from '../components/WorldMap/ChartWrapper';

function WorldMapPage() {

    return (
        <div className="App">
            <h2>GeoJSON Wrapper Example</h2>
            <p>Historical FIFA World Cup Hosting Locations</p>
            <ChartWrapper />
        </div>
    );
}

export default WorldMapPage;