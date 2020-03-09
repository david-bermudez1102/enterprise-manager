import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchEmployees,
  fetchManagers,
  addManager,
  addEmployee
} from "../../actions/accountActions";
import AdminsList from "../../components/Accounts/AdminsList";
import ManagersList from "../../components/Accounts/ManagersList";
import EmployeesList from "../../components/Accounts/EmployeesList";
import { Switch, Route } from "react-router-dom";
import AccountForm from "../../components/Accounts/AccountForm";
import { FormCard } from "../../components/Cards/Cards";
import { addAdmin } from "../../actions/adminActions";

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
      session
    } = this.props;
    const managers = accounts.filter(account => account.type === "Manager");
    const employees = accounts.filter(account => account.type === "Employee");
    return (
      <div className="row">
        <div className="col-lg-5">
          <div className="list-group">
            <AdminsList admins={admins} />
          </div>
          <div className="list-group">
            <ManagersList managers={managers} />
          </div>
          <div className="list-group">
            <EmployeesList employees={employees} />
          </div>
        </div>
        <div className="col-lg-7">
          <Switch>
            <Route
              path={`${match.path}/add`}
              render={props => (
                <FormCard
                  header={
                    <span
                      className="card-title display-4"
                      style={{ fontSize: "32px" }}>
                      Add Account
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
  addAdmin
})(AccountsContainer);
