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
      {loaded ? <Route path="/" component={HomeContainer} /> : null}
    </Router>
  );
};

export default App;
