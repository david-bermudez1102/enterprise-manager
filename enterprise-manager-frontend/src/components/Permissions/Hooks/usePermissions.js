import { useState, useEffect } from "react"
import { useSelector, shallowEqual } from "react-redux"

const usePermissions = props => {
  const { permissionAttributes } = props || {}
  const { roles } = useSelector(({ roles }) => ({ roles }), shallowEqual)

  const [assignmentsAttributes, setAssignmentsAttributes] = useState(
    permissionAttributes ? permissionAttributes.assignmentsAttributes : []
  )

  const [exclusionsAttributes, setExclusionsAttributes] = useState(
    permissionAttributes ? permissionAttributes.exclusionsAttributes : []
  )

  const onExclusionChange = (selected, exclusionType) => {
    setExclusionsAttributes(
      [
        ...exclusionsAttributes.filter(e => e.exclusionType !== exclusionType),
        ...exclusionsAttributes
          .filter(e => e.exclusionType === exclusionType)
          .map(e =>
            selected.some(v => v.value === e.accountId)
              ? { ...e, _destroy: undefined }
              : e.id
              ? { ...e, _destroy: true }
              : undefined
          ),
        ...selected
          .filter(
            v =>
              !exclusionsAttributes.some(
                e =>
                  e.accountId === v.value && e.exclusionType === exclusionType
              )
          )
          .map(v => ({
            ...exclusionsAttributes.find(
              a =>
                a.accountId === v.value &&
                a.exclusionType === v.dataset.exclusionType
            ),
            accountId: v.value,
            exclusionType: v.dataset.exclusionType,
            _destroy: undefined
          }))
      ].filter(v => v)
    )
  }

  const attrCount = data => {
    const result = {}
    data.forEach(assignment => {
      Object.entries(assignment).forEach(([key, value]) => {
        if (result[key]) {
          if (value === true) {
            result[key] += 1
          }
        } else {
          if (value === true) {
            result[key] = 1
          } else {
            result[key] = 0
          }
        }
      })
    })
    return result
  }

  const onPermissionsChange = e => {
    const assignmentAttribute = assignmentsAttributes.find(
      a => a.roleId === e.target.value
    )
    setAssignmentsAttributes([
      ...assignmentsAttributes.filter(a => a.roleId !== e.target.value),
      {
        ...assignmentAttribute,
        roleId: e.target.value,
        [e.target.name]: e.target.checked
      }
    ])
  }

  const onCheckAllChange = e => {
    setAssignmentsAttributes(
      roles.map(role => ({
        ...assignmentsAttributes.find(a => a.roleId === role.id),
        roleId: role.id,
        [e.target.id]: e.target.checked
      }))
    )
  }

  useEffect(() => {
    setAssignmentsAttributes(
      permissionAttributes ? permissionAttributes.assignmentsAttributes : []
    )
    setExclusionsAttributes(
      permissionAttributes ? permissionAttributes.exclusionsAttributes : []
    )
  }, [permissionAttributes])

  return {
    permissionAttributes: {
      ...permissionAttributes,
      assignmentsAttributes,
      exclusionsAttributes
    },
    onPermissionsChange,
    onCheckAllChange,
    onExclusionChange,
    attrCount: attrCount(assignmentsAttributes)
  }
}

export default usePermissions
