import { Projection } from "./useProjections";

export interface State {
  contributions: string;
  timePeriod: string;
  projections: Projection[];
  startPrice: number;
  endPrice: number;
  startDate: Date;
  endDate: Date;
}

type SetContributionsAction = { type: "SET_CONTRIBUTIONS"; payload: string };
type SetTimePeriodAction = { type: "SET_TIME_PERIOD"; payload: string };
type SetProjectionsAction = { type: "SET_PROJECTIONS"; payload: Projection[] };
type SetStartPriceAction = { type: "SET_START_PRICE"; payload: number };
type SetEndPriceAction = { type: "SET_END_PRICE"; payload: number };
type SetStartDateAction = { type: "SET_START_DATE"; payload: Date };
type SetEndDateAction = { type: "SET_END_DATE"; payload: Date };

export type Action =
  | SetContributionsAction
  | SetTimePeriodAction
  | SetProjectionsAction
  | SetStartPriceAction
  | SetEndPriceAction
  | SetStartDateAction
  | SetEndDateAction;

// Action creators
export const setContributions = (contributions: string): SetContributionsAction => ({
  type: "SET_CONTRIBUTIONS",
  payload: contributions,
});

export const setTimePeriod = (timePeriod: string): SetTimePeriodAction => ({
  type: "SET_TIME_PERIOD",
  payload: timePeriod,
});

export const setProjections = (projections: Projection[]): SetProjectionsAction => ({
  type: "SET_PROJECTIONS",
  payload: projections,
});

export const setStartPrice = (price: number): SetStartPriceAction => ({
  type: "SET_START_PRICE",
  payload: price,
});

export const setEndPrice = (price: number): SetEndPriceAction => ({
  type: "SET_END_PRICE",
  payload: price,
});

export const setStartDate = (date: Date): SetStartDateAction => ({
  type: "SET_START_DATE",
  payload: date,
});

export const setEndDate = (date: Date): SetEndDateAction => ({
  type: "SET_END_DATE",
  payload: date,
});

// Update the reducer
const dataReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_CONTRIBUTIONS":
      return { ...state, contributions: action.payload };
    case "SET_TIME_PERIOD":
      return { ...state, timePeriod: action.payload };
    case "SET_PROJECTIONS":
      return { ...state, projections: action.payload };
    case "SET_START_PRICE":
      return { ...state, startPrice: action.payload };
    case "SET_END_PRICE":
      return { ...state, endPrice: action.payload };
    case "SET_START_DATE":
      return { ...state, startDate: action.payload };
    case "SET_END_DATE":
      return { ...state, endDate: action.payload };
    default:
      return state;
  }
};

export default dataReducer;