import React, { Component } from "react";
import FieldsContainer from "../../containers/Fields/FieldsContainer";
import RecordsContainer from "../../containers/Records/RecordsContainer";
import cuid from "cuid";
import { connect } from "react-redux";

class Resource extends Component {
  
  render() {

    const { match, resources, fields} = this.props;
    const resource = resources.find(
      resource => resource.formAlias === match.params.formAlias
    );
    return resources.length > 0 ? (
      <>
        <FieldsContainer
          key={cuid()}
          match={match}
          organizationId={resource.organizationId}
          resource={resource}
          fields={fields}
        />
        <RecordsContainer key={cuid()} match={match} resource={resource} />
      </>
    ) : null;
  }
}

const mapStateToProps = ({ fields }) => {
  return {
    fields
  };
};

export default connect(mapStateToProps)(
  Resource
);
