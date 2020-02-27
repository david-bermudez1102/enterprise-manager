import React, { Component } from "react";
import FieldForm from "../../components/Fields/FieldForm";
import { Link, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { addField, fetchFields } from "../../actions/fieldActions";
import FieldsList from "../../components/Fields/FieldsList";
import cuid from "cuid";

class FieldsContainer extends Component {

  componentDidMount() {
    const { organizationId, resource } = this.props;
    this.props.fetchFields(organizationId, resource.id);
  }

  componentWillUnmount(){
    this.props.clearFields()
  }

  render() {
    const { match, addField, organizationId, resource } = this.props;
    const fields = this.props.fields.filter(field => field.formId === resource.id)
    return (
      <div className="col-sm-5">
        <FieldsList key={cuid()} match={match} fields={fields} resource={resource} />
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
      </div>
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
      dispatch(fetchFields(organizationId, resourceId)),
      clearFields: () => dispatch({type:"CLEAR_FIELDS"})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldsContainer);
