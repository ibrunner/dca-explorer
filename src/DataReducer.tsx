// Define the initial state
export interface State {
  contributions: string;
  timePeriod: string;
}

// Define the action types
type SetContributionsAction = { type: "SET_CONTRIBUTIONS"; payload: string };
type SetTimePeriodAction = { type: "SET_TIME_PERIOD"; payload: string };

// Define the union type of all actions
export type Action = SetContributionsAction | SetTimePeriodAction;

// Define the reducer function
const dataReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_CONTRIBUTIONS":
      return { ...state, contributions: action.payload };
    case "SET_TIME_PERIOD":
      return { ...state, timePeriod: action.payload };
    default:
      return state;
  }
};

export default dataReducer;