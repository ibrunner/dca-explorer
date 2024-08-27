import { useEffect, useState } from "react";
import moment from "moment";
import { Target, Plan } from "./dataReducer";

export interface Projection {
  date: Date;
  price: number;
  contribution: number;
  totalContributions: number;
  assetOrder: number;
  assetTotal: number;
  assetBalance: number;
  settlement: number;
  totalBalance: number;
}

const useProjections = (
  startPrice: number,
  startDate: Date,
  targets: Target[],
  plans: Plan[],
  startingAssetTotal: number,
  initialSettlement: number
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
    let assetTotal = startingAssetTotal;
    let totalContributions = 0;
    let settlement = initialSettlement;

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
        const weekDate = moment(currentDate).add(week, "weeks");

        let weekContribution = 0;
        let weekSettlement = 0;

        plans.forEach((plan) => {
          if (
            weekDate >= moment(plan.startDate) &&
            weekDate <= moment(plan.endDate)
          ) {
            if (plan.orderType === "buy") {
              weekContribution += plan.amount;
              assetTotal += plan.amount / price;
            } else {
              // "sell"
              weekSettlement += plan.amount;
              assetTotal -= plan.amount / price;
            }
          }
        });

        totalContributions += weekContribution;
        settlement += weekSettlement;

        const assetBalance = assetTotal * price;
        const totalBalance = assetBalance + settlement;

        const projection: Projection = {
          date: weekDate.toDate(),
          price,
          contribution: weekContribution,
          totalContributions,
          assetOrder: weekContribution / price,
          assetTotal,
          assetBalance,
          settlement,
          totalBalance,
        };
        projectionsArray.push(projection);
      }

      currentDate = endDate;
      currentPrice = endPrice;
    }

    setProjections(projectionsArray);
  }, [
    startPrice,
    startDate,
    targets,
    plans,
    startingAssetTotal,
    initialSettlement,
  ]);

  return projections;
};

export default useProjections;
