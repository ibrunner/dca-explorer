import React from 'react';
import moment from 'moment';
import useProjections, {ProjectionsProps} from '../util/useProjections';

const formatMoney = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const ProjectionsTable: React.FC<ProjectionsProps> = ({
        startPrice,
        endPrice,
        startDate,
        endDate,
        contribution,
        startingAssetTotal
}) => {
        const projections = useProjections(startPrice, endPrice, startDate, endDate, contribution, startingAssetTotal);
        console.log(startingAssetTotal)
        return (
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                                <tr>
                                        <th style={{ border: '1px solid black', padding: '8px' }}>Week</th>
                                        <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
                                        <th style={{ border: '1px solid black', padding: '8px' }}>Price</th>
                                        <th style={{ border: '1px solid black', padding: '8px' }}>Contribution</th>
                                        <th style={{ border: '1px solid black', padding: '8px' }}>Total Contributions</th>
                                        <th style={{ border: '1px solid black', padding: '8px' }}>Asset Order</th>
                                        <th style={{ border: '1px solid black', padding: '8px' }}>Asset Total</th>
                                        <th style={{ border: '1px solid black', padding: '8px' }}>Balance</th>
                                </tr>
                        </thead>
                        <tbody>
                                {projections.map((projection, index) => (
                                        <tr key={index}>
                                                <td style={{ border: '1px solid black', padding: '8px' }}>{index + 1}</td>
                                                <td style={{ border: '1px solid black', padding: '8px' }}>{moment(projection.date).format('YYYY-MM-DD')}</td>
                                                <td style={{ border: '1px solid black', padding: '8px' }}>{formatMoney(projection.price)}</td>
                                                <td style={{ border: '1px solid black', padding: '8px' }}>{formatMoney(projection.contribution)}</td>
                                                <td style={{ border: '1px solid black', padding: '8px' }}>{formatMoney(projection.totalContributions)}</td>
                                                <td style={{ border: '1px solid black', padding: '8px' }}>{projection.assetOrder.toFixed(6)}</td>
                                                <td style={{ border: '1px solid black', padding: '8px' }}>{projection.assetTotal.toFixed(6)}</td>
                                                <td style={{ border: '1px solid black', padding: '8px' }}>{formatMoney(projection.balance)}</td>
                                        </tr>
                                ))}
                        </tbody>
                </table>
        );
};

export default ProjectionsTable;