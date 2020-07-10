import React, { useCallback, useState, useEffect } from "react"
import { mdiCheckboxMultipleBlank } from "@mdi/js"
import CombinedFieldOptions from "./CombinedFieldOptions"
import { useHandleChange } from "../../Hooks/useHandleChange"
import { useSelector, shallowEqual } from "react-redux"
import RadioWrapper from "../RadioWrapper"

const CombinedField = ({
  field,
  resourceId,
  fieldType,
  fieldState,
  onChange
}) => {
  const { combinedFields, fieldFormat } = field
  const { recordFields } = useSelector(
    ({ recordFields }) => ({ recordFields }),
    shallowEqual
  )

  const [state, setState] = useState(combinedFields ? { combinedFields } : null)
  const { handleChange, handleCombinedField } = useHandleChange({
    field,
    onChange
  })

  const handleCombinedFieldChange = useCallback(
    newState => setState({ ...state, ...newState }),
    // eslint-disable-next-line
    []
  )

  useEffect(() => {
    if (state) handleCombinedField(state)
    // eslint-disable-next-line
  }, [state])

  const fieldsWithTimeStamps = [
    ...(recordFields[resourceId] || []),
    { id: "createdAt", name: "Date Created" },
    { id: "updatedAt", name: "Date Updated" }
  ]

  return (
    <>
      <RadioWrapper
        id='combined_field'
        name='fieldType'
        value={"combined_field"}
        onChange={handleChange}
        iconPath={mdiCheckboxMultipleBlank}
        iconTitle={"Combined Fields"}
        fieldType={fieldType}>
        Combined Fields
      </RadioWrapper>
      <CombinedFieldOptions
        initialState={(combinedFields || [])
          .map(c => fieldsWithTimeStamps.find(f => f.id === c))
          .map(f => ({ id: f.id, value: f.name }))}
        fieldFormat={fieldFormat}
        resourceId={resourceId}
        fieldType={fieldType}
        fieldState={fieldState}
        handleChange={handleCombinedFieldChange}
      />
    </>
  )
}

export default CombinedField
