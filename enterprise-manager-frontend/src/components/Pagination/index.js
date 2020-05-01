import React, { useState, useEffect } from "react";
import cuid from "cuid";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useHistory, useLocation } from "react-router-dom";

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
    pagesCount > 5
      ? page < 4
        ? [1, 2, 3, 4, "...", pagesCount]
        : page < pagesCount - 2
        ? [
            1,
            "...",
            ...Array.from({ length: 3 }, (v, i) => page + i),
            "...",
            pagesCount
          ]
        : [
            1,
            "...",
            ...Array.from({ length: 3 }, (v, i) => pagesCount - i).reverse()
          ]
      : [...Array.from({ length: pagesCount }, (v, i) => i + 1)];

  const dispatch = useDispatch();
  const [goToField, setGoToField] = useState({ field: null, isOpen: false });

  const history = useHistory();
  const location = useLocation();

  const handleLimitChange = e => {
    e.persist();
    dispatch({
      type: "SET_LIMIT",
      limit: parseInt(e.target.value)
    });
  };

  const handleGoToClick = name => {
    setGoToField({ field: name, isOpen: true });
  };

  const handleGoToBlur = (name, e) => {
    e.persist();
    setGoToField({ field: name, isOpen: false });
    if (
      e.target.value !== page &&
      e.target.value > 1 &&
      e.target.value < pagesCount
    )
      history.push(`${location.pathname}?page=${e.target.value}`);
  };

  const handleKeyUp = e => {
    if (e.key === "ArrowLeft")
      history.push(
        `${location.pathname}?page=${page > 1 ? page - 1 : pagesCount}`
      );
    else if (e.key === "ArrowRight")
      history.push(
        `${location.pathname}?page=${page < pagesCount ? page + 1 : 1}`
      );
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <div className="d-flex flex-nowrap justify-content-end align-items-center py-2">
      <div className="form-group mb-0 mr-2">
        <select
          className="form-control form-control-sm w-auto"
          name="pageLimit"
          onChange={handleLimitChange}
          value={pagination.limit}>
          {limitOptions.map(o => (
            <option {...o}>{o.value}</option>
          ))}
        </select>
        <label className="form-control-placeholder" htmlFor="pageLimit">
          Rows
        </label>
      </div>
      <nav
        aria-label="Page navigation example"
        className="form-group float-right mb-0">
        <div className="pagination pagination-sm">
          <Link
            to={location => ({
              pathname: location.pathname,
              search: `?page=${page > 1 ? page - 1 : pagesCount}`
            })}
            className="page-item page-link"
            aria-label="Previous">
            <i className="fas fa-angle-double-left"></i>
          </Link>
          {pages.map((page, i) =>
            page !== "..." ? (
              <NavLink
                to={location => ({
                  pathname: location.pathname,
                  search: `?page=${page}`
                })}
                isActive={(match, location) =>
                  location.search === `?page=${page}` ||
                  (location.search === `` && i === 0)
                }
                className="page-item page-link"
                activeClassName="bg-primary text-light"
                aria-current="page"
                key={cuid()}>
                {page}
              </NavLink>
            ) : (
              <span
                className="page-item page-link p-0 text-center"
                style={{ width: "40px", cursor: "pointer" }}
                key={cuid()}
                name={`goTo${i}`}
                onClick={() => handleGoToClick(`goTo${i}`)}>
                {goToField.field === `goTo${i}` && goToField.isOpen ? (
                  <input
                    type="text"
                    className="text-center form-control form-control-sm w-100 border-0 p-0 m-0 h-100 my-auto"
                    onBlur={e => handleGoToBlur(`goTo${i}`, e)}
                    onKeyUp={e =>
                      e.keyCode === 13 ? handleGoToBlur(`goTo${i}`, e) : null
                    }
                    placeholder="Go to"
                    autoFocus
                  />
                ) : (
                  page
                )}
              </span>
            )
          )}
          <Link
            to={location => ({
              ...location,
              pathname: location.pathname,
              search: `?page=${page < pagesCount ? page + 1 : 1}`
            })}
            className="page-item page-link"
            aria-label="Next">
            <i className="fas fa-angle-double-right"></i>
          </Link>
        </div>
      </nav>
    </div>
  );
};
export default React.memo(Pagination);
