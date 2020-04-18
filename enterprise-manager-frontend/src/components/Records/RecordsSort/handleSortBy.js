import { sortBy } from "./sortBy";
import { setRecordsSortedBy } from "../../../actions/recordActions";

export const handleSortByF = (
  recordFieldId,
  orders,
  resource,
  records,
  values,
  dispatch
) => {
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
