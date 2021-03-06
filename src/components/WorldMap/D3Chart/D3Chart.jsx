import * as d3 from 'd3';

const margin = { top: 10, bottom: 90, left: 90, right: 90 }
const width = 950 - margin.left - margin.right;
const height = 750 - margin.top - margin.bottom;

class D3Chart {
	constructor(element) {
		let vis = this

		vis.g = d3.select(element)
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", `translate(${margin.left}, ${margin.top})`)

			Promise.all([
				d3.json("https://raw.githubusercontent.com/ahebwa49/geo_mapping/master/src/world_countries.json"),
				d3.json("https://raw.githubusercontent.com/ahebwa49/geo_mapping/master/src/world_cup_geo.json")
			])
			.then(dataSets => {
				vis.projection = d3.geoMercator()
					.scale(130)
					.translate([width / 2, height / 1.4]);

				const path = d3.geoPath().projection(vis.projection);

				const map = vis.g.selectAll("path")
					.data(dataSets[0].features)

				map.enter()
					.append("path")
					.attr("d", path)
					.style("fill", "rgb(9, 157, 217)")
					.style("stroke", "black")
					.style("stroke-width", 0.5);

				console.log('GEODATA', dataSets[0])

				vis.nested = d3
					.nest()
					.key(d => d.year)
					.rollup(leaves => {
						vis.total = d3.sum(leaves, d => d.attendance);
						vis.coords = leaves.map(d => vis.projection([+d.long, +d.lat]));
						vis.center_x = d3.mean(vis.coords, d => d[0]);
						vis.center_y = d3.mean(vis.coords, d => d[1]);
						return {
							attendance: vis.total,
							x: vis.center_x,
							y: vis.center_y
						};
					})
					.entries(dataSets[1]);
				vis.attendance_extent = d3.extent(vis.nested, d => d.value["attendance"]);

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
					.attr("opacity", 0.7);	
			})
	}
}

export default D3Chart;