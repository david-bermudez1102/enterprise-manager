import React from "react"
import capitalize from "capitalize"
import Activiy from "../CommentSubject/Activity"

const RecordSubject = props => {
  const { author, payload } = props
  let content

  switch (props.action) {
    case "createSubject":
      content = `${author.name} added a new ${capitalize(payload.name)}`
      break
    case "updateSubject":
      content = `${author.name} updated a ${capitalize(payload.name)}`
      break
    case "deleteSubject":
      content = `${author.name} deleted a new ${capitalize(
        payload.resourceName
      )}`
      break

    default:
      break
  }
  return <Activiy {...props} content={content} />
}

export default RecordSubject
