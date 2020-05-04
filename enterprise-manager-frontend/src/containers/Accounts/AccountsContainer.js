import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchEmployees,
  fetchManagers,
  addManager,
  addEmployee,
  updateAccount,
  removeAccount,
} from "../../actions/accountActions";
import AdminsList from "../../components/Accounts/AdminsList";
import ManagersList from "../../components/Accounts/ManagersList";
import EmployeesList from "../../components/Accounts/EmployeesList";
import { Switch } from "react-router-dom";
import AccountForm from "../../components/Accounts/AccountForm";
import { FormCard } from "../../components/Cards/Cards";
import { addAdmin } from "../../actions/adminActions";
import Alert from "../../components/Alerts/Alert";
import AccountDelete from "../../components/Accounts/AccountDelete";
import AccountDisable from "../../components/Accounts/AccountDisable.js";
import AccountUnlock from "../../components/Accounts/AccountUnlock";
import Route from "../../Router/Route";

class AccountsContainer extends Component {
  componentDidMount() {
    const { admins, fetchEmployees, fetchManagers } = this.props;

    admins.map(admin => {
      fetchEmployees(admin.id);
      return fetchManagers(admin.id);
    });
  }

  componentDidUpdate(prevProps) {
    const { admins, fetchEmployees, fetchManagers } = this.props;
    if (prevProps.admins !== admins) {
      admins.map(admin => {
        fetchEmployees(admin.id);
        return fetchManagers(admin.id);
      });
    }
  }

  render() {
    const {
      accounts,
      admins,
      match,
      addEmployee,
      addManager,
      addAdmin,
      updateAccount,
      removeAccount,
      session,
    } = this.props;
    const managers = accounts.filter(account => account.type === "Manager");
    const employees = accounts.filter(account => account.type === "Employee");
    if (!session.isLoggedIn) return null;
    return (
      <div className="row">
        <div className="col-lg-5 pr-0">
          <div className="list-group">
            <AdminsList admins={admins} />
            <ManagersList managers={managers} />
            <EmployeesList employees={employees} />
          </div>
        </div>
        <div className="col-lg-7 px-0">
          <Alert />
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
              render={props => {
                const account = accounts.find(
                  acc => acc.id === parseInt(props.match.params.accountId)
                );
                return account ? (
                  <FormCard
                    header={
                      <span className="card-title display-4">
                        <h2>Edit Account</h2>
                      </span>
                    }>
                    <AccountForm
                      {...props}
                      account={account}
                      updateAccount={updateAccount}
                      adminId={session.currentUser.id}
                    />
                  </FormCard>
                ) : null;
              }}
            />
            <Route
              path={`${match.path}/:accountId/disable`}
              render={props => {
                const account = accounts.find(
                  acc => acc.id === parseInt(props.match.params.accountId)
                );
                return account ? (
                  <AccountDisable url={match.path} account={account} />
                ) : null;
              }}
            />
            <Route
              path={`${match.path}/:accountId/unlock`}
              render={props => {
                const account = accounts.find(
                  acc => acc.id === parseInt(props.match.params.accountId)
                );
                return account ? (
                  <AccountUnlock url={match.path} account={account} />
                ) : null;
              }}
            />
            <Route
              path={`${match.path}/add`}
              render={props => (
                <FormCard
                  header={
                    <span className="card-title text-white mb-0 display-4">
                      <h2 className="mb-0">
                        <i className="fad fa-plus-circle mr-2"></i>Add Account
                      </h2>
                    </span>
                  }>
                  <AccountForm
                    {...props}
                    addEmployee={addEmployee}
                    addManager={addManager}
                    addAdmin={addAdmin}
                    adminId={session.currentUser.id}
                  />
                </FormCard>
              )}
            />
            <Route
              path={`${match.path}`}
              render={props => (
                <div className="w-100 h-100 bg-white rounded shadow-sm d-flex justify-content-center align-items-center alert-light">
                  Coming Soon
                </div>
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ accounts, admins }) => {
  return { accounts, admins };
};

export default connect(mapStateToProps, {
  fetchEmployees,
  fetchManagers,
  addManager,
  addEmployee,
  addAdmin,
  updateAccount,
  removeAccount,
})(AccountsContainer);
