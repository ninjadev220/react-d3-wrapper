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
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)


            d3.json(url).then(donutData => {
                console.log(donutData);
    
            })        
		// vis.update()		
	}
	// update() {
	// 	let vis = this

    // }
}

export default D3Chart; 