export const valuesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_VALUES":
      return [
        ...state,
        ...action.values.filter(
          value => !state.some(val => val.id === value.id)
        ),
      ];

    case "ADD_VALUE":
      return [...state].map(value =>
        parseInt(value.id) === parseInt(action.value.id)
          ? {
              ...value,
              [action.value.recordFieldId]: action.value.content,
            }
          : value
      );

    case "UPDATE_VALUE":
      return [...state].map(value =>
        parseInt(value.id) === parseInt(action.value.recordId)
          ? {
              ...value,
              [action.value.recordFieldId]: action.value.content,
            }
          : value
      );

    case "FETCH_VALUES":
      return action.values;
    case "REMOVE_VALUES":
      return state.filter(v => v.recordId !== action.recordId);

    default:
      return state;
  }
};
