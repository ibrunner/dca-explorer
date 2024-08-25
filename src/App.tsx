import { useReducer } from "react";
import dataReducer from "./util/dataReducer";
import MainForm from "./components/MainForm";
import AppContext from "./AppContext";
import ProjectionsTable from "./components/ProjectionsTable";
import ProjectionsChart from "./components/ProjectionsChart";
import useProjections from "./util/useProjections";

function App(): JSX.Element {
  const startDateInit: Date = new Date();
  const endDateInit: Date = new Date();

  endDateInit.setFullYear(endDateInit.getFullYear() + 1);

  const [state, dispatch] = useReducer(dataReducer, {
    contribution: 1000,
    startingAssetTotal: 1,
    timePeriod: "",
    projections: [],
    startDate: startDateInit,
    endDate: endDateInit,
    startPrice: 67800,
    endPrice: 123000,
  });

  const {
    startPrice,
    endPrice,
    startDate,
    endDate,
    contribution,
    startingAssetTotal,
  } = state;

  const projections = useProjections(
    startPrice,
    endPrice,
    startDate,
    endDate,
    contribution,
    startingAssetTotal
  );

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <MainForm />
      <ProjectionsChart
        {...state}
        width={500}
        height={500}
        projections={projections}
      />
      <ProjectionsTable {...state} projections={projections} />
    </AppContext.Provider>
  );
}

export default App;
