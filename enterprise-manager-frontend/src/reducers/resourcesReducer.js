export const resourcesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_RESOURCE":
      return [...state, action.resource];
    case "FETCH_RESOURCES":
      return [
        ...state
          .filter(
            resource => action.resources.some(res => resource.id === res.id) // Remove the resources that don't exist from the fetch request)
          )
          .map(resource => {
            //checking if the fetch has any updates since state is being cached.
            const updatedResource = action.resources.find(
              r => r.id === resource.id
            );
            if (resource !== updatedResource) return updatedResource;
            return resource;
          }),
        ...action.resources.filter(
          resource => !state.some(res => resource.id === res.id)
        )
      ];
    case "UPDATE_RESOURCE":
      const resource = state.find(
        resource => resource.id === parseInt(action.resourceId)
      );
      return [...state.map(r => (r.id === resource.id ? action.resource : r))];
    case "UPDATE_RECORDS_COUNT":
      return [
        ...state.map(r =>
          r.id === parseInt(action.formId)
            ? { ...r, recordsCount: r.recordsCount + 1 }
            : r
        )
      ];
    case "REMOVE_RESOURCE":
      return [
        ...state.filter(resource => resource.id !== parseInt(action.resourceId))
      ];
    default:
      return state;
  }
};
