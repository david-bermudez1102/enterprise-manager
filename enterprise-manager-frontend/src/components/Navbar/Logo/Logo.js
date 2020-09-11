import React from "react"
import "./styles.css"
import { NavLink } from "react-router-dom"
const Logo = ({ organization, width }) => {
  return (
    <NavLink to='/'>
      <img src={organization.logo.url} alt={organization.name} width={width} />
    </NavLink>
  )
}

export default Logo
