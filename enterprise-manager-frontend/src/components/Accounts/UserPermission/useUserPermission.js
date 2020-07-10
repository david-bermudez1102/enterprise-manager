import { useSelector, shallowEqual } from "react-redux"

const useUserPermission = ({ payload }) => {
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)
  const { currentUser } = session

  const canCreate =
    payload.permissionAttributes.assignmentsAttributes.some(
      a => currentUser.roles.some(r => r.id === a.roleId) && a.createPrivilege
    ) || currentUser.isRoot
  const canUpdate =
    payload.permissionAttributes.assignmentsAttributes.some(
      a => currentUser.roles.some(r => r.id === a.roleId) && a.updatePrivilege
    ) || currentUser.isRoot
  const canInsert =
    payload.permissionAttributes.assignmentsAttributes.some(
      a => currentUser.roles.some(r => r.id === a.roleId) && a.insertPrivilege
    ) || currentUser.isRoot
  const canRead =
    payload.permissionAttributes.assignmentsAttributes.some(
      a => currentUser.roles.some(r => r.id === a.roleId) && a.readPrivilege
    ) || currentUser.isRoot

  const canDelete =
    payload.permissionAttributes.assignmentsAttributes.some(
      a => currentUser.roles.some(r => r.id === a.roleId) && a.deletePrivilege
    ) || currentUser.isRoot

  return { canCreate, canUpdate, canInsert, canRead, canDelete }
}

export default useUserPermission
