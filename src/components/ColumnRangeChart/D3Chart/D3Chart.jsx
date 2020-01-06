import * as d3 from 'd3';

const margin = { top: 10, bottom: 80, left: 70, right: 10 };
let width = 900 - margin.left - margin.right;
let height = 700 - margin.top - margin.bottom;

export default class D3Chart {
	constructor(element) {
		const vis = this;
        vis.svg = d3.select(element)
            .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)

        vis.xLabel = vis.svg.append('text')
            .attr('x', width /2)
            .attr('y', height + 50)
            .attr('text-anchor', 'middle')

        vis.svg.append('text')
            .attr('x', -(height / 2))
            .attr('y', -50)
            .attr('text-anchor', 'middle')
            .text('Months')
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
			vis.update('first')
		})		
	}

	update(year) {
		const vis = this;
        vis.data = (year === 'first') ? vis.firstYearData : (year === 'second' ? vis.secondYearData : (year === 'third'? vis.thirdYearData : null));
        vis.xLabel.text('Sales (Units)')
        const x = d3.scaleLinear()
            .domain([
                d3.min(vis.data, d => d.sales[0]) * 0.95, 
                d3.max(vis.data, d => d.sales[1])
            ])
            .range([0, width])
            console.log('UPDATE', vis.data);
        
        // Define the div for the tooltip
        const tooltip = d3
            .select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        const y = d3.scaleBand()
            .domain(vis.data.map(d => d.month))
            .range([height, 0])
            .padding(0.4)

        const xAxisCall = d3.axisBottom(x)
        vis.xAxisGroup
            .transition().duration(500)
            .call(xAxisCall)

        const yAxisCall = d3.axisLeft(y)
        vis.yAxisGroup
            .transition().duration(500)
            .call(yAxisCall)
    
        vis.svg.selectAll(".y-axis")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(x)
                .ticks(vis.data.length)
                .tickFormat(function(d, i) {
                    return vis.data[i].month;
                }));
    
        vis.svg.selectAll(".x-axis").transition().duration(0)
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));
    
        const rects = vis.svg.selectAll("rect")
            .data(vis.data)

        rects.exit().remove();

        function handleMouseOver(d) {
            d3.select(this).style("fill", "#CC0606");
                tooltip
                  .transition()
                  .duration(200)
                  .style('opacity', 1);
                tooltip
                  .html((`<strong style="color:red">Low:</strong> <strong>${d.sales[0]}</strong> <br /> <strong style="color:green">High:</strong> <strong>${d.sales[1]}</strong>`))
                  .style('left', d3.event.pageX + 'px')
                  .style('top', d3.event.pageY - 28 + 'px')
        }

        function handleMouseOut() {
            d3.select(this).style("fill", "#259CD0");
            tooltip
                .transition()
                .duration(200)
                .style('opacity', 0);
        }

        rects.enter().append("rect")
            .attr("class", "rects")
            .style("fill", "#259CD0")
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .merge(rects)
        .transition().duration(500)
            .attr("width", function(d) {
                return x(d.sales[1] - d.sales[0]) - x(0);
            })
            .attr("height", y.bandwidth)
            .attr("y", d => y(d.month))
            .attr("x", function(d) {
                return x(d.sales[0]);
            });            
	}
}