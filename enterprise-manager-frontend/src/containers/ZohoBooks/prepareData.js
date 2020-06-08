export const prepareRecords = (records, recordFields) =>
  records
    .map(value =>
      Object.keys(value)
        .map(k => {
          const rF = recordFields.find(f => parseInt(f.id) === parseInt(k))
          return rF
            ? {
                [(
                  rF.zohoFieldName || rF.name.split(" ").join("_")
                ).toLowerCase()]: value[k],
                id: value.id,
                zohoBooksId: value.zohoRecordId
              }
            : null
        })
        .filter(value => value)
    )
    .map(value => Object.assign({}, ...value))
