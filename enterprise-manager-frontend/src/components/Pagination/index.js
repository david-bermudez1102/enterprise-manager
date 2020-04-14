import React, { useEffect } from "react";
import cuid from "cuid";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";

const limitOptions = [
  { value: 5, key: cuid() },
  { value: 10, key: cuid() },
  { value: 25, key: cuid() },
  { value: 50, key: cuid() },
  { value: 100, key: cuid() }
];

const Pagination = ({ resource, page }) => {
  const pagination = useSelector(state => state.pagination);
  const pagesCount = Math.ceil(resource.recordsCount / pagination.limit);
  const pages =
    pagesCount > 5 ? [1, 2, 3, 4, "...", pagesCount] : [1, 2, 3, 4, 5];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "SET_LIMIT",
      limit: pagination.limit,
      id: limitOptions.findIndex(x => x.value === pagination.limit) + 1
    });
  }, []);

  const handleChange = e => {
    e.persist();
    dispatch({
      type: "SET_LIMIT",
      limit: parseInt(e.target.value),
      id: parseInt(e.target.selectedIndex) + 1
    });
  };

  return (
    <div className="d-flex flex-nowrap">
      <select
        className="form-control form-control-sm w-auto"
        name="pageLimit"
        onChange={handleChange}
        value={pagination.limit}>
        {limitOptions.map(o => (
          <option {...o}>{o.value}</option>
        ))}
      </select>
      <nav aria-label="Page navigation example" className="float-right">
        <div className="pagination pagination-sm">
          <Link
            to={location => ({
              pathname: location.pathname,
              search: `?page=${page - 1}`
            })}
            className="page-item page-link"
            aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </Link>
          {pages.map(page => (
            <NavLink
              to={location => ({
                pathname: location.pathname,
                search: `?page=${page}`
              })}
              isActive={(match, location) =>
                location.search === `?page=${page}`
              }
              className="page-item page-link"
              activeClassName="bg-primary text-light"
              aria-current="page"
              key={cuid()}>
              {page}
            </NavLink>
          ))}
          <Link
            to={location => ({
              ...location,
              pathname: location.pathname,
              search: `?page=${page + 1}`
            })}
            className="page-item page-link"
            aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};
export default Pagination;
