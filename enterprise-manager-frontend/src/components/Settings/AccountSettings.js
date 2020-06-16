import React from "react"
import ProfileForm from "../Accounts/ProfileForm"
import { connect } from "react-redux"
import { updateRoot } from "../../actions/rootActions"
import { Card } from "antd"

const AccountSettings = props => {
  const { session, updateRoot } = props
  const { currentUser } = session
  return (
    <Card bordered={false}>
      <ProfileForm currentUser={currentUser} updateRoot={updateRoot} />
    </Card>
  )
}

const mapStateToProps = ({ session }) => ({ session })

export default connect(mapStateToProps, { updateRoot })(AccountSettings)
