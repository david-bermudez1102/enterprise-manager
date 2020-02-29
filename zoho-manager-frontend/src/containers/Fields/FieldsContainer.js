import React, { Component } from "react";
import FieldForm from "../../components/Fields/FieldForm/FieldForm";
import { Link, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { addField, removeField } from "../../actions/fieldActions";
import FieldsList from "../../components/Fields/FieldsList";
import cuid from "cuid";
import FieldDelete from "../../components/Fields/FieldDelete";

class FieldsContainer extends Component {
  render() {
    const {
      match,
      addField,
      organizationId,
      resource,
      removeField
    } = this.props;

    return (
      <div className="col-sm-5">
        <FieldsList key={cuid()} match={match} resource={resource} />
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
            path={`${match.url}/fields/delete/:fieldId`}
            render={props => (
              <FieldDelete
                {...props}
                redirectTo={match.url}
                organizationId={organizationId}
                resourceId={resource.id}
                removeField={removeField}
              />
            )}
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
