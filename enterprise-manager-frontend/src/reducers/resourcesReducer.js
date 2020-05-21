export const resourcesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_RESOURCE":
      return [...state, action.resource]
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
            )
            if (resource !== updatedResource)
              return { ...resource, ...updatedResource }
            return resource
          }),
        ...action.resources.filter(
          resource => !state.some(res => resource.id === res.id)
        )
      ]
    case "UPDATE_RESOURCE":
      return [
        ...state.map(r => (r.id === action.resource.id ? action.resource : r))
      ]
    case "UPDATE_RECORDS_COUNT":
      return [
        ...state.map(r =>
          r.id === parseInt(action.formId)
            ? { ...r, recordsCount: action.recordsCount }
            : r
        )
      ]
    case "SET_OLDEST_RECORD":
      const resource = state.find(
        resource => resource.id === parseInt(action.formId)
      )
      let oldestRecord = resource.oldestRecord
      if (oldestRecord) {
        if (
          new Date(action.oldestRecord).getHours() <
          new Date(oldestRecord).getHours()
        )
          oldestRecord = action.oldestRecord
      } else oldestRecord = action.oldestRecord
      return [
        ...state.filter(resource => resource.id !== parseInt(action.formId)),
        { ...resource, oldestRecord }
      ]
    case "REMOVE_RESOURCE":
      return [...state.filter(resource => resource.id !== parseInt(action.id))]
    default:
      return state
  }
}
