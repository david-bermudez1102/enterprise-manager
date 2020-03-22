export const valuesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_VALUES":
      return [
        ...state,
        ...action.values.filter(
          value => !state.some(val => val.id === value.id)
        )
      ];

    case "ADD_VALUE":
      return [...state, action.value];

    case "UPDATE_VALUE":
      return [...state].map(value =>
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
