export const filterByDateRange = (dataSource, oldest, newest, queryParams) => {
  const dateRange = queryParams.get("date_range") || "";
  const [startDate, endDate] = dateRange.split("-").map(date => new Date(date));
  const firstRecordDate = new Date(oldest.createdAt);
  const latestRecordDate = new Date(newest.createdAt);
  firstRecordDate.setHours(0, 0, 0, 0);
  latestRecordDate.setHours(0, 0, 0, 0);

  if (startDate.getHours() >= firstRecordDate.getHours())
    return dataSource.filter(
      item =>
        new Date(item.createdAt).setHours(0, 0, 0, 0) >= startDate &&
        new Date(item.createdAt).setHours(0, 0, 0, 0) <= endDate
    );
};
