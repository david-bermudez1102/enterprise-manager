import React from "react"
import Activiy from "../CommentSubject/Activity"

const ProfileSubject = props => {
  const { author, subSubject } = props
  return (
    <Activiy {...props} content={`${author} changed their ${subSubject}`} />
  )
}

export default ProfileSubject
