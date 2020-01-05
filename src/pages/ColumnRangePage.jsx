import React, { useState } from 'react';
import ChartWrapper from '../components/ColumnRangeChart/ChartWrapper';
import Select from 'react-select';

function ColumnRangeChartPage() {
    const [year, yearSelected] = useState('')
    const options = [
        { value: 'first', label: 'First Year of Business' },
        { value: 'second', label: 'Second Year of Business' },
        { value: 'third', label: 'Third Year of Business' },
    ];

    return (
        <div className="App">
            <h2>Column Range Chart Wrapper</h2>
            <div className='select-wrapper'>
                <span>Select a data set: </span>
                <div className='select-container'>
                <Select
                    options={options}
                    defaultValue={options[0]}
                    onChange={(options) => yearSelected(options.value) }
                />
                </div>
            </div>
            <ChartWrapper year={year} />
        </div>
  );
}

export default ColumnRangeChartPage;