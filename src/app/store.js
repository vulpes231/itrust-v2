import { combineReducers } from "redux";

// Front
import LayoutReducer from "../features/layouts/reducer";

const rootReducer = combineReducers({
	Layout: LayoutReducer,
});

export default rootReducer;
