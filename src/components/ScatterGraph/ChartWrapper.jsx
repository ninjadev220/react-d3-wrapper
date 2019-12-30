import React, { Component } from 'react';
import D3Chart from './D3Chart/D3Chart';

class ChartWrapper extends Component {
    componentDidMount(){
        this.setState({
            chart: new D3Chart(this.refs.chart, this.props.data)
        })
    }

    shouldComponentUpdate(){
        return false;
    }

    render() {
        return (
            <div ref="chart"></div>
        )
    }
}

export default ChartWrapper;