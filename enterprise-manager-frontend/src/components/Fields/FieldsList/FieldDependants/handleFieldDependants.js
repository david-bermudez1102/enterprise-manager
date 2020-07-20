import { useEffect, useState } from "react"
import { useSelector, shallowEqual } from "react-redux"

const useHandleFieldDependents = (
  fieldValue,
  fieldDependants,
  fieldsListState
) => {
  const { values } = useSelector(({ values }) => ({ values }), shallowEqual)
  const [initialValue, setInitialValue] = useState(fieldValue || 0)
  const fieldsToCheck = fieldsListState.map(f => f.content).join("_")
  const [state, setState] = useState(fieldsToCheck)

  useEffect(() => {
    if (fieldDependants) {
      const replaceableField = fieldsListState.find(
        field =>
          (fieldDependants || []).some(
            fD =>
              fD.dependentFieldId === field.fieldId &&
              fD.operation === "replace"
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
              const dependentContent =
                fieldDependant.content !== "" && fieldDependant.content
                  ? fieldDependant.content
                  : f.content

              switch (fieldDependant.operation) {
                case "copy":
                  finalValue +=
                    parseInt(
                      ((values[fieldDependant.resourceFieldFormId] || []).find(
                        v => v.id === field.recordId
                      ) || {})[fieldDependant.resourceFieldName]
                    ) || 0

                  break
                case "add":
                  finalValue += parseInt(dependentContent)

                  break
                case "subtract":
                  finalValue -= parseInt(dependentContent)
                  break
                case "multiply":
                  finalValue *= parseInt(dependentContent)

                  break
                case "divide":
                  finalValue = finalValue / parseInt(dependentContent)
                  break
                case "dependent_times":
                  finalValue +=
                    parseInt(field.content || f.content) *
                    parseInt(dependentContent)

                  break

                default:
                  break
              }
            }
          })
          return finalValue
        }
        operate().then(res => setInitialValue(res))
      }
    }
    // eslint-disable-next-line
  }, [state, fieldDependants, fieldValue])

  useEffect(() => {
    setState(fieldsToCheck)
  }, [fieldsToCheck])

  return initialValue
}

export default useHandleFieldDependents
