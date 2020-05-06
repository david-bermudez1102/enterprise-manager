import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

const ResourceForm = ({ addResource, updateResource, url, resource }) => {
  const history = useHistory();
  const dispatch = useDispatch();
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
      dispatch(addResource(state)).then(resource =>
        resource ? history.push(`${resource.formAlias}`) : null
      );
    else if (updateResource)
      dispatch(updateResource(state)).then(resource =>
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
      <input
        type="submit"
        value={addResource ? "Create Resource" : "Update Resource"}
        className="btn btn-primary shadow"
      />
    </form>
  );
};

export default React.memo(ResourceForm);
