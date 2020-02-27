export const valuesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_VALUES":
      return [
        ...state,
        ...action.values.filter(
          value => !state.some(val => val.id === value.id)
        )
      ];
    case "FETCH_VALUES":
      return [...action.values];
    default:
      return state;
  }
};
