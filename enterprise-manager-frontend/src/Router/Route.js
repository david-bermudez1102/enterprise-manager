import React from "react";
import { Route as ReactRoute } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useEffect } from "react";

function Route(props) {
  const { routes } = useSelector(({ routes }) => ({ routes }), shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!routes.includes(props.path))
      dispatch({ type: "ADD_ROUTE", path: props.path });
    // eslint-disable-next-line
  }, [props]);

  return <ReactRoute {...props} />;
}

export default React.memo(Route);
