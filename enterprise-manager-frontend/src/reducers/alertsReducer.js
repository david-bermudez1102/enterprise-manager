export const alerts = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ERRORS':
      console.log([...state, { type: 'error', messages: action.errors }]);
      return [...state, { type: 'error', messages: action.errors }];
    case 'CLEAR_ERRORS':
      return [];
    default:
      return state;
  }
};
