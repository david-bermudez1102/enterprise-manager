import { useDispatch, useSelector } from "react-redux";
import { removeSession } from "../actions/sessionActions";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const LogoutContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { session } = useSelector(s => s);

  useEffect(() => {
    if (session.isLoggedIn)
      dispatch(removeSession()).then(data => {
        return data.message === "success" ? history.push("/") : null;
      });
    // eslint-disable-next-line
  }, []);

  return null;
};

export default LogoutContainer;
