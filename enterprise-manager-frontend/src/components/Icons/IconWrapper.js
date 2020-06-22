import React from "react"
import Icon from "@ant-design/icons"

const IconWrapper = ({ className, style }) => {
  return (
    <Icon
      style={{ verticalAlign: 0, ...style }}
      component={() => <i className={className}></i>}
    />
  )
}

export default IconWrapper
