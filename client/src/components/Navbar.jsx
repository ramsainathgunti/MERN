import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/authReducer";
import axios from "axios";

const Navbar = () => {
  const { username } = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await axios.get("/auth/logout");
      dispatch(logout({ username: "", email: "" }));
      localStorage.removeItem("LoggedInUser");
      console.log(res);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <div className="navbar  bg-dark  d-flex justify-content-between ">
      <Link to="/" className="nav-link text-white fs-4">
        Home {JSON.stringify(username)}
      </Link>
      {username === "" && (
        <>
          <Link to="/login" className="nav-link text-white fs-4">
            Login
          </Link>
          <Link to="/register" className="nav-link text-white fs-4">
            Register
          </Link>
        </>
      )}

      {username !== "" && (
        <Link to="/dashboard" className="nav-link text-white fs-4">
          Dashboard
        </Link>
      )}
      {username !== "" && (
        <Link
          to="/login"
          className="nav-link text-white fs-4"
          onClick={handleLogout}
        >
          Logout
        </Link>
      )}
    </div>
  );
};

export default Navbar;
