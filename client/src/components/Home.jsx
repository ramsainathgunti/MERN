import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/authReducer";

const Home = () => {
  const dispatch = useDispatch();

  return (
    <div className="container-fluid h1 p-5 text-center">
      Home Page
      <button
        onClick={dispatch(login({ username: "sainath" }))}
        className="btn-dark"
      >
        click
      </button>
    </div>
  );
};

export default Home;
