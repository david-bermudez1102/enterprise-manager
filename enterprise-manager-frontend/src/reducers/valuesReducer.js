export const valuesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_VALUES":
      return [
        ...state,
        ...action.values.filter(
          value => !state.some(val => val.id === value.id)
        )
      ];

    case "UPDATE_VALUE":
      return [...state].values.map(value =>
        value.id === parseInt(action.value.id) ? action.value : value
      );

    case "FETCH_VALUES":
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
