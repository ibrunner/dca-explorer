import { Projection } from "./useProjections";

export interface Target {
  date: Date;
  price: number;
}

export interface State {
  contribution: number;
  timePeriod: string;
  projections: Projection[];
  startPrice: number;
  endPrice: number;
  startDate: Date;
  targets: Target[];
  startingAssetTotal: number;
}

type SetContributionAction = { type: "SET_CONTRIBUTION"; payload: string };
type SetTimePeriodAction = { type: "SET_TIME_PERIOD"; payload: string };
type SetProjectionsAction = { type: "SET_PROJECTIONS"; payload: Projection[] };
type SetStartPriceAction = { type: "SET_START_PRICE"; payload: number };
type SetEndPriceAction = { type: "SET_END_PRICE"; payload: number };
type SetStartDateAction = { type: "SET_START_DATE"; payload: Date };
type SetStartingAssetTotalAction = {
  type: "SET_STARTING_ASSET_TOTAL";
  payload: number;
};
type AddTargetAction = { type: "ADD_TARGET"; payload: Target };
type UpdateTargetAction = {
  type: "UPDATE_TARGET";
  payload: { index: number; target: Target };
};
type DeleteTargetAction = { type: "DELETE_TARGET"; payload: number };

export type Action =
  | SetContributionAction
  | SetTimePeriodAction
  | SetProjectionsAction
  | SetStartPriceAction
  | SetEndPriceAction
  | SetStartDateAction
  | SetStartingAssetTotalAction
  | AddTargetAction
  | UpdateTargetAction
  | DeleteTargetAction;

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

export const setStartingAssetTotal = (
  total: number
): SetStartingAssetTotalAction => ({
  type: "SET_STARTING_ASSET_TOTAL",
  payload: total,
});

export const addTarget = (target: Target): AddTargetAction => ({
  type: "ADD_TARGET",
  payload: target,
});

export const updateTarget = (
  index: number,
  target: Target
): UpdateTargetAction => ({
  type: "UPDATE_TARGET",
  payload: { index, target },
});

export const deleteTarget = (index: number): DeleteTargetAction => ({
  type: "DELETE_TARGET",
  payload: index,
});

// Update the reducer
const sortTargets = (targets: Target[]): Target[] => {
  return targets.sort((a, b) => a.date.getTime() - b.date.getTime());
};

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
    case "SET_STARTING_ASSET_TOTAL":
      return { ...state, startingAssetTotal: action.payload };
    case "ADD_TARGET":
      return {
        ...state,
        targets: sortTargets([...state.targets, action.payload]),
      };
    case "UPDATE_TARGET":
      return {
        ...state,
        targets: sortTargets(
          state.targets.map((target, index) =>
            index === action.payload.index ? action.payload.target : target
          )
        ),
      };
    case "DELETE_TARGET":
      return {
        ...state,
        targets: state.targets.filter((_, index) => index !== action.payload),
      };
    default:
      return state;
  }
};

export default dataReducer;
