import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEmployees, fetchManagers } from "../../actions/accountActions";

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
    const { accounts, admins } = this.props;
    return <div className="list-group">{admins.map(admin => admin.name)}</div>;
  }
}

const mapStateToProps = ({ accounts, admins }) => {
  return { accounts, admins };
};

export default connect(mapStateToProps, { fetchEmployees, fetchManagers })(
  AccountsContainer
);
