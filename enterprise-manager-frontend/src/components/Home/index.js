import React from "react";
import { useSelector, shallowEqual } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector(state => state.session, shallowEqual);
  return <h1>Welcome {currentUser.name}</h1>;
};

export default Home;
