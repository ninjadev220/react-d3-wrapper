import * as d3 from 'd3';

const margin = { top: 10, bottom: 90, left: 90, right: 90 }
const width = 950 - margin.left - margin.right;
const height = 750 - margin.top - margin.bottom;

const map = 'https://raw.githubusercontent.com/ahebwa49/geo_mapping/master/src/world_countries.json';

export default class D3Chart {
	constructor(element, cupData) {
		const vis = this;
		// data = data;

		console.log('data', cupData);

		vis.g = d3.select(element)
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", `translate(${margin.left}, ${margin.top})`)

			d3.json(map, cupData).then(dataSets => {
				vis.projection = d3.geoMercator()
					.scale(130)
					.translate([width / 2, height / 1.4]);
					
				const path = d3.geoPath().projection(vis.projection);

				const map = vis.g.selectAll("path")
					.data(dataSets.features)

				map.enter()
					.append("path")
					.attr("d", path)
					.style("fill", "rgb(9, 157, 217)")
					.style("stroke", "black")
					.style("stroke-width", 0.5);

				console.log('GEODATA', cupData)

				const tooltip = d3
					.select('body')
					.append('div')
					.attr('class', 'tooltip')
					.style('opacity', 0);

				vis.nested = d3
					.nest()
					.key(d => d.year)
					.rollup(leaves => {
						vis.total = d3.sum(leaves, d => d.attendance);
						vis.coords = leaves.map(d => vis.projection([+d.long, +d.lat]));
						vis.center_x = d3.mean(vis.coords, d => d[0]);
						vis.center_y = d3.mean(vis.coords, d => d[1]);
						vis.year = leaves.map(d => d.year);
						vis.home = leaves.map(d => d.home);
						return {
							attendance: vis.total,
							home: vis.home[0],
							year: vis.year[0],
							x: vis.center_x,
							y: vis.center_y
						};
					})
					.entries(cupData);
				vis.attendance_extent = d3.extent(vis.nested, d => d.value["attendance"]);
				
				function handleMouseOver(d) {
					tooltip
						.transition()
						.duration(200)
						.style('opacity', 1);
					tooltip
						.html((`
							<h3 style="text-align:center">${d.value["home"]}</h3>	
							<br />
							<strong>First Hosting Year:</strong> ${d.value["year"]}
							<br />
							<strong>Total Attendance:</strong> ${d.value["attendance"]}
						`))
						.style('left', d3.event.pageX + 'px')
						.style('top', d3.event.pageY - 28 + 'px')
				}
		
				function handleMouseOut() {
					tooltip
						.transition()
						.duration(200)
						.style('opacity', 0);
				}

				vis.rScale = d3
					.scaleSqrt()
					.domain(vis.attendance_extent)
					.range([0, 8]);
				vis.g
					.append("g")
					.attr("class", "bubble")
					.selectAll("circle")
					.data(vis.nested.sort(function(a, b) {
							return b.value["attendance"] - a.value["attendance"];
						})
					)
					.enter()
					.append("circle")
					.attr("fill", "rgb(247, 148, 42)")
					.attr("cx", d => d.value["x"])
					.attr("cy", d => d.value["y"])
					.attr("r", d => vis.rScale(d.value["attendance"]))
					.attr("stroke", "black")
					.attr("stroke-width", 0.7)
					.attr("opacity", 0.7)
					.on("mouseover", handleMouseOver)
					.on("mouseout", handleMouseOut);	
			})
	}
}