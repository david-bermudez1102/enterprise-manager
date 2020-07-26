import { uniqBy } from "lodash"

export const prepareRecords = (records, connectionType, groupBy) => {
  switch (connectionType) {
    case "invoice":
      console.log(records)
      return uniqBy(records, groupBy).map(x => ({
        ...x,
        lineItems: records.filter(i => i[groupBy] === x[groupBy])
      }))

    default:
      return records
  }
}
