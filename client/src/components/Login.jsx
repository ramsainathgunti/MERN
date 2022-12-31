import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { login } from "../reducers/authReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //const user = useSelector((state) => state.user);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", {
        username: userName,
        password: password,
      });

      navigate("/dashboard");
      console.log(res);
      console.log(res.cookies);
      localStorage.setItem("LoggedInUser", JSON.stringify(res.data.user));
      dispatch(login(res.data.user));
      toast.success("Login Successful");
    } catch (err) {
      if (err.response.status === 403 || err.response.status === 404)
        toast.error(err.response.data);
      console.log(err);
    }
  };
  return (
    <>
      <div className="container-fluid  p-5 text-center">
        <h1>Login </h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form action="" className="mt-3" onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group">
                <label htmlFor="" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  className="form-control mb-3"
                  onChange={(e) => setUserName(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={!userName || !password}
                className="btn btn-dark"
              >
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
