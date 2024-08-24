import React, { createContext, useContext } from "react";
import {State, Action} from "./util/dataReducer";

const AppContext = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({
    state: {
      contribution: "",
      timePeriod: "",
    },
    dispatch: () => {},
  });
  
  // Custom hook to access the context
  export const useAppContext = () => useContext(AppContext);

  export default AppContext;