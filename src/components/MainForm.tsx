import React from "react";
import { useAppContext } from "../AppContext";

const MainForm: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const handleContributionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: "SET_CONTRIBUTIONS", payload: event.target.value });
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

  const handleEndPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: "SET_END_PRICE", payload: Number(event.target.value) });
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: "SET_START_DATE", payload: new Date(event.target.value) });
  };

  const handleEndDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: "SET_END_DATE", payload: new Date(event.target.value) });
  };

  return (
    <>
      <div>
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
        <label>
          End Date:
          <input
            type="date"
            value={state.endDate.toISOString().split("T")[0]}
            onChange={handleEndDateChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </div>
      <div>
        <label htmlFor="contributions">Contributions:</label>
        <input
          type="text"
          id="contributions"
          value={state.contributions}
          onChange={handleContributionsChange}
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