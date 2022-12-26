import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const { user, loading, error, dispatch } = useContext(AuthContext);
  console.log(user, loading, error);
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const handleCredentials = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.details,
      });

      navigate("/");

      console.log(res);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <h3>Login</h3>
        <input
          type="text"
          className="lInput"
          placeholder="Username"
          id="username"
          onChange={handleCredentials}
        />

        <input
          type="password"
          className="lInput"
          placeholder="Password"
          id="password"
          onChange={handleCredentials}
        />
        <button className="lButton" onClick={(e) => handleClick(e)}>
          Login
        </button>
        {error && <span style={{ color: "red" }}>Something went wrong</span>}
        <span>
          Click here to
          <Link to="/register">
            <button className="lRegister">Register</button>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
