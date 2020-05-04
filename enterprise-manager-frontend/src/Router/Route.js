import React from "react";
import { Route as ReactRoute } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Route(props) {
  const { routes } = useSelector(s => s);
  const dispatch = useDispatch();
  if (!routes.includes(props.path))
    dispatch({ type: "ADD_ROUTE", path: props.path });
  return <ReactRoute {...props} />;
}

export default Route;
