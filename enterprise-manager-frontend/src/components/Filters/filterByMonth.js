export const filterByMonth = async (
  queryParams,
  location,
  action,
  setFilteredData
) => {
  const [month, year] = (queryParams.get("month_year") || "").split("/")

  return action(location.search.replace("?", "")).then(resp =>
    setFilteredData(
      resp.filter(item => {
        const date = new Date(item.createdAt)
        return (
          date.getMonth() === month - 1 && date.getFullYear() === parseInt(year)
        )
      })
    )
  )
}
