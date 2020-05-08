import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { fetchOrganizations } from "./actions/organizationAction";
import { fetchSession } from "./actions/sessionActions";
import Footer from "./components/Footer/Footer";
import HomeContainer from "./containers/Home/HomeContainer";
import { fetchAdmins } from "./actions/adminActions";
import Route from "./Router/Route";
import "./App.css";

const App = () => {
  const { organizations, session } = useSelector(
    ({ organizations, session }) => ({
      organizations,
      session,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchOrganizations()).then(() => {
      dispatch(fetchAdmins()).then(() =>
        dispatch(fetchSession()).then(() => setLoaded(true))
      );
    });
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
            <Route path="/" component={HomeContainer} />
          </Switch>
          {organizations[0] && !session.isLoggedIn ? (
            <Footer organization={organizations[0]} session={session} />
          ) : null}
        </div>
      ) : null}
    </Router>
  );
};

export default App;
