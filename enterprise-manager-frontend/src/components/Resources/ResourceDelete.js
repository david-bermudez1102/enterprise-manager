import { useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { removeResource } from "../../actions/resourceActions";

const ResourceDelete = ({ redirectTo, organizationId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { resourceId } = useParams();
  const { resources, requesting } = useSelector(
    ({ resources, requesting }) => ({ resources, requesting }),
    shallowEqual
  );
  const mounted = useRef();

  useEffect(() => {
    dispatch(removeResource(organizationId, resourceId));
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (!requesting) setTimeout(() => history.replace(redirectTo), 3000);
    }
  }, [resources]);

  return null;
};

export default ResourceDelete;
