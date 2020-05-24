import React, { Component } from "react"
import { connect } from "react-redux"
import {
  fetchEmployees,
  fetchManagers,
  addManager,
  addEmployee,
  updateAccount,
  removeAccount
} from "../../actions/accountActions"
import { Switch } from "react-router-dom"
import AccountForm from "../../components/Accounts/AccountForm"
import { addAdmin } from "../../actions/adminActions"
import AccountDelete from "../../components/Accounts/AccountDelete"
import AccountDisable from "../../components/Accounts/AccountDisable.js"
import AccountUnlock from "../../components/Accounts/AccountUnlock"
import Route from "../../Router/Route"
import AccountsFeed from "../../components/Accounts"
import { Row, Col, Card } from "antd"
import Title from "antd/lib/typography/Title"
import { UserAddOutlined } from "@ant-design/icons"
import AccountsList from "../../components/Accounts/AccountsList"

class AccountsContainer extends Component {
  componentDidMount() {
    const { admins, fetchEmployees, fetchManagers } = this.props

    admins.map(admin => {
      fetchEmployees(admin.id)
      return fetchManagers(admin.id)
    })
  }

  componentDidUpdate(prevProps) {
    const { admins, fetchEmployees, fetchManagers } = this.props
    if (prevProps.admins !== admins) {
      admins.map(admin => {
        fetchEmployees(admin.id)
        return fetchManagers(admin.id)
      })
    }
  }

  render() {
    const {
      accounts,
      match,
      addEmployee,
      addManager,
      addAdmin,
      updateAccount,
      removeAccount,
      session
    } = this.props

    if (!session.isLoggedIn) return null
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
                      adminId={session.currentUser.id}
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
                    addEmployee={addEmployee}
                    addManager={addManager}
                    addAdmin={addAdmin}
                    adminId={session.currentUser.id}
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
}

const mapStateToProps = ({ accounts, admins, session }) => {
  return { accounts, admins, session }
}

export default connect(mapStateToProps, {
  fetchEmployees,
  fetchManagers,
  addManager,
  addEmployee,
  addAdmin,
  updateAccount,
  removeAccount
})(AccountsContainer)
