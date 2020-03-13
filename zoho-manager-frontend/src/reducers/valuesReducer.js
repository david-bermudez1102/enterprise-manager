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
      console.log([
        ...state,
        ...action.values.filter(
          value => !state.some(val => value.id === val.id)
        )
      ]);
      return [
        ...state,
        ...action.values.filter(
          value => !state.some(val => value.id === val.id)
        )
      ];
    default:
      return state;
  }
};
