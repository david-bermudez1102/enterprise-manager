import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchOrganizations } from "./actions/organizationAction";
import { fetchAdmins } from "./actions/adminActions";
import {
  addSession,
  removeSession,
  fetchSession,
} from "./actions/sessionActions";
import Footer from "./components/Footer/Footer";
import HomeContainer from "./containers/Home/HomeContainer";

const App = props => {
  const { addSession, removeSession } = props;
  const { organizations, admins, session } = useSelector(s => s);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchOrganizations())
      .then(() => dispatch(fetchAdmins()))
      .then(() => dispatch(fetchSession()))
      .then(() => setLoaded(true));
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      {loaded ? (
        <div className="bg-light container-fluid d-flex p-0 flex-column min-h-100">
          {!session.isLoggedIn && organizations.length > 0 ? (
            <Navbar session={session} organizations={organizations} />
          ) : null}
          <Switch>
            <Route
              path="/"
              render={props => (
                <HomeContainer
                  organizations={organizations}
                  {...props}
                  admins={admins}
                  addSession={addSession}
                  removeSession={removeSession}
                />
              )}
            />
          </Switch>
          {organizations[0] && !session.isLoggedIn ? (
            <Footer organization={organizations[0]} session={session} />
          ) : null}
        </div>
      ) : null}
    </Router>
  );
};

export default connect(null, {
  addSession,
  removeSession,
})(App);
