import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import ZohoBooksForm from "../Integrations/ZohoBooksForm";
import { connect } from "react-redux";
import { updateOrganization } from "../../actions/organizationAction";
import { addInvoice } from "../../actions/zohoBooksActions";
import ZohoBooks from "../../containers/ZohoBooks/ZohoBooks";

class Integrations extends Component {
  render() {
    const { match, organization, session, updateOrganization } = this.props;
    return (
      <div>
        <div>Account is not connected to any Accounting Software.</div>
        <Link to={`${match.url}/zoho_books/edit`}>
          <button className="btn btn-info">
            <img
              src="https://books.zoho.com/favicon.ico"
              style={{ width: "24px" }}
              alt="Connect with ZohoBooks"
            />
            Connect with Zoho Books
          </button>
        </Link>
        <button className="btn btn-info">
          <img
            src="https://quickbooks.intuit.com/etc/designs/harmony/images/favicon/quickbooks/apple-touch-icon-60x60.png"
            style={{ width: "24px" }}
            alt="Connect with QuickBooks"
          />
          Connect with QuickBooks
        </button>
        <div>
          <Switch>
            <Route
              path={`${match.url}/zoho_books/connect`}
              component={() => {
                const { zohoIntegration } = organization;
                window.location.href = `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoBooks.fullaccess.all&client_id=${zohoIntegration.client_id}&response_type=code&redirect_uri=http://localhost:3000/auth/zohobooks/callback&access_type=online`;
                return null;
              }}
            />
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
