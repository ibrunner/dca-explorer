import React from "react";
import { useAppContext } from "../AppContext";
import { Target, Plan } from "../util/dataReducer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

const MainForm: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const handleStartingAssetTotalChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "SET_STARTING_ASSET_TOTAL",
      payload: Number(event.target.value),
    });
  };

  const handleTimePeriodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch({ type: "SET_TIME_PERIOD", payload: event.target.value });
  };

  const handleStartPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: "SET_START_PRICE", payload: Number(event.target.value) });
  };

  const handleEndPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_END_PRICE", payload: Number(event.target.value) });
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: "SET_START_DATE", payload: new Date(event.target.value) });
  };

  const handleAddTarget = () => {
    const newTarget: Target = (() => {
      if (state.targets.length === 0) {
        const defaultDate = new Date(state.startDate);
        defaultDate.setDate(defaultDate.getDate() + 1);
        return {
          date: defaultDate,
          price: state.startPrice,
        };
      } else {
        const lastTarget = state.targets[state.targets.length - 1];
        const newDate = new Date(lastTarget.date);
        newDate.setDate(newDate.getDate() + 1);
        return {
          date: newDate,
          price: lastTarget.price,
        };
      }
    })();

    dispatch({ type: "ADD_TARGET", payload: newTarget });
  };

  const handleTargetDateChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedTarget: Target = {
        ...state.targets[index],
        date: new Date(event.target.value),
      };
      dispatch({
        type: "UPDATE_TARGET",
        payload: { index, target: updatedTarget },
      });
    };

  const handleTargetPriceChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedTarget: Target = {
        ...state.targets[index],
        price: Number(event.target.value),
      };
      dispatch({
        type: "UPDATE_TARGET",
        payload: { index, target: updatedTarget },
      });
    };

  const handleDeleteTarget = (index: number) => () => {
    dispatch({ type: "DELETE_TARGET", payload: index });
  };

  const handleAddPlan = () => {
    const newPlan: Plan = {
      startDate: new Date(),
      endDate: new Date(),
      amount: 1000,
      orderType: "buy",
      source: "deposit",
    };
    dispatch({ type: "ADD_PLAN", payload: newPlan });
  };

  const handlePlanChange =
    (index: number, field: keyof Plan) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = event.target.value;
      let updatedValue: string | number | Date = value;

      if (field === "startDate" || field === "endDate") {
        updatedValue = new Date(value);
      } else if (field === "amount") {
        updatedValue = Number(value);
      }

      const updatedPlan: Plan = {
        ...state.plans[index],
        [field]: updatedValue,
      };

      if (field === "orderType" && value === "sell") {
        updatedPlan.source = undefined;
      }

      dispatch({
        type: "UPDATE_PLAN",
        payload: { index, plan: updatedPlan },
      });
    };

  const handleDeletePlan = (index: number) => () => {
    dispatch({ type: "DELETE_PLAN", payload: index });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-4">
        <Label>Starting Asset Total:</Label>
        <Input
          type="number"
          value={state.startingAssetTotal}
          onChange={handleStartingAssetTotalChange}
        />
        <Label>Start Price:</Label>
        <Input
          type="number"
          value={state.startPrice}
          onChange={handleStartPriceChange}
        />
        <Label>Start Date:</Label>
        <Input
          type="date"
          value={state.startDate.toISOString().split("T")[0]}
          onChange={handleStartDateChange}
        />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Targets:</h3>
        {state.targets.map((target, index) => (
          <div key={index} className="space-y-2">
            <Label>Target {index + 1}:</Label>
            <Input
              type="date"
              value={target.date.toISOString().split("T")[0]}
              onChange={handleTargetDateChange(index)}
            />
            <Input
              type="number"
              value={target.price}
              onChange={handleTargetPriceChange(index)}
            />
            <Button variant="danger" onClick={handleDeleteTarget(index)}>
              Delete
            </Button>
          </div>
        ))}
        <Button onClick={handleAddTarget}>Add Target</Button>
      </div>
      <div className="space-y-4">
        <Label htmlFor="timePeriod">Time Period:</Label>
        <Select
          id="timePeriod"
          value={state.timePeriod}
          onChange={handleTimePeriodChange}
        >
          <option value="1 day">1 day</option>
          <option value="1 week">1 week</option>
          <option value="1 month">1 month</option>
        </Select>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Plans:</h3>
        {state.plans.map((plan, index) => (
          <div key={index} className="space-y-2">
            <Label>Plan {index + 1}:</Label>
            <Input
              type="date"
              value={
                plan.startDate instanceof Date
                  ? plan.startDate.toISOString().split("T")[0]
                  : plan.startDate
              }
              onChange={handlePlanChange(index, "startDate")}
            />
            <Input
              type="date"
              value={
                plan.endDate instanceof Date
                  ? plan.endDate.toISOString().split("T")[0]
                  : plan.endDate
              }
              onChange={handlePlanChange(index, "endDate")}
            />
            <Input
              type="number"
              value={plan.amount}
              onChange={handlePlanChange(index, "amount")}
            />
            <Select
              value={plan.orderType}
              onChange={handlePlanChange(index, "orderType")}
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </Select>
            {plan.orderType === "buy" && (
              <Select
                value={plan.source}
                onChange={handlePlanChange(index, "source")}
              >
                <option value="deposit">Deposit</option>
                <option value="settlement">Settlement</option>
              </Select>
            )}
            <Button variant="danger" onClick={handleDeletePlan(index)}>
              Delete
            </Button>
          </div>
        ))}
        <Button onClick={handleAddPlan}>Add Plan</Button>
      </div>
      <Button type="submit">Submit</Button>
    </div>
  );
};

export default MainForm;
