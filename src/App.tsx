import { useReducer } from "react";
import dataReducer from "./util/dataReducer";
import MainForm from "./components/MainForm";
import AppContext from "./AppContext";
import ProjectionsTable from "./components/ProjectionsTable";
import ProjectionsChart from "./components/ProjectionsChart";
import useProjections from "./util/useProjections";

function App(): JSX.Element {
  const startDateInit: Date = new Date();
  const defaultTargetDate = new Date("2025-08-01");
  const defaultTargetPrice = 250000;

  const [state, dispatch] = useReducer(dataReducer, {
    startingAssetTotal: 1,
    timePeriod: "",
    projections: [],
    startDate: startDateInit,
    targets: [
      {
        date: new Date("2026-08-01"),
        price: 90000,
      },
      {
        date: defaultTargetDate,
        price: defaultTargetPrice,
      },
    ],
    startPrice: 67800,
    plans: [
      {
        startDate: startDateInit,
        endDate: new Date("2025-01-01"),
        amount: 1000,
        orderType: "buy",
      },
      {
        startDate: new Date("2025-02-01"),
        endDate: new Date("2026-04-01"),
        amount: 2000,
        orderType: "sell",
      },
    ],
    settlement: 0, // Initialize settlement to 0
  });

  const {
    startPrice,
    startDate,
    targets,
    plans,
    startingAssetTotal,
    settlement,
  } = state;

  const projections = useProjections(
    startPrice,
    startDate,
    targets,
    plans,
    startingAssetTotal,
    settlement
  );

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <MainForm />
      <ProjectionsChart
        {...state}
        width={1000}
        height={500}
        projections={projections}
      />
      <ProjectionsTable {...state} projections={projections} />
    </AppContext.Provider>
  );
}

export default App;
