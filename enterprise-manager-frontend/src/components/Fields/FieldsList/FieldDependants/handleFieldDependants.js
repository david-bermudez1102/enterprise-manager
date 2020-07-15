import { useEffect, useState } from "react"
import { useSelector, shallowEqual } from "react-redux"

const useHandleFieldDependents = (
  fieldValue,
  fieldDependants,
  fieldsListState
) => {
  const { values } = useSelector(({ values }) => ({ values }), shallowEqual)
  const [initialValue, setInitialValue] = useState(fieldValue || 0)

  useEffect(() => {
    const replaceableField = fieldsListState.find(
      field =>
        (fieldDependants || []).some(
          fD =>
            fD.dependentFieldId === field.fieldId && fD.operation === "replace"
        ) && field.content
    )
    if (replaceableField) {
      setInitialValue(
        replaceableField.type === "numeric_field"
          ? parseInt(replaceableField.content)
          : replaceableField.content
      )
    } else {
      const operate = async () => {
        setInitialValue(fieldValue || 0)
        let finalValue = fieldValue || 0
        ;(fieldsListState || []).forEach(f => {
          const fieldDependant = (fieldDependants || []).find(
            fD => fD.dependentFieldId === f.fieldId
          )

          if (fieldDependant && f.content) {
            const field =
              (fieldsListState || []).find(
                field => field.fieldId === fieldDependant.dependentFieldId
              ) || {}

            switch (fieldDependant.operation) {
              case "copy":
                finalValue += parseInt(
                  (values[fieldDependant.resourceFieldFormId].find(
                    v => v.id === field.recordId
                  ) || {})[fieldDependant.resourceFieldName]
                )

                console.log(
                  parseInt(
                    (values[fieldDependant.resourceFieldFormId].find(
                      v => v.id === field.recordId
                    ) || {})[fieldDependant.resourceFieldName]
                  )
                )

                break
              case "add":
                finalValue += parseInt(fieldDependant.content)

                break
              case "subtract":
                finalValue -= parseInt(fieldDependant.content)
                break
              case "multiply":
                finalValue *= parseInt(fieldDependant.content || f.content)

                break
              case "divide":
                finalValue =
                  finalValue / parseInt(fieldDependant.content || f.content)
                break
              case "dependent_times":
                finalValue +=
                  parseInt(field.content || f.content) *
                  parseInt(fieldDependant.content)

                break

              default:
                break
            }
          }
        })
        return await finalValue
      }
      operate().then(res => setInitialValue(res))
    }
  }, [fieldsListState])

  return initialValue
}

export default useHandleFieldDependents
