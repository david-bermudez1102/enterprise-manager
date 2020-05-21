export const filterByMonth = (
  dataSource,
  oldest,
  queryParams,
  location,
  action,
  setFilteredData
) => {
  const [month, year] = (queryParams.get("month_year") || "").split("/")
  const startDate = new Date(year, month - 1, 1)
  const firstRecordDate = new Date(oldest)

  console.log(firstRecordDate.getDate(), startDate.getMonth())
  action(location.search.replace("?", "")).then(resp => {
    setFilteredData(
      resp.filter(item => {
        const date = new Date(item.createdAt)
        return (
          date.getMonth() === month - 1 && date.getFullYear() === parseInt(year)
        )
      })
    )
  })
}
