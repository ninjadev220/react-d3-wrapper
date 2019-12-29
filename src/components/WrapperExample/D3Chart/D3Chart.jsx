import * as d3 from 'd3';

const url ='https://udemy-react-d3.firebaseio.com/ages.json';
const width = 500;
const height = 200;

export default class D3Chart {
    constructor(element) {
        const svg = d3.select(element)
            .append('svg')
                .attr('width', width)
                .attr('height', height)

        d3.json(url).then(agesData => {
            const y = d3.scaleLinear()
                .domain([0, d3.max(agesData, d => d.age)])
                .range([0, height / 2])
            console.log(agesData);

            const x = d3.scaleBand()
                .domain(agesData.map(d => d.name))
                .range([0, width])
                .padding(0.4)

            const rects = svg.selectAll('rect')
                .data(agesData)

            rects.enter()
                .append('rect')
                    .attr('x', d => x(d.name))
                    .attr('y', d => height - y(d.age))
                    .attr('width', x.bandwidth)
                    .attr('height', d => y(d.age))
                    .attr('fill', d => {
                        if (d.age > 10){
                            return 'red'
                        }
                        return 'green'
                    })
        })        
    }
}