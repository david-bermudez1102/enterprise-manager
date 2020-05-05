import React from "react";
import LoginForm from "../components/LoginForm";
import { FormCard } from "../components/Cards/Cards";
import Alert from "../components/Alerts/Alert";
import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import { addSession } from "../actions/sessionActions";

const LoginContainer = () => {
  const { session, organizations, admins } = useSelector(
    ({ session, organizations, admins }) => ({
      session,
      organizations,
      admins,
    }),
    shallowEqual
  );
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session.isLoggedIn) history.push("/");
    else if (organizations.length === 0) history.push("/organizations/new");
    else if (admins.length === 0) history.push("/accounts/new");
  }, [session, admins, organizations, history]);

  const handleOnSubmit = data => {
    dispatch(addSession(data)).then(acc =>
      acc.token ? history.push(`reset_password?token=${acc.token}`) : null
    );
  };

  return (
    <div className="row d-flex h-100 align-items-center justify-content-center">
      <div className="col-xl-5 col-lg-6 col-md-6 px-0">
        <FormCard header={<h2>Login</h2>}>
          <Alert />
          <LoginForm handleOnSubmit={handleOnSubmit} />
        </FormCard>
      </div>
    </div>
  );
};

export default LoginContainer;
