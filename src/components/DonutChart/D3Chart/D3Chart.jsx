import * as d3 from 'd3';

const margin = { top: 10, bottom: 80, left: 70, right: 10 }
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const url ='https://d3-datasets.firebaseio.com//donut_third_data.json';

class D3Chart {
	constructor(element, data, updateName) {
        let vis = this;
        vis.updateName = updateName;
        
        console.log('Donut Data', url);

        const pie = d3.pie()
            .value(d => d.price)
            .sort(null);

        const radius = Math.min(width, height) / 2;
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const arc = d3.arc()
            .innerRadius(radius - 40)
            .outerRadius(radius)
            .padAngle(.02);

		vis.g = d3.select(element)
            .append("svg")
                .attr('class', 'pie')
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
                .attr("transform", `translate(310, 210)`)

            d3.json(url).then(donutData => {
                console.log(donutData);

                    vis.g.selectAll('path')
                        .data(pie(donutData))
                        .enter()
                        .append("g")
                        .on("mouseover", function(d) {
                            let g = d3.select(this)
                                .style("cursor", "pointer")
                                .style("fill", "black")
                                .append("g")
                                .attr("class", "text-group");
                        
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
                                .attr("r", radius -50)
                                .attr("class", "pie-centre")
                                .attr('fill', (arc ,i) => color(i))
                                .append("g")
                            })

                        .on("mouseout", handleMouseOut)
                        .append('path')
                            .attr('d', arc)
                            .attr('class', 'pie-arc')
                            .attr('fill', (d,i) => color(i))
                            .each(function(d) { d.outerRadius = radius - 20; })
                            .on("mouseover", handleMouseOver)
                            .on("mouseout", handleMouseOut)
                            .each(function(d, i) { this._current = i; })
                        
                        function handleMouseOver(d) {
                            d3.select(this)     
                                .style("cursor", "pointer")
                                .style("fill", color(this._current))

                            d3.select('pie-centre')
                                .style("fill", (d,i) => color(i))
                        }
                    
                        function handleMouseOut() {
                            d3.select(this)
                                .style("cursor", "none")  
                                .select(".text-group").remove();
                        }
                    
            })        
		vis.update(data);		
	}
	update(data) {
        let vis = this
        // vis.data = data;

        // vis.g.selectAll('path')
        //     .data(d3.pie(vis.data))
        //     .enter()

    }
}

export default D3Chart; 
