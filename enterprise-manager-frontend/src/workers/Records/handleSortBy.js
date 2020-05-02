import * as sortByWorker from "./sortBy.js";

export const handleSortBy = (
  recordFieldId,
  orders,
  resource,
  records,
  values
) => {
  if (
    /* eslint-disable-next-line no-restricted-globals */
    self.WorkerGlobalScope
  ) {
    console.log("huzzah! a worker!");
  } else {
    console.log("window");
  }

  const order = orders.find((order) => order.recordFieldId === recordFieldId);
  const { sortedRecords, message } = sortByWorker.sortBy(
    recordFieldId,
    records,
    values,
    order ? order.ascendant : false,
    resource
  );
  return { id: resource.id, recordFieldId, sortedRecords, orders, message };
};
