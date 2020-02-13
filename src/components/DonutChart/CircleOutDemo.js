import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const CircleOutDemo = props => {
  const ref = useRef(null);
  const cache = useRef(props.data);
  const createPie = d3
    .pie()
    .value(d => d.price)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius)
    .padAngle(.02);
  const colors = d3.scaleOrdinal(d3.schemeSet1);
  const format = d3.format(".2f");

  useEffect(
    () => {
      const data = createPie(props.data);
      const prevData = createPie(cache.current);
      const group = d3.select(ref.current);
      const groupWithData = group.selectAll("g.arc").data(data);

      groupWithData.exit().remove();

      const groupWithUpdate = groupWithData
        .enter()
        .append("g")
        .attr("class", "pie-arc")
        .attr("transform", `translate(310, 50)`)

      // const path = groupWithUpdate
        // .append("path")
        .merge(groupWithData.select("path.pie-arc"))
        .on("mouseover", function(d) {
            let g = d3.select(this)
                .style("cursor", "pointer")
                .append("g")
                .attr("class", "text-group")
        
            g.append("text")
                .attr("class", "name-text")
                .text(`${d.data.company}`)
                .attr('text-anchor', 'middle')
                .attr('dy', '-1.2em');
        
            g.append("text")
                .attr("class", "value-text")
                .text(`$${d.data.price}`)
                .attr('text-anchor', 'middle')
                .attr('dy', '.6em');

            g.append("svg:circle")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", props.outerRadius -60)
                .attr("class", "pie-centre")
                .attr('fill', colors)
                .append("g")
        })
        .on("mouseout", function(d) {
            d3.select(this)
                .style("cursor", "none")  
                .select(".text-group").remove()
        })

        .append('path')
          .attr('d', createArc)
          .attr('class', 'pie-arc')
          .attr('fill', (d,i) => colors(i))
          .each(function(d) { d.outerRadius = props.outerRadius - 20; })
          .each(function(d, i) { this._current = i; })

      const arcTween = (d, i) => {
        const interpolator = d3.interpolate(prevData[i], d);

        return t => createArc(interpolator(t));
      };

      groupWithUpdate
        .attr("class", "arc")
        .attr("fill", (d, i) => colors(i))
        .transition()
        .attrTween("d", arcTween);
    },
    [props.data, colors, createArc, createPie, format, props.innerRadius, props.outerRadius]
  );

  return (
    <svg width={props.width} height={props.height}>
      <g
        ref={ref}
        transform={`translate(${props.outerRadius} ${props.outerRadius})`}
      />
    </svg>
  );
};

export default CircleOutDemo;