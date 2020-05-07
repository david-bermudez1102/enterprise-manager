import React, { useEffect } from "react";
import {
  NavLink,
  Link,
  matchPath,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";
import ToggleContent from "../ToggleContent";
import { DeletionModal } from "../Modal/Modals";
import { NoContent } from "../NoContent";
import { useSelector, shallowEqual } from "react-redux";
import Loader from "../Loader";
import pluralize from "pluralize";

const ResourcesList = ({ loaded, loading }) => {
  const location = useLocation();
  const match = useRouteMatch();
  const history = useHistory();

  const { resources } = useSelector(
    ({ resources }) => ({ resources }),
    shallowEqual
  );

  useEffect(() => {
    if (
      resources.length === 0 &&
      location.pathname !== `${match.url}/new` &&
      loaded
    ) {
      history.push(`${match.url}/new`);
    }
    // eslint-disable-next-line
  }, [resources, location, loaded]);

  if (resources.length === 0)
    return (
      <NoContent>
        <i className="fas fa-exclamation-circle mr-2"></i>
        There are no resources created yet!
      </NoContent>
    );
  return (
    <div className="position-relative list-group h-100 scroller">
      <Loader loading={loading} />
      {resources.map(resource => {
        const isActive = !!matchPath(
          location.pathname,
          `/organizations/:organizationId/resources/${resource.formAlias}`
        );
        return (
          <div
            className={`row mx-0 border-0 shadow-sm rounded list-group-item list-group-item-action py-md-3 py-sm-2 mb-1 d-flex align-items-center justify-content-between display-4 ${
              isActive ? "active text-white" : ""
            }`}
            key={`resourceList_${resource.id}`}
            style={{
              cursor: "pointer",
              fontSize: "24px",
              zIndex: "inherit",
            }}
            onClick={e => {
              e.stopPropagation();
              history.push(
                `/organizations/${resource.organizationId}/resources/${resource.formAlias}`
              );
            }}>
            <span className="order-sm-2 order-md-1 py-3 col-xl-7 col-lg-6 col-md-8">
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
            <span className="order-sm-1 order-md-2 pl-0 py-3 col-xl-5 col-lg-6 col-md-4 d-flex justify-content-between align-items-center">
              <Link
                to={`${match.url}/${resource.formAlias}/records`}
                style={{ color: "inherit" }}
                className="d-flex p-0 m-0 text-decoration-none"
                onClick={e => e.stopPropagation()}>
                <button className="btn btn-lg p-0 m-0">
                  <span
                    className="badge badge-secondary shadow-sm text-truncate d-block my-auto"
                    style={{ minWidth: "60px", maxWidth: "60px" }}
                    title={`${resource.recordsCount || 0} ${pluralize(
                      resource.name
                    )}`}>
                    <i className="fas fa-list-ul"></i>{" "}
                    {resource.recordsCount || 0}
                  </span>
                </button>
              </Link>
              <Link
                to={`${match.url}/${resource.formAlias}/edit`}
                style={{ color: "inherit" }}
                onClick={e => e.stopPropagation()}>
                <button
                  className="btn btn-transparent"
                  style={{ color: "inherit" }}>
                  <i className="fas fa-cog"></i>
                </button>
              </Link>
              <ToggleContent
                toggle={show => (
                  <button
                    className="btn btn-transparent"
                    style={{ color: "inherit" }}
                    onClick={show}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                )}
                content={hide => (
                  <DeletionModal
                    title={`Delete resource ${pluralize(resource.name)}`}
                    handleClose={hide}
                    deletionMessage="All of the associated content will be deleted!">
                    <Link to={`${match.url}/${resource.id}/delete`}>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={e => e.stopPropagation()}>
                        Delete resource
                      </button>
                    </Link>
                  </DeletionModal>
                )}
              />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(ResourcesList);
