import { useReducer } from "react";
import dataReducer from "./util/dataReducer";
import MainForm from "./components/MainForm";
import AppContext from "./AppContext";
import ProjectionsTable from "./components/ProjectionsTable";

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
      <ProjectionsTable {...state} />
      <MainForm />
    </AppContext.Provider>
  );
}

export default App;
