import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ScatterPlot = () => {
  const dataset = [
    [34, 78],
    [109, 280],
    [79, 411],
    [390, 220],
    [233, 145],
    [333, 96],
    [222, 333],
    [78, 320],
    [21, 123]
  ]

  const svgRef = useRef();

  useEffect(() => {
    const w = 600;
    const h = 350;
    const padding = 60;

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, (d) => d[0])])
      .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, (d) => d[1])])
      .range([h - padding, padding]);

    const svg = d3.select(svgRef.current)
      .attr("width", w)
      .attr("height", h);

    //creating circle elements
    svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d[0]))
      .attr("cy", (d) => yScale(d[1]))
      .attr("r", 5);

    //creating text elements
    svg.selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .text((d) => (`(${d[0]},${d[1]})`))
      .attr("x", (d) => xScale(d[0] + 10))  // defines the position of text element
      .attr("y", (d) => yScale(d[1]))
      .attr("font-size", "14px")

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(xAxis);

    svg.append("g")
      .attr("transform", `translate(${padding},${0})`) 
      .call(yAxis);
  }, []);

  return (
    <div>
        <h2>Scatter Plot</h2>
        <svg ref={svgRef}></svg>
    </div>
  );
}

export default ScatterPlot;
