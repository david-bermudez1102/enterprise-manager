export const sortBy = (values, dataIndex, order, resource) => {
  console.log(order);
  return !dataIndex
    ? order
      ? order === "ascend"
        ? [...values]
        : [...values].reverse()
      : [...values].reverse()
    : order === "ascend"
    ? [...values].sort((a, b) =>
        (a[dataIndex] || "").localeCompare(b[dataIndex] || "")
      )
    : [...values].sort((a, b) =>
        (b[dataIndex] || "").localeCompare(a[dataIndex] || "")
      );
};
