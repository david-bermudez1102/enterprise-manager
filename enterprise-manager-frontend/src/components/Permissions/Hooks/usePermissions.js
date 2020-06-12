import { useState } from "react"

const usePermissions = props => {
  const { permissionAttributes } = props || {}

  const [assignmentsAttributes, setAssignmentsAttributes] = useState(
    permissionAttributes ? permissionAttributes.assignmentsAttributes : []
  )

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

  return {
    permissionAttributes: { assignmentsAttributes },
    onPermissionsChange
  }
}

export default usePermissions
