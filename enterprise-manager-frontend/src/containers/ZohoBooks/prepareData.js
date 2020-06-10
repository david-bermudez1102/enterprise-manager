import { uniqBy } from "lodash"

export const prepareRecords = (records, connectionType) => {
  switch (connectionType) {
    case "invoice":
      return uniqBy(records, "invoice_number").map(x => ({
        ...x,
        lineItems: records.filter(i => i.invoice_number === x.invoice_number)
      }))

    default:
      return records
  }
}
