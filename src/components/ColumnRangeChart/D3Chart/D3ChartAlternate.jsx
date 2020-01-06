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

        rects.enter().append("rect")
            .attr("class", "rects")
            .style("fill", "#259CD0")
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
        
            d3.select(window).on('resize', function() {
                width = parseInt(vis.svg.style("width")) - margin.left - margin.right;
                height = parseInt(vis.svg.style("height")) - margin.top - margin.bottom;
                this.update(width, height);
            });

            
	}
}

// vis.xLabel.text(`The ${year} year of business`)
// const y = d3.scaleLinear()
//     .domain([
//         d3.min(vis.data, d => d.sales[0]) * 0.95, 
//         d3.max(vis.data, d => d.sales[1])
//     ])
//     .range([height, 0])
//     console.log('UPDATE', vis.data);

// const x = d3.scaleBand()
//     .domain(vis.data.map(d => d.month))
//     .range([0, width])
//     .padding(0.4)

// const xAxisCall = d3.axisBottom(x)
// vis.xAxisGroup
//     .transition().duration(500)
//     .call(xAxisCall)

// const yAxisCall = d3.axisLeft(y)
// vis.yAxisGroup
//     .transition().duration(500)
//     .call(yAxisCall)

// // DATA JOIN
// const rects = vis.svg.selectAll('rect')
// .data(vis.data)

// // EXIT
// rects.exit()
//     .transition().duration(500)
//     .attr('height', 0)
//     .attr('y', height)
//     .remove()

// // UPDATE
// rects.transition().duration(500)
//     .attr('x', d => x(d.month))
//     .attr('y', d => y(d.sales[0]))
//     .attr('width', x.bandwidth)
//     .attr("height", d => height - y(d.sales[0]))

// // ENTER
// rects.enter().append('rect')
//     // .attr('x', d => x(d.month))
//     // .attr('width', x.bandwidth)
//     // .attr("fill", "#259CD0")
//     // .attr("y", height)
//     // .transition().duration(500)
//     // 	.attr('height', d => height - y(d.sales[0] - d.sales[1]) - y(0))
//     // 	.attr('y', d => y(d.sales))

//     // // .attr("fill", "#259CD0")
//     // // .attr('x', d => x(d.month))
//     // // .attr('width', x.bandwidth)
//     // // .attr('y', height)
//     // // .transition().duration(500)
//     // // 	.attr("height", d => y(d.sales[1] - d.sales[0]) - y(0))
//     // // 	.attr('y', d => y(d.sales))
    
//     .attr('x', d => x(d.month))
//     .attr('width', x.bandwidth)
//     .attr('fill', '#259CD0')
//     .attr('y', height)
//     .transition().duration(500)
//         .attr("height", d => y(d.sales[1] - d.sales[0]) - y(0))
//         .attr('y', d => y(d.sales))

//     console.log('Rects', rects);