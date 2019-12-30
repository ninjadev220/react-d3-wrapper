import React, { useState } from 'react';
import ChartWrapper from '../components/StaticBarChart/ChartWrapper';
import Select from 'react-select';

function StaticBarChartPage() {
    const [gender, genderSelected] = useState('')
    const options = [
        { value: 'men', label: 'Men' },
        { value: 'women', label: 'Women' },
    ];

    return (
        <div className="App">
            <h2>Updating Bar Chart Wrapper</h2>
            <div className='select-wrapper'>
                <span>Select a data set: </span>
                <div className='select-container'>
                <Select
                    options={options}
                    defaultValue={options[0]}
                    onChange={(options) => genderSelected(options.value) }
                />
                </div>
            </div>
            <ChartWrapper gender={gender} />
        </div>
  );
}

export default StaticBarChartPage;