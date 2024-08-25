import { useReducer } from "react";
import dataReducer from "./util/dataReducer";
import MainForm from "./components/MainForm";
import AppContext from "./AppContext";
import ProjectionsTable from "./components/ProjectionsTable";
import ProjectionsChart from "./components/ProjectionsChart";

function App(): JSX.Element {
  const startDate: Date = new Date();
  const endDate: Date = new Date();

  endDate.setFullYear(endDate.getFullYear() + 1);

  const [state, dispatch] = useReducer(dataReducer, {
    contribution: 1000,
    startingAssetTotal: 1,
    timePeriod: "",
    projections: [],
    startDate,
    endDate,
    startPrice: 67800,
    endPrice: 123000,
  });

  

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <MainForm />
      <ProjectionsChart {...state} width={500} height={500} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}/>
      <ProjectionsTable {...state} />
    </AppContext.Provider>
  );
}

export default App;
