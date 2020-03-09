import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEmployees, fetchManagers } from "../../actions/accountActions";
import AdminsList from "../../components/Accounts/AdminsList";
import ManagersList from "../../components/Accounts/ManagersList";
import EmployeesList from "../../components/Accounts/EmployeesList";
import { Switch, Route } from "react-router-dom";
import AccountForm from "../../components/Accounts/AccountForm";

class AccountsContainer extends Component {
  componentDidMount() {
    const { admins, fetchEmployees, fetchManagers } = this.props;
    admins.map(admin => fetchEmployees(admin.id));
    admins.map(admin => fetchManagers(admin.id));
  }

  componentDidUpdate(prevProps) {
    const { admins, fetchEmployees, fetchManagers } = this.props;
    if (prevProps.admins !== admins) {
      admins.map(admin => fetchEmployees(admin.id));
      admins.map(admin => fetchManagers(admin.id));
    }
  }

  render() {
    const { accounts, admins, match } = this.props;
    const managers = accounts.filter(account => account.type === "manager");
    const employees = accounts.filter(account => account.type === "employee");
    return (
      <div className="row">
        <div className="col-lg-6">
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
        <div className="col-lg-6">
          <Switch>
            <Route
              path={`${match.path}/add`}
              render={props => <AccountForm {...props} />}
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

export default connect(mapStateToProps, { fetchEmployees, fetchManagers })(
  AccountsContainer
);
