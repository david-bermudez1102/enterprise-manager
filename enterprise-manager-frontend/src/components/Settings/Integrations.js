import React from "react";
import { Switch, Link } from "react-router-dom";
import ZohoBooksForm from "../Integrations/ZohoBooksForm";
import { connect } from "react-redux";
import { updateOrganization } from "../../actions/organizationAction";
import zohoBooksIcon from "../../containers/ZohoBooks/favicon.ico";
import Route from "../../Router/Route";
import { Empty, Button, Card } from "antd";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";

const Integrations = props => {
  const { match, organization, session, updateOrganization } = props;
  const {
    zohoIntegrationAttributes,
    quickbooksIntegrationAttributes,
  } = organization;
  const currentlyConnectedTo = [];
  if (zohoIntegrationAttributes) currentlyConnectedTo.push("Zoho Books");
  if (quickbooksIntegrationAttributes) currentlyConnectedTo.push("QuickBooks");
  return (
    <div>
      {!zohoIntegrationAttributes && !quickbooksIntegrationAttributes ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            "This organization is not connected to any Accounting Software."
          }
        />
      ) : (
        <Text>
          <i className="fas fa-info-circle mr-2"></i>
          This organization is currently connected to{" "}
          {currentlyConnectedTo.join(" and ")}.
        </Text>
      )}
      <div>
        <Link to={`${match.url}/zoho_books/edit`}>
          <Button
            icon={
              <img
                src={zohoBooksIcon}
                style={{
                  width: "15px",
                  marginRight: "0.5em",
                  marginTop: "-0.1em",
                }}
                alt="Connect with ZohoBooks"
              />
            }>
            Connect to Zoho Books
          </Button>
        </Link>
        <Link to={`${match.url}/quickbooks/edit`}>
          <Button
            icon={
              <img
                src="https://quickbooks.intuit.com/etc/designs/harmony/images/favicon/quickbooks/apple-touch-icon-60x60.png"
                style={{
                  width: "15px",
                  marginRight: "0.5em",
                  marginTop: "-0.1em",
                }}
                alt="Connect with QuickBooks"
              />
            }>
            Connect to QuickBooks
          </Button>
        </Link>
      </div>
      <div>
        <Switch>
          <Route
            path={`${match.url}/zoho_books/connect`}
            component={() => {
              window.location.href = `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoBooks.fullaccess.all&client_id=${zohoIntegrationAttributes.clientId}&response_type=code&redirect_uri=${zohoIntegrationAttributes.redirectUri}&access_type=offline&prompt=consent`;
              return null;
            }}
          />
          <Route
            path={`${match.url}/zoho_books/edit`}
            render={props => (
              <Card
                title={
                  <Title>
                    Connect to Zoho
                    <Link
                      to={`${match.url}/zoho_books/connect`}
                      title="Refresh Zoho Token">
                      <i className="fas fa-sync"></i>
                    </Link>
                  </Title>
                }>
                <ZohoBooksForm
                  organization={organization}
                  updateOrganization={updateOrganization}
                  session={session}
                />
              </Card>
            )}
          />
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = ({ session }) => ({ session });

export default connect(mapStateToProps, { updateOrganization })(Integrations);
