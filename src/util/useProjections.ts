import { useEffect, useMemo, useState } from "react";
import moment from "moment";

export interface Projection {
  date: Date;
  price: number;
  contribution: number;
  totalContributions: number;
  assetOrder: number;
  assetTotal: number;
  balance: number;
}

const useProjections = (
  startPrice: number,
  endPrice: number,
  startDate: Date,
  endDate: Date,
  contribution: number,
  startingAssetTotal: number
) => {
  const [projections, setProjections] = useState<Projection[]>([]);

  useEffect(() => {
    const duration = moment(endDate).diff(startDate, "weeks");
    const weeklyChange = (endPrice - startPrice) / duration;

    const projectionsArray: Projection[] = [];

    for (let i = 0; i <= duration; i++) {
      const price = startPrice + weeklyChange * i;
      // Calculate the asset total for each projection
      let assetTotal: number;

      if (i > 0) {
        // If it's not the first projection, add the contribution divided by the price to the previous asset total
        assetTotal = projectionsArray[i - 1].assetTotal + contribution / price;
      } else {
        if (price) {
          // If the price is not zero, calculate the asset total using the contribution divided by the price plus the starting asset total
          assetTotal = contribution / price + startingAssetTotal;
        } else {
          // If the price is zero, use the starting asset total as the asset total
          assetTotal = startingAssetTotal;
        }
      }

      const projection: Projection = {
        date: moment(startDate).add(i, "weeks").toDate(),
        price,
        contribution,
        totalContributions: (i + 1) * contribution,
        assetOrder: price ? contribution / price : 0,
        assetTotal,
        balance: assetTotal * price,
      };
      projectionsArray.push(projection);
    }

    setProjections(projectionsArray);
  }, [
    startPrice,
    endPrice,
    startDate,
    endDate,
    contribution,
    startingAssetTotal,
  ]);

  return useMemo(
    () => projections,
    [
      projections,
      startPrice,
      endPrice,
      startDate,
      endDate,
      contribution,
      startingAssetTotal,
    ]
  );
};

export default useProjections;
