import { useSelector, shallowEqual } from "react-redux"

const useUserPermission = ({ payload }) => {
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)
  const { currentUser } = session

  const getPermission = privilege =>
    payload
      ? (payload.permissionAttributes.assignmentsAttributes.some(
          a => currentUser.roles.some(r => r.id === a.roleId) && a[privilege]
        ) &&
          !payload.permissionAttributes.exclusionsAttributes.some(
            e =>
              parseInt(e.accountId) === parseInt(currentUser.id) &&
              e.exclusionType === privilege
          )) ||
        currentUser.isRoot
      : false

  const canCreate = getPermission("createPrivilege")

  const canUpdate = getPermission("updatePrivilege")
  const canInsert = getPermission("insertPrivilege")
  const canRead = getPermission("readPrivilege")

  const canDelete = getPermission("deletePrivilege")

  return { canCreate, canUpdate, canInsert, canRead, canDelete }
}

export default useUserPermission
