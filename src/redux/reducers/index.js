import { combineReducers } from "redux";
import {dataReducer} from "./productsReducer";
const reducers = combineReducers({
  data : dataReducer
});
export default reducers;