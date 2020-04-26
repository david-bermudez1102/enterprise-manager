import React, { useState, useCallback, useEffect } from "react";
import Field from "./Field";
import { useSelector, useDispatch } from "react-redux";
import { addRecord } from "../../../actions/recordActions";
import { Link } from "react-router-dom";
import { CardHeader, CardBody } from "../../Cards/Cards";
import { NoContent } from "../../NoContent";
import zohoBooksIcon from "../../../containers/ZohoBooks/favicon.ico";

const pluralize = require("pluralize");

const FieldsList = props => {
  const { match, resource, fields } = props;
  const dispatch = useDispatch();
  const [state, setState] = useState([]);
  const recordFields = useSelector(s =>
    s.recordFields.filter(recordField => recordField.formId === resource.id)
  );

  useEffect(() => {
    setState([]);
  }, [resource]);

  const handleChange = newState => {
    setState([
      ...state.filter(v => v.recordFieldId !== newState.recordFieldId),
      newState
    ]);
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(
        addRecord(
          { valuesAttributes: state },
          resource.organizationId,
          resource.id
        )
      );
    },
    // eslint-disable-next-line
    [state]
  );

  return (
    <>
      <CardHeader>
        <span
          className="card-title display-4 mb-0 text-light"
          style={{ fontSize: "32px" }}>
          <i className="fas fa-folder-plus mr-2"></i>
          Add {pluralize.singular(resource.name)}
        </span>
        <span className="card-title text-light">
          <Link to={`${match.url}/fields/new`} title="Add new field">
            <i className="fad fa-plus-circle" style={{ fontSize: "24px" }}></i>
          </Link>{" "}
          <Link to={`${match.url}/records`} title={`View all ${resource.name}`}>
            <i className="fad fa-th-list" style={{ fontSize: "24px" }}></i>
          </Link>
          <Link
            to={`${match.url}/connections/zoho/edit`}
            title="Connect to Zoho Books">
            <button className="btn btn-transparent p-0 mt-n1 d-block-inline">
              <img
                src={zohoBooksIcon}
                className="mt-n2"
                style={{ width: "24px" }}
                alt="Connect with ZohoBooks"
              />
            </button>
          </Link>
        </span>
      </CardHeader>
      <CardBody className="scroller">
        {fields.length > 0 ? (
          <form onSubmit={handleSubmit} className="position-relative">
            {fields
              .filter(f => f)
              .map(field => {
                const recordField = recordFields.find(
                  f => f.fieldId === field.id
                );
                return recordField ? (
                  <Field
                    key={field.key}
                    field={field}
                    recordField={recordField}
                    match={match}
                    handleChange={handleChange}
                  />
                ) : null;
              })}
            <hr />
            <input
              className="btn btn-primary shadow"
              type="submit"
              value={`Create ${pluralize.singular(resource.name)}`}
            />
          </form>
        ) : (
          <NoContent>This form doesn't have any fields yet</NoContent>
        )}
      </CardBody>
    </>
  );
};

export default FieldsList;
