import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { removeSession } from "../actions/sessionActions";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const LogoutContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual);

  useEffect(() => {
    if (session.isLoggedIn)
      dispatch(removeSession()).then(data => history.push("/"));
    // eslint-disable-next-line
  }, []);

  return null;
};

export default LogoutContainer;
