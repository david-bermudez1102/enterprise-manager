import React, { Component } from "react";
import cuid from "cuid";
import { Form, Input, Select, Button } from "antd";

class AccountForm extends Component {
  constructor(props) {
    super(props);
    const account = props.account;
    this.initialValues = {
      id: account ? account.id : "",
      name: account ? account.name : "",
      email: account ? account.email : "",
      role: account ? account.type : "Select",
    };
  }

  roles = ["Select", "Admin", "Manager", "Employee"];

  handleSubmit = data => {
    const {
      addAdmin,
      addEmployee,
      addManager,
      updateAccount,
      adminId,
    } = this.props;
    const { role, id, name, email } = data;
    if (updateAccount) updateAccount({ id, name, email });
    else {
      switch (role) {
        case "Admin":
          addAdmin({ admin: { name, email } });
          break;
        case "Manager":
          addManager(adminId, { manager: { name, email } });
          break;
        case "Employee":
          addEmployee(adminId, { employee: { name, email } });
          break;
        default:
          break;
      }
      this.setState({ name: "", email: "", role: "Select" });
    }
  };

  render() {
    return (
      <Form
        name="account_form"
        onFinish={this.handleSubmit}
        layout="vertical"
        initialValues={this.initialValues}>
        <Form.Item
          name="name"
          label={"Employee Name"}
          rules={[
            {
              required: true,
              message: "Please enter a valid name!",
            },
          ]}>
          <Input id="account_name" placeholder="Enter name..." />
        </Form.Item>
        <Form.Item
          name="email"
          label={"Employee Email"}
          rules={[
            {
              required: true,
              message: "Please enter a valid Email!",
            },
          ]}>
          <Input id="account_email" placeholder="Enter email..." />
        </Form.Item>
        <Form.Item
          name="role"
          label={"Employee Role"}
          rules={[
            {
              required: true,
              message: "Please enter a valid role!",
            },
          ]}>
          <Select id="account_role" placeholder={"Select"}>
            {this.roles.map(role => (
              <Select.Option value={role} key={cuid()}>
                {role}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default AccountForm;
