import React from "react";
import LoginForm from "../components/LoginForm";
import Alert from "../components/Alerts/Alert";
import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import { addSession } from "../actions/sessionActions";
import { Card, Row, Col, Layout } from "antd";
import Title from "antd/lib/typography/Title";

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
    <Layout style={{ position: "absolute", width: "100%", height: "100%" }}>
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col xl={10} lg={12} md={12}>
          <Card
            title={<Title type={"primary"}>Login</Title>}
            bordered={false}
            style={{ width: "100%" }}>
            <LoginForm handleOnSubmit={handleOnSubmit} />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default LoginContainer;
