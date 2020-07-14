import { useEffect, useState } from "react"

const useHandleFieldDependents = (fieldValue, fieldDependants, fields) => {
  const [initialValue, setInitialValue] = useState(fieldValue || 0)

  useEffect(() => {
    const replaceableField = fields.find(
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
        let finalValue = initialValue
        ;(fields || []).forEach(f => {
          const fieldDependant = (fieldDependants || []).find(
            fD => fD.dependentFieldId === f.fieldId
          )

          if (fieldDependant && f.content) {
            const field =
              (fields || []).find(
                field => field.fieldId === fieldDependant.dependentFieldId
              ) || {}

            switch (fieldDependant.operation) {
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
  }, [fields])

  useEffect(() => {
    setInitialValue(fieldValue || 0)
  }, [fieldValue, initialValue])

  return initialValue
}

export default useHandleFieldDependents
