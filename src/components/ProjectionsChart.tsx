import React from "react";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { scaleTime, scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Projection } from "../util/useProjections";
import { useAppContext } from "../AppContext";

interface ProjectionsChartProps {
  projections: Projection[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

const ProjectionsChart: React.FC<ProjectionsChartProps> = ({
  width = 800,
  height = 400,
  projections,
}) => {
  const { state } = useAppContext();
  const { startDate, endDate } = state;

  // Margins for the chart
  const margin = { top: 20, right: 20, bottom: 40, left: 60 };

  // Calculate chart dimensions
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Create scales
  const xScale = scaleTime({
    domain: [startDate, endDate],
    range: [0, innerWidth],
  });

  const maxBalance = Math.max(
    ...projections.map((projection) => projection.balance)
  );
  const yScale = scaleLinear({
    domain: [0, maxBalance],
    range: [innerHeight, 0],
    nice: true,
  });

  const data = projections.map((projection) => ({
    date: new Date(projection.date),
    balance: projection.balance,
  }));

  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        {/* Y-axis */}
        <AxisLeft
          scale={yScale}
          tickFormat={(value) => `$${value}`}
          stroke="#333"
          tickStroke="#333"
          label="Balance"
          labelOffset={40}
          tickLabelProps={() => ({
            fill: "#333",
            fontSize: 11,
            textAnchor: "end",
            dy: "0.33em",
          })}
        />

        {/* X-axis */}
        <AxisBottom
          top={innerHeight}
          scale={xScale}
          stroke="#333"
          tickStroke="#333"
          label="Date"
          labelOffset={15}
          tickLabelProps={() => ({
            fill: "#333",
            fontSize: 11,
            textAnchor: "middle",
          })}
        />

        {/* Line path */}
        <LinePath
          data={data}
          x={(d) => xScale(new Date(d.date))}
          y={(d) => yScale(d.balance)}
          stroke="#2196f3"
          strokeWidth={2}
        />
      </Group>
    </svg>
  );
};

export default ProjectionsChart;
