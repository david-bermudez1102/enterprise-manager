import { filter, compose, map, seq } from "transducers.js";

export const fieldsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_FIELD":
      return [...state, action.field];
    case "FETCH_FIELDS":
      const transform = compose(
        map(field => {
          const updatedField = action.fields.find(f => f.id === field.id);
          if (updatedField && field !== updatedField) return updatedField;
          return field;
        }),
        filter(
          field =>
            field.formId !== action.formId ||
            action.fields.some(f => f.id === field.id)
        )
      );
      const t2 = compose(filter(field => !state.some(f => field.id === f.id)));
      return [...seq(state, transform), ...seq(action.fields, t2)];
    case "UPDATE_FIELD":
      const field = state.find(field => field.id === parseInt(action.fieldId));
      return [...state.map(f => (f.id === field.id ? action.field : f))];
    case "REMOVE_FIELD":
      return [...state.filter(field => field.id !== parseInt(action.fieldId))];
    default:
      return state;
  }
};
