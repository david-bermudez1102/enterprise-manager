import React, { Component } from "react"
import ConnectionsForm from "../../components/Connections/ConnectionsForm"
import { Switch, Link } from "react-router-dom"
import { connect } from "react-redux"
import { updateResource } from "../../actions/resourceActions"
import ConnectionsList from "../../components/Connections/ConnectionsList"
import { NoContent } from "../../components/NoContent"
import Route from "../../Router/Route"
import { Col, Card, Row } from "antd"

class ConnectionsContainer extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { match, resources, organizations, updateResource } = this.props
    const resource = resources.find(
      resource => resource.formAlias === match.params.formAlias
    )
    const organization = organizations.find(
      organization => organization.id === resource.organizationId
    )
    const {
      zohoIntegrationAttributes,
      quickbooksIntegrationAttributes
    } = organization

    return (
      <Col span={24} style={{ position: "relative" }}>
        <Card bordered={false}>
          <Row justify={"center"}>
            <Switch>
              <Route
                name={"Connect to Zoho"}
                path={`${match.url}/zoho/edit`}
                render={() => (
                  <Col xxl={14} xl={15} lg={18} md={20} sm={24} xs={24}>
                    <Card
                      bordered={false}
                      title={
                        <span
                          className={"display-4 card-title mb-0"}
                          style={{ fontSize: "32px" }}>
                          Connect to ZohoBooks
                        </span>
                      }>
                      {zohoIntegrationAttributes ? (
                        <ConnectionsForm
                          resource={resource}
                          type='zohoConnectionAttributes'
                          integrationId={
                            zohoIntegrationAttributes
                              ? zohoIntegrationAttributes.id
                              : null
                          }
                          organizationId={organization.id}
                          updateResource={updateResource}
                        />
                      ) : (
                        <NoContent>
                          This organization is not currently integrated with
                          Zoho. Click{" "}
                          <Link
                            to={`/organizations/${organization.id}/settings/integrations/zoho_books/edit`}>
                            here
                          </Link>{" "}
                          to integrate it.
                        </NoContent>
                      )}
                    </Card>
                  </Col>
                )}
              />
              <Route
                path={`${match.url}/quickbooks/edit`}
                render={() => (
                  <ConnectionsForm
                    resourceId={resource.id}
                    resource={resource}
                    connection={resource.quickbooksConnectionAtrributes}
                    type='quickbooksConnectionAttributes'
                    integrationId={
                      quickbooksIntegrationAttributes
                        ? quickbooksIntegrationAttributes.id
                        : null
                    }
                    organizationId={organization.id}
                    updateResource={updateResource}
                  />
                )}
              />
              <Route
                path={`${match.url}`}
                render={props => (
                  <ConnectionsList {...props} resource={resource} />
                )}
              />
            </Switch>
          </Row>
        </Card>
      </Col>
    )
  }
}

const mapStateToProps = ({ organizations }) => {
  return { organizations }
}
export default connect(mapStateToProps, { updateResource })(
  ConnectionsContainer
)
