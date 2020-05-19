import React from "react";
import { Route as ReactRoute } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useEffect } from "react";

function Route(props) {
  const { routes } = useSelector(({ routes }) => ({ routes }), shallowEqual);
  const { name, title, ...newProps } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!routes.some(route => route.path === props.path))
      dispatch({ type: "ADD_ROUTE", path: props.path, name, title });
    else if (
      routes.some(route => route.path === props.path && route.name !== name) &&
      name
    )
      dispatch({ type: "UPDATE_ROUTE", path: props.path, name, title });
    // eslint-disable-next-line
  }, [props.path]);

  return <ReactRoute {...newProps} />;
}

export default React.memo(Route);
