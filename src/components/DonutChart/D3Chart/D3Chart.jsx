import * as d3 from 'd3';

const margin = { top: 10, bottom: 80, left: 70, right: 10 }
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const url ='https://d3-datasets.firebaseio.com//donut_third_data.json';

class D3Chart {
	constructor(element, data) {
        let vis = this;
        
        console.log('Donut Data', url);

        vis.pie = d3.pie()
            .value(d => d.price)
            .sort(null);

        vis.radius = Math.min(width, height) / 2;
        vis.color = d3.scaleOrdinal(d3.schemeCategory10);

        vis.arc = d3.arc()
            .innerRadius(vis.radius - 40)
            .outerRadius(vis.radius)
            .padAngle(.02);

		vis.g = d3.select(element)
            .append("svg")
                .attr('class', 'pie')
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
                .attr("transform", `translate(310, 210)`)
    
		vis.update(data);		
	}
	update(data) {
        let vis = this
        vis.data = data;

        console.log('UPDATED DATA', vis.data)

        const path = vis.g.selectAll('path')
            .data(vis.pie(vis.data))
            .enter()
            .append("g")
            .on("mouseover", function(d) {
                let g = d3.select(this)
                    .style("cursor", "pointer")
                    .style("fill", "black")
                    .append("g")
                    .attr("class", "text-group")
            
                g.append("text")
                    .attr("class", "name-text")
                    .text(`${d.data.company}`)
                    .attr('text-anchor', 'middle')
                    .attr('dy', '-1.2em');
            
                g.append("text")
                    .attr("class", "value-text")
                    .text(`${d.data.price}`)
                    .attr('text-anchor', 'middle')
                    .attr('dy', '.6em');

                g.append("svg:circle")
                    .attr("cx", 0)
                    .attr("cy", 0)
                    .attr("r", vis.radius -50)
                    .attr("class", "pie-centre")
                    .attr('fill', vis.color)
                    .append("g")
                })

            .on("mouseout", function(d) {
                d3.select(this)
                    .style("cursor", "none")  
                    .select(".text-group").remove();
            })

            .append('path')
                .attr('d', vis.arc)
                .attr('class', 'pie-arc')
                .attr('fill', (d,i) => vis.color(i))
                .each(function(d) { d.outerRadius = vis.radius - 20; })
                .each(function(d, i) { this._current = i; })

    }
}

export default D3Chart; 
