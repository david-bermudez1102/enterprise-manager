import React from "react"
import { Card, Row, Col } from "antd"
import AccountForm from "../AccountForm"
import Title from "antd/lib/typography/Title"
import { useRouteMatch } from "react-router-dom"
import { useSelector, shallowEqual } from "react-redux"
import { EditOutlined, UserAddOutlined } from "@ant-design/icons"
import { updateAccount, addAccount } from "../../../actions/accountActions"

const AccountFormLayout = () => {
  const match = useRouteMatch()

  const { session, accounts } = useSelector(
    ({ session, accounts }) => ({ session, accounts }),
    shallowEqual
  )
  const account = accounts.find(
    acc => acc.id === parseInt(match.params.accountId)
  )

  console.log(account)

  return (
    <Row justify={"center"} gutter={[16, 16]}>
      <Col span={24} sm={24} md={14} lg={12} xl={10}>
        <Card
          bordered={false}
          title={
            <Title level={3}>
              {account ? (
                <>
                  <EditOutlined />
                  Edit Account
                </>
              ) : (
                <>
                  <UserAddOutlined />
                  Add Account
                </>
              )}
            </Title>
          }>
          <AccountForm
            account={account}
            updateAccount={account ? updateAccount : undefined}
            addAccount={account ? undefined : addAccount}
            rootId={session.currentUser.id}
          />
        </Card>
      </Col>
    </Row>
  )
}

export default AccountFormLayout
