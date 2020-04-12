import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector(state => state.session);
  return <h1>Welcome {currentUser.name}</h1>;
};

export default Home;
