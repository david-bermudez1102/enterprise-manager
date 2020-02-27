import React, { Component } from "react";
import FieldForm from "../../components/Fields/FieldForm";
import { Link, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { addField, fetchFields, removeField } from "../../actions/fieldActions";
import FieldsList from "../../components/Fields/FieldsList";
import cuid from "cuid";

class FieldsContainer extends Component {

  componentDidMount() {
    const { organizationId, resource } = this.props;
    this.props.fetchFields(organizationId, resource.id);
  }

  render() {
    const { match, addField, organizationId, resource, removeField } = this.props;
    const fields = this.props.fields.filter(field => field.formId === resource.id)
    return (
      <div className="col-sm-5">
        <FieldsList
          key={cuid()}
          match={match}
          fields={fields}
          resource={resource}
        />
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
          <Route
            path={`${match.url}/fields/:fieldId`}
            render={props =>
              props.match.params.fieldId !== "new"
                ? removeField(
                    organizationId,
                    resource.id,
                    props.match.params.fieldId
                  )
                : null
            }
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


export default connect(mapStateToProps, {addField, fetchFields, removeField})(FieldsContainer);
