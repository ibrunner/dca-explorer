import { Projection } from "./useProjections";

export interface Target {
  date: Date;
  price: number;
}

export interface Plan {
  startDate: Date;
  endDate: Date;
  amount: number;
  orderType: "buy" | "sell";
}

export interface State {
  startingAssetTotal: number;
  timePeriod: string;
  projections: Projection[];
  startDate: Date;
  targets: Target[];
  startPrice: number;
  plans: Plan[];
  settlement: number; // New property
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
type AddPlanAction = { type: "ADD_PLAN"; payload: Plan };
type UpdatePlanAction = {
  type: "UPDATE_PLAN";
  payload: { index: number; plan: Plan };
};
type DeletePlanAction = { type: "DELETE_PLAN"; payload: number };
type UpdateSettlementAction = { type: "UPDATE_SETTLEMENT"; payload: number };

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
  | DeleteTargetAction
  | AddPlanAction
  | UpdatePlanAction
  | DeletePlanAction
  | UpdateSettlementAction;

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

export const addPlan = (plan: Plan): AddPlanAction => ({
  type: "ADD_PLAN",
  payload: plan,
});

export const updatePlan = (index: number, plan: Plan): UpdatePlanAction => ({
  type: "UPDATE_PLAN",
  payload: { index, plan },
});

export const deletePlan = (index: number): DeletePlanAction => ({
  type: "DELETE_PLAN",
  payload: index,
});

export const updateSettlement = (amount: number): UpdateSettlementAction => ({
  type: "UPDATE_SETTLEMENT",
  payload: amount,
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
    case "ADD_PLAN":
      return {
        ...state,
        plans: [
          ...state.plans,
          {
            ...action.payload,
            startDate: new Date(action.payload.startDate),
            endDate: new Date(action.payload.endDate),
          },
        ],
      };
    case "UPDATE_PLAN":
      return {
        ...state,
        plans: state.plans.map((plan, index) =>
          index === action.payload.index
            ? {
                ...action.payload.plan,
                startDate: new Date(action.payload.plan.startDate),
                endDate: new Date(action.payload.plan.endDate),
              }
            : plan
        ),
      };
    case "DELETE_PLAN":
      return {
        ...state,
        plans: state.plans.filter((_, index) => index !== action.payload),
      };
    case "UPDATE_SETTLEMENT":
      return { ...state, settlement: state.settlement + action.payload };
    default:
      return state;
  }
};

export default dataReducer;
