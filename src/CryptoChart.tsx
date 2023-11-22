// CryptoChart.tsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface CryptoChartProps {
  data: { date: Date; price: number }[];
  forecastingLine: number[] | null;
}

const CryptoChart: React.FC<CryptoChartProps> = ({ data, forecastingLine }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current && containerRef.current) {
        drawChart();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data, forecastingLine]);

  useEffect(() => {
    drawChart();
  }, [data, forecastingLine]); // Initial rendering

  const drawChart = () => {
    // Clear previous chart
    d3.select(chartRef.current)?.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const containerHeight = (containerRef.current?.clientHeight ?? 0) * 3; // Make it three times taller

    const svg = d3
      .select(chartRef.current)
      ?.attr('width', containerWidth)
      .attr('height', containerHeight)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    if (!svg) return;

    // Get the current date and calculate the date 5 years into the future
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setFullYear(currentDate.getFullYear() + 5);

    const x = d3
      .scaleTime()
      .domain([currentDate, futureDate])
      .range([0, containerWidth - margin.left - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.price) as number])
      .range([containerHeight - margin.top - margin.bottom, 0]);

    // Draw x-axis
    svg.append('g')
      .attr('transform', `translate(0,${containerHeight - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Draw x-axis label
    svg.append('text')
      .attr('x', containerWidth / 2)
      .attr('y', containerHeight - margin.bottom)
      .style('text-anchor', 'middle')
      .text('Date');

    // Draw y-axis
    svg.append('g')
      .call(d3.axisLeft(y));

    // Draw y-axis label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', 0 - (containerHeight / 2))
      .attr('y', 0 - margin.left)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Price');

    // Draw the line
    const line = d3
      .line<{ date: Date; price: number }>()
      .x((d) => x(d.date))
      .y((d) => y(d.price));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Optional: Draw the forecasting line
    if (forecastingLine) {
      const forecastLine = d3
        .line<number>()
        .x((_, i) => x(data[i].date))
        .y((d) => y(d));

      svg.append('path')
        .datum(forecastingLine)
        .attr('fill', 'none')
        .attr('stroke', 'orange')
        .attr('stroke-width', 1.5)
        .attr('d', forecastLine);
    }
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <svg ref={chartRef} width="100%" height="100%"></svg>
    </div>
  );
};

export default CryptoChart;
