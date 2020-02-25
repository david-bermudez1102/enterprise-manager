import React, { Component } from "react";
import FieldForm from "../../components/Fields/FieldForm";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { addField, fetchFields } from "../../actions/fieldActions";
import FieldsList from "../../components/Fields/FieldsList";

class FieldsContainer extends Component {
  state = { fields: [] };

  componentDidMount() {
    const { organizationId, resourceId } = this.props;
    this.props.fetchFields(organizationId, resourceId);
  }

  render() {
    const { match, addField, organizationId, resourceId, fields } = this.props;
    return (
      <>
        <FieldsList fields={fields} />
        <Link to={`${match.url}/fields/new`}>Add new field</Link>
        <Switch>
          <Route
            path={`${match.path}/fields/new`}
            render={props => (
              <FieldForm
                addField={addField}
                organizationId={organizationId}
                resourceId={resourceId}
              />
            )}
          />
        </Switch>
      </>
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
    addField: field => dispatch(addField(field)),
    fetchFields: (organizationId, resourceId) =>
      dispatch(fetchFields(organizationId, resourceId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldsContainer);
