import React, { Component } from "react";
import FieldForm from "../../components/Fields/FieldForm";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { addField, fetchFields } from "../../actions/fieldActions";
import FieldsList from "../../components/Fields/FieldsList";

class FieldsContainer extends Component {
  state = { fields: [] };

  componentDidMount() {
    const { organizationId, resource } = this.props;
    this.props.fetchFields(organizationId, resource.id);
  }

  render() {
    const { match, addField, organizationId, resource, fields } = this.props;
    return (
      <>
        <FieldsList fields={fields} resource={resource}/>
        <Link to={`${match.url}/fields/new`}>Add new field</Link>
        <Switch>
          <Route
            path={`${match.path}/fields/new`}
            render={props => (
              <FieldForm
                addField={addField}
                organizationId={organizationId}
                resourceId={resource.id}
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
