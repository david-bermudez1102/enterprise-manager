import { combineReducers } from "redux";
import { OrganizationReducer } from "./OrganizationReducer";
import { AccountsReducer } from "./AccountsReducer";

export const rootReducer = combineReducers({organizations:OrganizationReducer,accounts:AccountsReducer})