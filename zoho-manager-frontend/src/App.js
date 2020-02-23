import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginInput from "./components/LoginInput";
import CreateAccountInput from "./components/CreateAccountInput";
import { BrowserRouter as Router, Route } from "react-router-dom";
import OrganizationContainer from "./containers/OrganizationContainer";

function App() {
  return (
    <Router>
      <>
        <Route exact path="/" render={() => <div>Home</div>} />
        <Route path="/login" component={LoginInput} />
        <Route path="/accounts/new">
          <CreateAccountInput />
        </Route>
        <Route path="/organizations/new">
          <OrganizationContainer />
        </Route>
      </>
    </Router>
  );
}

export default App;
