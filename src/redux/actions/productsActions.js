import { ActionTypes } from "../constants/action-types";

export const setData = (data) => {
  return {
    type: ActionTypes.SET_DATA,
    payload: data,
  };
};