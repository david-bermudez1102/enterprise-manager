import React, { useEffect, useState } from "react"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import Icon, {
  ApartmentOutlined,
  UserAddOutlined,
  FlagOutlined,
  SwitcherOutlined,
  TeamOutlined,
  TagsOutlined,
  PlusCircleOutlined
} from "@ant-design/icons"
import IconWrapper from "../../components/Icons/IconWrapper"

const useLinks = ({ organization, exclude }) => {
  const { session, sidebar, pagePermissions, roles, roots } = useSelector(
    ({ session, sidebar, pagePermissions, roles, roots }) => ({
      session,
      sidebar,
      pagePermissions,
      roles,
      roots
    }),
    shallowEqual
  )
  const dispatch = useDispatch()
  const { currentUser } = session

  const initialState = [
    {
      name: "Login",
      path: "/login",
      text: "Login",
      icon: <i className='fal fa-sign-in'></i>,
      levels: [],
      subLinks: [],
      loginRequired: false,
      everyone: true,
      hidden: !roots.length && true
    },
    {
      name: "Home",
      path: "/",
      exact: true,
      text: "Home",
      everyone: true,
      loginRequired: true,
      levels: [],
      subLinks: [],
      icon: (
        <Icon
          style={{ verticalAlign: 0 }}
          component={() => <i className='fal fa-home'></i>}
        />
      )
    },
    {
      name: "Organization",
      path: "/organizations",
      loginRequired: true,
      exact: true,
      text: "Organizations",
      levels: [],
      subLinks: [],
      icon: <ApartmentOutlined />
    },
    {
      name: "Record",
      loginRequired: true,
      path: `/organizations/${organization.id}/records`,
      text: "Records",
      icon: (
        <Icon
          style={{ verticalAlign: 0 }}
          component={() => (
            <i className='fal fa-table' style={{ fontSize: "13px" }}></i>
          )}
        />
      ),
      dropdown: true,
      levels: [],
      subLinks: [
        {
          required: "readPrivilege",
          path: `/organizations/${organization.id}/records/deleted`,
          text: "Deleted",
          icon: <SwitcherOutlined />
        },
        {
          required: "readPrivilege",
          path: `/organizations/${organization.id}/archived/deleted`,
          text: "Archived",
          icon: <FlagOutlined />
        }
      ]
    },
    {
      path: `/organizations/${organization.id}/accounts`,
      name: "Account",
      text: "Accounts",
      icon: <TeamOutlined />,
      dropdown: true,
      levels: [],
      loginRequired: true,
      subLinks: [
        {
          required: "createPrivilege",
          path: `/organizations/${organization.id}/accounts/add`,
          text: "Add account",
          icon: <UserAddOutlined />
        }
      ]
    },
    {
      name: "Form",
      path: `/organizations/${organization.id}/resources`,
      dropdown: true,
      loginRequired: true,
      text: "Resources",
      icon: (
        <Icon
          style={{ verticalAlign: 0 }}
          component={() => (
            <i className='fal fa-layer-group' style={{ fontSize: "13px" }}></i>
          )}
        />
      ),
      levels: [],
      subLinks: [
        {
          required: "createPrivilege",
          path: `/organizations/${organization.id}/resources/new`,
          text: "New Resource",
          icon: (
            <Icon
              style={{ verticalAlign: 0 }}
              component={() => <i className='fal fa-layer-plus'></i>}
            />
          )
        }
      ]
    },
    {
      name: "Notification",
      path: "/notifications",
      text: "Notifications",
      everyone: true,
      levels: [],
      icon: (
        <IconWrapper
          className={"fal fa-bullhorn"}
          style={{ fontSize: "13px" }}
        />
      ),
      loginRequired: true
    },
    {
      name: "Role",
      path: `/organizations/${organization.id}/roles`,
      dropdown: true,
      text: "Roles",
      levels: [],
      loginRequired: true,
      icon: <TagsOutlined />,
      subLinks: [
        {
          required: "createPrivilege",
          path: `/organizations/${organization.id}/roles/new`,
          text: "New Role",
          icon: <PlusCircleOutlined />
        }
      ]
    },
    {
      name: "Settings",
      path: `/organizations/${organization.id}/settings`,
      dropdown: true,
      text: "Settings",
      levels: [],
      loginRequired: true,
      icon: (
        <Icon
          style={{ verticalAlign: 0 }}
          component={() => <i className='fal fa-cog'></i>}
        />
      ),
      subLinks: [
        {
          required: "createPrivilege",
          path: `/organizations/${organization.id}/settings/privileges`,
          text: "Privileges",
          icon: <PlusCircleOutlined />
        }
      ]
    },
    {
      name: "Logout",
      path: "/logout",
      icon: (
        <Icon
          style={{ verticalAlign: 0 }}
          component={() => <i className={"fal fa-sign-out"} />}
        />
      ),
      text: "Logout",
      levels: [],
      loginRequired: true,
      subLinks: []
    }
  ]

  const [links, setLinks] = useState(initialState)

  useEffect(() => {
    if (session.isLoggedIn)
      setLinks(
        initialState
          .filter(link => !(exclude || []).includes(link.name))
          .map(link => ({
            ...link,
            levels: pagePermissions[link.name]
              ? pagePermissions[
                  link.name
                ].permissionAttributes.assignmentsAttributes
                  .filter(a =>
                    currentUser.roleIds.some(rId => rId === a.roleId)
                  )
                  .map(a => {
                    const e = pagePermissions[
                      link.name
                    ].permissionAttributes.exclusionsAttributes.find(
                      e => a[e.exclusionType]
                    )
                    return e ? { ...a, [e.exclusionType]: false } : a
                  })
              : currentUser.roles.map(
                  role =>
                    role.defaultPermissionAttributes.permissionAttributes
                      .assignmentsAttributes[0]
                )
          }))
          .map(link => {
            if (link.dropdown) {
              const subLinks = link.subLinks.filter(subLink =>
                link.levels.some(l => l[subLink.required])
              )
              return subLinks.length === 0 && !currentUser.isRoot
                ? { ...link, dropdown: false }
                : { ...link, dropdown: true }
            }
            return link
          })
      )
    // eslint-disable-next-line
  }, [session, pagePermissions, roles, currentUser])

  if (!organization || !session.isLoggedIn)
    return { links: links.filter(link => !link.loginRequired) }

  return {
    links,
    dispatch,
    sidebar
  }
}

export default useLinks
