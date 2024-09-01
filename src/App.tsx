import { useReducer } from "react";
import dataReducer from "./util/dataReducer";
import MainForm from "./components/MainForm";
import AppContext from "./AppContext";
import ProjectionsTable from "./components/ProjectionsTable";
import ProjectionsChart from "./components/ProjectionsChart";
import useProjections from "./util/useProjections";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/ThemeToggle";

function App(): JSX.Element {
  const startDateInit: Date = new Date();

  const [state, dispatch] = useReducer(dataReducer, {
    startingAssetTotal: 2,
    timePeriod: "",
    projections: [],
    startDate: startDateInit,
    targets: [
      {
        date: new Date("2025-07-01"),
        price: 150000,
      },
      {
        date: new Date("2025-08-01"),
        price: 250000,
      },
      {
        date: new Date("2025-12-01"),
        price: 150000,
      },
      {
        date: new Date("2026-08-01"),
        price: 90000,
      },
      {
        date: new Date("2027-08-01"),
        price: 90000,
      },
      {
        date: new Date("2028-08-01"),
        price: 200000,
      },
      {
        date: new Date("2029-08-01"),
        price: 1000000,
      },
      {
        date: new Date("2030-08-01"),
        price: 300000,
      },
      {
        date: new Date("2031-08-01"),
        price: 200000,
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
        startDate: new Date("2025-06-01"),
        endDate: new Date("2026-10-01"),
        amount: 8000,
        orderType: "sell",
      },
      {
        startDate: new Date("2025-02-01"),
        endDate: new Date("2026-04-01"),
        amount: 4000,
        orderType: "sell",
      },
      {
        startDate: new Date("2026-04-01"),
        endDate: new Date("2028-04-01"),
        amount: 2000,
        orderType: "buy",
      },
      {
        startDate: new Date("2026-04-01"),
        endDate: new Date("2028-04-01"),
        amount: 10000,
        orderType: "buy",
        source: "settlement",
      },
      {
        startDate: new Date("2029-06-01"),
        endDate: new Date("2030-10-01"),
        amount: 70000,
        orderType: "sell",
      },
      {
        startDate: new Date("2029-04-01"),
        endDate: new Date("2031-04-01"),
        amount: 30000,
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
    <ThemeProvider attribute="class">
      <ThemeToggle />
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
    </ThemeProvider>
  );
}

export default App;
