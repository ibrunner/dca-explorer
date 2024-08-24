import  { useEffect, useState } from 'react';
import moment from 'moment';

export interface ProjectionsProps {
    startPrice: number;
    endPrice: number;
    startDate: Date;
    endDate: Date;
    contribution: number;
    startingAssetTotal: number;
}

export interface Projection {
    date: Date;
    price: number;
    contribution: number;
    totalContributions: number;
    assetOrder: number;
    assetTotal: number;
    balance: number;
};

const useProjections = (startPrice: number, endPrice: number, startDate: Date, endDate: Date, contribution: number, startingAssetTotal: number) => {
    const [projections, setProjections] = useState<Projection[]>([]);

    useEffect(() => {
        const duration = moment(endDate).diff(startDate, 'weeks');
        const weeklyChange = (endPrice - startPrice) / duration;
        const projectionsArray: Projection[] = [];

        for (let i = 0; i <= duration; i++) {
            const price = startPrice + weeklyChange * i;
            const assetTotal = i ? projectionsArray[i-1].assetTotal + contribution / price : price ? (contribution / price) + startingAssetTotal : startingAssetTotal;
            const projection: Projection = {
                date: moment(startDate).add(i, 'weeks').toDate(),
                price,
                contribution,
                totalContributions: (i+1) * contribution,
                assetOrder: price? contribution / price : 0,
                assetTotal,
                balance: assetTotal * price
            }
            projectionsArray.push(projection);
        }

        setProjections(projectionsArray);
    }, [startPrice, endPrice, startDate, endDate, contribution, startingAssetTotal]);

    return projections;
};

export default useProjections;