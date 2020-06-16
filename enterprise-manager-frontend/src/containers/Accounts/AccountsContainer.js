import React, { useEffect } from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import {
  updateAccount,
  removeAccount,
  addAccount,
  fetchAccounts
} from "../../actions/accountActions"
import { Switch, useRouteMatch, useLocation } from "react-router-dom"
import AccountForm from "../../components/Accounts/AccountForm"
import AccountDelete from "../../components/Accounts/AccountDelete"
import AccountDisable from "../../components/Accounts/AccountDisable.js"
import AccountUnlock from "../../components/Accounts/AccountUnlock"
import Route from "../../Router/Route"
import AccountsFeed from "../../components/Accounts"
import { Row, Col, Card } from "antd"
import Title from "antd/lib/typography/Title"
import { UserAddOutlined } from "@ant-design/icons"
import AccountsList from "../../components/Accounts/AccountsList"

const AccountsContainer = props => {
  const { accounts, roots, session } = useSelector(
    ({ accounts, roots, session }) => ({ accounts, roots, session }),
    shallowEqual
  )
  const dispatch = useDispatch()
  const location = useLocation()

  const match = useRouteMatch()

  useEffect(() => {
    dispatch(fetchAccounts(session.currentUser.organizationId))
  }, [location])

  return (
    <Row gutter={16}>
      <Col lg={10}>
        <AccountsList accounts={accounts} />
      </Col>
      <Col lg={14}>
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
            render={props => {
              const account = accounts.find(
                acc => acc.id === parseInt(props.match.params.accountId)
              )
              return account ? (
                <Card
                  title={
                    <Title level={3}>
                      <UserAddOutlined />
                      Add Account
                    </Title>
                  }>
                  <AccountForm
                    {...props}
                    account={account}
                    updateAccount={updateAccount}
                    rootId={session.currentUser.id}
                  />
                </Card>
              ) : null
            }}
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
            render={props => (
              <Card
                title={
                  <Title level={3}>
                    <UserAddOutlined />
                    Add Account
                  </Title>
                }>
                <AccountForm
                  {...props}
                  addAccount={addAccount}
                  rootId={session.currentUser.id}
                />
              </Card>
            )}
          />
          <Route path={`${match.path}`} component={AccountsFeed} />
        </Switch>
      </Col>
    </Row>
  )
}

export default AccountsContainer
