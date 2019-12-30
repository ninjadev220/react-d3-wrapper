import React, { useState, useEffect } from 'react';
import ChartWrapper from '../components/ScatterGraph/ChartWrapper';
import { json } from 'd3';

function ScatterGraphPage() {
    const [scatterData, dataLoader] = useState([]);

    useEffect(() => {
        json('https://udemy-react-d3.firebaseio.com/children.json')
            .then(data => dataLoader({ data }))
            .catch(error => console.log(error))
    }, []);

    const renderChart = () => {
        if(scatterData.length >= 0) {
            return 'No Data Yet'
        }
        return  <ChartWrapper data={scatterData} />
    };

    return (
        <div className="App">
            <h2>Scatter Graph Wrapper</h2>
            {renderChart()}
        </div>
  );
}

export default ScatterGraphPage;