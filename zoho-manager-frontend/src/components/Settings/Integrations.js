import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import ZohoBooksForm from "../Integrations/ZohoBooksForm";
import { connect } from "react-redux";
import { updateOrganization } from "../../actions/organizationAction";
import { FormCard } from "../Cards/Cards";
import { NoContent } from "../NoContent";

class Integrations extends Component {
  render() {
    const { match, organization, session, updateOrganization } = this.props;
    const { zohoIntegration, quickbooksIntegration } = organization;
    const currentlyConnectedTo = [];
    if (zohoIntegration) currentlyConnectedTo.push("Zoho Books");
    if (quickbooksIntegration) currentlyConnectedTo.push("QuickBooks");
    return (
      <div>
        {!zohoIntegration && !quickbooksIntegration ? (
          <NoContent>
            This organization is not connected to any Accounting Software.
          </NoContent>
        ) : (
          <div className="alert alert-primary shadow-sm">
            <i className="fas fa-info-circle mr-2"></i>
            This organization is currently connected to{" "}
            {currentlyConnectedTo.join(" and ")}.
          </div>
        )}
        <div className="alert alert-light d-flex justify-content-around shadow-sm rounded">
          <Link to={`${match.url}/zoho_books/edit`}>
            <button className="btn btn-info shadow">
              <img
                src="https://books.zoho.com/favicon.ico"
                className="pr-1"
                style={{ width: "24px" }}
                alt="Connect with ZohoBooks"
              />
              Connect to Zoho Books
            </button>
          </Link>
          <Link to={`${match.url}/quickbooks/edit`}>
            <button className="btn btn-info shadow">
              <img
                src="https://quickbooks.intuit.com/etc/designs/harmony/images/favicon/quickbooks/apple-touch-icon-60x60.png"
                style={{ width: "24px" }}
                className="pr-1"
                alt="Connect with QuickBooks"
              />
              Connect to QuickBooks
            </button>
          </Link>
        </div>
        <div>
          <Switch>
            <Route
              path={`${match.url}/zoho_books/connect`}
              component={() => {
                window.location.href = `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoBooks.fullaccess.all&client_id=${zohoIntegration.client_id}&response_type=code&redirect_uri=${zohoIntegration.redirect_uri}&access_type=offline&prompt=consent`;
                return null;
              }}
            />
            <Route
              path={`${match.url}/zoho_books/edit`}
              render={props => (
                <FormCard
                  header={
                    <>
                      <span
                        className="display-4 card-title mb-0"
                        style={{ fontSize: "32px" }}>
                        Connect to Zoho
                      </span>
                      <Link
                        to={`${match.url}/zoho_books/connect`}
                        title="Refresh Zoho Token">
                        <i class="fas fa-sync"></i>
                      </Link>
                    </>
                  }>
                  <ZohoBooksForm
                    organization={organization}
                    updateOrganization={updateOrganization}
                    session={session}
                  />
                </FormCard>
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
