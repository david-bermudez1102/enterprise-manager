export const sortBy = async (values, dataIndex, order) =>
  !dataIndex
    ? order
      ? order === "ascend"
        ? [...values]
        : [...values].reverse()
      : [...values].reverse()
    : dataIndex === "listingId"
    ? order === "ascend"
      ? [...values].sort((a, b) => a.listingId - b.listingId)
      : [...values].sort((a, b) => b.listingId - a.listingId)
    : order === "ascend"
    ? [...values].sort((a, b) =>
        (a[dataIndex] || "").localeCompare(b[dataIndex] || "")
      )
    : [...values].sort((a, b) =>
        (b[dataIndex] || "").localeCompare(a[dataIndex] || "")
      )
