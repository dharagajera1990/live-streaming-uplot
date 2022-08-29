import { ActionTypes } from "../constants/action-types";

export const dataReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_DATA:
      return { ...state, data: payload };
    default:
      return state;
  }
};