import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import ZohoBooksForm from "../Integrations/ZohoBooksForm";
import { connect } from "react-redux";
import { updateOrganization } from "../../actions/organizationAction";
import { addInvoice } from "../../actions/zohoBooksActions";

class Integrations extends Component {
  render() {
    const {
      match,
      organization,
      session,
      updateOrganization,
      addInvoice
    } = this.props;
    fetch("/api/v1/organizations/1/zoho_books/items")
      .then(resp => resp.json())
      .then(console.log);
    return (
      <div>
        Account is not connected to any Accounting Software.
        <Link to={`${match.url}/zoho_books/edit`}>
          <button>
            <img
              src="https://books.zoho.com/favicon.ico"
              style={{ width: "24px" }}
              alt="Connect with ZohoBooks"
            />
            Connect with Zoho Books
          </button>
        </Link>
        <button>
          <img
            src="https://quickbooks.intuit.com/etc/designs/harmony/images/favicon/quickbooks/apple-touch-icon-60x60.png"
            style={{ width: "24px" }}
            alt="Connect with QuickBooks"
          />
          Connect with QuickBooks
        </button>
        <div>
          <Switch>
            organization ?{" "}
            <Route
              path={`${match.url}/zoho_books/connect`}
              component={() => {
                const { zohoIntegration } = organization;
                window.open(
                  `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoBooks.fullaccess.all&client_id=${zohoIntegration.client_id}&response_type=code&redirect_uri=http://localhost:3000/auth/zohobooks/callback&access_type=offline`,
                  "_blank"
                );
                window.location.href = `${match.url}/zoho_books/edit`;
                return null;
              }}
            />{" "}
            : null
            <Route
              path={`${match.url}/zoho_books/edit`}
              render={props => (
                <>
                  <ZohoBooksForm
                    organization={organization}
                    updateOrganization={updateOrganization}
                    session={session}
                  />
                  <Link to={`${match.url}/zoho_books/connect`}>
                    Get Token from Zoho
                  </Link>
                </>
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ session }) => {
  return { session };
};
export default connect(mapStateToProps, { updateOrganization, addInvoice })(
  Integrations
);
