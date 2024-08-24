import React from 'react';
import moment from 'moment';
import useProjections from '../util/useProjections';

interface ProjectionsTableProps {
    startPrice: number;
    endPrice: number;
    startDate: Date;
    endDate: Date;
}

const ProjectionsTable: React.FC<ProjectionsTableProps> = ({
    startPrice,
    endPrice,
    startDate,
    endDate,
}) => {
    const projections = useProjections(startPrice, endPrice, startDate, endDate);

    return (
        <table>
            <thead>
                <tr>
                    <th>Week</th>
                    <th>Date</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {projections.map((projection, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{moment(projection.date).format('YYYY-MM-DD')}</td>
                        <td>{projection.price.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProjectionsTable;