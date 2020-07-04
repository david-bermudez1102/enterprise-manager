import React, { useEffect } from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { removeAccount, fetchAccounts } from "../../actions/accountActions"
import { Switch, useRouteMatch, useLocation } from "react-router-dom"
import AccountDelete from "../../components/Accounts/AccountDelete"
import AccountDisable from "../../components/Accounts/AccountDisable.js"
import AccountUnlock from "../../components/Accounts/AccountUnlock"
import Route from "../../Router/Route"
import { Row, Col, Card } from "antd"
import AccountsList from "../../components/Accounts/AccountsList"
import AccountFormLayout from "../../components/Accounts/FormLayout/AccountFormLayout"
import PageTabs from "../../components/PageTabs"
import { EyeOutlined, PlusCircleOutlined } from "@ant-design/icons"

const AccountsContainer = props => {
  const { accounts, session } = useSelector(
    ({ accounts, session }) => ({ accounts, session }),
    shallowEqual
  )
  const dispatch = useDispatch()
  const location = useLocation()

  const match = useRouteMatch()

  const tabs = [
    {
      tab: (
        <span>
          <EyeOutlined />
          View All Accounts
        </span>
      ),
      path: match.url
    },
    {
      tab: (
        <span>
          <PlusCircleOutlined />
          Add Account
        </span>
      ),
      path: `${match.url}/add`
    }
  ]

  useEffect(() => {
    dispatch(fetchAccounts(session.currentUser.organizationId))
  }, [dispatch, location, session])

  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <Row gutter={[16, 16]} justify={"center"}>
        <Col span={23}>
          <PageTabs tabs={tabs} />
        </Col>
        <Col span={24}>
          <Switch>
            {accounts.length > 0 ? (
              <Route
                path={`${match.path}/:accountId/delete`}
                render={props => (
                  <AccountDelete
                    {...props}
                    removeAccount={removeAccount}
                    accounts={accounts}
                  />
                )}
              />
            ) : null}
            <Route
              path={`${match.path}/:accountId/edit`}
              name={"Edit Account"}
              component={AccountFormLayout}
            />
            <Route
              path={`${match.path}/:accountId/disable`}
              render={props => {
                const account = accounts.find(
                  acc => acc.id === parseInt(props.match.params.accountId)
                )
                return account ? (
                  <AccountDisable url={match.path} account={account} />
                ) : null
              }}
            />
            <Route
              path={`${match.path}/:accountId/unlock`}
              render={props => {
                const account = accounts.find(
                  acc => acc.id === parseInt(props.match.params.accountId)
                )
                return account ? (
                  <AccountUnlock url={match.path} account={account} />
                ) : null
              }}
            />
            <Route
              path={`${match.path}/add`}
              name={"Add Account"}
              component={AccountFormLayout}
            />
            <Route path={match.path}>
              <Card bordered={false}>
                <AccountsList accounts={accounts} />
              </Card>
            </Route>
          </Switch>
        </Col>
      </Row>
    </Card>
  )
}

export default AccountsContainer
