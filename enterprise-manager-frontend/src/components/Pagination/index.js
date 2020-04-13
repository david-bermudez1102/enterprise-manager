import React from "react";
import cuid from "cuid";

const Pagination = ({ resource }) => {
  const pagesCount = Math.ceil(resource.recordsCount / 25);
  const pages =
    pagesCount > 5 ? [1, 2, 3, 4, "...", pagesCount] : [1, 2, 3, 4, 5];
  return (
    <nav aria-label="Page navigation example" className="float-right">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        {pages.map(page => (
          <li className="page-item" key={cuid()}>
            <a className="page-link" href="#">
              {page}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Pagination;
