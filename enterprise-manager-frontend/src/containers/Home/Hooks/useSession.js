import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { fetchSession } from "../../../actions/sessionActions";
import { useEffect, useRef } from "react";

const useSession = () => {
  const routes = ["/", "/login", "/reset_password"];
  const { session, organizations } = useSelector(s => s);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const mounted = useRef();

  useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch, location]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (location.state)
        if (location.state.loginFailed && !routes.includes(location.pathname))
          dispatch({
            type: "ADD_ERRORS",
            errors: ["You need to login to view the page requested."],
          });
    }
    // eslint-disable-next-line
  }, [location]);

  if (
    !session.isLoggedIn &&
    organizations.length > 0 &&
    !routes.includes(location.pathname)
  ) {
    history.push("/login", { loginFailed: true });
  }
  return session;
};

export default useSession;
