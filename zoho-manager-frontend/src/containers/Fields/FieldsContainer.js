import React, { Component } from "react";
import FieldForm from "../../components/Fields/FieldForm";
import { connect } from "react-redux";
import { addField } from "../../actions/fieldActions";

class FieldsContainer extends Component {
  state = { fields: [] };

  render() {
    const { addField, organizationId, resourceId } = this.props;
    return (
      <FieldForm
        addField={addField}
        organizationId={organizationId}
        resourceId={resourceId}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    fields: state.fields
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addField: field => dispatch(addField(field))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldsContainer);
