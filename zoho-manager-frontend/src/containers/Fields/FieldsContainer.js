import React, { Component } from "react";
import FieldForm from "../../components/Fields/FieldForm/FieldForm";
import { Link, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { addField, removeField } from "../../actions/fieldActions";
import FieldsList from "../../components/Fields/FieldsList";
import cuid from "cuid";

class FieldsContainer extends Component {
  render() {
    const {
      match,
      addField,
      organizationId,
      resource,
      removeField
    } = this.props;
    
    const fields = this.props.fields.filter(
      field => field.formId === resource.id
    );
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

const mapStateToProps = ({ fields }) => {
  return {
    fields
  };
};

export default connect(mapStateToProps, { addField, removeField })(
  FieldsContainer
);
