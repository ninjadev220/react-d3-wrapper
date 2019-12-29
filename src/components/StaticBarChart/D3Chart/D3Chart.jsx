import * as d3 from 'd3';

const margin = { top: 10, bottom: 50, left: 70, right: 10 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

export default class D3Chart {
    constructor(element) {
        const vis = this;
        vis.svg = d3.select(element)
            .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)

        vis.svg.append('text')
            .attr('x', width /2)
            .attr('y', height + 50)
            .attr('text-anchor', 'middle')
            .text(`The World's Tallest Men`)

        vis.svg.append('text')
            .attr('x', -(height / 2))
            .attr('y', -50)
            .attr('text-anchor', 'middle')
            .text('Height in cm')
            .attr('transform', 'rotate(-90)')

        vis.xAxisGroup = vis.svg.append('g')
            .attr('transform', `translate(0, ${height})`)

        vis.yAxisGroup =  vis.svg.append('g')

        Promise.all([
            d3.json('https://udemy-react-d3.firebaseio.com/tallest_men.json'),
            d3.json('https://udemy-react-d3.firebaseio.com/tallest_women.json')
        ]).then((dataSets) => {
            const [men, women] = dataSets;
            let flag = true;

            vis.data = men;
            vis.update();

            d3.interval(() => {
                vis.data = flag ? men : women;
                vis.update()
                flag =! flag
            }, 1000)
        })
    }

    update() {
        const vis = this;
        const y = d3.scaleLinear()
            .domain([
                d3.min(vis.data, d => d.height) * 0.95, 
                d3.max(vis.data, d => d.height)
            ])
            .range([height, 0])
            console.log(vis.data);

        const x = d3.scaleBand()
            .domain(vis.data.map(d => d.name))
            .range([0, width])
            .padding(0.4)

        const xAxisCall = d3.axisBottom(x)
        vis.xAxisGroup
            .transition().duration(500)
            .call(xAxisCall)

        const yAxisCall = d3.axisLeft(y)
        vis.yAxisGroup
            .transition().duration(500)
            .call(yAxisCall)

        // DATA JOIN
        const rects = vis.svg.selectAll('rect')
        .data(vis.data)

        // EXIT
        rects.exit()
            .transition().duration(500)
            .attr('height', 0)
            .attr('y', height)
            .remove()

        // UPDATE
        rects.transition().duration(500)
            .attr('x', d => x(d.name))
            .attr('y', d => y(d.height))
            .attr('width', x.bandwidth)
            .attr('height', d => height - y(d.height))

        // ENTER
        rects.enter().append('rect')
            .attr('x', d => x(d.name))
            .attr('width', x.bandwidth)
            .attr('fill', '#259CD0')
            .attr('y', height)
            .transition().duration(500)
                .attr('height', d => height - y(d.height))
                .attr('y', d => y(d.height))

    }
}