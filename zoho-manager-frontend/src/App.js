import React, { Component } from "react";
import LoginInput from "./components/LoginInput";
import { BrowserRouter as Router, Route } from "react-router-dom";
import OrganizationContainer from "./containers/OrganizationContainer";
import { connect } from "react-redux";
import { fetchOrganizations } from "./actions/OrganizationAction";
import AccountContainer from "./containers/AccountContainer";

class App extends Component {

  state = { organizations: [], accounts:[] };

  componentDidMount() {
    this.props.fetchOrganizations();
  }

  render() {
    const {organizations, accounts} = this.props

    return (
      <Router>
        <>
          <Route exact path="/" render={() => <div>Home</div>} />
          <Route path="/login" component={LoginInput} />
          <Route path="/accounts/new">
            <AccountContainer organizations={organizations} accounts={accounts}/>
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
    accounts: state.accounts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrganizations: () => dispatch(fetchOrganizations())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
