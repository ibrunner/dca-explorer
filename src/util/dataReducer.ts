import { Projection } from "./useProjections";

export interface State {
  contribution: number;
  timePeriod: string;
  projections: Projection[];
  startPrice: number;
  endPrice: number;
  startDate: Date;
  endDate: Date;
  startingAssetTotal: number;
}

type SetContributionAction = { type: "SET_CONTRIBUTION"; payload: string };
type SetTimePeriodAction = { type: "SET_TIME_PERIOD"; payload: string };
type SetProjectionsAction = { type: "SET_PROJECTIONS"; payload: Projection[] };
type SetStartPriceAction = { type: "SET_START_PRICE"; payload: number };
type SetEndPriceAction = { type: "SET_END_PRICE"; payload: number };
type SetStartDateAction = { type: "SET_START_DATE"; payload: Date };
type SetEndDateAction = { type: "SET_END_DATE"; payload: Date };
type SetStartingAssetTotalAction = {
  type: "SET_STARTING_ASSET_TOTAL";
  payload: number;
}; // New action type

export type Action =
  | SetContributionAction
  | SetTimePeriodAction
  | SetProjectionsAction
  | SetStartPriceAction
  | SetEndPriceAction
  | SetStartDateAction
  | SetEndDateAction
  | SetStartingAssetTotalAction;

// Action creators
export const setContribution = (
  contribution: string
): SetContributionAction => ({
  type: "SET_CONTRIBUTION",
  payload: contribution,
});

export const setTimePeriod = (timePeriod: string): SetTimePeriodAction => ({
  type: "SET_TIME_PERIOD",
  payload: timePeriod,
});

export const setProjections = (
  projections: Projection[]
): SetProjectionsAction => ({
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

export const setStartingAssetTotal = (
  total: number
): SetStartingAssetTotalAction => ({
  type: "SET_STARTING_ASSET_TOTAL",
  payload: total,
});

// Update the reducer
const dataReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_CONTRIBUTION":
      return { ...state, contribution: action.payload };
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
    case "SET_STARTING_ASSET_TOTAL":
      return { ...state, startingAssetTotal: action.payload };
    default:
      return state;
  }
};

export default dataReducer;
