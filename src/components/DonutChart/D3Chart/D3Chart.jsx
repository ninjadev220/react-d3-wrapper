import * as d3 from 'd3';

const margin = { top: 10, bottom: 80, left: 70, right: 10 }
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const url ='https://d3-datasets.firebaseio.com//donut_third_data.json';
let text = "";

class D3Chart {
	constructor(element) {
        let vis = this
        
        console.log('Donut Data', url);

        const pie = d3.pie()
            .value(d => d.price)
            .sort(null);

        const radius = Math.min(width, height) / 2;
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const arc = d3.arc()
            .innerRadius(radius - 40)
            .outerRadius(radius);

		vis.g = d3.select(element)
            .append("svg")
                .attr('class', 'pie')
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
                .attr("transform", `translate(310, 210)`)

            d3.json(url).then(donutData => {
                console.log(donutData);

            const path = vis.g.selectAll('path')
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
                        })
                    .on("mouseout", function(d) {
                        d3.select(this)
                            .style("cursor", "none")  
                            .style("fill", color(this._current))
                            .select(".text-group").remove();
                        })
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', (d,i) => color(i))
                    .on("mouseover", function(d) {
                        d3.select(this)     
                            .style("cursor", "pointer")
                            .style("fill", "black");
                        })
                    .on("mouseout", function(d) {
                        d3.select(this)
                            .style("cursor", "none")  
                            .style("fill", color(this._current));
                        })
                    .each(function(d, i) { this._current = i; });


                    vis.g.append('text')
                    .attr('text-anchor', 'middle')
                    .attr('dy', '.35em')
                    .text(text);
            })        
		// vis.update()		
	}
	// update() {
	// 	let vis = this

    // }
}

export default D3Chart; 
