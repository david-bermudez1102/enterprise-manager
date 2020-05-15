import React, { useEffect } from "react";
import { Form, Input, Divider, Button } from "antd";
import { useLocation } from "react-router-dom";

const ZohoBooksForm = props => {
  const organization = props.organization || {};
  const { zohoIntegration } = organization;
  const location = useLocation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      authToken: zohoIntegration ? zohoIntegration.authToken : "",
      clientId: zohoIntegration ? zohoIntegration.clientId : "",
      clientSecret: zohoIntegration ? zohoIntegration.clientSecret : "",
      redirectUri: zohoIntegration ? zohoIntegration.redirectUri : "",
      externalOrganizationId: zohoIntegration
        ? zohoIntegration.externalOrganizationId
        : "",
    });
  }, [location]);

  const onFinish = data => {
    const { updateOrganization, organization, session } = props;
    updateOrganization(
      {
        zohoIntegrationAttributes: {
          ...data,
          accountId: session.currentUser.id,
          organizationId: organization.id,
        },
      },
      organization.id
    );
  };
  return (
    <Form
      form={form}
      name="zohoBooksForm"
      onFinish={onFinish}
      layout={"vertical"}>
      <Form.Item name="clientId" label="Client Id">
        <Input.Password id="client_id" placeholder="Enter Zoho Client Id" />
        <small id="encrypted_block">This field is encrypted.</small>
      </Form.Item>
      <Form.Item name="clientSecret" label="Client Secret">
        <Input.Password
          id="client_secret"
          placeholder="Enter Zoho Client Secret"
        />
        <small id="encrypted_block">This field is encrypted.</small>
      </Form.Item>
      <Form.Item name="authToken" label="Zoho Auth Token">
        <Input.Password id="auth_token" placeholder="Enter Zoho Auth Token" />
        <small id="encrypted_block">This field is encrypted.</small>
      </Form.Item>
      <Form.Item name="redirectUri" label="Redirect URI">
        <Input id="redirect_uri" placeholder="Enter Zoho Redirect URI" />
      </Form.Item>
      <Form.Item name="externalOganizationId" label="Organization Id">
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
