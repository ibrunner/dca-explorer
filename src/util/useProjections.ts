import  { useEffect, useState } from 'react';
import moment from 'moment';

export interface Projection { date: Date; price: number };

const useProjections = (startPrice: number, endPrice: number, startDate: Date, endDate: Date) => {
    const [projections, setProjections] = useState<Projection[]>([]);

    useEffect(() => {
        const duration = moment(endDate).diff(startDate, 'weeks');
        const weeklyChange = (endPrice - startPrice) / duration;
        const projectionsArray: Projection[] = [];

        for (let i = 0; i <= duration; i++) {
            const projectedDate = moment(startDate).add(i, 'weeks').toDate();
            const projectedPrice = startPrice + weeklyChange * i;
            projectionsArray.push({ date: projectedDate, price: projectedPrice });
        }

        setProjections(projectionsArray);
    }, [startPrice, endPrice, startDate, endDate]);

    return projections;
};

export default useProjections;