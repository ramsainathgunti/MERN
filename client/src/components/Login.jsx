import React from "react";
import { useSelector } from "react-redux";

const Login = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <div className="container-fluid  p-5 text-center">
        <h1>Login {JSON.stringify(user)}</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form action="" className="mt-3">
              <div className="form-group">
                <label htmlFor="" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  className="form-control mb-3"
                />
              </div>
              <div className="form-group">
                <label htmlFor="" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="form-control mb-3"
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
