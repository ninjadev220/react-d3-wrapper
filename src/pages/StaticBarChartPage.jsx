import React, { useState } from 'react';
import ChartWrapper from '../components/StaticBarChart/ChartWrapper';
import Select from 'react-select';

function StaticBarChartPage() {
    const [gender, genderSelected] = useState('men')
    const options = [
        { value: 'men', label: 'Men' },
        { value: 'women', label: 'Women' },
    ];

    return (
        <div className="App">
            <h2>Updating Bar Chart Wrapper</h2>
            <div className='select-wrapper'>
                <Select
                    options={options}
                    onChange={genderSelected}
                    placeholder='Select a Dataset'
                />
            </div>
            <ChartWrapper gender={gender} />
    </div>
  );
}

export default StaticBarChartPage;