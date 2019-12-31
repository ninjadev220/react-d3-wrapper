import React, { useState, useEffect } from 'react';
import ChartWrapper from '../components/ScatterGraph/ChartWrapper';
import Table from '../components/ScatterGraph/Table';
import { json } from 'd3';

function ScatterGraphPage() {
    const [scatterData, dataLoader] = useState({ data: [] });

    useEffect(() => {
        json('https://udemy-react-d3.firebaseio.com/children.json')
            .then(data => dataLoader({ data }))
            .catch(error => console.log(error))
    }, []);

    console.log('App level', scatterData);

    const updateData = (data) => {
        dataLoader({ data })
    }

    const renderChart = () => {
        if(scatterData.length === 0) {
            return 'No Data Yet'
        }
        return (
            <div className='graph-container'>
                <ChartWrapper data={scatterData.data} />
                <Table data={scatterData.data} updateData={updateData} />
            </div>
        )
    };

    return (
        <div className="App">
            <h2>Scatter Graph Wrapper</h2>
            {renderChart()}
        </div>
  );
}

export default ScatterGraphPage;