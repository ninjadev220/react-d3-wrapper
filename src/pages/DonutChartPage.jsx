import React, { useState, useEffect } from 'react';
import ChartWrapper from '../components/DonutChart/ChartWrapper';
import Table from '../components/DonutChart/Table';
import { json } from 'd3';

function DonutChartPage() {

    const [donutData, dataLoader] = useState({ data: [] });
    const [activeCompany, activeCompanySelector] = useState('');

    useEffect(() => {
        json('https://d3-datasets.firebaseio.com//donut_third_data.json')
            .then(data => dataLoader({ data }))
            .catch(error => console.log(error))
    }, []);

    const updateName = (activeCompany) => { 
        activeCompanySelector({ activeCompany })
    }

    const updateData = (data) => {
        dataLoader({ data })
    }

    const renderChart = () => {
        if(donutData.length === 0) {
            return 'No Data Yet'
        }
        return (
            <div className='graph-container'>
                <ChartWrapper data={donutData.data} updateName={updateName} />
                <Table data={donutData.data} updateData={updateData} activeCompany={activeCompany.activeCompany} />
            </div>
        )
    };

  return (
    <div className="App">
        <h2>Donut Chart</h2>
        {renderChart()}
    </div>
  );
}

export default DonutChartPage;