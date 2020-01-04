import * as d3 from 'd3';

const margin = { top: 10, bottom: 80, left: 70, right: 10 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

export default class D3Chart {
	constructor(element) {
		let vis = this
		vis.g = d3.select(element)
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", `translate(${margin.left}, ${margin.top})`)

		vis.xLabel = vis.svg.append('text')
            .attr('x', width /2)
            .attr('y', height + 50)
            .attr('text-anchor', 'middle')

        vis.svg.append('text')
            .attr('x', -(height / 2))
            .attr('y', -50)
            .attr('text-anchor', 'middle')
            .text('Height in cm')
            .attr('transform', 'rotate(-90)')

        vis.xAxisGroup = vis.svg.append('g')
            .attr('transform', `translate(0, ${height})`)

        vis.yAxisGroup =  vis.svg.append('g')

		Promise.all([
			d3.json('https://d3-datasets.firebaseio.com/first_year_data.json'),
			d3.json('https://d3-datasets.firebaseio.com/second_year_data.json'),
			d3.json('https://d3-datasets.firebaseio.com/third_year_data.json')
		]).then((dataSets) => {
			vis.firstYearData = dataSets[0]
			vis.secondYearData = dataSets[1]
			vis.thirdYearData = dataSets[2]
			vis.update()
		})		
	}

	update() {
		let vis = this
	
	}
}