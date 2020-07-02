import React from "react"
import RecordSubject from "./Record"
import ResourceSubject from "./Resource"
import ProfileSubject from "./Profile"

const ActiviySubject = props => {
  switch (props.subject) {
    case "Record":
      return <RecordSubject {...props} />
    case "Form":
      return <ResourceSubject {...props} />
    case "Profile":
      return <ProfileSubject {...props} />

    default:
      return null
  }
}

export default ActiviySubject
