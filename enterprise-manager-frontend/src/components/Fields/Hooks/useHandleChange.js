import { useState, useEffect, useRef } from "react";

export const useHandleChange = props => {
  const { field, onChange, initialState } = props;
  const mounted = useRef();
  const [state, setState] = useState(field || initialState || {});

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectable = newState => {
    setState({ ...state, ...newState });
  };

  const handleCombinedField = newState => {
    setState({ ...state, ...newState });
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      onChange(state);
    }
    // eslint-disable-next-line
  }, [state]);

  return [handleChange, handleSelectable, handleCombinedField];
};
