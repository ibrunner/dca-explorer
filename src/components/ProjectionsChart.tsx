import React from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { scaleLinear, scaleTime } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { extent, max } from 'd3-array';
import moment from 'moment';
import { Projection } from '../util/useProjections';
import { useAppContext } from "../AppContext";

interface ProjectionsChartProps {
    projections: Projection[];
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
}

const ProjectionsChart: React.FC<ProjectionsChartProps> = ({
    projections,
    width,
    height,
    margin = { top: 10, right: 10, bottom: 10, left: 10 },
}) => {
    const { state } = useAppContext();
    const { startPrice, endPrice, startDate, endDate, contribution, startingAssetTotal } = state;

    // Define the x and y scales
    const xScale = scaleTime({
        domain: [startDate, endDate] as [Date, Date],
        range: [margin.left, width - margin.right],
    });

    const yScale = scaleLinear({
        domain: [0, max(projections, (d) => d.balance) || 0],
        range: [height - margin.bottom, margin.top],
        nice: true,
    });
    // Calculate the tick values for the x-axis
    const tickValues = xScale.ticks();

    return (
        <svg width={width} height={height}>
            <Group>
                {/* Render the line */}
                <LinePath
                    data={projections}
                    x={(d) => xScale(d.date) ?? 0}
                    y={(d) => yScale(d.balance) ?? 0}
                    stroke="#8884d8"
                    strokeWidth={2}
                />

                {/* Render the x-axis */}
                <AxisBottom
                    top={height - margin.bottom}
                    scale={xScale}
                    numTicks={width > 520 ? 10 : 5}
                    tickValues={tickValues}
                    tickFormat={(date) => moment(date).format('MMM D')}
                    tickStroke="#8884d8"
                    tickLabelProps={() => ({
                        fill: '#8884d8',
                        fontSize: 11,
                        textAnchor: 'middle',
                    })}
                />

                {/* Render the y-axis */}
                <AxisLeft
                    left={margin.left}
                    scale={yScale}
                    numTicks={5}
                    tickStroke="#8884d8"
                    tickLabelProps={() => ({
                        fill: '#8884d8',
                        fontSize: 11,
                        textAnchor: 'end',
                        dy: '0.33em',
                    })}
                />
            </Group>
        </svg>
    );
};

export default ProjectionsChart;