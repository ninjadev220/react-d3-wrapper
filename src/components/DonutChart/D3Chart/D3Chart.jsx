import * as d3 from 'd3';

const margin = { top: 10, bottom: 80, left: 70, right: 10 }
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const url ='https://d3-datasets.firebaseio.com//donut_third_data.json';

class D3Chart {
	constructor(element, data) {
        let vis = this;
        
        console.log('Donut Data', url);

		vis.g = d3.select(element)
            .append("svg")
                .attr('class', 'pie')
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
                .attr("transform", `translate(310, 210)`)

        vis.pie = d3.pie()
            .value(d => d.price)
            .sort(null);

        vis.radius = Math.min(width, height) / 2;
        vis.color = d3.scaleOrdinal(d3.schemeCategory10);

        vis.arc = d3.arc()
            .innerRadius(vis.radius - 40)
            .outerRadius(vis.radius)
            .padAngle(.02);

        vis.update(data);		
	}
	update(data) {
        let vis = this
        vis.data = data;

        console.log('UPDATED DATA', vis.data)

        vis.path = vis.g.selectAll('path')
            .data(vis.pie(vis.data))
            .enter()
            .append("g")
            .on('change', vis.change)
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
                    .select(".text-group").remove()
            })

            .append('path')
                .attr('d', vis.arc)
                .attr('class', 'pie-arc')
                .attr('fill', (d,i) => vis.color(i))
                .each(function(d) { d.outerRadius = vis.radius - 20; })
                .each(function(d, i) { vis._current = i; })

        vis.change = () => {
            console.log('CHANGE');
            var value = vis.value;
            vis.pie.value(function(d) { return d[value]; }); // change the value function
            vis.path = vis.path.data(vis.pie); // compute the new angles
            vis.path.transition().duration(750).attrTween("d", vis.arcTween); // redraw the arcs
        }

        vis.arcTween = (a) => {
            var i = d3.interpolate(vis._current, a);
            vis._current = i(0);
            return function(t) {
                return vis.arc(i(t));
            };
        }

        // vis.path = vis.g.datum(vis.data).selectAll("path")
        //     .data(vis.pie)
        //     .enter().append("path")
        //     .attr("fill", function(d, i) { return vis.color(i); })
        //     .attr("d", vis.arc)
        //     .each(function(d) { this._current = d; }) // store the initial angles
        //     .on("change", vis.change);

        // d3.selectAll("input")
        //     .on("change", vis.change);

        // var timeout = setTimeout(function() {
        //     d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
        // }, 2000);

        // vis.change = () => {
        //     var value = this.value;
        //     vis.pie.value(function(d) { return d[value]; }); // change the value function
        //     vis.path = vis.path.data(vis.pie); // compute the new angles
        //     vis.path.transition().duration(750).attrTween("d", vis.arcTween); // redraw the arcs
        // }

        // function type(d) {
        //     d.apples = +d.apples || 0;
        //     d.oranges = +d.oranges || 0;
        //     return d;
        // }

        // Store the displayed angles in _current.
        // Then, interpolate from _current to the new angles.
        // During the transition, _current is updated in-place by d3.interpolate.
        // vis.arcTween = (a) => {
        //     var i = d3.interpolate(this._current, a);
        //     this._current = i(0);
        //     return function(t) {
        //         return vis.arc(i(t));
        //     };
        // }

    }
}

export default D3Chart; 
