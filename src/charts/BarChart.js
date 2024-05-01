import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = () => {
    const data = [
      { label: '0-15m', computers: 23 },
      { label: '15m-1h', computers: 44 },
      { label: '1h-3h', computers: 15 },
      { label: '3h-6h', computers: 36 },
      { label: '6h-9h', computers: 81 },
      { label: '9h-12h', computers: 90 },
      { label: '12h-24h', computers: 45 },
      { label: '12h-24h', computers: 45 },
    ];


  const svgRef = useRef();

  useEffect(() => {
    const width = 600;
    const height = 350;
    const margin = { top: 25, bottom: 25, left: 25, right: 25 };

    // Select the SVG element and setting up the space for chart 
    const svg = d3.select(svgRef.current)
      .attr('width', width - margin.left - margin.right)
      .attr('height', height - margin.top - margin.bottom)
      .attr("viewBox", [0, 0, width, height]);

    // Define scales
    const xScale = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.1)


    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top]);


    // Append bars
    svg.append("g")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => yScale(d.computers))
    .attr("height", d => yScale(0) - yScale(d.computers))
    .attr("width", xScale.bandwidth() )
    // .attr("fill",'grey')
    .attr("fill", (d)=> d.computers >50 ? 'green':'grey')

    // Define axis functions
    const xAxis = d3.axisBottom(xScale).tickFormat(i => data[i].label);
    const yAxis = d3.axisRight(yScale)

    // Append axes
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .attr("font-size", '14px');

    svg.append("g")
      .attr("transform", `translate(${width-margin.right}, 0)`)
      .call(yAxis)
      .attr("font-size", '14px');

  }, []);

  return (
    <div>
      <h2>Bar Chart Example</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;
