import * as d3 from 'd3';

const margin = { top: 10, bottom: 80, left: 70, right: 10 }
const width = 500 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

const url ='https://udemy-react-d3.firebaseio.com/donut_first_data.json';

class D3Chart {
	constructor(element) {
        let vis = this
        
        console.log('Donut Data', url);

		vis.g = d3.select(element)
            .append("svg")
                .attr('class', 'pie')
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)


            d3.json(url).then(donutData => {
                console.log(donutData);
    
                const radius = Math.min(width, height) / 2;
                const color = d3.scaleOrdinal(d3.schemeCategory10);

                const arc = d3.arc()
                    .innerRadius(radius - 40)
                    .outerRadius(radius);

                const pie = d3.pie()
                    .value(function(d) { return d.company; })
                    .sort(null);

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
            })        
		// vis.update()		
	}
	// update() {
	// 	let vis = this

    // }
}

export default D3Chart; 


// var data = [
//     {name: "USA", value: 40},
//     {name: "UK", value: 20},
//     {name: "Canada", value: 30},
//     {name: "Maxico", value: 10},
//   ];
//   var text = "";
  
//   var width = 260;
//   var height = 260;
//   var thickness = 40;
//   var duration = 750;
  
//   var radius = Math.min(width, height) / 2;
//   var color = d3.scaleOrdinal(d3.schemeCategory10);
  
//   var svg = d3.select("#chart")
//   .append('svg')
//   .attr('class', 'pie')
//   .attr('width', width)
//   .attr('height', height);
  
//   var g = svg.append('g')
//   .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');
  
//   var arc = d3.arc()
//   .innerRadius(radius - thickness)
//   .outerRadius(radius);
  
//   var pie = d3.pie()
//   .value(function(d) { return d.value; })
//   .sort(null);
  
//   var path = g.selectAll('path')
//   .data(pie(data))
//   .enter()
//   .append("g")
//   .on("mouseover", function(d) {
//         let g = d3.select(this)
//           .style("cursor", "pointer")
//           .style("fill", "black")
//           .append("g")
//           .attr("class", "text-group");
   
//         g.append("text")
//           .attr("class", "name-text")
//           .text(`${d.data.name}`)
//           .attr('text-anchor', 'middle')
//           .attr('dy', '-1.2em');
    
//         g.append("text")
//           .attr("class", "value-text")
//           .text(`${d.data.value}`)
//           .attr('text-anchor', 'middle')
//           .attr('dy', '.6em');
//       })
//     .on("mouseout", function(d) {
//         d3.select(this)
//           .style("cursor", "none")  
//           .style("fill", color(this._current))
//           .select(".text-group").remove();
//       })
//     .append('path')
//     .attr('d', arc)
//     .attr('fill', (d,i) => color(i))
//     .on("mouseover", function(d) {
//         d3.select(this)     
//           .style("cursor", "pointer")
//           .style("fill", "black");
//       })
//     .on("mouseout", function(d) {
//         d3.select(this)
//           .style("cursor", "none")  
//           .style("fill", color(this._current));
//       })
//     .each(function(d, i) { this._current = i; });
  
  
//   g.append('text')
//     .attr('text-anchor', 'middle')
//     .attr('dy', '.35em')
//     .text(text);