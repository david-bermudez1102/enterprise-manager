import React from "react";
import { NavLink, Link, matchPath } from "react-router-dom";
import cuid from "cuid";
import ToggleContent from "../ToggleContent";
import { DeletionModal } from "../Modal/Modals";

const pluralize = require("pluralize");

const ResourcesList = ({ match, resources, location, history }) => {
  return resources.map(resource => {
    const isActive = !!matchPath(
      location.pathname,
      `/organizations/:organizationId/resources/${resource.formAlias}`
    );
    return (
      <div
        className={`row border-0 shadow-sm rounded list-group-item list-group-item-action py-md-3 py-sm-2 mb-1 d-flex align-items-center justify-content-between display-4 ${
          isActive ? "active text-white" : ""
        }`}
        key={cuid()}
        style={{
          cursor: "pointer",
          fontSize: "20px",
          zIndex: "inherit"
        }}
        onClick={e => {
          history.push(
            `/organizations/${resource.organizationId}/resources/${resource.formAlias}`
          );
        }}>
        <span className="order-sm-2 order-md-1 py-3 col-sm-12 col-xl-7 col-lg-8 col-md-8">
          <NavLink
            to={`${match.url}/${resource.formAlias}`}
            className="nav-link"
            activeClassName="active text-white">
            <span>
              <i className="fas fa-stream mr-1"></i>
              {pluralize(resource.name)}
            </span>
          </NavLink>
        </span>
        <span className="order-sm-1 order-md-2 py-3 col-sm-12 col-xl-5 col-lg-4 col-md-4 d-flex justify-content-between align-items-center">
          <Link
            to={`${match.url}/${resource.formAlias}/records`}
            style={{ color: "inherit" }}
            onClick={e => e.stopPropagation()}>
            <button className="btn btn-lg p-0 m-0">
              <span
                className="badge badge-secondary shadow-sm"
                style={{ minWidth: "60px" }}
                title={`${resource.recordsCount} ${pluralize(resource.name)}`}>
                <i className="fas fa-list-ul"></i> {resource.recordsCount}
              </span>
            </button>
          </Link>
          <Link
            to="settings"
            style={{ color: "inherit" }}
            onClick={e => e.stopPropagation()}>
            <i className="fas fa-cog"></i>
          </Link>
          <ToggleContent
            toggle={show => (
              <button
                className="btn btn-transparent"
                style={{ color: "inherit" }}
                onClick={show}>
                <i className="fas fa-trash"></i>
              </button>
            )}
            content={hide => (
              <DeletionModal
                title={`Delete resource ${pluralize(resource.name)}`}
                handleClose={hide}
                deletionMessage="All of the associated content will be deleted!">
                <Link to={`${match.url}/${resource.id}/delete`}>
                  <button type="button" className="btn btn-danger">
                    Delete resource
                  </button>
                </Link>
              </DeletionModal>
            )}
          />
        </span>
      </div>
    );
  });
};

export default ResourcesList;
