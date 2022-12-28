import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
//import { login } from "../reducers/authReducer";
//import { useDispatch } from "react-redux";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/auth/register`, {
        username: userName,
        email: email,
        password: password,
      });

      toast.success("Register successful");

      console.log("Registered User", res);
      //dispatch(login(res.data.details));
      navigate("/login");
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="container-fluid  p-5 text-center ">
        <h1>Register</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className=" col-md-6 offset-md-3">
            <form onSubmit={(e) => handleSubmit(e)} className="mt-3">
              <div className="form-group mb-3">
                <label className="form-label">Username:</label>
                <input
                  placeholder="Enter username"
                  className="form-control"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label">Email:</label>
                <input
                  placeholder="Enter email"
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label">Password:</label>
                <input
                  placeholder="Type password"
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={!userName || !email || !password}
                className="btn btn-dark"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
