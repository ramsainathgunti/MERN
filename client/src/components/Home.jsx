import React from "react";
import { useDispatch, useSelector } from "react-redux";
//import { login } from "../reducers/authReducer";

const Home = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <div className="container-fluid h1 p-5 text-center">
      Home Page
      <button className="btn-dark">click</button>
    </div>
  );
};

export default Home;
