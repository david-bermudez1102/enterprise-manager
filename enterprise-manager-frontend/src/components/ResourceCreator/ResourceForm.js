import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";

const ResourceForm = ({ addResource, updateResource, url, resource }) => {
  const location = useLocation();
  const history = useHistory();
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual);
  const dispatch = useDispatch();
  const { organizationId } = session.currentUser;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ name: resource ? resource.name : "" });
    // eslint-disable-next-line
  }, [location]);

  const onFinish = data => {
    if (addResource)
      dispatch(addResource({ ...data, organizationId })).then(resource =>
        resource ? history.push(`${resource.formAlias}`) : null
      );
    else if (updateResource)
      dispatch(
        updateResource({ ...data, id: resource.id, organizationId })
      ).then(resource =>
        resource ? history.replace(`${url}/${resource.formAlias}/edit`) : null
      );
  };

  return (
    <Form
      form={form}
      name={"resource_form"}
      onFinish={onFinish}
      layout={"horizontal"}>
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
        <Button
          size={"large"}
          type="primary"
          htmlType="submit"
          className="login-form-button">
          {addResource ? "Create Resource" : "Update Resource"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default React.memo(ResourceForm);
