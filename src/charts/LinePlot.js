import React from "react";
import * as d3 from "d3";

export default function LinePlot({
  data = [10, 84, 30, 42, 50, 15],
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20
}) {
  // Create x-scale
  const xScale = d3.scaleLinear()
    .domain([0, data.length - 1]) // Input domain
    .range([marginLeft, width - marginRight]); // Output range

  // Create y-scale
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data)) // Input domain (minimum and maximum values)
    .range([height - marginBottom, marginTop]); // Output range

  // Define the line generator
  const line = d3.line()
    .x((d, i) => xScale(i)) // Set x-coordinate
    .y(d => yScale(d)); // Set y-coordinate

  return (
    <svg width={width} height={height}>
      {/* Draw the line */}
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />

      {/* Draw circles for each data point */}
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={xScale(i)} cy={yScale(d)} r="2.5" />
        ))}
      </g>

      {/* Draw x-axis */}
      <g transform={`translate(0, ${height - marginBottom})`}>
        <line x1={marginLeft} x2={width - marginRight} stroke="currentColor" />
      </g>

      {/* Draw y-axis */}
      <g transform={`translate(${marginLeft}, 0)`}>
        <line y1={marginTop} y2={height - marginBottom} stroke="currentColor" />
      </g>
    </svg>
  );
}
