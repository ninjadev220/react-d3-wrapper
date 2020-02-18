import React, { Component } from 'react';
import D3Chart from './D3Chart/D3Chart';
import './ChartWrapper.scss';

class ChartWrapper extends Component {
    componentDidMount(){
        this.setState({
            chart: new D3Chart(this.refs.chart, this.props.cupData)
        })
        console.log('PROPS', this.props.cupData);
    }

    shouldComponentUpdate() {
		return false
    }

    render() {
        return (
            <div className="chart-area" ref="chart"></div>
        )
    }
}

export default ChartWrapper;