export const filterByDate = (
  queryParams,
  location,
  action,
  setFilteredData
) => {
  const date = new Date(queryParams.get("date"))

  return action(location.search.replace("?", "")).then(resp =>
    setFilteredData(
      resp.filter(item => {
        const itemDate = new Date(item.createdAt)
        return (
          itemDate.getMonth() === date.getMonth() &&
          itemDate.getFullYear() === date.getFullYear() &&
          itemDate.getDate() === date.getDate()
        )
      })
    )
  )
}
