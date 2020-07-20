import React from "react"
import capitalize from "capitalize"
import Activiy from "../CommentSubject/Activity"

const ResourceSubject = props => {
  const { author, payload } = props
  let content

  switch (props.action) {
    case "createSubject":
      content = `${author.name} created a resource named "${capitalize(
        payload.name
      )}"`
      break
    case "updateSubject":
      content = `${author.name} updated resource "${capitalize(payload.name)}"`
      break
    case "deleteSubject":
      content = `${author.name} deleted resource ${capitalize(payload.name)}`
      break

    default:
      break
  }
  return <Activiy {...props} content={content} />
}

export default ResourceSubject
