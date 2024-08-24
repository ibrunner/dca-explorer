import { useReducer } from "react";
import dataReducer from "./DataReducer";
import MainForm from "./components/MainForm";
import AppContext from "./AppContext";



function App(): JSX.Element {
  const [state, dispatch] = useReducer(dataReducer, {
    contributions: "",
    timePeriod: "",
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <MainForm />
    </AppContext.Provider>
  );
}

export default App;
