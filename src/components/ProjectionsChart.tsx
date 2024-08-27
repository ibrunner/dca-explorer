import React, { useState, useCallback } from "react";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { scaleTime, scaleLinear, scaleOrdinal } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Projection } from "../util/useProjections";
import { useAppContext } from "../AppContext";
import { LegendOrdinal } from "@visx/legend";
import { localPoint } from "@visx/event";
import { useTooltip, Tooltip, defaultStyles } from "@visx/tooltip";
import { bisector } from "d3-array";

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
  const { startDate } = state;

  // Margins for the chart
  const margin = { top: 20, right: 100, bottom: 40, left: 60 };

  // Calculate chart dimensions
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Get the final date from projections
  const finalDate =
    projections.length > 0
      ? projections[projections.length - 1].date
      : new Date(startDate);

  // Create scales
  const xScale = scaleTime({
    domain: [startDate, finalDate],
    range: [0, innerWidth],
  });

  const maxAssetBalance = Math.max(...projections.map((p) => p.assetBalance));
  const maxPrice = Math.max(...projections.map((p) => p.price));
  const maxTotalContributions = Math.max(
    ...projections.map((p) => p.totalContributions)
  );
  const maxTotalBalance = Math.max(...projections.map((p) => p.totalBalance));
  const maxSettlement = Math.max(...projections.map((p) => p.settlement));
  const maxYValue = Math.max(
    maxAssetBalance,
    maxPrice,
    maxTotalContributions,
    maxTotalBalance,
    maxSettlement
  );

  const yScale = scaleLinear({
    domain: [0, maxYValue],
    range: [innerHeight, 0],
    nice: true,
  });

  const colorScale = scaleOrdinal({
    domain: [
      "Asset Balance",
      "Price",
      "Total Contributions",
      "Total Balance",
      "Settlement",
    ],
    range: ["#2196f3", "#4caf50", "#ff9800", "#9c27b0", "#e91e63"],
  });

  // Tooltip setup
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  } = useTooltip();

  const bisectDate = bisector<{ date: Date }, Date>((d) => d.date).left;

  const handleTooltip = useCallback(
    (
      event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
    ) => {
      const { x } = localPoint(event) || { x: 0 };
      const x0 = xScale.invert(x - margin.left);
      const index = bisectDate(projections, x0, 1);
      const d0 = projections[index - 1];
      const d1 = projections[index];
      let d = d0;
      if (d1 && d1.date) {
        d =
          x0.valueOf() - d0.date.valueOf() > d1.date.valueOf() - x0.valueOf()
            ? d1
            : d0;
      }
      showTooltip({
        tooltipData: d,
        tooltipLeft: x,
        tooltipTop: yScale(d.assetBalance),
      });
    },
    [showTooltip, xScale, yScale, projections, margin.left]
  );

  return (
    <div>
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          {/* Y-axis */}
          <AxisLeft
            scale={yScale}
            tickFormat={(value) => `$${value}`}
            stroke="#333"
            tickStroke="#333"
            label="Value"
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

          {/* Line paths */}
          <LinePath
            data={projections}
            x={(d) => xScale(new Date(d.date))}
            y={(d) => yScale(d.assetBalance)}
            stroke="#2196f3"
            strokeWidth={2}
          />
          <LinePath
            data={projections}
            x={(d) => xScale(new Date(d.date))}
            y={(d) => yScale(d.price)}
            stroke="#4caf50"
            strokeWidth={2}
          />
          <LinePath
            data={projections}
            x={(d) => xScale(new Date(d.date))}
            y={(d) => yScale(d.totalContributions)}
            stroke="#ff9800"
            strokeWidth={2}
          />
          <LinePath
            data={projections}
            x={(d) => xScale(new Date(d.date))}
            y={(d) => yScale(d.totalBalance)}
            stroke="#9c27b0"
            strokeWidth={2}
          />
          <LinePath
            data={projections}
            x={(d) => xScale(new Date(d.date))}
            y={(d) => yScale(d.settlement)}
            stroke="#e91e63"
            strokeWidth={2}
          />

          {/* Overlay for tooltip */}
          <rect
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
        </Group>
      </svg>

      {/* Tooltip */}
      {tooltipData && (
        <Tooltip
          top={tooltipTop + margin.top}
          left={tooltipLeft}
          style={{
            ...defaultStyles,
            backgroundColor: "white",
            color: "black",
            padding: "0.5rem",
            border: "1px solid black",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <div>
            <strong>Date:</strong>{" "}
            {(tooltipData as any).date.toLocaleDateString()}
          </div>
          <div>
            <strong>Asset Balance:</strong> $
            {(tooltipData as any).assetBalance.toFixed(2)}
          </div>
          <div>
            <strong>Price:</strong> ${(tooltipData as any).price.toFixed(2)}
          </div>
          <div>
            <strong>Total Contributions:</strong> $
            {(tooltipData as any).totalContributions.toFixed(2)}
          </div>
          <div>
            <strong>Total Balance:</strong> $
            {(tooltipData as any).totalBalance.toFixed(2)}
          </div>
          <div>
            <strong>Settlement:</strong> $
            {(tooltipData as any).settlement.toFixed(2)}
          </div>
        </Tooltip>
      )}

      {/* Legend */}
      <div style={{ marginTop: "10px" }}>
        <LegendOrdinal
          scale={colorScale}
          direction="row"
          labelMargin="0 15px 0 0"
        />
      </div>
    </div>
  );
};

export default ProjectionsChart;
