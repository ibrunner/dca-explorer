import { useEffect, useState } from "react";
import moment from "moment";
import { Target } from "./dataReducer";

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
  startDate: Date,
  targets: Target[],
  contribution: number,
  startingAssetTotal: number
) => {
  const [projections, setProjections] = useState<Projection[]>([]);

  useEffect(() => {
    if (targets.length === 0) return;

    const sortedTargets = [...targets].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    const projectionsArray: Projection[] = [];
    let currentDate = moment(startDate);
    let currentPrice = startPrice;
    let totalContributions = 0;
    let assetTotal = startingAssetTotal;

    for (let i = 0; i <= sortedTargets.length; i++) {
      const endDate =
        i < sortedTargets.length
          ? moment(sortedTargets[i].date)
          : moment(sortedTargets[sortedTargets.length - 1].date).add(1, "week");
      const endPrice =
        i < sortedTargets.length
          ? sortedTargets[i].price
          : sortedTargets[sortedTargets.length - 1].price;

      const duration = endDate.diff(currentDate, "weeks");
      const weeklyPriceChange = (endPrice - currentPrice) / duration;

      for (let week = 0; week < duration; week++) {
        const price = currentPrice + weeklyPriceChange * week;
        totalContributions += contribution;
        assetTotal += contribution / price;

        const projection: Projection = {
          date: currentDate.toDate(),
          price,
          contribution,
          totalContributions,
          assetOrder: contribution / price,
          assetTotal,
          balance: assetTotal * price,
        };
        projectionsArray.push(projection);

        currentDate.add(1, "week");
      }

      currentDate = endDate;
      currentPrice = endPrice;
    }

    setProjections(projectionsArray);
  }, [startPrice, startDate, targets, contribution, startingAssetTotal]);

  return projections;
};

export default useProjections;
