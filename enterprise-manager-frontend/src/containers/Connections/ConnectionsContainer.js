import React, { Component } from "react";
import ConnectionsForm from "../../components/Connections/ConnectionsForm";
import { Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateResource } from "../../actions/resourceActions";
import ConnectionsList from "../../components/Connections/ConnectionsList";
import { FormCard } from "../../components/Cards/Cards";
import { NoContent } from "../../components/NoContent";
import Alert from "../../components/Alerts/Alert";
import Route from "../../Router/Route";

class ConnectionsContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { match, resources, organizations, updateResource } = this.props;
    const resource = resources.find(
      resource => resource.formAlias === match.params.formAlias
    );
    const organization = organizations.find(
      organization => organization.id === resource.organizationId
    );
    const { zohoIntegration, quickbooksIntegration } = organization;
    return (
      <>
        <Alert />
        <Switch>
          <Route
            path={`${match.url}/zoho/edit`}
            render={() => (
              <div className="col-lg-7">
                <FormCard
                  header={
                    <span
                      className={"display-4 card-title mb-0"}
                      style={{ fontSize: "32px" }}>
                      Connect to ZohoBooks
                    </span>
                  }>
                  {zohoIntegration ? (
                    <ConnectionsForm
                      resourceId={resource.id}
                      resource={resource}
                      connection={resource.zohoConnection}
                      type="zoho_connection_attributes"
                      integrationId={
                        zohoIntegration ? zohoIntegration.id : null
                      }
                      organizationId={organization.id}
                      updateResource={updateResource}
                    />
                  ) : (
                    <NoContent>
                      This organization is not currently integrated with Zoho.
                      Click{" "}
                      <Link
                        to={`/organizations/${organization.id}/settings/integrations/zoho_books/edit`}>
                        here
                      </Link>{" "}
                      to integrate it.
                    </NoContent>
                  )}
                </FormCard>
              </div>
            )}
          />
          <Route
            path={`${match.url}/quickbooks/edit`}
            render={() => (
              <ConnectionsForm
                resourceId={resource.id}
                resource={resource}
                connection={resource.quickbooksConnection}
                type="quickbooks_connection_attributes"
                integrationId={
                  quickbooksIntegration ? quickbooksIntegration.id : null
                }
                organizationId={organization.id}
                updateResource={updateResource}
              />
            )}
          />
          <Route
            path={`${match.url}`}
            render={props => <ConnectionsList {...props} resource={resource} />}
          />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = ({ organizations }) => {
  return { organizations };
};
export default connect(mapStateToProps, { updateResource })(
  ConnectionsContainer
);
