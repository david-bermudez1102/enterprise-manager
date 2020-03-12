import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import ZohoBooksForm from "../Integrations/ZohoBooksForm";
import { connect } from "react-redux";
import { updateOrganization } from "../../actions/organizationAction";
import { addInvoice } from "../../actions/zohoBooksActions";

class Integrations extends Component {
  render() {
    const { match, organization, session, updateOrganization } = this.props;
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
            <Route
              path={`${match.url}/zoho_books/edit`}
              render={props => (
                <ZohoBooksForm
                  organization={organization}
                  updateOrganization={updateOrganization}
                  session={session}
                />
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
