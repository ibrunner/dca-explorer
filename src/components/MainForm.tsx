import React from "react";
import { useAppContext } from "../AppContext";
import { Target } from "../util/dataReducer";

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

  const handleContributionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: "SET_CONTRIBUTION", payload: event.target.value });
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

  // const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch({ type: "SET_END_DATE", payload: new Date(event.target.value) });
  // };

  const handleAddTarget = () => {
    const newTarget: Target = (() => {
      if (state.targets.length === 0) {
        // If it's the first target, use startDate + 1 day and startPrice
        const defaultDate = new Date(state.startDate);
        defaultDate.setDate(defaultDate.getDate() + 1);
        return {
          date: defaultDate,
          price: state.startPrice,
        };
      } else {
        // Use the last target's date + 1 day and its price
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

  return (
    <>
      <div>
        <label>
          Starting Asset Total:
          <input
            type="number"
            value={state.startingAssetTotal}
            onChange={handleStartingAssetTotalChange}
          />
        </label>
        <label>
          Start Price:
          <input
            type="number"
            value={state.startPrice}
            onChange={handleStartPriceChange}
          />
        </label>
        <br />
        <label>
          End Price:
          <input
            type="number"
            value={state.endPrice}
            onChange={handleEndPriceChange}
          />
        </label>
        <br />
        <label>
          Start Date:
          <input
            type="date"
            value={state.startDate.toISOString().split("T")[0]}
            onChange={handleStartDateChange}
          />
        </label>
        <br />
        <h3>Targets:</h3>
        {state.targets.map((target, index) => (
          <div key={index}>
            <label>Target {index + 1}:</label>
            <input
              type="date"
              value={target.date.toISOString().split("T")[0]}
              onChange={handleTargetDateChange(index)}
            />
            <input
              type="number"
              value={target.price}
              onChange={handleTargetPriceChange(index)}
            />
            <button onClick={handleDeleteTarget(index)}>Delete</button>
          </div>
        ))}
        <button onClick={handleAddTarget}>Add Target</button>
        <br />
        <button type="submit">Submit</button>
      </div>
      <div>
        <label htmlFor="contribution">Contribution:</label>
        <input
          type="text"
          id="contribution"
          value={state.contribution}
          onChange={handleContributionChange}
        />

        <label htmlFor="timePeriod">Time Period:</label>
        <select
          id="timePeriod"
          value={state.timePeriod}
          onChange={handleTimePeriodChange}
        >
          <option value="1 day">1 day</option>
          <option value="1 week">1 week</option>
          <option value="1 month">1 month</option>
        </select>
      </div>
    </>
  );
};

export default MainForm;
