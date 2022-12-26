import "../styles/register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [regDetails, setRegDetails] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });
  const handleRegDetails = (e) => {
    setRegDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", regDetails);
      navigate("/login");
    } catch (err) {}
  };
  return (
    <div className="register">
      <div className="rContainer">
        <h3>Register</h3>
        <input
          type="text"
          className="rInput"
          placeholder="Username"
          id="username"
          onChange={(e) => handleRegDetails(e)}
        />
        <input
          type="email"
          className="rInput"
          placeholder="Email"
          id="email"
          onChange={(e) => handleRegDetails(e)}
        />

        <input
          type="password"
          className="rInput"
          placeholder="Password"
          id="password"
          onChange={(e) => handleRegDetails(e)}
        />
        <button className="rButton" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
