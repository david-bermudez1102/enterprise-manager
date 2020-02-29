import React, { Component } from "react";
import FieldsContainer from "../../containers/Fields/FieldsContainer";
import RecordsContainer from "../../containers/Records/RecordsContainer";
import cuid from "cuid";
import { connect } from "react-redux";
import { fetchFields } from "../../actions/fieldActions";
import { fetchRecordFields } from "../../actions/recordFieldActions";

class Resource extends Component {
  componentDidMount() {
    const { resources } = this.props;
    resources.map(resource => {
      this.props.fetchFields(resource.organizationId, resource.id);
      return this.props.fetchRecordFields(resource.organizationId, resource.id);
    });
  }

  componentDidUpdate(prevProps) {
    const { resources } = this.props;
    if (prevProps.resources !== this.props.resources)
      resources.map(resource => {
        this.props.fetchFields(resource.organizationId, resource.id);
        return this.props.fetchRecordFields(
          resource.organizationId,
          resource.id
        );
      });
  }
  render() {

    const { match, resources, fields} = this.props;
    const resource = resources.find(
      resource => resource.id === parseInt(match.params.resourceId)
    );
    return resources.length > 0 ? (
      <div>
        <h3>{resource.name}</h3>
        <FieldsContainer
          key={cuid()}
          match={match}
          organizationId={resource.organizationId}
          resource={resource}
          fields={fields}
        />
        <RecordsContainer key={cuid()} match={match} resource={resource} />
      </div>
    ) : null;
  }
}

const mapStateToProps = ({ fields }) => {
  return {
    fields
  };
};

export default connect(mapStateToProps, { fetchFields, fetchRecordFields })(
  Resource
);
