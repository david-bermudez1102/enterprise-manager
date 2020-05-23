export const filterByDateRange = (
  queryParams,
  location,
  action,
  setFilteredData
) => {
  const dateRange = queryParams.get("date_range") || ""
  const [startDate, endDate] = dateRange.split("-").map(date => new Date(date))

  return action(location.search.replace("?", "")).then(resp =>
    setFilteredData(
      resp.filter(item => {
        const date = new Date(item.createdAt)
        return (
          date.getTime() >= startDate.getTime() &&
          date.getTime() <= endDate.getTime()
        )
      })
    )
  )
}
