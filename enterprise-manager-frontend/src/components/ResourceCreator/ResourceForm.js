import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import ButtonLoader from "../Loader/ButtonLoader";
import useLoader from "../Loader/useLoader";

const ResourceForm = ({ addResource, updateResource, url, resource }) => {
  const history = useHistory();
  const { dispatchWithLoader, loading } = useLoader();
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual);
  const { organizationId } = session.currentUser;
  const initialState = {
    name: resource ? resource.name : "",
    organizationId,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (resource) setState({ ...state, name: resource.name, id: resource.id });
    else setState(initialState);
    // eslint-disable-next-line
  }, [resource]);

  const handleSubmit = e => {
    e.preventDefault();
    if (addResource)
      dispatchWithLoader(addResource(state)).then(resource =>
        resource ? history.push(`${resource.formAlias}`) : null
      );
    else if (updateResource)
      dispatchWithLoader(updateResource(state)).then(resource =>
        resource ? history.replace(`${url}/${resource.formAlias}/edit`) : null
      );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          name="name"
          id="resource_name"
          type="text"
          placeholder="Enter name..."
          onChange={e =>
            setState({ ...state, [e.target.name]: e.target.value })
          }
          value={state.name}
          className="form-control rounded-pill"
          required
        />
        <label className="form-control-placeholder" htmlFor="resource_name">
          Resource Name
        </label>
      </div>
      <ButtonLoader loading={loading}>
        {addResource ? "Create Resource" : "Update Resource"}
      </ButtonLoader>
    </form>
  );
};

export default React.memo(ResourceForm);
