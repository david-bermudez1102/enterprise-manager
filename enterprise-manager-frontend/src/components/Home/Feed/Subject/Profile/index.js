import React from "react"
import Activiy from "../CommentSubject/Activity"

const ProfileSubject = props => {
  const { author, payload, subSubject, ...restOfProps } = props
  return (
    <Activiy {...props} content={`${author} changed their ${subSubject}`} />
  )
}

export default ProfileSubject
