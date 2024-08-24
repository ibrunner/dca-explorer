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

  return (
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
  );
};

export default MainForm;