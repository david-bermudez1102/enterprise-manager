import { useState, useEffect, useRef, useCallback } from "react";

export const useHandleChange = props => {
  const { field, initialState } = props;
  const mounted = useRef();
  const [state, setState] = useState(field || initialState || {});

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };
  const handleNumericField = newState => {
    setState({ ...state, ...newState });
  };

  const handleSelectable = newState => {
    setState({ ...state, ...newState });
  };

  const handleCombinedField = newState => {
    setState({ ...state, ...newState });
  };

  const handleKeyFieldChange = e => {
    setState({
      ...state,
      recordKeyAttributes: { [e.target.name]: e.target.value }
    });
  };

  const onChange = useCallback(
    newState => props.onChange(newState), // eslint-disable-next-line
    []
  );

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      onChange(state);
    }
    return () => {
      onChange({});
    };
    // eslint-disable-next-line
  }, [onChange, state]);

  return {
    handleChange,
    handleNumericField,
    handleSelectable,
    handleCombinedField,
    handleKeyFieldChange,
    state
  };
};
