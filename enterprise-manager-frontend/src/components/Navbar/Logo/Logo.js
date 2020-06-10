import React from "react"
import "./styles.css"
import { NavLink } from "react-router-dom"
const Logo = ({ organization, width, height }) => {
  return (
    <NavLink to='/'>
      <img
        src={`http://localhost:3001/${organization.logo.url}`}
        alt={organization.name}
        width={width}
      />
    </NavLink>
  )
}

export default Logo
