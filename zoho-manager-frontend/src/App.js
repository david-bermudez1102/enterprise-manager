import React, { Component } from "react";
import OrganizationContainer from "./containers/OrganizationContainer";
import AdminContainer from "./containers/AdminContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrganizations } from "./actions/organizationAction";
import { fetchAdmins } from "./actions/adminActions";
import LoginContainer from "./containers/LoginContainer";

class App extends Component {
  state = {
    organizations: [],
    admins: [],
    isLoggedIn: false,
    currentAccount: {}
  };

  componentDidMount() {
    this.props.fetchOrganizations();
    this.props.fetchAdmins();
    this.loginStatus();
  }

  loginStatus = () => {
    fetch("/current_user", { credentials: "include" })
      .then(response => response.json())
      .then(data => this.setAccount(data.attributes));
  };

  setAccount = account =>
    this.setState({ ...this.state, isLoggedIn: true, currentAccount: account });

  render() {
    const { organizations, admins } = this.props;

    return (
      <Router>
        <>
          <Route exact path="/" render={() => <div>Home</div>} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/accounts/new">
            <AdminContainer organizations={organizations} admins={admins} />
          </Route>
          <Route path="/organizations/new">
            <OrganizationContainer organizations={organizations} />
          </Route>
        </>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    organizations: state.organizations,
    admins: state.admins
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrganizations: () => dispatch(fetchOrganizations()),
    fetchAdmins: () => dispatch(fetchAdmins())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
