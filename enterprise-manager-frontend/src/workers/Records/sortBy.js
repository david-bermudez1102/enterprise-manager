export const sortBy = async (values, dataIndex, order, fieldType) => {
  return !dataIndex
    ? order
      ? order === "ascend"
        ? [...values]
        : [...values].reverse()
      : [...values]
    : dataIndex === "listingId"
    ? order === "ascend"
      ? [...values].sort((a, b) => a.listingId - b.listingId)
      : [...values].sort((a, b) => b.listingId - a.listingId)
    : fieldType === "numeric_field"
    ? order === "ascend"
      ? [...values].sort((a, b) => a[dataIndex] - b[dataIndex])
      : [...values].sort((a, b) => b[dataIndex] - a[dataIndex])
    : order === "ascend"
    ? [...values].sort((a, b) =>
        (a[dataIndex] || "").localeCompare(b[dataIndex] || "")
      )
    : [...values].sort((a, b) =>
        (b[dataIndex] || "").localeCompare(a[dataIndex] || "")
      )
}
