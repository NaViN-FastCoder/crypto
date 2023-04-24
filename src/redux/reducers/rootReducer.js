import { combineReducers } from "redux";
import usersReducer from "./users/users.reducer";
//we have only one reducer if in future we have more than one, we use combineReducers
const rootReducer = () =>
	combineReducers({
		users: usersReducer,
	});

export default rootReducer;
