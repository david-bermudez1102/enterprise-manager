import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { fetchSession } from "../../../actions/sessionActions";
import { useEffect, useRef } from "react";

const useSession = () => {
  const routes = ["/", "/login", "/reset_password"];
  const { session, organizations } = useSelector(
    ({ session, organizations }) => ({ session, organizations }),
    shallowEqual
  );
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch, location]);

  useEffect(() => {
    if (location.state)
      if (location.state.loginFailed)
        dispatch({
          type: "ADD_ERRORS",
          errors: ["You need to login to view the page requested."],
        });
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    if (
      !session.isLoggedIn &&
      organizations.length > 0 &&
      !routes.includes(location.pathname)
    ) {
      history.push("/login", { loginFailed: true });
    }
  }, [session, routes, location]);

  return session;
};

export default useSession;
