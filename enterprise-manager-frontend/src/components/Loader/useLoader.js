// Wraps the function in a dispatch

import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";

const useLoader = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const asyncDispatch = async action => {
    return dispatch(action);
  };

  const dispatchWithLoader = useCallback(action => {
    setLoading(true);
    return asyncDispatch(action).then(response => {
      setLoading(false);
      return response;
    });
  }, []);

  return { loading, dispatchWithLoader, dispatch };
};

export default useLoader;
