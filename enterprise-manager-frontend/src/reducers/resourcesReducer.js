export const resourcesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_RESOURCE":
      return [...state, action.resource]
    case "FETCH_RESOURCES":
      return action.resources
    case "UPDATE_RESOURCE":
      return [
        ...state.map(r =>
          r.id === action.resource.id ? { ...r, ...action.resource } : r
        )
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
