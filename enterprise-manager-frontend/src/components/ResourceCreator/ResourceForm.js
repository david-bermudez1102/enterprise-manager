import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import useLoader from "../Loader/useLoader";
import { Form, Input, Button } from "antd";

const ResourceForm = ({
  addResource,
  updateResource,
  url,
  resource,
  initialValues,
}) => {
  const history = useHistory();
  const { dispatchWithLoader, loading } = useLoader();
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual);
  const { organizationId } = session.currentUser;
  const initialState = {
    name: resource ? resource.name : "",
    organizationId,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (resource) setState({ ...state, name: resource.name, id: resource.id });
    else setState(initialState);
    // eslint-disable-next-line
  }, [resource]);

  const onFinish = data => {
    if (addResource)
      dispatchWithLoader(
        addResource({ ...data, organizationId })
      ).then(resource =>
        resource ? history.push(`${resource.formAlias}`) : null
      );
    else if (updateResource)
      dispatchWithLoader(
        updateResource({ ...data, organizationId })
      ).then(resource =>
        resource ? history.replace(`${url}/${resource.formAlias}/edit`) : null
      );
  };

  return (
    <Form
      name="new_resource"
      onFinish={onFinish}
      initialValues={initialValues}
      layout={"vertical"}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please enter a valid resource name!",
          },
        ]}>
        <Input
          size="large"
          prefix={<i className="fas fa-layer-group"></i>}
          placeholder="Enter resource name..."
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Create Resource
        </Button>
      </Form.Item>
    </Form>
  );
};

export default React.memo(ResourceForm);
