export const searchResult = async (
  queryParams,
  location,
  action,
  setFilteredData
) => {
  const query = queryParams.get("query") || ""
  const columnId = queryParams.get("column_id")
  console.log(columnId, query)
  return action(location.search.replace("?", "")).then(resp =>
    setFilteredData(
      columnId
        ? resp.filter(
            item =>
              item[columnId] &&
              item[columnId]
                .toString()
                .toLowerCase()
                .includes(query.toLowerCase())
          )
        : resp.filter(item =>
            Object.values(item).some(v =>
              v.toString().toLowerCase().includes(query.toLowerCase())
            )
          )
    )
  )
}
