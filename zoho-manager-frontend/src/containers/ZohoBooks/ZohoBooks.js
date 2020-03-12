import React, { Component } from "react";

class ZohoBooks extends Component {
  constructor(props) {
    super(props);
    const { organization, location } = props;
    const { zohoIntegration } = organization;
    this.formRef = React.createRef();
    const query = new URLSearchParams(location.search);
    this.state = {
      code: query.get("code"),
      client_id: zohoIntegration.client_id || "",
      client_secret: zohoIntegration.client_secret || "",
      redirect_uri: zohoIntegration.redirect_uri || "",
      grant_type: "authorization_code"
    };
  }

  componentDidMount() {
    this.formRef.current.submit();
  }

  render() {
    const {
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type
    } = this.state;

    return (
      <form
        action="https://accounts.zoho.com/oauth/v2/token?"
        method="post"
        ref={this.formRef}>
        <input type="hidden" name="code" maxLength="1000" value={code} />
        <input type="hidden" name="client_id" value={client_id} />
        <input type="hidden" name="client_secret" value={client_secret} />
        <input type="hidden" name="redirect_uri" value={redirect_uri} />
        <input type="hidden" name="grant_type" value={grant_type} />
        <input type="submit" />
      </form>
    );
  }
}

export default ZohoBooks;
