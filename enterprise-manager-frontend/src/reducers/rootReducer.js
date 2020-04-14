import { combineReducers } from "redux";
import { organizationsReducer } from "./organizationsReducer";
import { adminsReducer } from "./adminsReducer";
import { resourcesReducer } from "./resourcesReducer";
import { fieldsReducer } from "./fieldsReducer";
import { recordsReducer } from "./recordsReducer";
import { valuesReducer } from "./valuesReducer";
import { sessionReducer } from "./sessionReducer";
import { recordFieldsReducer } from "./recordFieldsReducer";
import { accountsReducer } from "./accountsReducer";
import { zohoBooksReducer } from "./zohoBooksReducer";
import { alerts } from "./alertsReducer";
import { token } from "./tokenReducer";
import { pagination } from "./paginationReducer";

const requesting = (state = false, action) => {
  switch (action.type) {
    case "REQUESTING_DATA":
      return true;
    case "FINISHED_REQUESTING":
      return false;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  session: sessionReducer,
  accounts: accountsReducer,
  organizations: organizationsReducer,
  admins: adminsReducer,
  resources: resourcesReducer,
  fields: fieldsReducer,
  records: recordsReducer,
  recordFields: recordFieldsReducer,
  values: valuesReducer,
  zohoBooks: zohoBooksReducer,
  requesting,
  alerts,
  token,
  pagination
});
