export const alerts = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MESSAGES':
      console.log([...state, { type: 'success', messages: action.messages }]);
      return [...state, { type: 'success', messages: action.messages }];
    case 'ADD_ERRORS':
      console.log([...state, { type: 'error', messages: action.errors }]);
      return [...state, { type: 'error', messages: action.errors }];
    case 'CLEAR_ALERTS':
      return [];
    default:
      return state;
  }
};
