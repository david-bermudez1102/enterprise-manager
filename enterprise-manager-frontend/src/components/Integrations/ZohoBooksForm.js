import React, { useEffect } from "react";
import { Form, Input, Divider, Button } from "antd";
import { useLocation } from "react-router-dom";

const ZohoBooksForm = props => {
  const organization = props.organization || {};
  const { zohoIntegrationAttributes } = organization || {};
  const location = useLocation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(zohoIntegrationAttributes);
    // eslint-disable-next-line
  }, [location]);

  const onFinish = data => {
    const { updateOrganization, organization, session } = props;
    updateOrganization({
      zohoIntegrationAttributes: {
        ...data,
        accountId: session.currentUser.id,
        organizationId: organization.id,
      },
      id: organization.id,
    });
  };
  return (
    <Form
      form={form}
      name="zohoBooksForm"
      onFinish={onFinish}
      layout={"vertical"}>
      <Form.Item
        name="clientId"
        label="Client Id"
        extra={"This field is encrypted."}>
        <Input
          type="password"
          id="client_id"
          placeholder="Enter Zoho Client Id"
        />
      </Form.Item>
      <Form.Item
        name="clientSecret"
        label="Client Secret"
        extra={"This field is encrypted."}>
        <Input
          type="password"
          id="client_secret"
          placeholder="Enter Zoho Client Secret"
        />
      </Form.Item>
      <Form.Item
        name="authToken"
        label="Zoho Auth Token"
        extra={"This field is encrypted."}>
        <Input
          type="password"
          id="auth_token"
          placeholder="Enter Zoho Auth Token"
        />
      </Form.Item>
      <Form.Item name="redirectUri" label="Redirect URI">
        <Input id="redirect_uri" placeholder="Enter Zoho Redirect URI" />
      </Form.Item>
      <Form.Item name="externalOrganizationId" label="Organization Id">
        <Input
          id="external_organization_id"
          placeholder="Enter Zoho Organization Id"
        />
      </Form.Item>
      <Divider />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ZohoBooksForm;
