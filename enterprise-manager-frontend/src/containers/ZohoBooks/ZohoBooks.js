import React, { Component } from "react"
import { updateOrganization } from "../../actions/organizationAction"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

class ZohoBooks extends Component {
  constructor(props) {
    super(props)
    const { location } = props
    const query = new URLSearchParams(location.search)
    this.state = {
      code: query.get("code"),
      status: "loading"
    }
  }

  componentDidMount() {
    const { code } = this.state
    const { organization, updateOrganization } = this.props
    fetch(`/api/v1/organizations/${organization.id}/zoho_books/zoho_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ zoho_books: { code } })
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        return resp
      })
      .then(resp =>
        updateOrganization({
          id: organization.id,
          zoho_integration_attributes: {
            auth_token: resp.access_token,
            refresh_token: resp.refresh_token
          }
        })
      )
      .then(() => alert("Token was generated successfully"))
      .then(() => this.setState({ status: "done" }))
  }

  render() {
    const { redirectTo } = this.props

    return this.state.status === "done" ? <Redirect to={redirectTo} /> : null
  }
}

export default connect(null, { updateOrganization })(ZohoBooks)
