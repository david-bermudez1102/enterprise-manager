import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import ZohoBooksForm from "../Integrations/ZohoBooksForm";
import { connect } from "react-redux";
import { updateOrganization } from "../../actions/organizationAction";

class Integrations extends Component {
  render() {
    const { match, organization, session, updateOrganization } = this.props;
    return (
      <div>
        Account is not connected to any Accounting Software.
        <button>
          <img
            src="https://books.zoho.com/favicon.ico"
            style={{ width: "24px" }}
          />
          Connect with Zoho Books
        </button>
        <button>
          <img
            src="https://quickbooks.intuit.com/etc/designs/harmony/images/favicon/quickbooks/apple-touch-icon-60x60.png"
            style={{ width: "24px" }}
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
export default connect(mapStateToProps, { updateOrganization })(Integrations);
