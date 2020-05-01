import { sortBy } from "./sortBy";
import { setRecordsSortedBy } from "../../../actions/recordActions";

export const handleSortBy = (
  recordFieldId,
  orders,
  resource,
  records,
  values,
  dispatch
) => {
  if (
    /* eslint-disable-next-line no-restricted-globals */
    self.WorkerGlobalScope
  ) {
    console.log("huzzah! a worker!");
  } else {
    console.log("window");
  }

  const order = orders.find(order => order.recordFieldId === recordFieldId);
  sortBy(
    recordFieldId,
    records,
    values,
    order ? order.ascendant : false,
    resource,
    dispatch
  );
  dispatch(
    setRecordsSortedBy({
      id: resource.id,
      recordFieldId,
      orders
    })
  );
};
